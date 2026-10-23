"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Usuario = {
  nome?: string;
};

export default function DashboardPage() {
  const [nome, setNome] = useState("Isabella");

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("elara_usuario");

    if (!usuarioSalvo) return;

    try {
      const usuario: Usuario = JSON.parse(usuarioSalvo);

      if (usuario.nome) {
        const primeiroNome = usuario.nome.trim().split(" ")[0];

        setNome(
          primeiroNome.charAt(0).toUpperCase() +
            primeiroNome.slice(1).toLowerCase()
        );
      }
    } catch {
      // Mantém o nome padrão.
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--elara-fundo)] text-[var(--elara-texto)] md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 pt-[68px] md:pt-0">
        <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-7 lg:px-10 lg:py-10">
          {/* CABEÇALHO */}

          <header className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-sm font-bold text-[var(--elara-azul)]">
                Meu espaço
              </p>

              <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Bom dia, {nome}
                <span className="ml-2 text-[var(--elara-terracota)]">
                  ♡
                </span>
              </h1>

              <p className="mt-2 text-sm text-[var(--elara-texto-secundario)]">
                Vamos organizar os cuidados e compromissos de hoje.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-[var(--elara-borda)] bg-[var(--elara-superficie)] px-4 py-2 text-xs font-bold text-[var(--elara-texto-secundario)]">
                23 de setembro
              </div>

              <Link
                href="/notificacoes"
                aria-label="Abrir notificações"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--elara-borda)] bg-[var(--elara-superficie)] text-lg text-[var(--elara-texto)]"
              >
                ♧

                <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-[var(--elara-superficie)] bg-[var(--elara-terracota)]" />
              </Link>
            </div>
          </header>

          {/* DESTAQUES */}

          <section className="grid gap-5 xl:grid-cols-[1.55fr_0.72fr_0.72fr]">
            {/* PRÓXIMO COMPROMISSO */}

            <article className="relative min-h-[280px] overflow-hidden rounded-[32px] border border-[var(--elara-borda)] bg-[var(--elara-terracota-suave)] p-7 sm:p-8">
              <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" />

              <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full border-[28px] border-white/10" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--elara-terracota)]" />

                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--elara-terracota-texto)]">
                      Próximo compromisso
                    </p>
                  </div>

                  <h2 className="mt-7 text-3xl font-extrabold tracking-[-0.04em] text-[var(--elara-texto)]">
                    Terapia ocupacional
                  </h2>

                  <p className="mt-3 text-sm font-semibold text-[var(--elara-texto-secundario)]">
                    Clínica Vida
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[var(--elara-texto-secundario)]">
                      Hoje
                    </p>

                    <p className="text-2xl font-extrabold text-[var(--elara-terracota-texto)]">
                      14:00
                    </p>
                  </div>

                  <Link
                    href="/agenda"
                    className="rounded-full bg-[var(--elara-terracota)] px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90"
                  >
                    Ver compromisso →
                  </Link>
                </div>
              </div>
            </article>

            {/* MEDICAMENTOS */}

            <Link
              href="/cuidados"
              className="group min-h-[280px] rounded-[32px] border border-[var(--elara-borda)] bg-[var(--elara-verde-suave)] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--elara-superficie)] text-xl text-[var(--elara-verde-texto)]">
                    ✚
                  </span>

                  <span className="text-[var(--elara-verde-texto)] transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <div>
                  <p className="text-5xl font-black tracking-[-0.06em] text-[var(--elara-verde-texto)]">
                    2
                  </p>

                  <h3 className="mt-2 text-lg font-extrabold text-[var(--elara-texto)]">
                    medicamentos
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[var(--elara-texto-secundario)]">
                    Próximo horário às 20:00.
                  </p>
                </div>
              </div>
            </Link>

            {/* LEMBRETES */}

            <Link
              href="/notificacoes"
              className="min-h-[280px] rounded-[32px] border border-[var(--elara-borda)] bg-[var(--elara-azul-suave)] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--elara-superficie)] text-xl text-[var(--elara-azul-texto)]">
                    ♧
                  </span>

                  <span className="rounded-full bg-[var(--elara-superficie)] px-3 py-1 text-[10px] font-extrabold text-[var(--elara-azul-texto)]">
                    NOVOS
                  </span>
                </div>

                <div>
                  <p className="text-5xl font-black tracking-[-0.06em] text-[var(--elara-azul-texto)]">
                    3
                  </p>

                  <h3 className="mt-2 text-lg font-extrabold text-[var(--elara-texto)]">
                    lembretes
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[var(--elara-texto-secundario)]">
                    Novidades importantes para hoje.
                  </p>
                </div>
              </div>
            </Link>
          </section>

          {/* CONTEÚDO CENTRAL */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            {/* ROTINA */}

            <article className="rounded-[30px] border border-[var(--elara-borda)] bg-[var(--elara-superficie)] p-6 shadow-[0_10px_40px_rgba(44,62,68,0.04)] sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--elara-azul)]">
                    Rotina de hoje
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    Seus cuidados
                  </h2>
                </div>

                <Link
                  href="/agenda"
                  className="text-xs font-extrabold text-[var(--elara-terracota)]"
                >
                  Ver tudo →
                </Link>
              </div>

              <div className="space-y-3">
                <ItemRotina
                  horario="08:00"
                  titulo="Medicamento"
                  descricao="5 ml • Após o café"
                  etiqueta="Cuidado"
                  cor="verde"
                />

                <ItemRotina
                  horario="14:00"
                  titulo="Terapia ocupacional"
                  descricao="Clínica Vida"
                  etiqueta="Terapia"
                  cor="terracota"
                />

                <ItemRotina
                  horario="17:30"
                  titulo="Fonoaudiologia"
                  descricao="Espaço Acolher"
                  etiqueta="Consulta"
                  cor="azul"
                />
              </div>

              <Link
                href="/agenda"
                className="mt-5 flex w-full items-center justify-center rounded-[17px] border border-dashed border-[var(--elara-borda-forte)] py-3 text-xs font-extrabold text-[var(--elara-texto-secundario)] transition hover:border-[var(--elara-terracota)] hover:text-[var(--elara-terracota)]"
              >
                + Adicionar à rotina
              </Link>
            </article>

            {/* CALENDÁRIO */}

            <article className="rounded-[30px] border border-[var(--elara-borda)] bg-[var(--elara-azul-suave)] p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--elara-azul)]">
                    Minha agenda
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    Setembro
                  </h2>
                </div>

                <span className="rounded-full bg-[var(--elara-superficie)] px-3 py-1.5 text-xs font-extrabold text-[var(--elara-azul-texto)]">
                  2026
                </span>
              </div>

              <div className="mt-7 grid grid-cols-7 gap-2 text-center">
                {["D", "S", "T", "Q", "Q", "S", "S"].map(
                  (dia, indice) => (
                    <div
                      key={`${dia}-${indice}`}
                      className="text-[10px] font-extrabold text-[var(--elara-texto-suave)]"
                    >
                      {dia}
                    </div>
                  )
                )}

                {[
                  "",
                  "",
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                  26,
                  27,
                  28,
                  29,
                  30,
                ].map((dia, indice) => (
                  <div
                    key={indice}
                    className="flex h-9 items-center justify-center"
                  >
                    {dia && (
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          dia === 23
                            ? "bg-[var(--elara-azul)] text-white shadow-md"
                            : dia === 10 ||
                                dia === 12 ||
                                dia === 15
                              ? "bg-[var(--elara-superficie)] text-[var(--elara-terracota)]"
                              : "text-[var(--elara-texto-secundario)]"
                        }`}
                      >
                        {dia}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[20px] bg-[var(--elara-superficie)] p-4">
                <div className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--elara-terracota)]" />

                  <div>
                    <p className="text-xs font-extrabold">
                      Próximo: Terapia ocupacional
                    </p>

                    <p className="mt-1 text-[11px] text-[var(--elara-texto-secundario)]">
                      Hoje às 14:00
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/agenda"
                className="mt-4 block text-center text-xs font-extrabold text-[var(--elara-azul-texto)]"
              >
                Abrir agenda completa →
              </Link>
            </article>
          </section>

          {/* PARA VOCÊ */}

          <section className="mt-9">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[var(--elara-terracota)]">
                  Informação também é cuidado
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">
                  Para você
                </h2>
              </div>

              <Link
                href="/biblioteca"
                className="text-xs font-extrabold text-[var(--elara-azul-texto)]"
              >
                Ver conteúdos →
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/biblioteca"
                className="group rounded-[26px] border border-[var(--elara-borda)] bg-[var(--elara-terracota-suave)] p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="rounded-full bg-[var(--elara-superficie)] px-3 py-1 text-[10px] font-extrabold text-[var(--elara-terracota-texto)]">
                  ORIENTAÇÃO
                </span>

                <h3 className="mt-7 text-lg font-extrabold">
                  Uma rotina mais tranquila
                </h3>

                <p className="mt-2 text-xs leading-5 text-[var(--elara-texto-secundario)]">
                  Estratégias simples para organizar melhor os cuidados durante
                  o dia.
                </p>

                <p className="mt-5 text-sm font-extrabold text-[var(--elara-terracota-texto)]">
                  Ler conteúdo →
                </p>
              </Link>

              <Link
                href="/biblioteca?aba=direitos"
                className="group rounded-[26px] border border-[var(--elara-borda)] bg-[var(--elara-azul-suave)] p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="rounded-full bg-[var(--elara-superficie)] px-3 py-1 text-[10px] font-extrabold text-[var(--elara-azul-texto)]">
                  DIREITOS
                </span>

                <h3 className="mt-7 text-lg font-extrabold">
                  Informação para sua família
                </h3>

                <p className="mt-2 text-xs leading-5 text-[var(--elara-texto-secundario)]">
                  Consulte informações sobre direitos, benefícios e inclusão.
                </p>

                <p className="mt-5 text-sm font-extrabold text-[var(--elara-azul-texto)]">
                  Conhecer direitos →
                </p>
              </Link>

              <Link
                href="/forum"
                className="group rounded-[26px] border border-[var(--elara-borda)] bg-[var(--elara-verde-suave)] p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="rounded-full bg-[var(--elara-superficie)] px-3 py-1 text-[10px] font-extrabold text-[var(--elara-verde-texto)]">
                  COMUNIDADE
                </span>

                <h3 className="mt-7 text-lg font-extrabold">
                  Você não precisa cuidar sozinho
                </h3>

                <p className="mt-2 text-xs leading-5 text-[var(--elara-texto-secundario)]">
                  Compartilhe experiências e converse com outros responsáveis.
                </p>

                <p className="mt-5 text-sm font-extrabold text-[var(--elara-verde-texto)]">
                  Acessar fórum →
                </p>
              </Link>
            </div>
          </section>

          {/* RODAPÉ VISUAL */}

          <section className="relative mt-9 overflow-hidden rounded-[30px] bg-[var(--elara-texto)] p-7 text-[var(--elara-superficie)] sm:p-8">
            <div className="absolute -right-14 -top-16 h-52 w-52 rounded-full border-[32px] border-white/5" />

            <div className="relative max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--elara-azul)]">
                ELARA
              </p>

              <h2 className="mt-3 text-xl font-extrabold leading-8 sm:text-2xl">
                Um espaço para organizar a rotina e acolher quem cuida.
              </h2>

              <p className="mt-2 text-sm opacity-80">
                Cuidando de quem cuida.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ========================================
   ITEM DA ROTINA
======================================== */

type CorRotina = "verde" | "terracota" | "azul";

type ItemRotinaProps = {
  horario: string;
  titulo: string;
  descricao: string;
  etiqueta: string;
  cor: CorRotina;
};

function ItemRotina({
  horario,
  titulo,
  descricao,
  etiqueta,
  cor,
}: ItemRotinaProps) {
  function cores() {
    if (cor === "verde") {
      return {
        principal: "var(--elara-verde)",
        fundo: "var(--elara-verde-suave)",
        texto: "var(--elara-verde-texto)",
      };
    }

    if (cor === "azul") {
      return {
        principal: "var(--elara-azul)",
        fundo: "var(--elara-azul-suave)",
        texto: "var(--elara-azul-texto)",
      };
    }

    return {
      principal: "var(--elara-terracota)",
      fundo: "var(--elara-terracota-suave)",
      texto: "var(--elara-terracota-texto)",
    };
  }

  const visual = cores();

  return (
    <div className="flex items-center gap-4 rounded-[20px] bg-[var(--elara-superficie-secundaria)] p-4">
      <div className="w-14 text-center">
        <p className="text-xs font-extrabold text-[var(--elara-texto-secundario)]">
          {horario}
        </p>
      </div>

      <div
        className="h-10 w-1 rounded-full"
        style={{
          backgroundColor: visual.principal,
        }}
      />

      <div className="min-w-0 flex-1">
        <p className="font-extrabold text-[var(--elara-texto)]">
          {titulo}
        </p>

        <p className="mt-1 text-xs text-[var(--elara-texto-suave)]">
          {descricao}
        </p>
      </div>

      <span
        className="rounded-full px-3 py-1 text-[10px] font-bold"
        style={{
          backgroundColor: visual.fundo,
          color: visual.texto,
        }}
      >
        {etiqueta}
      </span>
    </div>
  );
}