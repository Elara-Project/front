"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Medicamento = {
  id: number;
  nome: string;
  dose: string;
  horario: string;
  frequencia: string;
  observacoes: string;
};

type Refeicao = {
  id: number;
  nome: string;
  tipo: string;
  horario: string;
  descricao: string;
  observacoes: string;
};

const tiposRefeicao = [
  "Café da manhã",
  "Lanche da manhã",
  "Almoço",
  "Lanche da tarde",
  "Jantar",
  "Ceia",
  "Outro",
];

export default function CuidadosPage() {
  /* ======================================================
     MEDICAMENTOS
  ====================================================== */

  const [formularioMedicamentoAberto, setFormularioMedicamentoAberto] =
    useState(false);

  const [idMedicamentoEditando, setIdMedicamentoEditando] = useState<
    number | null
  >(null);

  const [nomeMedicamento, setNomeMedicamento] = useState("");
  const [doseMedicamento, setDoseMedicamento] = useState("");
  const [horarioMedicamento, setHorarioMedicamento] = useState("");
  const [frequenciaMedicamento, setFrequenciaMedicamento] =
    useState("Todos os dias");
  const [observacoesMedicamento, setObservacoesMedicamento] =
    useState("");

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    {
      id: 1,
      nome: "Medicamento exemplo",
      dose: "5 ml",
      horario: "08:00",
      frequencia: "Todos os dias",
      observacoes: "Administrar após o café da manhã.",
    },
    {
      id: 2,
      nome: "Medicamento noturno",
      dose: "1 comprimido",
      horario: "20:00",
      frequencia: "Todos os dias",
      observacoes: "",
    },
  ]);

  /* ======================================================
     ALIMENTAÇÃO
  ====================================================== */

  const [formularioRefeicaoAberto, setFormularioRefeicaoAberto] =
    useState(false);

  const [idRefeicaoEditando, setIdRefeicaoEditando] = useState<
    number | null
  >(null);

  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [tipoRefeicao, setTipoRefeicao] = useState("Café da manhã");
  const [horarioRefeicao, setHorarioRefeicao] = useState("");
  const [descricaoRefeicao, setDescricaoRefeicao] = useState("");
  const [observacoesRefeicao, setObservacoesRefeicao] = useState("");

  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([
    {
      id: 1,
      nome: "Café da manhã",
      tipo: "Café da manhã",
      horario: "08:00",
      descricao: "Pão, fruta e leite.",
      observacoes: "Evitar alimentos com muito açúcar.",
    },
    {
      id: 2,
      nome: "Almoço",
      tipo: "Almoço",
      horario: "12:00",
      descricao: "Arroz, feijão, proteína e legumes.",
      observacoes: "",
    },
    {
      id: 3,
      nome: "Lanche da tarde",
      tipo: "Lanche da tarde",
      horario: "16:00",
      descricao: "Fruta, iogurte ou lanche leve.",
      observacoes: "",
    },
  ]);

  /* ======================================================
     FUNÇÕES DOS MEDICAMENTOS
  ====================================================== */

  function limparFormularioMedicamento() {
    setNomeMedicamento("");
    setDoseMedicamento("");
    setHorarioMedicamento("");
    setFrequenciaMedicamento("Todos os dias");
    setObservacoesMedicamento("");
    setIdMedicamentoEditando(null);
  }

  function abrirNovoMedicamento() {
    limparFormularioMedicamento();
    setFormularioRefeicaoAberto(false);
    setFormularioMedicamentoAberto(true);
  }

  function fecharFormularioMedicamento() {
    limparFormularioMedicamento();
    setFormularioMedicamentoAberto(false);
  }

  function salvarMedicamento() {
    if (
      !nomeMedicamento ||
      !doseMedicamento ||
      !horarioMedicamento
    ) {
      alert("Preencha o nome, a dose e o horário.");
      return;
    }

    if (idMedicamentoEditando !== null) {
      setMedicamentos((listaAtual) =>
        listaAtual.map((medicamento) =>
          medicamento.id === idMedicamentoEditando
            ? {
                ...medicamento,
                nome: nomeMedicamento,
                dose: doseMedicamento,
                horario: horarioMedicamento,
                frequencia: frequenciaMedicamento,
                observacoes: observacoesMedicamento,
              }
            : medicamento
        )
      );
    } else {
      const novoMedicamento: Medicamento = {
        id: Date.now(),
        nome: nomeMedicamento,
        dose: doseMedicamento,
        horario: horarioMedicamento,
        frequencia: frequenciaMedicamento,
        observacoes: observacoesMedicamento,
      };

      setMedicamentos((listaAtual) => [
        ...listaAtual,
        novoMedicamento,
      ]);
    }

    limparFormularioMedicamento();
    setFormularioMedicamentoAberto(false);
  }

  function editarMedicamento(medicamento: Medicamento) {
    setIdMedicamentoEditando(medicamento.id);
    setNomeMedicamento(medicamento.nome);
    setDoseMedicamento(medicamento.dose);
    setHorarioMedicamento(medicamento.horario);
    setFrequenciaMedicamento(medicamento.frequencia);
    setObservacoesMedicamento(medicamento.observacoes);

    setFormularioRefeicaoAberto(false);
    setFormularioMedicamentoAberto(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function excluirMedicamento(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este medicamento?"
    );

    if (!confirmar) return;

    setMedicamentos((listaAtual) =>
      listaAtual.filter(
        (medicamento) => medicamento.id !== id
      )
    );
  }

  /* ======================================================
     FUNÇÕES DA ALIMENTAÇÃO
  ====================================================== */

  function limparFormularioRefeicao() {
    setNomeRefeicao("");
    setTipoRefeicao("Café da manhã");
    setHorarioRefeicao("");
    setDescricaoRefeicao("");
    setObservacoesRefeicao("");
    setIdRefeicaoEditando(null);
  }

  function abrirNovaRefeicao() {
    limparFormularioRefeicao();
    setFormularioMedicamentoAberto(false);
    setFormularioRefeicaoAberto(true);
  }

  function fecharFormularioRefeicao() {
    limparFormularioRefeicao();
    setFormularioRefeicaoAberto(false);
  }

  function salvarRefeicao() {
    if (
      !nomeRefeicao ||
      !horarioRefeicao ||
      !descricaoRefeicao
    ) {
      alert(
        "Preencha o nome da refeição, o horário e os alimentos/orientações."
      );
      return;
    }

    if (idRefeicaoEditando !== null) {
      setRefeicoes((listaAtual) =>
        listaAtual.map((refeicao) =>
          refeicao.id === idRefeicaoEditando
            ? {
                ...refeicao,
                nome: nomeRefeicao,
                tipo: tipoRefeicao,
                horario: horarioRefeicao,
                descricao: descricaoRefeicao,
                observacoes: observacoesRefeicao,
              }
            : refeicao
        )
      );
    } else {
      const novaRefeicao: Refeicao = {
        id: Date.now(),
        nome: nomeRefeicao,
        tipo: tipoRefeicao,
        horario: horarioRefeicao,
        descricao: descricaoRefeicao,
        observacoes: observacoesRefeicao,
      };

      setRefeicoes((listaAtual) => [
        ...listaAtual,
        novaRefeicao,
      ]);
    }

    limparFormularioRefeicao();
    setFormularioRefeicaoAberto(false);
  }

  function editarRefeicao(refeicao: Refeicao) {
    setIdRefeicaoEditando(refeicao.id);
    setNomeRefeicao(refeicao.nome);
    setTipoRefeicao(refeicao.tipo);
    setHorarioRefeicao(refeicao.horario);
    setDescricaoRefeicao(refeicao.descricao);
    setObservacoesRefeicao(refeicao.observacoes);

    setFormularioMedicamentoAberto(false);
    setFormularioRefeicaoAberto(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function excluirRefeicao(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta refeição?"
    );

    if (!confirmar) return;

    setRefeicoes((listaAtual) =>
      listaAtual.filter((refeicao) => refeicao.id !== id)
    );
  }

  /* ======================================================
     ORDENAÇÃO
  ====================================================== */

  const medicamentosOrdenados = useMemo(() => {
    return [...medicamentos].sort((a, b) =>
      a.horario.localeCompare(b.horario)
    );
  }, [medicamentos]);

  const refeicoesOrdenadas = useMemo(() => {
    return [...refeicoes].sort((a, b) =>
      a.horario.localeCompare(b.horario)
    );
  }, [refeicoes]);

  const proximoMedicamento = medicamentosOrdenados[0];

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#2C3E44] md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 pt-[68px] md:pt-0">
        <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-7 lg:px-10 lg:py-10">
          {/* CABEÇALHO */}

          <header className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8FBC8F]" />

              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#719971]">
                Cuidados do dia a dia
              </p>
            </div>

            <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Cuidados
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#718187]">
              Organize medicamentos, horários e a rotina alimentar
              da criança em um só lugar.
            </p>
          </header>

          {/* DESTAQUES */}

          <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <article className="relative overflow-hidden rounded-[30px] border border-[#EBC8BE] bg-[#F7E4DF] p-6 sm:p-7">
              <div className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/25" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D97D64]" />

                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#BB644F]">
                    Próximo medicamento
                  </p>
                </div>

                {proximoMedicamento ? (
                  <>
                    <h2 className="mt-6 text-2xl font-extrabold text-[#3F4C50]">
                      {proximoMedicamento.nome}
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-[#806E68]">
                      {proximoMedicamento.dose}
                    </p>

                    <div className="mt-7 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold text-[#A2766B]">
                          Horário
                        </p>

                        <p className="mt-1 text-3xl font-black text-[#B65F49]">
                          {proximoMedicamento.horario}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={abrirNovoMedicamento}
                        className="rounded-full bg-[#D97D64] px-4 py-2.5 text-xs font-extrabold text-white"
                      >
                        + Medicamento
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="mt-6 text-sm text-[#7A6E6A]">
                    Nenhum medicamento cadastrado.
                  </p>
                )}
              </div>
            </article>

            <article className="rounded-[30px] border border-[#D4E6D4] bg-[#EDF5ED] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white text-xl text-[#6C986C]">
                ♧
              </span>

              <p className="mt-8 text-4xl font-black text-[#557458]">
                {refeicoes.length}
              </p>

              <h3 className="mt-1 font-extrabold text-[#4C6450]">
                refeições
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#788B7A]">
                organizadas na rotina alimentar.
              </p>
            </article>

            <article className="rounded-[30px] border border-[#D6E4EA] bg-[#E7F0F4] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white text-xl font-black text-[#6B91A3]">
                +
              </span>

              <p className="mt-8 text-4xl font-black text-[#536F7D]">
                {medicamentos.length}
              </p>

              <h3 className="mt-1 font-extrabold text-[#4A626D]">
                medicamentos
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#748991]">
                cadastrados para acompanhamento.
              </p>
            </article>
          </section>

          {/* FORMULÁRIO MEDICAMENTO */}

          {formularioMedicamentoAberto && (
            <section className="mt-6 overflow-hidden rounded-[30px] border border-[#E8D4CD] bg-white shadow-[0_12px_45px_rgba(44,62,68,0.06)]">
              <div className="flex items-center justify-between border-b border-[#EEE7E1] bg-[#FFF9F7] px-6 py-5 sm:px-8">
                <div>
                  <p className="text-xs font-bold text-[#D97D64]">
                    Tratamento
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    {idMedicamentoEditando !== null
                      ? "Editar medicamento"
                      : "Novo medicamento"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={fecharFormularioMedicamento}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6DDD7] bg-white text-xl font-bold text-[#7E8B8F]"
                >
                  ×
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <Campo
                    titulo="Nome do medicamento *"
                    valor={nomeMedicamento}
                    alterar={setNomeMedicamento}
                    placeholder="Ex.: Dipirona"
                  />

                  <Campo
                    titulo="Dose *"
                    valor={doseMedicamento}
                    alterar={setDoseMedicamento}
                    placeholder="Ex.: 5 ml"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
                      Horário *
                    </label>

                    <input
                      type="time"
                      value={horarioMedicamento}
                      onChange={(e) =>
                        setHorarioMedicamento(e.target.value)
                      }
                      className="w-full rounded-[16px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none focus:border-[#D97D64]"
                    />
                  </div>

                  <Campo
                    titulo="Frequência"
                    valor={frequenciaMedicamento}
                    alterar={setFrequenciaMedicamento}
                    placeholder="Ex.: Todos os dias"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
                    Observações
                  </label>

                  <textarea
                    value={observacoesMedicamento}
                    onChange={(e) =>
                      setObservacoesMedicamento(e.target.value)
                    }
                    rows={3}
                    placeholder="Ex.: administrar após o café da manhã..."
                    className="w-full resize-none rounded-[18px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none focus:border-[#D97D64]"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={salvarMedicamento}
                    className="rounded-full bg-[#D97D64] px-6 py-3 text-sm font-extrabold text-white"
                  >
                    {idMedicamentoEditando !== null
                      ? "Salvar alterações"
                      : "Salvar medicamento"}
                  </button>

                  <button
                    type="button"
                    onClick={fecharFormularioMedicamento}
                    className="rounded-full border border-[#DDD5CE] px-6 py-3 text-sm font-extrabold text-[#758489]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* FORMULÁRIO REFEIÇÃO */}

          {formularioRefeicaoAberto && (
            <section className="mt-6 overflow-hidden rounded-[30px] border border-[#D5E5D5] bg-white shadow-[0_12px_45px_rgba(44,62,68,0.06)]">
              <div className="flex items-center justify-between border-b border-[#E5EEE5] bg-[#F7FBF7] px-6 py-5 sm:px-8">
                <div>
                  <p className="text-xs font-bold text-[#719971]">
                    Alimentação
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    {idRefeicaoEditando !== null
                      ? "Editar refeição"
                      : "Nova refeição"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={fecharFormularioRefeicao}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE7DC] bg-white text-xl font-bold text-[#758579]"
                >
                  ×
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <Campo
                    titulo="Nome da refeição *"
                    valor={nomeRefeicao}
                    alterar={setNomeRefeicao}
                    placeholder="Ex.: Café da manhã"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
                      Tipo
                    </label>

                    <select
                      value={tipoRefeicao}
                      onChange={(e) =>
                        setTipoRefeicao(e.target.value)
                      }
                      className="w-full rounded-[16px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none focus:border-[#8FBC8F]"
                    >
                      {tiposRefeicao.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
                      Horário *
                    </label>

                    <input
                      type="time"
                      value={horarioRefeicao}
                      onChange={(e) =>
                        setHorarioRefeicao(e.target.value)
                      }
                      className="w-full rounded-[16px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none focus:border-[#8FBC8F]"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
                    Alimentos / orientação *
                  </label>

                  <textarea
                    value={descricaoRefeicao}
                    onChange={(e) =>
                      setDescricaoRefeicao(e.target.value)
                    }
                    rows={3}
                    placeholder="Ex.: pão, fruta, leite..."
                    className="w-full resize-none rounded-[18px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none focus:border-[#8FBC8F]"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
                    Observações
                  </label>

                  <textarea
                    value={observacoesRefeicao}
                    onChange={(e) =>
                      setObservacoesRefeicao(e.target.value)
                    }
                    rows={3}
                    placeholder="Ex.: evitar determinado alimento..."
                    className="w-full resize-none rounded-[18px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none focus:border-[#8FBC8F]"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={salvarRefeicao}
                    className="rounded-full bg-[#7EAE7E] px-6 py-3 text-sm font-extrabold text-white"
                  >
                    {idRefeicaoEditando !== null
                      ? "Salvar alterações"
                      : "Salvar refeição"}
                  </button>

                  <button
                    type="button"
                    onClick={fecharFormularioRefeicao}
                    className="rounded-full border border-[#DDD5CE] px-6 py-3 text-sm font-extrabold text-[#758489]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* DUAS COLUNAS */}

          <section className="mt-7 grid gap-6 xl:grid-cols-2">
            {/* ALIMENTAÇÃO */}

            <article className="rounded-[30px] border border-[#D9E7D9] bg-[#F2F7F2] p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold text-[#719971]">
                    Alimentação
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    Rotina alimentar
                  </h2>

                  <p className="mt-2 text-xs text-[#7C8B7D]">
                    Refeições organizadas por horário.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={abrirNovaRefeicao}
                  className="w-fit rounded-full bg-[#7EAE7E] px-5 py-2.5 text-xs font-extrabold text-white"
                >
                  + Refeição
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {refeicoesOrdenadas.length === 0 ? (
                  <EstadoVazio texto="Nenhuma refeição cadastrada." />
                ) : (
                  refeicoesOrdenadas.map((refeicao) => (
                    <div
                      key={refeicao.id}
                      className="rounded-[22px] border border-[#DFEADF] bg-white p-5"
                    >
                      <div className="flex gap-4">
                        <div className="shrink-0">
                          <div className="rounded-[14px] bg-[#EDF5ED] px-3 py-2 text-center">
                            <p className="text-sm font-black text-[#638963]">
                              {refeicao.horario}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="rounded-full bg-[#EDF5ED] px-2.5 py-1 text-[9px] font-extrabold uppercase text-[#709670]">
                            {refeicao.tipo}
                          </span>

                          <h3 className="mt-3 text-lg font-extrabold">
                            {refeicao.nome}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-[#718078]">
                            {refeicao.descricao}
                          </p>

                          {refeicao.observacoes && (
                            <div className="mt-3 rounded-[14px] bg-[#FAF8F5] p-3">
                              <p className="text-[10px] font-extrabold text-[#929B94]">
                                OBSERVAÇÃO
                              </p>

                              <p className="mt-1 text-xs leading-5 text-[#747E76]">
                                {refeicao.observacoes}
                              </p>
                            </div>
                          )}

                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                editarRefeicao(refeicao)
                              }
                              className="rounded-full bg-[#EDF5ED] px-3.5 py-2 text-[11px] font-extrabold text-[#668E66]"
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                excluirRefeicao(refeicao.id)
                              }
                              className="rounded-full bg-[#FFF7F4] px-3.5 py-2 text-[11px] font-extrabold text-[#C46852]"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </article>

            {/* MEDICAMENTOS */}

            <article className="rounded-[30px] border border-[#EBCFC7] bg-[#FFF8F5] p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold text-[#D97D64]">
                    Tratamentos
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    Medicamentos
                  </h2>

                  <p className="mt-2 text-xs text-[#8A7B76]">
                    Doses e horários do dia.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={abrirNovoMedicamento}
                  className="w-fit rounded-full bg-[#D97D64] px-5 py-2.5 text-xs font-extrabold text-white"
                >
                  + Medicamento
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {medicamentosOrdenados.length === 0 ? (
                  <EstadoVazio texto="Nenhum medicamento cadastrado." />
                ) : (
                  medicamentosOrdenados.map((medicamento) => (
                    <div
                      key={medicamento.id}
                      className="relative overflow-hidden rounded-[22px] border border-[#F0DDD7] bg-white p-5"
                    >
                      <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#D97D64]" />

                      <div className="flex gap-4">
                        <div className="shrink-0">
                          <div className="rounded-[14px] bg-[#F7E4DF] px-3 py-2 text-center">
                            <p className="text-sm font-black text-[#B85F49]">
                              {medicamento.horario}
                            </p>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-extrabold">
                            {medicamento.nome}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#F7E4DF] px-3 py-1 text-[10px] font-extrabold text-[#BF6751]">
                              {medicamento.dose}
                            </span>

                            <span className="rounded-full bg-[#E7F0F4] px-3 py-1 text-[10px] font-extrabold text-[#63899C]">
                              {medicamento.frequencia}
                            </span>
                          </div>

                          {medicamento.observacoes && (
                            <p className="mt-3 text-xs leading-5 text-[#77858A]">
                              {medicamento.observacoes}
                            </p>
                          )}

                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                editarMedicamento(medicamento)
                              }
                              className="rounded-full bg-[#E7F0F4] px-3.5 py-2 text-[11px] font-extrabold text-[#63899C]"
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                excluirMedicamento(
                                  medicamento.id
                                )
                              }
                              className="rounded-full bg-[#FFF1EC] px-3.5 py-2 text-[11px] font-extrabold text-[#C46852]"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </article>
          </section>

          {/* AVISO */}

          <section className="mt-7 rounded-[26px] border border-[#D9E5EA] bg-[#EDF4F7] p-5 sm:p-6">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white font-black text-[#6D93A5]">
                i
              </span>

              <div>
                <h3 className="text-sm font-extrabold">
                  Sobre as informações de cuidados
                </h3>

                <p className="mt-1.5 max-w-3xl text-xs leading-5 text-[#70838B]">
                  Esta área serve para organização da rotina. Informações
                  sobre medicamentos e alimentação devem seguir as
                  orientações dos profissionais responsáveis pelo
                  acompanhamento da criança.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ======================================================
   COMPONENTES PEQUENOS DA PÁGINA
====================================================== */

type CampoProps = {
  titulo: string;
  valor: string;
  alterar: (valor: string) => void;
  placeholder: string;
};

function Campo({
  titulo,
  valor,
  alterar,
  placeholder,
}: CampoProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-[#465B62]">
        {titulo}
      </label>

      <input
        type="text"
        value={valor}
        onChange={(e) => alterar(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[16px] border border-[#DED8D2] bg-[#FCFBF9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#A5ADAF] focus:border-[#7FA2B8] focus:bg-white"
      />
    </div>
  );
}

function EstadoVazio({ texto }: { texto: string }) {
  return (
    <div className="rounded-[20px] border border-dashed border-[#D9D5CF] bg-white/60 p-8 text-center">
      <p className="text-sm font-bold text-[#829095]">
        {texto}
      </p>
    </div>
  );
}