 "use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Direito = {
  id: number;
  categoria: string;
  titulo: string;
  resumo: string;
  descricao: string;
  orientacao: string;
};

export default function DireitosPage() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");

  const [direitoAbertoId, setDireitoAbertoId] = useState<number | null>(
    null
  );

  const direitos: Direito[] = [
    {
      id: 1,
      categoria: "Educação",
      titulo: "Direito à inclusão escolar",
      resumo:
        "A criança tem direito ao acesso à educação e à participação no ambiente escolar sem discriminação.",
      descricao:
        "A educação inclusiva busca garantir que crianças com diferentes necessidades tenham acesso à escola e possam participar das atividades educacionais com respeito às suas características e necessidades individuais.",
      orientacao:
        "Em caso de dificuldades, o responsável pode procurar a direção da escola, a Secretaria de Educação do município ou outros órgãos responsáveis pela garantia do direito à educação.",
    },
    {
      id: 2,
      categoria: "Educação",
      titulo: "Atendimento educacional especializado",
      resumo:
        "Dependendo das necessidades da criança, pode existir acesso a apoio educacional especializado.",
      descricao:
        "O atendimento educacional especializado pode complementar o ensino regular, oferecendo recursos, estratégias e apoio relacionados às necessidades educacionais da criança.",
      orientacao:
        "O responsável pode conversar com a equipe pedagógica da escola para entender quais recursos e atendimentos estão disponíveis na rede de ensino.",
    },
    {
      id: 3,
      categoria: "Saúde",
      titulo: "Acesso aos serviços de saúde",
      resumo:
        "Crianças têm direito ao atendimento de saúde e ao acompanhamento necessário conforme suas necessidades.",
      descricao:
        "O acesso à saúde pode envolver consultas, acompanhamento profissional, exames, tratamentos e outros serviços disponíveis na rede pública ou privada, conforme cada situação.",
      orientacao:
        "Na rede pública, o responsável pode procurar uma Unidade Básica de Saúde para receber orientação sobre os serviços disponíveis e os encaminhamentos necessários.",
    },
    {
      id: 4,
      categoria: "Benefícios",
      titulo: "Benefício de Prestação Continuada",
      resumo:
        "Em determinadas situações, pessoas com deficiência e famílias de baixa renda podem ter direito ao BPC.",
      descricao:
        "O Benefício de Prestação Continuada, conhecido como BPC, é um benefício assistencial previsto na legislação brasileira. A concessão depende do cumprimento dos critérios estabelecidos e da avaliação da situação do requerente.",
      orientacao:
        "Para verificar os critérios atualizados e realizar solicitações, o responsável deve consultar os canais oficiais do Governo Federal, do INSS ou procurar o CRAS do município.",
    },
    {
      id: 5,
      categoria: "Assistência",
      titulo: "Acompanhamento pelo CRAS",
      resumo:
        "Famílias podem procurar o CRAS para obter informações sobre serviços, programas e benefícios sociais.",
      descricao:
        "O Centro de Referência de Assistência Social atua no atendimento e orientação de famílias, oferecendo informações sobre benefícios, programas sociais e serviços disponíveis no território.",
      orientacao:
        "Procure o CRAS responsável pela região onde a família mora para verificar quais serviços e programas estão disponíveis.",
    },
    {
      id: 6,
      categoria: "Proteção",
      titulo: "Proteção contra discriminação",
      resumo:
        "A criança deve ser respeitada e protegida contra situações de discriminação e exclusão.",
      descricao:
        "A legislação brasileira estabelece princípios de igualdade, dignidade e proteção dos direitos das crianças e das pessoas com deficiência. Situações discriminatórias podem ser denunciadas e encaminhadas aos órgãos responsáveis.",
      orientacao:
        "Dependendo da situação, o responsável pode buscar orientação em órgãos públicos, serviços de assistência social, Ministério Público, Defensoria Pública ou outros canais oficiais.",
    },
  ];

  const categorias = [
    "Todos",
    "Educação",
    "Saúde",
    "Benefícios",
    "Assistência",
    "Proteção",
  ];

  const direitosFiltrados = useMemo(() => {
    return direitos.filter((direito) => {
      const termo = busca.toLowerCase().trim();

      const combinaBusca =
        direito.titulo.toLowerCase().includes(termo) ||
        direito.resumo.toLowerCase().includes(termo) ||
        direito.descricao.toLowerCase().includes(termo) ||
        direito.orientacao.toLowerCase().includes(termo);

      const combinaCategoria =
        categoriaSelecionada === "Todos" ||
        direito.categoria === categoriaSelecionada;

      return combinaBusca && combinaCategoria;
    });
  }, [busca, categoriaSelecionada]);

  const direitoAberto = direitos.find(
    (direito) => direito.id === direitoAbertoId
  );

  return (
    <main className="min-h-screen bg-[var(--elara-offwhite)]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-6 md:p-10">
          <div>
            <p className="font-semibold text-[var(--elara-azul)]">
              Informação e orientação
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[var(--elara-grafite)]">
              Direitos
            </h2>

            <p className="mt-2 max-w-3xl text-[var(--elara-grafite)]">
              Consulte informações sobre educação, saúde, benefícios,
              assistência e proteção.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block font-semibold">
              Buscar direito ou benefício
            </label>

            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite uma palavra, por exemplo: escola"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() =>
                    setCategoriaSelecionada(categoria)
                  }
                  className={
                    categoriaSelecionada === categoria
                      ? "rounded-full bg-[var(--elara-azul)] px-4 py-2 font-bold text-white"
                      : "rounded-full border border-gray-300 bg-white px-4 py-2 font-bold text-[var(--elara-grafite)]"
                  }
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <h3 className="text-2xl font-bold text-[var(--elara-grafite)]">
                Informações disponíveis
              </h3>

              <p className="text-sm text-gray-500">
                {direitosFiltrados.length} resultado
                {direitosFiltrados.length === 1 ? "" : "s"}
              </p>
            </div>

            {direitosFiltrados.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {direitosFiltrados.map((direito) => (
                  <article
                    key={direito.id}
                    className="flex flex-col rounded-3xl bg-white p-6 shadow-sm"
                  >
                    <span className="w-fit rounded-full bg-[var(--elara-offwhite)] px-3 py-1 text-sm font-bold text-[var(--elara-azul)]">
                      {direito.categoria}
                    </span>

                    <h4 className="mt-4 text-xl font-bold text-[var(--elara-grafite)]">
                      {direito.titulo}
                    </h4>

                    <p className="mt-3 flex-1 leading-6 text-[var(--elara-grafite)]">
                      {direito.resumo}
                    </p>

                    <button
                      type="button"
                      onClick={() => setDireitoAbertoId(direito.id)}
                      className="mt-6 w-fit rounded-full bg-[var(--elara-terracota)] px-5 py-2 font-bold text-white"
                    >
                      Ver informações
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-sm">
                <h4 className="text-xl font-bold text-[var(--elara-grafite)]">
                  Nenhuma informação encontrada
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Tente buscar outra palavra ou selecionar outra categoria.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setBusca("");
                    setCategoriaSelecionada("Todos");
                  }}
                  className="mt-5 font-bold text-[var(--elara-terracota)]"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {direitoAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setDireitoAbertoId(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-[var(--elara-offwhite)] px-3 py-1 text-sm font-bold text-[var(--elara-azul)]">
                  {direitoAberto.categoria}
                </span>

                <h3 className="mt-4 text-2xl font-bold text-[var(--elara-grafite)] md:text-3xl">
                  {direitoAberto.titulo}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setDireitoAbertoId(null)}
                className="rounded-full bg-[var(--elara-offwhite)] px-4 py-2 font-bold text-[var(--elara-terracota)]"
              >
                Fechar
              </button>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h4 className="text-lg font-bold text-[var(--elara-grafite)]">
                Sobre este direito
              </h4>

              <p className="mt-3 leading-8 text-[var(--elara-grafite)]">
                {direitoAberto.descricao}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-[var(--elara-offwhite)] p-5">
              <h4 className="font-bold text-[var(--elara-grafite)]">
                Onde buscar orientação
              </h4>

              <p className="mt-2 leading-7 text-[var(--elara-grafite)]">
                {direitoAberto.orientacao}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--elara-verde)] p-5">
              <p className="text-sm leading-6 text-gray-600">
                As informações apresentadas pelo ELARA têm caráter
                informativo. Regras, critérios e procedimentos podem mudar,
                por isso é importante consultar os canais oficiais
                responsáveis por cada serviço ou benefício.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}