"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  api,
  clearSession,
  errorMessage,
  saveUser,
  token,
  User,
} from "@/lib/api";
export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: "admin";
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    const expired = () => {
      if (active) router.replace("/login");
    };
    window.addEventListener("elara-sessao-expirada", expired);
    if (!token()) {
      router.replace("/login");
      return () => window.removeEventListener("elara-sessao-expirada", expired);
    }
    api<User>("/users/me")
      .then((user) => {
        if (!active) return;
        saveUser(user);
        if (role && user.role !== role) {
          router.replace("/dashboard");
          return;
        }
        setStatus("ready");
      })
      .catch((err) => {
        if (active) {
          setError(errorMessage(err));
          setStatus("error");
        }
      });
    return () => {
      active = false;
      window.removeEventListener("elara-sessao-expirada", expired);
    };
  }, [router, role, retry]);
  if (status === "ready") return <>{children}</>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[var(--elara-fundo)] p-6 text-[var(--elara-texto)]">
      <p role={status === "error" ? "alert" : "status"}>
        {status === "error" ? error : "Verificando sessão…"}
      </p>
      {status === "error" && (
        <>
          <button
            onClick={() => {
              setStatus("loading");
              setRetry((n) => n + 1);
            }}
          >
            Tentar novamente
          </button>
          <button
            onClick={() => {
              clearSession();
              router.replace("/login");
            }}
          >
            Voltar ao login
          </button>
        </>
      )}
    </main>
  );
}
