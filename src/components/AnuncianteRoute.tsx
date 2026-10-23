"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AnuncianteRouteProps = {
  children: ReactNode;
};

type Usuario = {
  nome?: string;
  email?: string;
  tipo?: string;
  logado?: boolean;
};

export default function AnuncianteRoute({
  children,
}: AnuncianteRouteProps) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("elara_usuario");

    if (!usuarioSalvo) {
      router.replace("/login");
      return;
    }

    try {
      const usuario: Usuario = JSON.parse(usuarioSalvo);

      if (!usuario.logado) {
        router.replace("/login");
        return;
      }

      if (usuario.tipo !== "anunciante") {
        if (usuario.tipo === "admin") {
          router.replace("/admin");
          return;
        }

        router.replace("/dashboard");
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
          Verificando acesso do anunciante...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}