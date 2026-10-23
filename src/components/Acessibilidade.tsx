"use client";

import { useEffect, useState } from "react";

type NivelFonte = "pequena" | "normal" | "grande";

type Preferencias = {
  temaEscuro: boolean;
  altoContraste: boolean;
  nivelFonte: NivelFonte;
  reduzirAnimacoes: boolean;
};

const preferenciasPadrao: Preferencias = {
  temaEscuro: false,
  altoContraste: false,
  nivelFonte: "normal",
  reduzirAnimacoes: false,
};

export default function Acessibilidade() {
  const [aberto, setAberto] = useState(false);

  const [preferencias, setPreferencias] =
    useState<Preferencias>(preferenciasPadrao);

  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem("elara_acessibilidade");

    if (salvo) {
      try {
        const dados = JSON.parse(salvo);

        setPreferencias({
          ...preferenciasPadrao,
          ...dados,
        });
      } catch {
        setPreferencias(preferenciasPadrao);
      }
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) {
      return;
    }

    const html = document.documentElement;

    html.classList.toggle(
      "tema-escuro",
      preferencias.temaEscuro
    );

    html.classList.toggle(
      "alto-contraste",
      preferencias.altoContraste
    );

    html.classList.toggle(
      "reduzir-animacoes",
      preferencias.reduzirAnimacoes
    );

    html.classList.remove(
      "fonte-pequena",
      "fonte-normal",
      "fonte-grande"
    );

    html.classList.add(
      `fonte-${preferencias.nivelFonte}`
    );

    localStorage.setItem(
      "elara_acessibilidade",
      JSON.stringify(preferencias)
    );
  }, [preferencias, carregado]);

  function alterarPreferencia(
    chave: "temaEscuro" | "altoContraste" | "reduzirAnimacoes"
  ) {
    setPreferencias((anterior) => ({
      ...anterior,
      [chave]: !anterior[chave],
    }));
  }

  function alterarFonte(nivel: NivelFonte) {
    setPreferencias((anterior) => ({
      ...anterior,
      nivelFonte: nivel,
    }));
  }

  function restaurarPadrao() {
    setPreferencias(preferenciasPadrao);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Abrir configurações de acessibilidade"
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--elara-azul)] text-2xl text-white shadow-lg transition hover:scale-105"
      >
        ♿
      </button>

      {aberto && (
        <>
          <button
            type="button"
            aria-label="Fechar configurações de acessibilidade"
            onClick={() => setAberto(false)}
            className="fixed inset-0 z-[80] bg-black/30"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-acessibilidade"
            className="fixed bottom-0 right-0 top-0 z-[90] w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--elara-azul)]">
                  ELARA
                </p>

                <h2
                  id="titulo-acessibilidade"
                  className="mt-1 text-2xl font-bold text-[var(--elara-grafite)]"
                >
                  Acessibilidade
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-bold hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Ajuste a aparência do ELARA de acordo com suas necessidades.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <Opcao
                titulo="Modo escuro"
                descricao="Deixa o fundo do sistema mais escuro."
                ativo={preferencias.temaEscuro}
                onClick={() =>
                  alterarPreferencia("temaEscuro")
                }
              />

              <Opcao
                titulo="Alto contraste"
                descricao="Aumenta o contraste entre textos e fundos."
                ativo={preferencias.altoContraste}
                onClick={() =>
                  alterarPreferencia("altoContraste")
                }
              />

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="font-bold text-[var(--elara-grafite)]">
                  Tamanho da fonte
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Escolha o tamanho dos textos do sistema.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => alterarFonte("pequena")}
                    aria-pressed={
                      preferencias.nivelFonte === "pequena"
                    }
                    className={`rounded-xl border px-3 py-3 font-bold transition ${
                      preferencias.nivelFonte === "pequena"
                        ? "border-[var(--elara-azul)] bg-[var(--elara-azul)] text-white"
                        : "border-gray-300 text-[var(--elara-grafite)]"
                    }`}
                  >
                    A−
                  </button>

                  <button
                    type="button"
                    onClick={() => alterarFonte("normal")}
                    aria-pressed={
                      preferencias.nivelFonte === "normal"
                    }
                    className={`rounded-xl border px-3 py-3 font-bold transition ${
                      preferencias.nivelFonte === "normal"
                        ? "border-[var(--elara-azul)] bg-[var(--elara-azul)] text-white"
                        : "border-gray-300 text-[var(--elara-grafite)]"
                    }`}
                  >
                    A
                  </button>

                  <button
                    type="button"
                    onClick={() => alterarFonte("grande")}
                    aria-pressed={
                      preferencias.nivelFonte === "grande"
                    }
                    className={`rounded-xl border px-3 py-3 font-bold transition ${
                      preferencias.nivelFonte === "grande"
                        ? "border-[var(--elara-azul)] bg-[var(--elara-azul)] text-white"
                        : "border-gray-300 text-[var(--elara-grafite)]"
                    }`}
                  >
                    A+
                  </button>
                </div>
              </div>

              <Opcao
                titulo="Reduzir animações"
                descricao="Diminui movimentos e transições da interface."
                ativo={preferencias.reduzirAnimacoes}
                onClick={() =>
                  alterarPreferencia("reduzirAnimacoes")
                }
              />
            </div>

            <button
              type="button"
              onClick={restaurarPadrao}
              className="mt-8 w-full rounded-xl border border-[var(--elara-terracota)] px-4 py-3 font-bold text-[var(--elara-terracota)] transition hover:bg-[var(--elara-terracota)] hover:text-white"
            >
              Restaurar padrão
            </button>
          </section>
        </>
      )}
    </>
  );
}

type OpcaoProps = {
  titulo: string;
  descricao: string;
  ativo: boolean;
  onClick: () => void;
};

function Opcao({
  titulo,
  descricao,
  ativo,
  onClick,
}: OpcaoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-200 p-4 text-left transition hover:bg-gray-50"
    >
      <div>
        <p className="font-bold text-[var(--elara-grafite)]">
          {titulo}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          {descricao}
        </p>
      </div>

      <div
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          ativo
            ? "bg-[var(--elara-verde)]"
            : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            ativo ? "left-6" : "left-1"
          }`}
        />
      </div>
    </button>
  );
}