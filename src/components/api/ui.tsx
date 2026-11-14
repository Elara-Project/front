"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Icon from "../Icon";
import { api, Child, errorMessage } from "@/lib/api";
export const inputClass = "elara-input";
export function Shell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="elara-app">
      <a className="elara-skip-link" href="#conteudo-principal">
        Pular para o conteúdo
      </a>
      <Sidebar />
      <main id="conteudo-principal" className="elara-main">
        <div className="elara-workspace-bar">
          <span>Área da família</span>
          <span>Apoio, organização e informação</span>
        </div>
        <div className="elara-content">
          <header className="elara-page-heading">
            <p className="elara-eyebrow">ELARA · Seu espaço de cuidado</p>
            <h1>{title}</h1>
            <p className="elara-page-description">{description}</p>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`elara-card ${className}`}>{children}</section>;
}
export function Button({
  children,
  onClick,
  disabled,
  type = "button",
  variant,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "quiet";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`elara-button elara-button-${variant ?? (type === "submit" ? "primary" : "secondary")}`}
    >
      {children}
    </button>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="elara-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
export function Feedback({
  error,
  busy,
  success,
  retry,
}: {
  error?: string;
  busy?: boolean;
  success?: string;
  retry?: () => void;
}) {
  if (!error && !busy && !success) return null;
  return (
    <div className="elara-feedback-group">
      {busy && (
        <div className="elara-loading" role="status" aria-live="polite">
          <span className="elara-loading-dot" />
          Carregando informações…
        </div>
      )}
      {success && (
        <div className="elara-feedback elara-feedback-success" role="status">
          <Icon name="check" size={18} />
          <p>{success}</p>
        </div>
      )}
      {error && (
        <div className="elara-feedback elara-feedback-error" role="alert">
          <Icon name="info" size={19} />
          <p>{error}</p>
          {retry && (
            <button type="button" onClick={retry}>
              Tentar novamente
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export function useResource<T>(path: string | null) {
  const [state, setState] = useState<{
    path: string | null;
    data: T | null;
    error: string;
    loading: boolean;
    revision: number;
  }>({ path, revision: 0, data: null, error: "", loading: !!path });
  const [revision, setRevision] = useState(0);
  const reload = useCallback(() => setRevision((n) => n + 1), []);
  useEffect(() => {
    if (!path) return;
    let active = true;
    const controller = new AbortController();
    api<T>(path, { signal: controller.signal })
      .then((data) => {
        if (active)
          setState({ path, revision, data, error: "", loading: false });
      })
      .catch((err) => {
        if (active)
          setState({
            path,
            revision,
            data: null,
            error: errorMessage(err),
            loading: false,
          });
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [path, revision]);
  // A mudança de rota nunca exibe dados da criança anterior.
  const valid = state.path === path && state.revision === revision;
  return {
    data: valid ? state.data : null,
    error: valid ? state.error : "",
    loading: !!path && (!valid || state.loading),
    reload,
  };
}
export function useChildren() {
  const resource = useResource<Child[]>("/children");
  const [selected, setSelected] = useState(0);
  const children = resource.data ?? [];
  const child = children.find((c) => c.idChildren === selected) ?? children[0];
  return {
    ...resource,
    children,
    child,
    selected: child?.idChildren ?? 0,
    setSelected,
  };
}
export function ChildPicker({
  childrenList,
  selected,
  onChange,
}: {
  childrenList: Child[];
  selected: number;
  onChange: (id: number) => void;
}) {
  return (
    <Field label="Criança">
      <select
        className={inputClass}
        value={selected}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {!childrenList.length && (
          <option value={0}>Cadastre uma criança para começar</option>
        )}
        {childrenList.map((c) => (
          <option key={c.idChildren} value={c.idChildren}>
            {c.name}
          </option>
        ))}
      </select>
    </Field>
  );
}
