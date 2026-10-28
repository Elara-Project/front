
"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type TipoUsuario = "responsavel" | "admin" | "anunciante";

type UsuarioAPI = {
  id?: string | number;
  nome?: string;
  email?: string;
  tipo?: TipoUsuario;
};

type RespostaLogin = {
  usuario?: UsuarioAPI;
  user?: UsuarioAPI;
  access_token?: string;
  accessToken?: string;
  message?: string | string[];
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001"
).replace(/\/$/, "");

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
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
      const resposta = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: emailLimpo,
          senha,
        }),
      });

      const dados: RespostaLogin = await resposta
        .json()
        .catch(() => ({}));

      if (!resposta.ok) {
        const mensagem = dados.message;

        if (resposta.status === 401) {
          throw new Error("E-mail ou senha incorretos.");
        }

        if (Array.isArray(mensagem)) {
          throw new Error(mensagem.join(" "));
        }

        throw new Error(
          mensagem || "Não foi possível entrar na sua conta."
        );
      }

      const usuario = dados.usuario ?? dados.user;

      if (!usuario) {
        throw new Error(
          "A API respondeu, mas não retornou os dados do usuário."
        );
      }

      // Armazena somente dados de exibição.
      // A autenticação deve ser mantida pelo backend,
      // preferencialmente com cookie HttpOnly seguro.
      localStorage.setItem(
        "elara_usuario",
        JSON.stringify({
          id: usuario.id,
          nome: usuario.nome || "Meu perfil",
          email: usuario.email || emailLimpo,
          tipo: usuario.tipo || "responsavel",
        })
      );

      const tipo = usuario.tipo || "responsavel";

      if (tipo === "admin") {
        router.replace("/admin");
      } else if (tipo === "anunciante") {
        router.replace("/anunciante");
      } else {
        router.replace("/dashboard");
      }

      router.refresh();
    } catch (error) {
      if (error instanceof TypeError) {
        setErro(
          "Não foi possível conectar ao servidor. Verifique se a API está funcionando."
        );
      } else {
        setErro(
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao entrar."
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#2C3E44] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* LADO VISUAL */}

      <section className="relative hidden min-h-screen overflow-hidden bg-[#E7F0F4] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/40" />

        <div className="pointer-events-none absolute -bottom-32 -right-24 h-[430px] w-[430px] rounded-full border-[70px] border-white/30" />

        <div className="pointer-events-none absolute right-[12%] top-[22%] h-28 w-28 rounded-full bg-[#F3D8D0]/70" />

        {/* LOGO DESKTOP */}

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo-elara.png"
              alt="ELARA - Cuidando de Quem Cuida"
              width={180}
              height={100}
              priority
              className="h-auto w-[160px] object-contain"
            />
          </Link>
        </div>

        {/* APRESENTAÇÃO */}

        <div className="relative z-10 max-w-xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D97D64]" />

            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#678B9C]">
              Seu espaço de cuidado
            </p>
          </div>

          <h1 className="max-w-lg text-5xl font-extrabold leading-[1.08] tracking-[-0.055em] text-[#34474E] xl:text-6xl">
            Organizar também é uma forma de{" "}
            <span className="text-[#D97D64]">
              cuidar.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#637980]">
            Reúna informações importantes, compromissos,
            cuidados e conteúdos para tornar a rotina da sua
            família mais organizada.
          </p>

          {/* MINI CARDS */}

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            <div className="rounded-[22px] border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F7E4DF] text-[#C46852]">
                ◷
              </span>

              <p className="mt-4 text-xs font-extrabold text-[#4F656D]">
                Rotina
              </p>
            </div>

            <div className="rounded-[22px] border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#EDF5ED] text-[#6B986B]">
                ♡
              </span>

              <p className="mt-4 text-xs font-extrabold text-[#4F656D]">
                Cuidados
              </p>
            </div>

            <div className="rounded-[22px] border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#E7F0F4] text-[#678FA2]">
                ▤
              </span>

              <p className="mt-4 text-xs font-extrabold text-[#4F656D]">
                Conteúdos
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs font-semibold text-[#789099]">
            ELARA • Informação, organização e acolhimento.
          </p>
        </div>
      </section>

      {/* ÁREA DE LOGIN */}

      <section className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:bg-[#FDFBF7] lg:px-12">
        {/* LOGO MOBILE */}

        <Link
          href="/"
          className="absolute left-5 top-5 flex items-center lg:hidden"
        >
          <Image
            src="/logo-elara.png"
            alt="ELARA - Página inicial"
            width={145}
            height={80}
            priority
            className="h-auto w-[125px] object-contain"
          />
        </Link>

        <div className="w-full max-w-[460px] pt-16 lg:pt-0">
          {/* CABEÇALHO */}

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7FA2B8]">
              Bem-vindo de volta
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Entre no seu espaço
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#718187]">
              Acesse sua conta para continuar organizando
              sua rotina no ELARA.
            </p>
          </div>

          {/* FORMULÁRIO */}

          <form
            onSubmit={fazerLogin}
            className="mt-8"
          >
            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-extrabold text-[#465B62]"
              >
                E-mail
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8DA0A7]">
                  @
                </span>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErro("");
                  }}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  className="w-full rounded-[17px] border border-[#DED8D2] bg-white py-3.5 pl-11 pr-4 text-sm font-semibold outline-none transition placeholder:font-normal placeholder:text-[#A6AFB2] focus:border-[#7FA2B8] focus:ring-4 focus:ring-[#7FA2B8]/10"
                />
              </div>
            </div>

            {/* SENHA */}

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="senha"
                  className="text-sm font-extrabold text-[#465B62]"
                >
                  Senha
                </label>

                <button
                  type="button"
                  className="text-xs font-extrabold text-[#7FA2B8] transition hover:text-[#D97D64]"
                  onClick={() =>
                    alert(
                      "A recuperação de senha será disponibilizada quando o backend estiver integrado."
                    )
                  }
                >
                  Esqueci minha senha
                </button>
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8DA0A7]">
                  ●
                </span>

                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  required
                  value={senha}
                  onChange={(event) => {
                    setSenha(event.target.value);
                    setErro("");
                  }}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full rounded-[17px] border border-[#DED8D2] bg-white py-3.5 pl-11 pr-20 text-sm font-semibold outline-none transition placeholder:font-normal placeholder:text-[#A6AFB2] focus:border-[#7FA2B8] focus:ring-4 focus:ring-[#7FA2B8]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarSenha((estado) => !estado)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-extrabold text-[#71858D] transition hover:text-[#D97D64]"
                  aria-label={
                    mostrarSenha
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {mostrarSenha ? "OCULTAR" : "MOSTRAR"}
                </button>
              </div>
            </div>

            {/* MENSAGEM DE ERRO */}

            {erro && (
              <div
                role="alert"
                className="mt-5 flex gap-3 rounded-[18px] border border-[#F1D0C7] bg-[#FFF4F1] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F7E4DF] text-xs font-black text-[#C66650]">
                  !
                </span>

                <div>
                  <p className="text-xs font-extrabold text-[#B95F49]">
                    Não foi possível entrar
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#876F69]">
                    {erro}
                  </p>
                </div>
              </div>
            )}

            {/* BOTÃO ENTRAR */}

            <button
              type="submit"
              disabled={carregando}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-[#D97D64] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_25px_rgba(217,125,100,0.22)] transition hover:-translate-y-0.5 hover:bg-[#CA7059] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando
                ? "Entrando..."
                : "Entrar na minha conta →"}
            </button>
          </form>

          {/* DIVISOR */}

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E8E2DC]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#A0AAAD]">
              Novo por aqui?
            </span>

            <div className="h-px flex-1 bg-[#E8E2DC]" />
          </div>

          {/* CADASTRO */}

          <Link
            href="/cadastro"
            className="flex w-full items-center justify-center rounded-full border border-[#D7E3E8] bg-[#F5F9FA] px-6 py-3.5 text-sm font-extrabold text-[#668B9D] transition hover:border-[#7FA2B8] hover:bg-[#E7F0F4]"
          >
            Criar minha conta
          </Link>

          {/* VOLTAR AO INÍCIO */}

          <div className="mt-7 text-center">
            <Link
              href="/"
              className="inline-block rounded-lg px-3 py-2 text-xs font-bold text-[#89969A] transition hover:text-[#D97D64]"
            >
              ← Voltar para o início
            </Link>
          </div>

          {/* INFORMAÇÕES */}

          <div className="mt-8 rounded-[18px] border border-[#DCE8DC] bg-[#F3F8F3] p-4">
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-white text-xs font-black text-[#719971]">
                ✓
              </span>

              <div>
                <p className="text-xs font-extrabold text-[#587258]">
                  Seu espaço no ELARA
                </p>

                <p className="mt-1 text-[11px] leading-5 text-[#748576]">
                  A autenticação será realizada pela API do
                  ELARA. Nenhuma senha será validada ou
                  armazenada no navegador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
