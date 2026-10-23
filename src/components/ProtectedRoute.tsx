"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("elara_usuario");

    if (!usuarioSalvo) {
      router.replace("/login");
      return;
    }

    try {
      const usuario = JSON.parse(usuarioSalvo);

      if (!usuario.logado) {
        router.replace("/login");
        return;
      }

      setVerificando(false);
    } catch {
      localStorage.removeItem("elara_usuario");
      router.replace("/login");
    }
  }, [router]);

  if (verificando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--elara-offwhite)]">
        <p className="font-semibold text-[var(--elara-grafite)]">
          Verificando acesso...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}