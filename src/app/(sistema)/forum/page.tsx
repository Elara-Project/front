 "use client";

import { useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Comentario = {
  id: number;
  autor: string;
  mensagem: string;
};

type Publicacao = {
  id: number;
  categoria: string;
  titulo: string;
  conteudo: string;
  autor: string;
  comentarios: Comentario[];
};

export default function ForumPage() {
  const usuarioAtual = "Você";

  const [formularioAberto, setFormularioAberto] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const [publicacaoAbertaId, setPublicacaoAbertaId] = useState<number | null>(
    null
  );

  const [novosComentarios, setNovosComentarios] = useState<
    Record<number, string>
  >({});

  const [comentarioEditandoId, setComentarioEditandoId] = useState<
    number | null
  >(null);

  const [textoComentarioEditando, setTextoComentarioEditando] = useState("");

  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([
    {
      id: 1,
      categoria: "Rotina",
      titulo: "Como vocês organizam os horários das terapias?",
      conteudo:
        "Queria saber como outros responsáveis organizam consultas, terapias e compromissos durante a semana.",
      autor: "Ana",
      comentarios: [
        {
          id: 101,
          autor: "Marina",
          mensagem:
            "Aqui eu uso uma agenda semanal e separo cada terapia por dia.",
        },
        {
          id: 102,
          autor: "Juliana",
          mensagem:
            "Eu tento deixar os compromissos sempre nos mesmos horários. Isso ajudou bastante na rotina.",
        },
      ],
    },
    {
      id: 2,
      categoria: "Escola",
      titulo: "Adaptação na escola",
      conteudo:
        "Alguém já passou pelo processo de adaptação escolar? Gostaria de trocar experiências.",
      autor: "Camila",
      comentarios: [
        {
          id: 201,
          autor: "Renata",
          mensagem:
            "No começo foi difícil, mas conversar bastante com a professora ajudou muito.",
        },
      ],
    },
    {
      id: 3,
      categoria: "Apoio",
      titulo: "Indicações de atividades para fazer em casa",
      conteudo:
        "Quais atividades vocês costumam fazer em casa para tornar a rotina mais leve e organizada?",
      autor: "Patrícia",
      comentarios: [],
    },
  ]);

  function limparFormulario() {
    setCategoria("");
    setTitulo("");
    setConteudo("");
    setIdEditando(null);
  }

  function abrirNovaPublicacao() {
    limparFormulario();
    setFormularioAberto(true);
  }

  function fecharFormulario() {
    limparFormulario();
    setFormularioAberto(false);
  }

  function salvarPublicacao() {
    if (!categoria || !titulo || !conteudo) {
      alert("Preencha a categoria, o título e o conteúdo.");
      return;
    }

    if (idEditando !== null) {
      const listaAtualizada = publicacoes.map((publicacao) =>
        publicacao.id === idEditando
          ? {
              ...publicacao,
              categoria,
              titulo,
              conteudo,
            }
          : publicacao
      );

      setPublicacoes(listaAtualizada);
    } else {
      const novaPublicacao: Publicacao = {
        id: Date.now(),
        categoria,
        titulo,
        conteudo,
        autor: usuarioAtual,
        comentarios: [],
      };

      setPublicacoes([novaPublicacao, ...publicacoes]);
    }

    limparFormulario();
    setFormularioAberto(false);
  }

  function editarPublicacao(publicacao: Publicacao) {
    if (publicacao.autor !== usuarioAtual) {
      return;
    }

    setIdEditando(publicacao.id);
    setCategoria(publicacao.categoria);
    setTitulo(publicacao.titulo);
    setConteudo(publicacao.conteudo);
    setFormularioAberto(true);
  }

  function excluirPublicacao(id: number) {
    const publicacao = publicacoes.find((item) => item.id === id);

    if (!publicacao || publicacao.autor !== usuarioAtual) {
      return;
    }

    const novaLista = publicacoes.filter(
      (publicacao) => publicacao.id !== id
    );

    setPublicacoes(novaLista);

    if (publicacaoAbertaId === id) {
      setPublicacaoAbertaId(null);
    }
  }

  function alternarConversa(id: number) {
    if (publicacaoAbertaId === id) {
      setPublicacaoAbertaId(null);
    } else {
      setPublicacaoAbertaId(id);
    }

    setComentarioEditandoId(null);
    setTextoComentarioEditando("");
  }

  function alterarNovoComentario(id: number, valor: string) {
    setNovosComentarios({
      ...novosComentarios,
      [id]: valor,
    });
  }

  function enviarComentario(publicacaoId: number) {
    const mensagem = novosComentarios[publicacaoId]?.trim();

    if (!mensagem) {
      alert("Digite uma resposta antes de enviar.");
      return;
    }

    const listaAtualizada = publicacoes.map((publicacao) => {
      if (publicacao.id !== publicacaoId) {
        return publicacao;
      }

      const novoComentario: Comentario = {
        id: Date.now(),
        autor: usuarioAtual,
        mensagem,
      };

      return {
        ...publicacao,
        comentarios: [...publicacao.comentarios, novoComentario],
      };
    });

    setPublicacoes(listaAtualizada);

    setNovosComentarios({
      ...novosComentarios,
      [publicacaoId]: "",
    });
  }

  function iniciarEdicaoComentario(comentario: Comentario) {
    if (comentario.autor !== usuarioAtual) {
      return;
    }

    setComentarioEditandoId(comentario.id);
    setTextoComentarioEditando(comentario.mensagem);
  }

  function cancelarEdicaoComentario() {
    setComentarioEditandoId(null);
    setTextoComentarioEditando("");
  }

  function salvarEdicaoComentario(
    publicacaoId: number,
    comentarioId: number
  ) {
    const mensagem = textoComentarioEditando.trim();

    if (!mensagem) {
      alert("O comentário não pode ficar vazio.");
      return;
    }

    const listaAtualizada = publicacoes.map((publicacao) => {
      if (publicacao.id !== publicacaoId) {
        return publicacao;
      }

      const comentariosAtualizados = publicacao.comentarios.map(
        (comentario) =>
          comentario.id === comentarioId &&
          comentario.autor === usuarioAtual
            ? {
                ...comentario,
                mensagem,
              }
            : comentario
      );

      return {
        ...publicacao,
        comentarios: comentariosAtualizados,
      };
    });

    setPublicacoes(listaAtualizada);
    setComentarioEditandoId(null);
    setTextoComentarioEditando("");
  }

  function excluirComentario(
    publicacaoId: number,
    comentarioId: number
  ) {
    const listaAtualizada = publicacoes.map((publicacao) => {
      if (publicacao.id !== publicacaoId) {
        return publicacao;
      }

      const comentario = publicacao.comentarios.find(
        (item) => item.id === comentarioId
      );

      if (!comentario || comentario.autor !== usuarioAtual) {
        return publicacao;
      }

      return {
        ...publicacao,
        comentarios: publicacao.comentarios.filter(
          (item) => item.id !== comentarioId
        ),
      };
    });

    setPublicacoes(listaAtualizada);

    if (comentarioEditandoId === comentarioId) {
      setComentarioEditandoId(null);
      setTextoComentarioEditando("");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--elara-offwhite)]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-6 md:p-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-semibold text-[var(--elara-azul)]">
                Comunidade ELARA
              </p>

              <h2 className="mt-2 text-4xl font-bold text-[var(--elara-grafite)]">
                Fórum
              </h2>

              <p className="mt-2 max-w-3xl text-[var(--elara-grafite)]">
                Compartilhe experiências, faça perguntas e converse com outras
                mães e responsáveis em um espaço de apoio e troca.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirNovaPublicacao}
              className="rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-bold text-white"
            >
              + Nova publicação
            </button>
          </div>

          {formularioAberto && (
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[var(--elara-grafite)]">
                  {idEditando !== null
                    ? "Editar publicação"
                    : "Nova publicação"}
                </h3>

                <button
                  type="button"
                  onClick={fecharFormulario}
                  className="font-bold text-[var(--elara-terracota)]"
                >
                  Fechar
                </button>
              </div>

              <div className="mt-6">
                <label className="mb-2 block font-semibold">
                  Categoria
                </label>

                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Rotina">Rotina</option>
                  <option value="Escola">Escola</option>
                  <option value="Apoio">Apoio</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Direitos">Direitos</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-semibold">
                  Título
                </label>

                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título da publicação"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-semibold">
                  Conteúdo
                </label>

                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  placeholder="Conte sua dúvida, experiência ou situação..."
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                />
              </div>

              <button
                type="button"
                onClick={salvarPublicacao}
                className="mt-6 rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-bold text-white"
              >
                {idEditando !== null
                  ? "Salvar alterações"
                  : "Publicar"}
              </button>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-6">
            {publicacoes.map((publicacao) => {
              const publicacaoEhMinha =
                publicacao.autor === usuarioAtual;

              return (
                <article
                  key={publicacao.id}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[var(--elara-offwhite)] px-3 py-1 text-sm font-bold text-[var(--elara-azul)]">
                      {publicacao.categoria}
                    </span>

                    <span className="text-sm text-gray-500">
                      Publicado por {publicacao.autor}
                    </span>

                    {publicacaoEhMinha && (
                      <span className="rounded-full bg-[var(--elara-verde)] px-3 py-1 text-xs font-bold text-white">
                        Sua publicação
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-[var(--elara-grafite)]">
                    {publicacao.titulo}
                  </h3>

                  <p className="mt-3 leading-7 text-[var(--elara-grafite)]">
                    {publicacao.conteudo}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        alternarConversa(publicacao.id)
                      }
                      className="rounded-full bg-[var(--elara-azul)] px-5 py-2 font-bold text-white"
                    >
                      {publicacaoAbertaId === publicacao.id
                        ? "Fechar conversa"
                        : `Ver conversa (${publicacao.comentarios.length})`}
                    </button>

                    {publicacaoEhMinha && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            editarPublicacao(publicacao)
                          }
                          className="font-bold text-[var(--elara-azul)]"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            excluirPublicacao(publicacao.id)
                          }
                          className="font-bold text-[var(--elara-terracota)]"
                        >
                          Excluir
                        </button>
                      </>
                    )}
                  </div>

                  {publicacaoAbertaId === publicacao.id && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h4 className="text-xl font-bold text-[var(--elara-grafite)]">
                        Conversa
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        {publicacao.comentarios.length} resposta
                        {publicacao.comentarios.length === 1
                          ? ""
                          : "s"}
                      </p>

                      <div className="mt-6 flex flex-col gap-4">
                        {publicacao.comentarios.length === 0 ? (
                          <div className="rounded-2xl bg-[var(--elara-offwhite)] p-5">
                            <p className="font-semibold text-[var(--elara-grafite)]">
                              Ainda não há respostas.
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              Seja a primeira pessoa a participar da
                              conversa.
                            </p>
                          </div>
                        ) : (
                          publicacao.comentarios.map(
                            (comentario) => {
                              const comentarioEhMeu =
                                comentario.autor ===
                                usuarioAtual;

                              return (
                                <div
                                  key={comentario.id}
                                  className="rounded-2xl bg-[var(--elara-offwhite)] p-5"
                                >
                                  <div className="flex flex-wrap items-center gap-3">
                                    <p className="font-bold text-[var(--elara-azul)]">
                                      {comentario.autor}
                                    </p>

                                    {comentarioEhMeu && (
                                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--elara-verde)]">
                                        Sua resposta
                                      </span>
                                    )}
                                  </div>

                                  {comentarioEditandoId ===
                                  comentario.id ? (
                                    <div className="mt-4">
                                      <textarea
                                        value={
                                          textoComentarioEditando
                                        }
                                        onChange={(e) =>
                                          setTextoComentarioEditando(
                                            e.target.value
                                          )
                                        }
                                        rows={3}
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                                      />

                                      <div className="mt-3 flex flex-wrap gap-4">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            salvarEdicaoComentario(
                                              publicacao.id,
                                              comentario.id
                                            )
                                          }
                                          className="font-bold text-[var(--elara-azul)]"
                                        >
                                          Salvar
                                        </button>

                                        <button
                                          type="button"
                                          onClick={
                                            cancelarEdicaoComentario
                                          }
                                          className="font-bold text-gray-500"
                                        >
                                          Cancelar
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="mt-2 leading-6 text-[var(--elara-grafite)]">
                                        {comentario.mensagem}
                                      </p>

                                      {comentarioEhMeu && (
                                        <div className="mt-4 flex gap-4">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              iniciarEdicaoComentario(
                                                comentario
                                              )
                                            }
                                            className="font-bold text-[var(--elara-azul)]"
                                          >
                                            Editar
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              excluirComentario(
                                                publicacao.id,
                                                comentario.id
                                              )
                                            }
                                            className="font-bold text-[var(--elara-terracota)]"
                                          >
                                            Excluir
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                            }
                          )
                        )}
                      </div>

                      <div className="mt-6 rounded-2xl border border-gray-200 p-5">
                        <label className="mb-2 block font-semibold">
                          Participar da conversa
                        </label>

                        <textarea
                          value={
                            novosComentarios[publicacao.id] || ""
                          }
                          onChange={(e) =>
                            alterarNovoComentario(
                              publicacao.id,
                              e.target.value
                            )
                          }
                          placeholder="Escreva uma resposta..."
                          rows={3}
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            enviarComentario(publicacao.id)
                          }
                          className="mt-4 rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-bold text-white"
                        >
                          Enviar resposta
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {publicacoes.length === 0 && (
            <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm">
              <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
                Nenhuma publicação ainda
              </h3>

              <p className="mt-2 text-sm">
                Crie uma publicação para iniciar uma conversa.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}