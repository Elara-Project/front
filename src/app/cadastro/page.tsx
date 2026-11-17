"use client";

import { api } from "@/lib/api";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function criarConta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (carregando) return;

    setErro("");

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    if (!nomeLimpo) {
      setErro("Digite seu nome completo.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    setCarregando(true);

    try {
      await api("/users", {
        method: "POST",
        body: JSON.stringify({
          name: nomeLimpo,
          email: emailLimpo,
          senha,
          status: 1,
        }),
      });

      router.push("/login");
    } catch (error) {
      setErro(
        error instanceof TypeError
          ? "Não foi possível conectar ao servidor. O cadastro ficará disponível quando a API estiver pronta."
          : error instanceof Error
            ? error.message
            : "Ocorreu um erro ao criar sua conta.",
      );
    } finally {
      setCarregando(false);
    }
  }

  const senhaTemTamanho = senha.length >= 8;
  const senhasIguais =
    confirmarSenha.length > 0 && senha === confirmarSenha;

  return (
    <main className="cadastro-page">
      <header className="cadastro-header">
        <Link href="/" aria-label="ELARA — Página inicial">
          <Image
            src="/logo-elara.png"
            alt="ELARA"
            width={160}
            height={80}
            priority
            className="cadastro-logo"
          />
        </Link>

        <Link href="/" className="cadastro-back">
          <span aria-hidden="true">←</span>
          Voltar para o início
        </Link>
      </header>

      <div className="cadastro-layout">
        <section className="cadastro-presentation">
          <p className="cadastro-label">
            AO SEU LADO EM CADA CUIDADO
          </p>

          <h1>
            Tudo que importa,
            <br />
            mais perto de <span>você.</span>
          </h1>

          <p className="cadastro-intro">
            Crie seu espaço para organizar informações, acompanhar
            compromissos e cuidar da rotina da sua família.
          </p>

          <div className="cadastro-benefits">
            <div className="cadastro-benefit">
              <span className="cadastro-icon">
                <Icon name="calendar" size={20} />
              </span>

              <div>
                <h2>Organize a rotina</h2>
                <p>Consultas, terapias e compromissos em um só lugar.</p>
              </div>
            </div>

            <div className="cadastro-benefit">
              <span className="cadastro-icon">
                <Icon name="children" size={20} />
              </span>

              <div>
                <h2>Acompanhe cada etapa</h2>
                <p>Informações importantes para consultar quando precisar.</p>
              </div>
            </div>

            <div className="cadastro-benefit">
              <span className="cadastro-icon">
                <Icon name="forum" size={20} />
              </span>

              <div>
                <h2>Encontre apoio</h2>
                <p>Conteúdos e experiências para apoiar quem cuida.</p>
              </div>
            </div>
          </div>

          <p className="cadastro-note">
            Um passo de cada vez, no seu tempo.
          </p>
        </section>

        <section
          className="cadastro-form-area"
          aria-labelledby="cadastro-title"
        >
          <div className="cadastro-card">
            <div className="cadastro-card-heading">
              <p className="cadastro-label">COMECE POR AQUI</p>
              <h2 id="cadastro-title">Crie seu espaço.</h2>
              <p>
                Preencha seus dados para criar sua conta no ELARA.
              </p>
            </div>

            <form
              onSubmit={criarConta}
              className="cadastro-form"
              aria-busy={carregando}
            >
              <div className="cadastro-field">
                <label htmlFor="nome">Nome completo</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(event) => {
                    setNome(event.target.value);
                    setErro("");
                  }}
                  placeholder="Digite seu nome completo"
                  autoComplete="name"
                />
              </div>

              <div className="cadastro-field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErro("");
                  }}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                />
              </div>

              <div className="cadastro-field">
                <label htmlFor="senha">Senha</label>

                <div className="cadastro-password">
                  <input
                    id="senha"
                    name="senha"
                    type={mostrarSenha ? "text" : "password"}
                    required
                    minLength={8}
                    value={senha}
                    onChange={(event) => {
                      setSenha(event.target.value);
                      setErro("");
                    }}
                    placeholder="Crie uma senha"
                    autoComplete="new-password"
                    aria-describedby="senha-requisito"
                  />

                  <button
                    type="button"
                    className="cadastro-password-toggle"
                    onClick={() => setMostrarSenha((estado) => !estado)}
                    aria-label={
                      mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                    }
                    aria-pressed={mostrarSenha}
                    aria-controls="senha"
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>

                <p
                  id="senha-requisito"
                  className={`cadastro-hint ${
                    senhaTemTamanho ? "cadastro-hint-success" : ""
                  }`}
                >
                  {senhaTemTamanho && <span aria-hidden="true">✓ </span>}
                  Pelo menos 8 caracteres
                </p>
              </div>

              <div className="cadastro-field">
                <label htmlFor="confirmarSenha">Confirmar senha</label>

                <div className="cadastro-password">
                  <input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type={mostrarConfirmacao ? "text" : "password"}
                    required
                    value={confirmarSenha}
                    onChange={(event) => {
                      setConfirmarSenha(event.target.value);
                      setErro("");
                    }}
                    placeholder="Digite a senha novamente"
                    autoComplete="new-password"
                    aria-describedby={
                      confirmarSenha.length > 0
                        ? "confirmacao-status"
                        : undefined
                    }
                  />

                  <button
                    type="button"
                    className="cadastro-password-toggle"
                    onClick={() =>
                      setMostrarConfirmacao((estado) => !estado)
                    }
                    aria-label={
                      mostrarConfirmacao
                        ? "Ocultar confirmação de senha"
                        : "Mostrar confirmação de senha"
                    }
                    aria-pressed={mostrarConfirmacao}
                    aria-controls="confirmarSenha"
                  >
                    {mostrarConfirmacao ? "Ocultar" : "Mostrar"}
                  </button>
                </div>

                {confirmarSenha.length > 0 && (
                  <p
                    id="confirmacao-status"
                    className={`cadastro-hint ${
                      senhasIguais
                        ? "cadastro-hint-success"
                        : "cadastro-hint-warning"
                    }`}
                  >
                    {senhasIguais
                      ? "✓ As senhas são iguais"
                      : "As senhas ainda não são iguais"}
                  </p>
                )}
              </div>

              {erro && (
                <div role="alert" className="cadastro-error">
                  <strong>Verifique seus dados</strong>
                  <p>{erro}</p>
                </div>
              )}

              <p className="cadastro-profile-note">
                Esta conta será seu perfil de responsável para
                utilizar os recursos do ELARA.
              </p>

              <button
                type="submit"
                disabled={carregando}
                className="cadastro-button cadastro-button-primary"
              >
                {carregando ? "Criando conta..." : "Criar minha conta"}
                {!carregando && <Icon name="arrow" size={17} />}
              </button>
            </form>

            <div className="cadastro-divider">
              <span>Já possui uma conta?</span>
            </div>

            <Link
              href="/login"
              className="cadastro-button cadastro-button-secondary"
            >
              Entrar na minha conta
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </section>
      </div>

      <footer className="cadastro-footer">
        <p>
          <strong>ELARA</strong>
          <span>Ao seu lado em cada cuidado.</span>
        </p>
        <a href="mailto:elarasac@gmail.com">elarasac@gmail.com</a>
      </footer>

      <style jsx>{`
        .cadastro-page {
          --cadastro-bg: var(--elara-offwhite, #faf8f5);
          --cadastro-surface: var(--elara-superficie, #ffffff);
          --cadastro-text: var(--elara-texto, #34474e);
          --cadastro-muted: var(--elara-texto-secundario, #687578);
          --cadastro-border: var(--elara-borda, #e6e4df);
          --cadastro-action: var(--elara-terracota, #d97d64);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--cadastro-bg);
          color: var(--cadastro-text);
          font-family: inherit;
        }

        .cadastro-page,
        .cadastro-page * {
          box-sizing: border-box;
        }

        .cadastro-page :global(a) {
          text-decoration: none;
        }

        .cadastro-page :global(a:focus-visible),
        .cadastro-page button:focus-visible {
          outline: 3px solid var(--cadastro-action);
          outline-offset: 4px;
        }

        .cadastro-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 96px;
          padding: 12px max(32px, calc((100% - 1160px) / 2));
          border-bottom: 1px solid var(--cadastro-border);
          background: var(--cadastro-surface);
        }

        .cadastro-header :global(.cadastro-logo) {
          display: block;
          width: 125px;
          height: auto;
        }

        .cadastro-header :global(.cadastro-back) {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 44px;
          color: var(--cadastro-muted);
          font-size: 12px;
          font-weight: 600;
        }

        .cadastro-header :global(.cadastro-back:hover) {
          color: var(--cadastro-action);
        }

        .cadastro-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 90px;
          width: min(1080px, calc(100% - 64px));
          margin: auto;
          padding-block: 56px;
          flex: 1;
        }

        .cadastro-presentation,
        .cadastro-form-area {
          min-width: 0;
        }

        .cadastro-label {
          margin: 0 0 16px;
          color: var(--cadastro-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          line-height: 1.7;
        }

        .cadastro-presentation h1 {
          margin: 0;
          font-size: clamp(38px, 4vw, 54px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.045em;
        }

        .cadastro-presentation h1 span {
          color: var(--cadastro-action);
        }

        .cadastro-intro {
          max-width: 420px;
          margin: 24px 0 0;
          color: var(--cadastro-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .cadastro-benefits {
          margin-top: 32px;
          border-top: 1px solid var(--cadastro-border);
        }

        .cadastro-benefit {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-block: 19px;
          border-bottom: 1px solid var(--cadastro-border);
        }

        .cadastro-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border: 1px solid var(--cadastro-border);
          border-radius: 9px;
          background: var(--cadastro-surface);
          color: var(--cadastro-action);
        }

        .cadastro-benefit h2 {
          margin: 0 0 5px;
          font-size: 13px;
          font-weight: 700;
        }

        .cadastro-benefit p {
          margin: 0;
          color: var(--cadastro-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .cadastro-note {
          margin: 24px 0 0;
          color: var(--cadastro-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .cadastro-card {
          padding: 36px;
          border: 1px solid var(--cadastro-border);
          border-radius: 14px;
          background: var(--cadastro-surface);
        }

        .cadastro-card-heading .cadastro-label {
          margin-bottom: 12px;
        }

        .cadastro-card-heading h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.035em;
        }

        .cadastro-card-heading > p:last-child {
          margin: 14px 0 0;
          color: var(--cadastro-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .cadastro-form {
          margin-top: 28px;
        }

        .cadastro-field + .cadastro-field {
          margin-top: 18px;
        }

        .cadastro-field label {
          display: block;
          margin-bottom: 9px;
          color: var(--cadastro-text);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
        }

        .cadastro-field input {
          display: block;
          width: 100%;
          min-height: 48px;
          padding: 13px 14px;
          border: 1px solid var(--cadastro-border);
          border-radius: 8px;
          background: var(--cadastro-surface);
          color: var(--cadastro-text);
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
        }

        .cadastro-field input::placeholder {
          color: var(--cadastro-muted);
          opacity: 0.8;
        }

        .cadastro-field input:focus {
          outline: 2px solid var(--cadastro-action);
          outline-offset: 2px;
          border-color: var(--cadastro-action);
        }

        .cadastro-password {
          position: relative;
        }

        .cadastro-password input {
          padding-right: 88px;
        }

        .cadastro-password-toggle {
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          min-height: 40px;
          padding: 0 9px;
          border: 0;
          border-radius: 5px;
          background: transparent;
          color: var(--cadastro-muted);
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .cadastro-password-toggle:hover {
          color: var(--cadastro-action);
        }

        .cadastro-hint {
          margin: 8px 0 0;
          color: var(--cadastro-muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .cadastro-hint-success {
          color: #416b41;
        }

        .cadastro-hint-warning {
          color: #9c4936;
        }

        .cadastro-profile-note {
          margin: 22px 0 0;
          padding-top: 18px;
          border-top: 1px solid var(--cadastro-border);
          color: var(--cadastro-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .cadastro-button,
        .cadastro-card :global(.cadastro-button) {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          min-height: 48px;
          padding: 13px 18px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.5;
          cursor: pointer;
          transition: background-color 150ms;
        }

        .cadastro-button-primary {
          margin-top: 20px;
          background: var(--cadastro-action);
          color: #fff;
        }

        .cadastro-button-primary:hover:not(:disabled) {
          background: #c96f57;
        }

        .cadastro-button-primary:disabled {
          cursor: wait;
          opacity: 0.65;
        }

        .cadastro-card :global(.cadastro-button-secondary) {
          border-color: var(--cadastro-border);
          background: var(--cadastro-surface);
          color: var(--cadastro-text);
        }

        .cadastro-card :global(.cadastro-button-secondary:hover) {
          background: var(--cadastro-bg);
        }

        .cadastro-error {
          margin-top: 20px;
          padding: 14px;
          border: 1px solid #edc6bb;
          border-radius: 8px;
          background: #fff4f0;
          color: #8c3c2c;
          overflow-wrap: anywhere;
        }

        .cadastro-error strong {
          font-size: 12px;
        }

        .cadastro-error p {
          margin: 6px 0 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .cadastro-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-block: 24px;
          color: var(--cadastro-muted);
          font-size: 11px;
        }

        .cadastro-divider::before,
        .cadastro-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--cadastro-border);
        }

        .cadastro-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px max(32px, calc((100% - 1160px) / 2));
          border-top: 1px solid var(--cadastro-border);
          background: var(--cadastro-surface);
        }

        .cadastro-footer p {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin: 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .cadastro-footer strong {
          letter-spacing: 0.09em;
        }

        .cadastro-footer span,
        .cadastro-footer a {
          color: var(--cadastro-muted);
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .cadastro-layout {
            gap: 36px;
          }

          .cadastro-card {
            padding: 28px;
          }

          .cadastro-presentation h1 {
            font-size: 40px;
          }
        }

        @media (max-width: 700px) {
          .cadastro-header {
            min-height: 80px;
            padding: 12px 20px;
            gap: 16px;
          }

          .cadastro-header :global(.cadastro-logo) {
            width: 105px;
          }

          .cadastro-header :global(.cadastro-back) {
            font-size: 11px;
          }

          .cadastro-layout {
            grid-template-columns: 1fr;
            width: min(460px, calc(100% - 36px));
            padding-block: 36px;
            gap: 0;
          }

          .cadastro-presentation {
            display: none;
          }

          .cadastro-card {
            padding: 28px 24px;
          }

          .cadastro-card-heading h2 {
            font-size: 28px;
          }

          .cadastro-field input {
            font-size: 16px;
          }

          .cadastro-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
            padding: 22px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cadastro-button,
          .cadastro-card :global(.cadastro-button) {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
