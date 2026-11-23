"use client";

import { ApiError, api, saveUser, User } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (carregando) return;

    setErro("");

    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (!senha) {
      setErro("Digite sua senha.");
      return;
    }

    setCarregando(true);

    try {
      const login = () =>
        api<{ accessToken: string; user: User }>("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: emailLimpo, senha }),
        });
      let dados: { accessToken: string; user: User };
      try {
        dados = await login();
      } catch (firstError) {
        // Instâncias gratuitas podem estar iniciando após um período sem uso.
        // Refaz apenas falhas transitórias; credenciais inválidas não são repetidas.
        if (
          !(firstError instanceof ApiError) ||
          ![0, 502, 503, 504].includes(firstError.status)
        ) {
          throw firstError;
        }
        await new Promise((resolve) => setTimeout(resolve, 1200));
        dados = await login();
      }

      if (!dados.accessToken || !dados.user?.idUser) {
        throw new Error("Resposta de login inválida.");
      }

      sessionStorage.setItem("elara_access_token", dados.accessToken);
      saveUser(dados.user);

      router.replace(
        dados.user.role === "admin" ? "/admin" : "/dashboard",
      );
      router.refresh();
    } catch (error) {
      if (error instanceof TypeError) {
        setErro(
          "Não foi possível conectar ao servidor. Verifique se a API está funcionando.",
        );
      } else {
        setErro(
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao entrar.",
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <header className="login-header">
        <Link href="/" aria-label="ELARA — Página inicial">
          <Image
            src="/logo-elara.png"
            alt="ELARA"
            width={160}
            height={80}
            priority
            className="login-logo"
          />
        </Link>

        <Link href="/" className="login-back">
          <span aria-hidden="true">←</span>
          Voltar para o início
        </Link>
      </header>

      <div className="login-layout">
        <section className="login-presentation">
          <div>
            <p className="login-label">AO SEU LADO EM CADA CUIDADO</p>

            <h1>
              Sua rotina,
              <br />
              com mais espaço
              <br />
              para <span>você.</span>
            </h1>

            <p className="login-intro">
              Reúna informações, organize os compromissos e acompanhe
              os cuidados da sua família em um só lugar.
            </p>
          </div>

          <div className="login-benefits">
            <div className="login-benefit">
              <span className="login-icon">
                <Icon name="calendar" size={20} />
              </span>

              <div>
                <h2>Organize o que importa</h2>
                <p>Consultas, terapias e compromissos na sua agenda.</p>
              </div>
            </div>

            <div className="login-benefit">
              <span className="login-icon">
                <Icon name="care" size={20} />
              </span>

              <div>
                <h2>Acompanhe cada cuidado</h2>
                <p>Informações importantes sempre ao seu alcance.</p>
              </div>
            </div>

            <div className="login-benefit">
              <span className="login-icon">
                <Icon name="forum" size={20} />
              </span>

              <div>
                <h2>Encontre apoio</h2>
                <p>Um espaço para compartilhar e aprender.</p>
              </div>
            </div>
          </div>

          <p className="login-note">
            Um passo de cada vez, no seu tempo.
          </p>
        </section>

        <section className="login-form-area" aria-labelledby="login-title">
          <div className="login-card">
            <div className="login-card-heading">
              <p className="login-label">BEM-VINDO DE VOLTA</p>
              <h2 id="login-title">Entre no seu espaço.</h2>

              <p>
                Acesse sua conta para continuar organizando sua rotina
                no ELARA.
              </p>
            </div>

            <form
              onSubmit={fazerLogin}
              className="login-form"
              aria-busy={carregando}
            >
              <div className="login-field">
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
                  aria-describedby={erro ? "login-error" : undefined}
                />
              </div>

              <div className="login-field">
                <div className="login-field-heading">
                  <label htmlFor="senha">Senha</label>

                  <button
                    type="button"
                    className="login-text-button"
                    onClick={() =>
                      alert(
                        "A recuperação de senha será disponibilizada quando o backend estiver integrado.",
                      )
                    }
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <div className="login-password">
                  <input
                    id="senha"
                    name="senha"
                    type={mostrarSenha ? "text" : "password"}
                    required
                    value={senha}
                    onChange={(event) => {
                      setSenha(event.target.value);
                      setErro("");
                    }}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    aria-describedby={erro ? "login-error" : undefined}
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
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
              </div>

              {erro && (
                <div id="login-error" role="alert" className="login-error">
                  <strong>Não foi possível entrar</strong>
                  <p>{erro}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={carregando}
                className="login-button login-button-primary"
              >
                {carregando ? "Entrando..." : "Entrar na minha conta"}
                {!carregando && <Icon name="arrow" size={17} />}
              </button>
            </form>

            <div className="login-divider">
              <span>Novo por aqui?</span>
            </div>

            <Link
              href="/cadastro"
              className="login-button login-button-secondary"
            >
              Criar minha conta
              <Icon name="arrow" size={17} />
            </Link>

            <p className="login-card-note">
              Organização, informação e apoio para quem cuida.
            </p>
          </div>
        </section>
      </div>

      <footer className="login-footer">
        <p>
          <strong>ELARA</strong>
          <span>Ao seu lado em cada cuidado.</span>
        </p>

        <a href="mailto:elarasac@gmail.com">elarasac@gmail.com</a>
      </footer>

      <style jsx>{`
        .login-page {
          --login-bg: var(--elara-offwhite, #faf8f5);
          --login-surface: var(--elara-superficie, #ffffff);
          --login-text: var(--elara-texto, #34474e);
          --login-muted: var(--elara-texto-secundario, #687578);
          --login-border: var(--elara-borda, #e6e4df);
          --login-action: var(--elara-terracota, #d97d64);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--login-bg);
          color: var(--login-text);
          font-family: inherit;
        }

        .login-page,
        .login-page * {
          box-sizing: border-box;
        }

        .login-page :global(a) {
          text-decoration: none;
        }

        .login-page :global(a:focus-visible),
        .login-page button:focus-visible {
          outline: 3px solid var(--login-action);
          outline-offset: 4px;
        }

        .login-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 96px;
          padding: 12px max(32px, calc((100% - 1160px) / 2));
          border-bottom: 1px solid var(--login-border);
          background: var(--login-surface);
        }

        .login-header :global(.login-logo) {
          display: block;
          width: 125px;
          height: auto;
        }

        .login-header :global(.login-back) {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 44px;
          color: var(--login-muted);
          font-size: 12px;
          font-weight: 600;
        }

        .login-header :global(.login-back:hover) {
          color: var(--login-action);
        }

        .login-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 90px;
          width: min(1080px, calc(100% - 64px));
          margin: auto;
          padding-block: 64px;
          flex: 1;
        }

        .login-presentation {
          min-width: 0;
        }

        .login-label {
          margin: 0 0 16px;
          color: var(--login-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          line-height: 1.7;
        }

        .login-presentation h1 {
          margin: 0;
          font-size: clamp(38px, 4vw, 54px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.045em;
        }

        .login-presentation h1 span {
          color: var(--login-action);
        }

        .login-intro {
          max-width: 420px;
          margin: 24px 0 0;
          color: var(--login-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .login-benefits {
          margin-top: 32px;
          border-top: 1px solid var(--login-border);
        }

        .login-benefit {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-block: 19px;
          border-bottom: 1px solid var(--login-border);
        }

        .login-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border: 1px solid var(--login-border);
          border-radius: 9px;
          background: var(--login-surface);
          color: var(--login-action);
        }

        .login-benefit h2 {
          margin: 0 0 5px;
          font-size: 13px;
          font-weight: 700;
        }

        .login-benefit p {
          margin: 0;
          color: var(--login-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .login-note {
          margin: 24px 0 0;
          color: var(--login-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .login-form-area {
          min-width: 0;
        }

        .login-card {
          padding: 36px;
          border: 1px solid var(--login-border);
          border-radius: 14px;
          background: var(--login-surface);
        }

        .login-card-heading .login-label {
          margin-bottom: 12px;
        }

        .login-card-heading h2 {
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.035em;
        }

        .login-card-heading > p:last-child {
          margin: 14px 0 0;
          color: var(--login-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .login-form {
          margin-top: 30px;
        }

        .login-field + .login-field {
          margin-top: 20px;
        }

        .login-field label {
          display: block;
          color: var(--login-text);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
        }

        .login-field > label {
          margin-bottom: 9px;
        }

        .login-field-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 9px;
        }

        .login-field input {
          display: block;
          width: 100%;
          min-height: 48px;
          padding: 13px 14px;
          border: 1px solid var(--login-border);
          border-radius: 8px;
          background: var(--login-surface);
          color: var(--login-text);
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
        }

        .login-field input::placeholder {
          color: var(--login-muted);
          opacity: 0.8;
        }

        .login-field input:focus {
          outline: 2px solid var(--login-action);
          outline-offset: 2px;
          border-color: var(--login-action);
        }

        .login-text-button {
          padding: 4px 0;
          border: 0;
          background: transparent;
          color: var(--login-muted);
          font-family: inherit;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .login-text-button:hover {
          color: var(--login-action);
        }

        .login-password {
          position: relative;
        }

        .login-password input {
          padding-right: 88px;
        }

        .login-password-toggle {
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          min-height: 40px;
          padding: 0 9px;
          border: 0;
          border-radius: 5px;
          background: transparent;
          color: var(--login-muted);
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .login-password-toggle:hover {
          color: var(--login-action);
        }

        .login-button,
        .login-card :global(.login-button) {
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

        .login-button-primary {
          margin-top: 26px;
          background: var(--login-action);
          color: #fff;
        }

        .login-button-primary:hover:not(:disabled) {
          background: #c96f57;
        }

        .login-button-primary:disabled {
          cursor: wait;
          opacity: 0.65;
        }

        .login-card :global(.login-button-secondary) {
          border-color: var(--login-border);
          background: var(--login-surface);
          color: var(--login-text);
        }

        .login-card :global(.login-button-secondary:hover) {
          background: var(--login-bg);
        }

        .login-error {
          margin-top: 20px;
          padding: 14px;
          border: 1px solid #edc6bb;
          border-radius: 8px;
          background: #fff4f0;
          color: #8c3c2c;
          overflow-wrap: anywhere;
        }

        .login-error strong {
          font-size: 12px;
        }

        .login-error p {
          margin: 6px 0 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-block: 26px;
          color: var(--login-muted);
          font-size: 11px;
        }

        .login-divider::before,
        .login-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--login-border);
        }

        .login-card-note {
          margin: 24px 0 0;
          text-align: center;
          color: var(--login-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .login-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px max(32px, calc((100% - 1160px) / 2));
          border-top: 1px solid var(--login-border);
          background: var(--login-surface);
        }

        .login-footer p {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin: 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .login-footer strong {
          letter-spacing: 0.09em;
        }

        .login-footer span,
        .login-footer a {
          color: var(--login-muted);
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .login-layout {
            gap: 36px;
          }

          .login-card {
            padding: 28px;
          }

          .login-presentation h1 {
            font-size: 40px;
          }
        }

        @media (max-width: 700px) {
          .login-header {
            min-height: 80px;
            padding: 12px 20px;
            gap: 16px;
          }

          .login-header :global(.login-logo) {
            width: 105px;
          }

          .login-header :global(.login-back) {
            font-size: 11px;
          }

          .login-layout {
            grid-template-columns: 1fr;
            width: min(460px, calc(100% - 36px));
            padding-block: 36px;
            gap: 0;
          }

          .login-presentation {
            display: none;
          }

          .login-card {
            padding: 28px 24px;
          }

          .login-card-heading h2 {
            font-size: 28px;
          }

          .login-field input {
            font-size: 16px;
          }

          .login-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
            padding: 22px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-button,
          .login-card :global(.login-button) {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
