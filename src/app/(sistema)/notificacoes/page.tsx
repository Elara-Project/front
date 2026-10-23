"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";

type TipoNotificacao =
  | "agenda"
  | "cuidados"
  | "conteudo"
  | "sistema";

type Notificacao = {
  id: number;
  tipo: TipoNotificacao;
  titulo: string;
  mensagem: string;
  tempo: string;
  lida: boolean;
  href?: string;
};

type Filtro =
  | "todas"
  | "nao-lidas"
  | TipoNotificacao;

export default function NotificacoesPage() {
  const [filtro, setFiltro] =
    useState<Filtro>("todas");

  const [notificacoes, setNotificacoes] =
    useState<Notificacao[]>([
      {
        id: 1,
        tipo: "agenda",
        titulo: "Terapia ocupacional amanhã",
        mensagem:
          "Você tem Terapia ocupacional na Clínica Bem Cuidar amanhã às 14:00.",
        tempo: "Há 10 minutos",
        lida: false,
        href: "/agenda",
      },
      {
        id: 2,
        tipo: "cuidados",
        titulo: "Horário de medicamento",
        mensagem:
          "Há um medicamento registrado para este período da rotina.",
        tempo: "Há 35 minutos",
        lida: false,
        href: "/cuidados",
      },
      {
        id: 3,
        tipo: "conteudo",
        titulo: "Novo conteúdo disponível",
        mensagem:
          "Um novo artigo sobre organização de consultas e terapias está disponível.",
        tempo: "Há 2 horas",
        lida: false,
        href: "/biblioteca",
      },
      {
        id: 4,
        tipo: "sistema",
        titulo: "Bem-vindo ao ELARA",
        mensagem:
          "Seu espaço está pronto para ajudar na organização da rotina e dos cuidados.",
        tempo: "Ontem",
        lida: true,
        href: "/dashboard",
      },
      {
        id: 5,
        tipo: "agenda",
        titulo: "Consulta médica",
        mensagem:
          "Lembrete da consulta médica cadastrada na sua Agenda.",
        tempo: "Ontem",
        lida: true,
        href: "/agenda",
      },
      {
        id: 6,
        tipo: "conteudo",
        titulo: "Informação sobre direitos",
        mensagem:
          "Há conteúdos sobre inclusão escolar disponíveis para consulta.",
        tempo: "2 dias atrás",
        lida: true,
        href: "/biblioteca",
      },
    ]);

  const naoLidas = useMemo(
    () =>
      notificacoes.filter(
        (notificacao) => !notificacao.lida
      ).length,
    [notificacoes]
  );

  const notificacoesFiltradas = useMemo(() => {
    if (filtro === "todas") {
      return notificacoes;
    }

    if (filtro === "nao-lidas") {
      return notificacoes.filter(
        (notificacao) => !notificacao.lida
      );
    }

    return notificacoes.filter(
      (notificacao) =>
        notificacao.tipo === filtro
    );
  }, [filtro, notificacoes]);

  function marcarComoLida(id: number) {
    setNotificacoes((listaAtual) =>
      listaAtual.map((notificacao) =>
        notificacao.id === id
          ? {
              ...notificacao,
              lida: true,
            }
          : notificacao
      )
    );
  }

  function marcarTodasComoLidas() {
    setNotificacoes((listaAtual) =>
      listaAtual.map((notificacao) => ({
        ...notificacao,
        lida: true,
      }))
    );
  }

  function excluirNotificacao(id: number) {
    const confirmar = window.confirm(
      "Deseja excluir esta notificação?"
    );

    if (!confirmar) {
      return;
    }

    setNotificacoes((listaAtual) =>
      listaAtual.filter(
        (notificacao) =>
          notificacao.id !== id
      )
    );
  }

  function limparTodas() {
    if (notificacoes.length === 0) {
      return;
    }

    const confirmar = window.confirm(
      "Deseja limpar todas as notificações?"
    );

    if (!confirmar) {
      return;
    }

    setNotificacoes([]);
  }

  return (
    <main className="min-h-screen bg-[#F8F5F1]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-5 py-7 md:px-8 md:py-9 xl:px-10">
          <div className="mx-auto max-w-6xl">
            {/* CABEÇALHO */}

            <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#7FA2B8]">
                  Central ELARA
                </p>

                <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#2C3E44] md:text-4xl">
                  Notificações
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#738187]">
                  Acompanhe lembretes, cuidados,
                  conteúdos e avisos importantes em
                  um só lugar.
                </p>
              </div>

              {naoLidas > 0 && (
                <button
                  type="button"
                  onClick={marcarTodasComoLidas}
                  className="w-fit rounded-full border border-[#D8E3E7] bg-white px-5 py-2.5 text-xs font-extrabold text-[#668B9D] transition hover:border-[#7FA2B8] hover:bg-[#F2F7F9]"
                >
                  Marcar todas como lidas
                </button>
              )}
            </header>

            {/* RESUMO */}

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <Resumo
                valor={String(notificacoes.length)}
                titulo="Notificações"
                descricao="Total na central"
                fundo="#E7F0F4"
                cor="#668FA2"
              />

              <Resumo
                valor={String(naoLidas)}
                titulo="Não lidas"
                descricao="Precisam da sua atenção"
                fundo="#F7E4DF"
                cor="#C46A54"
              />

              <Resumo
                valor={String(
                  notificacoes.length - naoLidas
                )}
                titulo="Visualizadas"
                descricao="Já foram conferidas"
                fundo="#EDF5ED"
                cor="#6F996F"
              />
            </div>

            {/* PAINEL PRINCIPAL */}

            <div className="mt-7 rounded-[30px] border border-[#E5DFD9] bg-white">
              {/* FILTROS */}

              <div className="border-b border-[#ECE7E2] p-5 md:p-6">
                <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                  <div className="overflow-x-auto">
                    <div className="flex min-w-max gap-2">
                      <FiltroBotao
                        ativo={filtro === "todas"}
                        texto="Todas"
                        onClick={() =>
                          setFiltro("todas")
                        }
                      />

                      <FiltroBotao
                        ativo={
                          filtro === "nao-lidas"
                        }
                        texto={`Não lidas (${naoLidas})`}
                        onClick={() =>
                          setFiltro("nao-lidas")
                        }
                      />

                      <FiltroBotao
                        ativo={filtro === "agenda"}
                        texto="Agenda"
                        onClick={() =>
                          setFiltro("agenda")
                        }
                      />

                      <FiltroBotao
                        ativo={
                          filtro === "cuidados"
                        }
                        texto="Cuidados"
                        onClick={() =>
                          setFiltro("cuidados")
                        }
                      />

                      <FiltroBotao
                        ativo={
                          filtro === "conteudo"
                        }
                        texto="Conteúdos"
                        onClick={() =>
                          setFiltro("conteudo")
                        }
                      />

                      <FiltroBotao
                        ativo={
                          filtro === "sistema"
                        }
                        texto="ELARA"
                        onClick={() =>
                          setFiltro("sistema")
                        }
                      />
                    </div>
                  </div>

                  {notificacoes.length > 0 && (
                    <button
                      type="button"
                      onClick={limparTodas}
                      className="w-fit text-[11px] font-extrabold text-[#B56B59] transition hover:text-[#D97D64]"
                    >
                      Limpar notificações
                    </button>
                  )}
                </div>
              </div>

              {/* LISTA */}

              <div className="p-3 sm:p-4">
                {notificacoesFiltradas.length >
                0 ? (
                  <div className="space-y-2">
                    {notificacoesFiltradas.map(
                      (notificacao) => (
                        <NotificacaoCard
                          key={notificacao.id}
                          notificacao={
                            notificacao
                          }
                          onLer={() =>
                            marcarComoLida(
                              notificacao.id
                            )
                          }
                          onExcluir={() =>
                            excluirNotificacao(
                              notificacao.id
                            )
                          }
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#E7F0F4] text-xl font-black text-[#7FA2B8]">
                      ✓
                    </div>

                    <h2 className="mt-5 text-lg font-extrabold text-[#40545B]">
                      Tudo tranquilo por aqui
                    </h2>

                    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#839095]">
                      Não há notificações para este
                      filtro no momento.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* EXPLICAÇÃO */}

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
              <div className="rounded-[26px] bg-[#E7F0F4] p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#668FA2]">
                  Organização
                </p>

                <h2 className="mt-2 text-lg font-extrabold text-[#3F555E]">
                  Lembretes reunidos em um só lugar
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#637A84]">
                  A central poderá receber avisos
                  relacionados à Agenda, cuidados,
                  novos conteúdos e comunicações
                  importantes da plataforma.
                </p>
              </div>

              <div className="rounded-[26px] bg-[#2C3E44] p-6 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#9EC0CE]">
                  Preferências
                </p>

                <h2 className="mt-2 text-lg font-extrabold">
                  Como deseja receber avisos?
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#CDD9DD]">
                  As preferências de e-mail e push
                  poderão ser configuradas no Perfil.
                </p>

                <Link
                  href="/perfil"
                  className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2.5 text-[11px] font-extrabold transition hover:bg-white/15"
                >
                  Ir para o Perfil →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ========================================
   RESUMO
======================================== */

type ResumoProps = {
  valor: string;
  titulo: string;
  descricao: string;
  fundo: string;
  cor: string;
};

function Resumo({
  valor,
  titulo,
  descricao,
  fundo,
  cor,
}: ResumoProps) {
  return (
    <div className="rounded-[24px] border border-[#E5DFD9] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-extrabold tracking-[-0.04em] text-[#2C3E44]">
            {valor}
          </p>

          <p className="mt-1 text-xs font-extrabold text-[#52666D]">
            {titulo}
          </p>

          <p className="mt-1 text-[10px] text-[#899497]">
            {descricao}
          </p>
        </div>

        <span
          className="h-11 w-11 rounded-[15px]"
          style={{
            backgroundColor: fundo,
            border: `1px solid ${cor}20`,
          }}
        />
      </div>
    </div>
  );
}

/* ========================================
   FILTRO
======================================== */

type FiltroBotaoProps = {
  ativo: boolean;
  texto: string;
  onClick: () => void;
};

function FiltroBotao({
  ativo,
  texto,
  onClick,
}: FiltroBotaoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[11px] font-extrabold transition ${
        ativo
          ? "bg-[#2C3E44] text-white"
          : "bg-[#F5F3F0] text-[#758388] hover:bg-[#E7F0F4]"
      }`}
    >
      {texto}
    </button>
  );
}

/* ========================================
   NOTIFICAÇÃO
======================================== */

type NotificacaoCardProps = {
  notificacao: Notificacao;
  onLer: () => void;
  onExcluir: () => void;
};

function NotificacaoCard({
  notificacao,
  onLer,
  onExcluir,
}: NotificacaoCardProps) {
  const visual =
    obterVisualNotificacao(
      notificacao.tipo
    );

  return (
    <article
      className={`relative rounded-[22px] border p-4 transition sm:p-5 ${
        notificacao.lida
          ? "border-transparent bg-[#FAF9F7]"
          : "border-[#DCE8EC] bg-[#F6FAFB]"
      }`}
    >
      {!notificacao.lida && (
        <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#D97D64]" />
      )}

      <div className="flex gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] text-sm font-black"
          style={{
            backgroundColor:
              visual.fundo,
            color: visual.cor,
          }}
        >
          {visual.simbolo}
        </div>

        <div className="min-w-0 flex-1 pr-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide"
              style={{
                backgroundColor:
                  visual.fundo,
                color: visual.cor,
              }}
            >
              {visual.nome}
            </span>

            <span className="text-[9px] font-bold text-[#A0A9AC]">
              {notificacao.tempo}
            </span>
          </div>

          <h3 className="mt-3 text-sm font-extrabold text-[#40545B]">
            {notificacao.titulo}
          </h3>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-[#78868B]">
            {notificacao.mensagem}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {notificacao.href && (
              <Link
                href={notificacao.href}
                onClick={onLer}
                className="text-[11px] font-extrabold text-[#668FA2] transition hover:text-[#D97D64]"
              >
                Ver detalhes →
              </Link>
            )}

            {!notificacao.lida && (
              <button
                type="button"
                onClick={onLer}
                className="text-[11px] font-extrabold text-[#6F996F]"
              >
                Marcar como lida
              </button>
            )}

            <button
              type="button"
              onClick={onExcluir}
              className="text-[11px] font-bold text-[#A08C86] transition hover:text-[#D97D64]"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ========================================
   VISUAL DOS TIPOS
======================================== */

function obterVisualNotificacao(
  tipo: TipoNotificacao
) {
  if (tipo === "agenda") {
    return {
      nome: "Agenda",
      simbolo: "A",
      fundo: "#E7F0F4",
      cor: "#668FA2",
    };
  }

  if (tipo === "cuidados") {
    return {
      nome: "Cuidados",
      simbolo: "+",
      fundo: "#EDF5ED",
      cor: "#6F996F",
    };
  }

  if (tipo === "conteudo") {
    return {
      nome: "Conteúdo",
      simbolo: "C",
      fundo: "#F7E4DF",
      cor: "#C46A54",
    };
  }

  return {
    nome: "ELARA",
    simbolo: "E",
    fundo: "#EEEAF6",
    cor: "#786B99",
  };
}