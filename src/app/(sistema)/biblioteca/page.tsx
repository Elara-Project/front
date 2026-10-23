"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Aba = "biblioteca" | "direitos";

type Artigo = {
  id: number;
  categoria: string;
  titulo: string;
  resumo: string;
  conteudo: string;
};

type Direito = {
  id: number;
  categoria: string;
  titulo: string;
  resumo: string;
  descricao: string;
  orientacao: string;
};

const artigos: Artigo[] = [
  {
    id: 1,
    categoria: "Desenvolvimento",
    titulo: "Rotina e desenvolvimento infantil",
    resumo:
      "Entenda como uma rotina organizada pode contribuir para o desenvolvimento e o bem-estar da criança.",
    conteudo:
      "A organização da rotina pode ajudar a criança a compreender melhor o que acontece ao longo do dia. Horários relativamente previsíveis para atividades, refeições, descanso, escola e terapias podem trazer mais segurança e facilitar a adaptação às tarefas diárias. Cada criança possui necessidades diferentes, por isso a rotina deve ser flexível e adaptada à realidade da família.",
  },
  {
    id: 2,
    categoria: "Cuidados",
    titulo: "Estratégias para o cotidiano",
    resumo:
      "Veja formas simples de organizar atividades e tornar o dia a dia mais previsível e acolhedor.",
    conteudo:
      "Algumas estratégias podem facilitar a rotina da família, como organizar compromissos com antecedência, usar calendários visuais, dividir tarefas maiores em pequenas etapas e registrar informações importantes. Também é importante observar quais estratégias funcionam melhor para cada criança e ajustar a rotina sempre que necessário.",
  },
  {
    id: 3,
    categoria: "Apoio",
    titulo: "Construindo uma rede de apoio",
    resumo:
      "Saiba por que compartilhar responsabilidades pode ser importante para quem cuida.",
    conteudo:
      "Uma rede de apoio pode ser formada por familiares, amigos, profissionais, instituições e outras pessoas de confiança. Compartilhar informações e responsabilidades pode tornar a rotina mais organizada e reduzir a sobrecarga dos responsáveis. Procurar apoio não significa deixar de acompanhar a criança, mas ampliar as possibilidades de cuidado.",
  },
  {
    id: 4,
    categoria: "Escola",
    titulo: "Comunicação entre família e escola",
    resumo:
      "Conheça a importância do diálogo entre responsáveis e profissionais da educação.",
    conteudo:
      "A comunicação entre a família e a escola pode ajudar no acompanhamento da criança. Informações sobre rotina, comportamento, necessidades e estratégias que funcionam em casa podem contribuir para o ambiente escolar. Da mesma forma, os responsáveis podem acompanhar informações importantes sobre a experiência da criança na escola.",
  },
  {
    id: 5,
    categoria: "Organização",
    titulo: "Como organizar consultas e terapias",
    resumo:
      "Aprenda algumas formas de acompanhar compromissos sem perder informações importantes.",
    conteudo:
      "Manter consultas e terapias organizadas pode ser mais simples quando todas as informações ficam concentradas em um único lugar. Data, horário, local, profissional responsável e observações podem ser registrados antecipadamente. Também pode ser útil anotar orientações recebidas durante cada atendimento.",
  },
  {
    id: 6,
    categoria: "Cuidados",
    titulo: "Registrando informações importantes",
    resumo:
      "Veja quais informações podem ajudar no acompanhamento da rotina da criança.",
    conteudo:
      "Registrar acontecimentos importantes pode facilitar o acompanhamento ao longo do tempo. Mudanças na rotina, observações escolares, orientações profissionais, alimentação e outros aspectos podem ser registrados de maneira organizada. Essas informações também podem ajudar durante conversas com profissionais responsáveis pelo acompanhamento da criança.",
  },
];

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

const categoriasBiblioteca = [
  "Todas",
  "Desenvolvimento",
  "Cuidados",
  "Apoio",
  "Escola",
  "Organização",
];

const categoriasDireitos = [
  "Todos",
  "Educação",
  "Saúde",
  "Benefícios",
  "Assistência",
  "Proteção",
];

