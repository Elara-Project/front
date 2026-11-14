"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { clearSession } from "@/lib/api";
import Icon, { IconName } from "./Icon";

const links: { name: string; href: string; icon: IconName }[] = [
  { name: "Visão geral", href: "/dashboard", icon: "home" },
  { name: "Crianças", href: "/crianca", icon: "children" },
  { name: "Agenda", href: "/agenda", icon: "calendar" },
  { name: "Cuidados", href: "/cuidados", icon: "care" },
  { name: "Conteúdos", href: "/biblioteca", icon: "library" },
  { name: "Fórum", href: "/forum", icon: "forum" },
  { name: "Assistente IA", href: "/ia", icon: "assistant" },
];
const mobileLinks = links.slice(0, 4);
function subscribe(notify: () => void) {
  window.addEventListener("elara-perfil-atualizado", notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener("elara-perfil-atualizado", notify);
    window.removeEventListener("storage", notify);
  };
}
function snapshot() {
  try {
    const value = JSON.parse(
      localStorage.getItem("elara_usuario") || "{}",
    ).nome;
    return typeof value === "string" && value.trim() ? value : "Minha conta";
  } catch {
    return "Minha conta";
  }
}
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const name = useSyncExternalStore(subscribe, snapshot, () => "Minha conta");
  const panel = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  function show(button: HTMLButtonElement) {
    opener.current = button;
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }
  function logout() {
    clearSession();
    close();
    router.push("/login");
  }
  function accessibility() {
    close();
    window.dispatchEvent(new Event("abrir-acessibilidade"));
  }
  useEffect(() => {
    if (!open) return;
    const restore = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = opener.current;
    const items = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          "a[href],button:not([disabled])",
        ) ?? [],
      );
    items()[0]?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const list = items();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", key);
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = restore;
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", resize);
      trigger?.focus();
    };
  }, [open]);
  function contents(drawer = false) {
    return (
      <>
        <div className="elara-brand">
          <Link
            href="/dashboard"
            onClick={close}
            aria-label="ELARA — visão geral"
          >
            <Image
              src="/logo-elara.png"
              alt="ELARA"
              width={160}
              height={100}
              priority
              className="elara-brand-image"
            />
          </Link>
          {drawer && (
            <button
              className="elara-icon-button"
              onClick={close}
              aria-label="Fechar menu"
            >
              <Icon name="close" />
            </button>
          )}
        </div>
        <div className="elara-nav-scroll">
          <p className="elara-nav-label">Organização e cuidado</p>
          <nav aria-label="Menu principal" className="elara-nav-list">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={active(link.href) ? "page" : undefined}
                className={`elara-nav-link ${active(link.href) ? "is-active" : ""}`}
              >
                <Icon name={link.icon} />
                <span>{link.name}</span>
                {active(link.href) && <span className="elara-nav-marker" />}
              </Link>
            ))}
          </nav>
          <div className="elara-nav-divider" />
          <p className="elara-nav-label">Preferências</p>
          <nav aria-label="Menu da conta" className="elara-nav-list">
            <Link
              href="/notificacoes"
              onClick={close}
              aria-current={active("/notificacoes") ? "page" : undefined}
              className={`elara-nav-link ${active("/notificacoes") ? "is-active" : ""}`}
            >
              <Icon name="bell" />
              <span>Notificações</span>
            </Link>
            <button className="elara-nav-link" onClick={accessibility}>
              <Icon name="accessibility" />
              <span>Acessibilidade</span>
            </button>
          </nav>
          <div className="elara-nav-note">
            <span className="elara-note-line" />
            <p>
              Mais organização.
              <br />
              Mais espaço para cuidar.
            </p>
          </div>
        </div>
        <div className="elara-account">
          <Link href="/perfil" onClick={close} className="elara-account-link">
            <span className="elara-account-avatar">
              <Icon name="user" />
            </span>
            <span className="elara-account-name">
              <strong>{name}</strong>
              <small>Perfil e informações</small>
            </span>
            <Icon name="chevron" size={16} />
          </Link>
          <button onClick={logout} className="elara-logout">
            <Icon name="logout" size={17} />
            Sair da conta
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <aside className="elara-sidebar">{contents()}</aside>
      <header className="elara-mobile-header">
        <Link href="/dashboard" aria-label="ELARA — visão geral">
          <Image
            src="/logo-elara.png"
            alt="ELARA"
            width={115}
            height={65}
            priority
            className="elara-mobile-logo"
          />
        </Link>
        <div className="elara-mobile-header-actions">
          <Link
            href="/notificacoes"
            className="elara-icon-button"
            aria-label="Abrir notificações"
          >
            <Icon name="bell" />
          </Link>
          <Link
            href="/perfil"
            className="elara-icon-button elara-profile-button"
            aria-label="Abrir meu perfil"
          >
            <Icon name="user" />
          </Link>
        </div>
      </header>
      <nav className="elara-bottom-nav" aria-label="Navegação do celular">
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active(link.href) ? "page" : undefined}
            className={active(link.href) ? "is-active" : ""}
          >
            <Icon name={link.icon} />
            <span>{link.href === "/dashboard" ? "Início" : link.name}</span>
          </Link>
        ))}
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="elara-mobile-menu"
          className={open ? "is-active" : ""}
          onClick={(e) => show(e.currentTarget)}
        >
          <Icon name="menu" />
          <span>Menu</span>
        </button>
      </nav>
      {open && (
        <div className="elara-drawer-layer">
          <div
            className="elara-drawer-backdrop"
            aria-hidden="true"
            onClick={close}
          />
          <section
            id="elara-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu do ELARA"
            ref={panel}
            className="elara-drawer"
          >
            {contents(true)}
          </section>
        </div>
      )}
    </>
  );
}
