"use client";

import { clearSession } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const links = [
  { nome: "Início", href: "/dashboard", icone: "⌂" },
  { nome: "Crianças", href: "/crianca", icone: "♡" },
  { nome: "Agenda", href: "/agenda", icone: "◷" },
  { nome: "Cuidados", href: "/cuidados", icone: "✚" },
  { nome: "Conteúdos", href: "/biblioteca", icone: "▤" },
  { nome: "Fórum", href: "/forum", icone: "◌" },
  { nome: "Assistente IA", href: "/ia", icone: "✦" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);
  const nome = useSyncExternalStore(
    (notify) => {
      window.addEventListener("elara-perfil-atualizado", notify);
      window.addEventListener("storage", notify);
      return () => {
        window.removeEventListener("elara-perfil-atualizado", notify);
        window.removeEventListener("storage", notify);
      };
    },
    () => {
      try {
        return (
          JSON.parse(localStorage.getItem("elara_usuario") || "{}").nome ||
          "Meu perfil"
        );
      } catch {
        return "Meu perfil";
      }
    },
    () => "Meu perfil",
  );

  const abrirRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLElement>(null);

  // A API não possui estado de leitura; não exibir contador fictício.

  useEffect(() => {
    if (!menuAberto) return;

    const abrirButton = abrirRef.current;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function elementos() {
      return Array.from(
        painelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      );
    }

    elementos()[0]?.focus();

    function teclado(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setMenuAberto(false);
        return;
      }

      if (evento.key !== "Tab") return;

      const lista = elementos();
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];

      if (!primeiro || !ultimo) return;

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 768px)");

    function verificarTela() {
      if (desktop.matches) setMenuAberto(false);
    }

    verificarTela();
    desktop.addEventListener("change", verificarTela);
    document.addEventListener("keydown", teclado);

    return () => {
      document.body.style.overflow = overflowAnterior;
      desktop.removeEventListener("change", verificarTela);
      document.removeEventListener("keydown", teclado);
      abrirButton?.focus();
    };
  }, [menuAberto]);

  function fecharMenu() {
    setMenuAberto(false);
  }

  function ativo(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function sair() {
    try {
      clearSession();
    } finally {
      fecharMenu();
      router.push("/login");
    }
  }

  function abrirAcessibilidade() {
    fecharMenu();
    window.dispatchEvent(new Event("abrir-acessibilidade"));
  }

  function classeLink(href: string) {
    return `flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${
      ativo(href)
        ? "bg-[var(--elara-terracota-suave)] text-[var(--elara-terracota-texto)]"
        : "text-[var(--elara-texto-secundario)] hover:bg-[var(--elara-superficie-hover)]"
    }`;
  }

  function conteudo(mobile: boolean) {
    return (
      <>
        <div className="flex shrink-0 items-center justify-between gap-3 px-5 py-5">
          <Link
            href="/dashboard"
            onClick={fecharMenu}
            aria-label="ELARA — início"
          >
            <Image
              src="/logo-elara.png"
              alt="ELARA — Cuidando de quem cuida"
              width={190}
              height={150}
              priority
              className="h-auto w-[140px] max-w-full object-contain"
            />
          </Link>

          {mobile && (
            <button
              type="button"
              onClick={fecharMenu}
              aria-label="Fechar menu"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--elara-terracota-suave)] text-2xl text-[var(--elara-terracota-texto)]"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5">
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-widest text-[var(--elara-texto-suave)]">
            Meu espaço
          </p>

          <nav aria-label="Menu principal" className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={fecharMenu}
                aria-current={ativo(link.href) ? "page" : undefined}
                className={classeLink(link.href)}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-lg ${
                    ativo(link.href)
                      ? "bg-[var(--elara-terracota)] text-white"
                      : "bg-[var(--elara-superficie-hover)]"
                  }`}
                >
                  {link.icone}
                </span>

                <span className="min-w-0 flex-1">{link.nome}</span>

                {ativo(link.href) && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--elara-terracota)]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <p className="mb-3 mt-6 px-3 text-xs font-extrabold uppercase tracking-widest text-[var(--elara-texto-suave)]">
            Conta
          </p>

          <nav aria-label="Menu da conta" className="space-y-1">
            <Link
              href="/notificacoes"
              onClick={fecharMenu}
              aria-current={ativo("/notificacoes") ? "page" : undefined}
              className={classeLink("/notificacoes")}
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--elara-amarelo-suave)] text-lg text-[var(--elara-amarelo-texto)]"
              >
                ◇
              </span>

              <span className="flex-1">Notificações</span>
            </Link>

            <Link
              href="/perfil"
              onClick={fecharMenu}
              aria-current={ativo("/perfil") ? "page" : undefined}
              className={classeLink("/perfil")}
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--elara-azul-suave)] text-lg text-[var(--elara-azul-texto)]"
              >
                ♙
              </span>
              Perfil
            </Link>

            <button
              type="button"
              onClick={abrirAcessibilidade}
              className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-bold text-[var(--elara-texto-secundario)] transition hover:bg-[var(--elara-superficie-hover)]"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--elara-verde-suave)] text-lg text-[var(--elara-verde-texto)]"
              >
                ♿
              </span>
              Acessibilidade
            </button>
          </nav>

          <div className="mt-6 rounded-[20px] border border-[var(--elara-borda)] bg-[var(--elara-sidebar-card)] p-3.5">
            <Link
              href="/perfil"
              onClick={fecharMenu}
              className="flex min-h-11 items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--elara-terracota)] text-sm font-extrabold uppercase text-white"
              >
                {nome.trim().charAt(0).toUpperCase() || "U"}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-[var(--elara-texto)]">
                  {nome}
                </p>
                <p className="mt-1 text-xs text-[var(--elara-texto-suave)]">
                  Ver meu perfil
                </p>
              </div>

              <span aria-hidden="true">›</span>
            </Link>

            <button
              type="button"
              onClick={sair}
              className="mt-3 min-h-11 w-full rounded-xl border border-[var(--elara-borda)] bg-[var(--elara-superficie)] px-3 py-2 text-sm font-bold text-[var(--elara-texto-secundario)] transition hover:border-[var(--elara-terracota)]"
            >
              Sair da conta
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-[68px] items-center justify-between border-b border-[var(--elara-borda)] bg-[var(--elara-sidebar)] px-4 md:hidden">
        <Link href="/dashboard" aria-label="ELARA — início">
          <Image
            src="/logo-elara.png"
            alt="ELARA"
            width={110}
            height={85}
            priority
            className="h-auto max-h-14 w-[88px] object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/notificacoes"
            aria-label="Abrir notificações"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--elara-amarelo-suave)] text-xl text-[var(--elara-amarelo-texto)]"
          >
            <span aria-hidden="true">◇</span>
          </Link>

          <button
            ref={abrirRef}
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            aria-controls={menuAberto ? "menu-elara-mobile" : undefined}
            onClick={() => setMenuAberto(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--elara-terracota-suave)] text-2xl text-[var(--elara-terracota-texto)]"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </header>

      {menuAberto && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            aria-hidden="true"
            onClick={fecharMenu}
            className="absolute inset-0 bg-[var(--elara-overlay)] backdrop-blur-[2px]"
          />

          <aside
            ref={painelRef}
            id="menu-elara-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu do ELARA"
            className="relative flex h-dvh w-[285px] max-w-[85vw] flex-col overflow-hidden border-r border-[var(--elara-borda)] bg-[var(--elara-sidebar)] pb-[env(safe-area-inset-bottom)] shadow-2xl"
          >
            {conteudo(true)}
          </aside>
        </div>
      )}

      <aside className="sticky top-0 hidden h-dvh w-[250px] shrink-0 flex-col overflow-hidden border-r border-[var(--elara-borda)] bg-[var(--elara-sidebar)] md:flex">
        {conteudo(false)}
      </aside>
    </>
  );
}