export default function BibliotecaPage() {
  const [aba, setAba] = useState<Aba>("biblioteca");
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const [artigoAbertoId, setArtigoAbertoId] = useState<
    number | null
  >(null);

  const [direitoAbertoId, setDireitoAbertoId] = useState<
    number | null
  >(null);

  const [favoritosArtigos, setFavoritosArtigos] = useState<
    number[]
  >([]);

  const [favoritosDireitos, setFavoritosDireitos] = useState<
    number[]
  >([]);

  function mudarAba(novaAba: Aba) {
    setAba(novaAba);
    setBusca("");
    setCategoria(novaAba === "biblioteca" ? "Todas" : "Todos");
  }

  function favoritarArtigo(id: number) {
    setFavoritosArtigos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  function favoritarDireito(id: number) {
    setFavoritosDireitos((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  const artigosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return artigos.filter((artigo) => {
      const combinaBusca =
        artigo.titulo.toLowerCase().includes(termo) ||
        artigo.resumo.toLowerCase().includes(termo) ||
        artigo.conteudo.toLowerCase().includes(termo);

      const combinaCategoria =
        categoria === "Todas" ||
        artigo.categoria === categoria;

      return combinaBusca && combinaCategoria;
    });
  }, [busca, categoria]);

  const direitosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return direitos.filter((direito) => {
      const combinaBusca =
        direito.titulo.toLowerCase().includes(termo) ||
        direito.resumo.toLowerCase().includes(termo) ||
        direito.descricao.toLowerCase().includes(termo) ||
        direito.orientacao.toLowerCase().includes(termo);

      const combinaCategoria =
        categoria === "Todos" ||
        direito.categoria === categoria;

      return combinaBusca && combinaCategoria;
    });
  }, [busca, categoria]);

  const artigoAberto = artigos.find(
    (artigo) => artigo.id === artigoAbertoId
  );

  const direitoAberto = direitos.find(
    (direito) => direito.id === direitoAbertoId
  );

  const categorias =
    aba === "biblioteca"
      ? categoriasBiblioteca
      : categoriasDireitos;

  const quantidadeResultados =
    aba === "biblioteca"
      ? artigosFiltrados.length
      : direitosFiltrados.length;

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#2C3E44] md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 pt-[68px] md:pt-0">
        <div className="mx-auto max-w-[1450px] px-5 py-7 sm:px-7 lg:px-10 lg:py-10">
          {/* CABEÇALHO */}

          <header>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D97D64]" />

              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D97D64]">
                Informação e orientação
              </p>
            </div>

            <h1 className="text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Conteúdos
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#718187]">
              Informação para apoiar decisões, organizar a rotina e
              conhecer direitos importantes para sua família.
            </p>
          </header>

          {/* ABAS PRINCIPAIS */}

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => mudarAba("biblioteca")}
              className={`relative overflow-hidden rounded-[28px] border p-6 text-left transition ${
                aba === "biblioteca"
                  ? "border-[#D1E2EA] bg-[#E7F0F4] shadow-sm"
                  : "border-[#EAE4DE] bg-white hover:border-[#D1E2EA]"
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-[16px] text-xl ${
                      aba === "biblioteca"
                        ? "bg-white text-[#6B93A6]"
                        : "bg-[#E7F0F4] text-[#6B93A6]"
                    }`}
                  >
                    ▤
                  </span>

                  {aba === "biblioteca" && (
                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-extrabold text-[#638A9E]">
                      SELECIONADO
                    </span>
                  )}
                </div>

                <p className="mt-6 text-xs font-bold text-[#6F94A6]">
                  Informação e apoio
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">
                  Biblioteca
                </h2>

                <p className="mt-2 max-w-md text-xs leading-5 text-[#71858E]">
                  Artigos sobre rotina, desenvolvimento, cuidados,
                  escola, organização e rede de apoio.
                </p>

                <p className="mt-5 text-xs font-extrabold text-[#638A9E]">
                  {artigos.length} conteúdos disponíveis
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => mudarAba("direitos")}
              className={`relative overflow-hidden rounded-[28px] border p-6 text-left transition ${
                aba === "direitos"
                  ? "border-[#EBC8BE] bg-[#F7E4DF] shadow-sm"
                  : "border-[#EAE4DE] bg-white hover:border-[#EBC8BE]"
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-[16px] text-xl ${
                      aba === "direitos"
                        ? "bg-white text-[#C06852]"
                        : "bg-[#F7E4DF] text-[#C06852]"
                    }`}
                  >
                    §
                  </span>

                  {aba === "direitos" && (
                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-extrabold text-[#BF6751]">
                      SELECIONADO
                    </span>
                  )}
                </div>

                <p className="mt-6 text-xs font-bold text-[#C06A54]">
                  Direitos e orientação
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">
                  Direitos
                </h2>

                <p className="mt-2 max-w-md text-xs leading-5 text-[#7E716D]">
                  Informações sobre educação, saúde, benefícios,
                  assistência e proteção.
                </p>

                <p className="mt-5 text-xs font-extrabold text-[#BF6751]">
                  {direitos.length} informações disponíveis
                </p>
              </div>
            </button>
          </section>

          {/* BUSCA */}

          <section className="mt-6 rounded-[28px] border border-[#EAE4DE] bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#F8F5F1] text-lg text-[#7FA2B8]">
                ⌕
              </span>

              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder={
                  aba === "biblioteca"
                    ? "Buscar um conteúdo..."
                    : "Buscar um direito ou benefício..."
                }
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-normal placeholder:text-[#A2ACAF]"
              />

              {busca && (
                <button
                  type="button"
                  onClick={() => setBusca("")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F8F5F1] text-sm font-bold text-[#8B989C]"
                >
                  ×
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {categorias.map((item) => {
                const selecionada = categoria === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategoria(item)}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${
                      selecionada
                        ? aba === "biblioteca"
                          ? "bg-[#7FA2B8] text-white"
                          : "bg-[#D97D64] text-white"
                        : "border border-[#E3DDD7] bg-[#FCFBF9] text-[#718086] hover:bg-[#F8F5F1]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          {/* RESULTADOS */}

          <section className="mt-8">
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p
                  className={`text-xs font-bold ${
                    aba === "biblioteca"
                      ? "text-[#7FA2B8]"
                      : "text-[#D97D64]"
                  }`}
                >
                  {aba === "biblioteca"
                    ? "Biblioteca ELARA"
                    : "Direitos e benefícios"}
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">
                  {aba === "biblioteca"
                    ? "Conteúdos disponíveis"
                    : "Informações disponíveis"}
                </h2>
              </div>

              <p className="text-xs font-bold text-[#8B989C]">
                {quantidadeResultados}{" "}
                {quantidadeResultados === 1
                  ? "resultado"
                  : "resultados"}
              </p>
            </div>

            {quantidadeResultados === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#DAD3CC] bg-white/60 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#E7F0F4] text-xl text-[#7FA2B8]">
                  ⌕
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  Nada encontrado
                </h3>

                <p className="mt-2 text-sm text-[#819095]">
                  Tente outra palavra ou escolha uma categoria
                  diferente.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setBusca("");
                    setCategoria(
                      aba === "biblioteca" ? "Todas" : "Todos"
                    );
                  }}
                  className="mt-5 text-sm font-extrabold text-[#D97D64]"
                >
                  Limpar filtros
                </button>
              </div>
            ) : aba === "biblioteca" ? (
              /* ARTIGOS */

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {artigosFiltrados.map((artigo, indice) => {
                  const favorito = favoritosArtigos.includes(
                    artigo.id
                  );

                  return (
                    <article
                      key={artigo.id}
                      className="group flex min-h-[290px] flex-col rounded-[28px] border border-[#D8E5EB] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(44,62,68,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full bg-[#E7F0F4] px-3 py-1 text-[10px] font-extrabold uppercase text-[#638A9E]">
                          {artigo.categoria}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            favoritarArtigo(artigo.id)
                          }
                          aria-label="Favoritar conteúdo"
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${
                            favorito
                              ? "bg-[#F7E4DF] text-[#D97D64]"
                              : "bg-[#F8F5F1] text-[#9AA5A9]"
                          }`}
                        >
                          {favorito ? "♥" : "♡"}
                        </button>
                      </div>

                      <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#A1ABAE]">
                        Leitura {indice + 1}
                      </p>

                      <h3 className="mt-2 text-xl font-extrabold leading-7">
                        {artigo.titulo}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-6 text-[#718086]">
                        {artigo.resumo}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setArtigoAbertoId(artigo.id)
                        }
                        className="mt-5 w-fit text-sm font-extrabold text-[#638A9E]"
                      >
                        Ler conteúdo →
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* DIREITOS */

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {direitosFiltrados.map((direito) => {
                  const favorito = favoritosDireitos.includes(
                    direito.id
                  );

                  return (
                    <article
                      key={direito.id}
                      className="group flex min-h-[290px] flex-col rounded-[28px] border border-[#EBCFC7] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(44,62,68,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full bg-[#F7E4DF] px-3 py-1 text-[10px] font-extrabold uppercase text-[#BF6751]">
                          {direito.categoria}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            favoritarDireito(direito.id)
                          }
                          aria-label="Favoritar direito"
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${
                            favorito
                              ? "bg-[#F7E4DF] text-[#D97D64]"
                              : "bg-[#F8F5F1] text-[#9AA5A9]"
                          }`}
                        >
                          {favorito ? "♥" : "♡"}
                        </button>
                      </div>

                      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#FFF8F5] font-black text-[#D97D64]">
                        §
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold leading-7">
                        {direito.titulo}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-6 text-[#718086]">
                        {direito.resumo}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setDireitoAbertoId(direito.id)
                        }
                        className="mt-5 w-fit text-sm font-extrabold text-[#C36851]"
                      >
                        Ver informações →
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* FAVORITOS */}

          {(favoritosArtigos.length > 0 ||
            favoritosDireitos.length > 0) && (
            <section className="mt-9 rounded-[28px] border border-[#D8E6D8] bg-[#EDF5ED] p-6">
              <p className="text-xs font-bold text-[#6C966C]">
                Seus favoritos
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl text-[#D97D64]">♥</span>

                <div>
                  <h2 className="font-extrabold">
                    Conteúdos guardados
                  </h2>

                  <p className="mt-1 text-xs text-[#748576]">
                    Você favoritou{" "}
                    {favoritosArtigos.length +
                      favoritosDireitos.length}{" "}
                    {favoritosArtigos.length +
                      favoritosDireitos.length ===
                    1
                      ? "item"
                      : "itens"}{" "}
                    nesta sessão.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* MODAL ARTIGO */}

      {artigoAberto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C3E44]/45 p-4 backdrop-blur-sm"
          onClick={() => setArtigoAbertoId(null)}
        >
          <article
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-[#E7F0F4] px-3 py-1 text-[10px] font-extrabold uppercase text-[#638A9E]">
                  {artigoAberto.categoria}
                </span>

                <h2 className="mt-4 text-2xl font-extrabold leading-8 sm:text-3xl">
                  {artigoAberto.titulo}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setArtigoAbertoId(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F5F1] text-xl font-bold text-[#7C898D]"
              >
                ×
              </button>
            </div>

            <div className="mt-6 h-px bg-[#ECE7E2]" />

            <p className="mt-6 text-sm leading-8 text-[#5F7076]">
              {artigoAberto.conteudo}
            </p>

            <div className="mt-7 rounded-[20px] border border-[#D9E5EA] bg-[#EDF4F7] p-5">
              <p className="text-xs leading-6 text-[#667B84]">
                Este conteúdo possui caráter informativo e não
                substitui orientações individualizadas de
                profissionais especializados.
              </p>
            </div>
          </article>
        </div>
      )}

      {/* MODAL DIREITO */}

      {direitoAberto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C3E44]/45 p-4 backdrop-blur-sm"
          onClick={() => setDireitoAbertoId(null)}
        >
          <article
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-[#F7E4DF] px-3 py-1 text-[10px] font-extrabold uppercase text-[#BF6751]">
                  {direitoAberto.categoria}
                </span>

                <h2 className="mt-4 text-2xl font-extrabold leading-8 sm:text-3xl">
                  {direitoAberto.titulo}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setDireitoAbertoId(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F5F1] text-xl font-bold text-[#7C898D]"
              >
                ×
              </button>
            </div>

            <div className="mt-6 h-px bg-[#ECE7E2]" />

            <div className="mt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#D97D64]">
                Sobre este direito
              </p>

              <p className="mt-3 text-sm leading-8 text-[#5F7076]">
                {direitoAberto.descricao}
              </p>
            </div>

            <div className="mt-6 rounded-[20px] bg-[#EDF4F7] p-5">
              <p className="text-xs font-extrabold text-[#638A9E]">
                Onde buscar orientação
              </p>

              <p className="mt-2 text-sm leading-7 text-[#607780]">
                {direitoAberto.orientacao}
              </p>
            </div>

            <div className="mt-5 rounded-[20px] border border-[#D8E6D8] bg-[#F3F8F3] p-5">
              <p className="text-xs leading-6 text-[#6A7D6D]">
                As informações apresentadas pelo ELARA têm caráter
                informativo. Regras, critérios e procedimentos podem
                mudar, por isso é importante consultar os canais
                oficiais responsáveis por cada serviço ou benefício.
              </p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}