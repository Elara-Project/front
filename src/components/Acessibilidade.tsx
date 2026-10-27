
"use client";

import { useEffect, useRef, useState } from "react";

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

const EVENTO_ABRIR = "abrir-acessibilidade";

export default function Acessibilidade() {
  const [aberto, setAberto] = useState(false);

  const [preferencias, setPreferencias] =
    useState<Preferencias>(preferenciasPadrao);

  const [carregado, setCarregado] = useState(false);

  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const focoAnteriorRef = useRef<HTMLElement | null>(null);

  // Carregar preferências do navegador.
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(
        "elara_acessibilidade"
      );

      if (salvo) {
        const dados = JSON.parse(salvo);

        setPreferencias({
          ...preferenciasPadrao,
          ...dados,
        });
      }
    } catch {
      setPreferencias(preferenciasPadrao);
    }

    setCarregado(true);
  }, []);

  // Escutar o botão de acessibilidade do Sidebar.
  useEffect(() => {
    function abrirPainel() {
      focoAnteriorRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      setAberto(true);
    }

    window.addEventListener(EVENTO_ABRIR, abrirPainel);

    return () => {
      window.removeEventListener(
        EVENTO_ABRIR,
        abrirPainel
      );
    };
  }, []);

  // Aplicar configurações ao site.
  useEffect(() => {
    if (!carregado) return;

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

  // Controle de teclado e foco do painel.
  useEffect(() => {
    if (!aberto) return;

    function aoPressionarTecla(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAberto(false);
      }

      if (event.key === "Tab") {
        const painel = document.getElementById(
          "painel-acessibilidade"
        );

        if (!painel) return;

        const elementos = Array.from(
          painel.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
          )
        );

        if (elementos.length === 0) return;

        const primeiro = elementos[0];
        const ultimo = elementos[elementos.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === primeiro
        ) {
          event.preventDefault();
          ultimo.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === ultimo
        ) {
          event.preventDefault();
          primeiro.focus();
        }
      }
    }

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    botaoFecharRef.current?.focus();

    window.addEventListener("keydown", aoPressionarTecla);

    return () => {
      window.removeEventListener(
        "keydown",
        aoPressionarTecla
      );

      document.body.style.overflow = overflowAnterior;
      focoAnteriorRef.current?.focus();
    };
  }, [aberto]);

  function alterarPreferencia(
    chave:
      | "temaEscuro"
      | "altoContraste"
      | "reduzirAnimacoes"
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
    setPreferencias({ ...preferenciasPadrao });
  }

  return (
    <>
      {aberto && (
        <>
          {/* FUNDO ESCURECIDO */}

          <button
            type="button"
            aria-label="Fechar configurações de acessibilidade"
            onClick={() => setAberto(false)}
            className="fixed inset-0 z-[80] bg-black/40"
          />

          {/* PAINEL DE ACESSIBILIDADE */}

          <section
            id="painel-acessibilidade"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-acessibilidade"
            className="fixed bottom-0 right-0 top-0 z-[90] w-full max-w-sm overflow-y-auto border-l border-[var(--elara-borda)] bg-[var(--elara-superficie)] p-6 text-[var(--elara-texto)] shadow-2xl"
          >
            {/* CABEÇALHO */}

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--elara-azul-texto)]">
                  ELARA
                </p>

                <h2
                  id="titulo-acessibilidade"
                  className="mt-1 text-2xl font-extrabold text-[var(--elara-texto)]"
                >
                  Acessibilidade
                </h2>
              </div>

              <button
                ref={botaoFecharRef}
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar painel de acessibilidade"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-[var(--elara-texto)] transition hover:bg-[var(--elara-superficie-hover)]"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--elara-texto-secundario)]">
              Ajuste a aparência do ELARA de acordo
              com suas necessidades.
            </p>

            {/* CONFIGURAÇÕES */}

            <div className="mt-8 flex flex-col gap-4">
              <Opcao
                titulo="Modo escuro"
                descricao="Altera o sistema para uma aparência escura."
                ativo={preferencias.temaEscuro}
                onClick={() =>
                  alterarPreferencia("temaEscuro")
                }
              />

              <Opcao
                titulo="Alto contraste"
                descricao="Reforça o contraste dos textos, fundos e bordas sem mudar o tema escolhido."
                ativo={preferencias.altoContraste}
                onClick={() =>
                  alterarPreferencia("altoContraste")
                }
              />

              {/* TAMANHO DA FONTE */}

              <div className="rounded-2xl border border-[var(--elara-borda)] bg-[var(--elara-superficie)] p-4">
                <p className="font-bold text-[var(--elara-texto)]">
                  Tamanho da fonte
                </p>

                <p className="mt-1 text-sm text-[var(--elara-texto-secundario)]">
                  Escolha o tamanho dos textos do sistema.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {(
                    [
                      { nivel: "pequena", texto: "A−" },
                      { nivel: "normal", texto: "A" },
                      { nivel: "grande", texto: "A+" },
                    ] as const
                  ).map(({ nivel, texto }) => {
                    const selecionado =
                      preferencias.nivelFonte === nivel;

                    return (
                      <button
                        key={nivel}
                        type="button"
                        onClick={() => alterarFonte(nivel)}
                        aria-pressed={selecionado}
                        aria-label={`Fonte ${nivel}`}
                        className={`rounded-xl border px-3 py-3 font-bold transition ${
                          selecionado
                            ? "border-[var(--elara-azul)] bg-[var(--elara-azul)] text-white"
                            : "border-[var(--elara-borda)] bg-[var(--elara-superficie)] text-[var(--elara-texto)] hover:bg-[var(--elara-superficie-hover)]"
                        }`}
                      >
                        {texto}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Opcao
                titulo="Reduzir animações"
                descricao="Reduz movimentos e transições da interface."
                ativo={preferencias.reduzirAnimacoes}
                onClick={() =>
                  alterarPreferencia("reduzirAnimacoes")
                }
              />
            </div>

            {/* RESTAURAR PADRÃO */}

            <button
              type="button"
              onClick={restaurarPadrao}
              className="mt-8 w-full rounded-xl border border-[var(--elara-terracota)] px-4 py-3 font-bold text-[var(--elara-terracota-texto)] transition hover:bg-[var(--elara-terracota-suave)]"
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
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[var(--elara-borda)] bg-[var(--elara-superficie)] p-4 text-left transition hover:bg-[var(--elara-superficie-hover)]"
    >
      <div>
        <p className="font-bold text-[var(--elara-texto)]">
          {titulo}
        </p>

        <p className="mt-1 text-sm text-[var(--elara-texto-secundario)]">
          {descricao}
        </p>
      </div>

      <div
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          ativo
            ? "bg-[var(--elara-verde)]"
            : "bg-[var(--elara-borda-forte)]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
            ativo ? "left-6" : "left-1"
          }`}
        />
      </div>
    </button>
  );
}
