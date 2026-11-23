"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Icon from "@/components/Icon";
import { Chat, errorMessage, send } from "@/lib/api";
import { Feedback, useResource } from "@/components/api/ui";

type Mensagem = {
  id: number;
  autor: "assistente" | "usuario";
  texto: string;
};

const sugestoes = [
  "Como organizar a rotina?",
  "Como me preparar para uma consulta?",
  "Como cuidar de mim também?",
];

export default function PaginaIA() {
  const history = useResource<Chat[]>("/ai-assistant/history");
  const [recent, setRecent] = useState<Chat[]>([]);
  const [texto, setTexto] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [failedQuestion, setFailedQuestion] = useState("");
  const [pendingQuestion, setPendingQuestion] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chats = [...(history.data ?? []), ...recent]
    .filter((c, i, all) => all.findIndex((x) => x.idChat === c.idChat) === i)
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    );
  const mensagens: Mensagem[] = [
    ...chats.flatMap((chat) => [
      { id: chat.idChat * 2, autor: "usuario" as const, texto: chat.questions },
      {
        id: chat.idChat * 2 + 1,
        autor: "assistente" as const,
        texto: chat.answer,
      },
    ]),
    ...(pendingQuestion
      ? [{ id: Number.MAX_SAFE_INTEGER, autor: "usuario" as const, texto: pendingQuestion }]
      : []),
  ];
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensagens.length, busy]);
  async function enviar(conteudo: string) {
    const pergunta = conteudo.trim();
    if (!pergunta || busy) return;
    setBusy(true);
    setError("");
    setFailedQuestion("");
    setPendingQuestion(pergunta);
    try {
      const chat = await send<Chat>("/ai-assistant/ask", "POST", {
        question: pergunta,
      });
      setRecent((items) => [...items, chat]);
      setTexto("");
      setPendingQuestion("");
    } catch (err) {
      setError(errorMessage(err));
      setFailedQuestion(pergunta);
    } finally {
      setBusy(false);
    }
  }

  function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    enviar(texto);
  }

  function novaConversa() {
    setTexto("");
  }

  function tentarNovamente() {
    if (failedQuestion) void enviar(failedQuestion);
    else history.reload();
  }

  return (
    <div className="elara-app">
      <Sidebar />
      <main className="pagina-ia elara-main">
        <div className="conteudo">
          <header className="cabecalho">
            <div>
              <span className="etiqueta">APOIO NO DIA A DIA</span>
              <h1>Assistente ELARA</h1>
              <p>Um espaço para acolher dúvidas e facilitar sua rotina.</p>
            </div>

            <button type="button" className="botao-nova" onClick={novaConversa}>
              Limpar rascunho
            </button>
          </header>

          <div className="aviso">
            <Icon name="info" size={18} />
            <p>
              <strong>Assistente de apoio.</strong> As respostas são geradas por
              IA e não substituem orientação profissional. Evite enviar nomes
              completos, documentos ou informações de saúde identificáveis.
            </p>
          </div>

          <Feedback
            busy={history.loading || busy}
            error={error || history.error}
            retry={tentarNovamente}
          />
          <div className="estrutura">
            <aside className="painel">
              <div className="simbolo" aria-hidden="true">
                <Icon name="assistant" size={24} />
              </div>

              <h2>Como posso ajudar?</h2>
              <p>
                Explore ideias para organizar os cuidados e encontrar espaço
                para você.
              </p>

              <div className="sugestoes">
                {sugestoes.map((sugestao) => (
                  <button
                    type="button"
                    key={sugestao}
                    disabled={busy}
                    onClick={() => enviar(sugestao)}
                  >
                    {sugestao}
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <div className="lembrete">
                <strong>Quem cuida também precisa de cuidado.</strong>
                <p>Um passo de cada vez já faz diferença.</p>
              </div>
            </aside>

            <section className="chat" aria-label="Conversa com o assistente">
              <div className="topo-chat">
                <div className="avatar" aria-hidden="true">
                  <Icon name="assistant" size={20} />
                </div>

                <div>
                  <h2>ELARA</h2>
                  <span>Assistente virtual · Até 10 perguntas por dia</span>
                </div>
              </div>

              <div
                className="mensagens"
                role="log"
                aria-label="Mensagens da conversa"
                aria-live="polite"
                aria-relevant="additions"
              >
                {mensagens.length === 0 &&
                  !history.loading &&
                  !history.error && (
                    <p>
                      Envie uma pergunta para começar. Seu histórico será salvo
                      na conta.
                    </p>
                  )}
                {mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`mensagem ${mensagem.autor}`}
                  >
                    <span className="autor">
                      {mensagem.autor === "usuario" ? "Você" : "ELARA"}
                    </span>
                    <p>{mensagem.texto}</p>
                  </div>
                ))}
                {busy && (
                  <div className="mensagem assistente" role="status">
                    <span className="autor">ELARA</span>
                    <p>Estou pensando na melhor forma de te ajudar…</p>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              <form onSubmit={enviarFormulario} className="formulario">
                <label htmlFor="pergunta-ia" className="somente-leitor">
                  Digite sua mensagem
                </label>

                <div className="campo-envio">
                  <input
                    id="pergunta-ia"
                    type="text"
                    value={texto}
                    onChange={(evento) => setTexto(evento.target.value)}
                    placeholder="Escreva sua dúvida..."
                    maxLength={1000}
                    autoComplete="off"
                  />

                  <button
                    type="submit"
                    disabled={
                      busy || !texto.trim()
                    }
                  >
                    Enviar <span aria-hidden="true">↑</span>
                  </button>
                </div>

                <p className="rodape-chat">
                  Apoio, organização e informação para quem cuida.
                </p>
              </form>
            </section>
          </div>
        </div>

        <style jsx>{`
          .pagina-ia {
            min-height: 100vh;
            padding: 36px 24px;
            background: #faf8f5;
            color: #353535;
            font-family: "Nunito", Arial, sans-serif;
          }

          .conteudo {
            max-width: 1200px;
            margin: 0 auto;
          }

          .cabecalho {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 24px;
          }

          .etiqueta {
            color: #a4523c;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1.8px;
          }

          h1 {
            margin: 8px 0;
            font-size: clamp(26px, 4vw, 36px);
          }

          .cabecalho p {
            margin: 0;
            color: #686868;
            line-height: 1.6;
          }

          button,
          input {
            font: inherit;
          }

          button {
            cursor: pointer;
          }

          button:focus-visible,
          input:focus-visible {
            outline: 3px solid #7fa2b8;
            outline-offset: 4px;
          }

          .botao-nova {
            flex-shrink: 0;
            padding: 12px 18px;
            border: 1px solid #e4c5bb;
            border-radius: 12px;
            background: #fff;
            color: #994a37;
            font-weight: 700;
          }

          .botao-nova:hover {
            background: #fcf0eb;
          }

          .aviso {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            padding: 15px 18px;
            margin-bottom: 24px;
            border: 1px solid #d7e3ea;
            border-radius: 14px;
            background: #edf3f7;
            color: #3f5969;
          }

          .aviso > span {
            font-size: 21px;
          }

          .aviso p {
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
          }

          .estrutura {
            display: grid;
            grid-template-columns: 290px minmax(0, 1fr);
            gap: 24px;
            align-items: start;
          }

          .painel {
            padding: 26px;
            border: 1px solid #ece5df;
            border-radius: 22px;
            background: #fff;
          }

          .simbolo {
            display: grid;
            place-items: center;
            width: 48px;
            height: 48px;
            margin-bottom: 20px;
            border-radius: 16px;
            background: #faeae3;
            color: #a4523c;
            font-size: 28px;
          }

          .painel h2 {
            margin: 0 0 10px;
            font-size: 21px;
          }

          .painel > p {
            margin: 0;
            color: #6a6a6a;
            font-size: 14px;
            line-height: 1.7;
          }

          .sugestoes {
            display: grid;
            gap: 10px;
            margin-top: 24px;
          }

          .sugestoes button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 14px;
            border: 1px solid #e9e2dc;
            border-radius: 12px;
            background: #fcfaf8;
            color: #494949;
            text-align: left;
            font-size: 14px;
            line-height: 1.5;
          }

          .sugestoes button:hover {
            border-color: #d97d64;
            background: #fcf0eb;
          }

          .sugestoes button span {
            color: #a4523c;
            font-size: 20px;
          }

          .lembrete {
            margin-top: 28px;
            padding: 16px;
            border-radius: 14px;
            background: #eff6ef;
            color: #446044;
            font-size: 14px;
            line-height: 1.6;
          }

          .lembrete p {
            margin: 8px 0 0;
          }

          .chat {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #ece5df;
            border-radius: 22px;
            background: #fff;
            box-shadow: 0 8px 30px rgba(53, 53, 53, 0.04);
          }

          .topo-chat {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 24px;
            border-bottom: 1px solid #f0ebe6;
          }

          .avatar {
            display: grid;
            place-items: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #d97d64;
            color: #fff;
            font-weight: 800;
            font-size: 22px;
          }

          .topo-chat h2 {
            margin: 0 0 3px;
            font-size: 17px;
          }

          .topo-chat span {
            color: #747474;
            font-size: 12px;
          }

          .mensagens {
            display: flex;
            flex-direction: column;
            gap: 20px;
            height: 430px;
            overflow-y: auto;
            padding: 28px 24px;
            background: #fffefd;
          }

          .mensagem {
            max-width: 88%;
            padding: 15px 18px;
            border-radius: 16px;
            flex-shrink: 0;
            overflow-wrap: anywhere;
          }

          .assistente {
            align-self: flex-start;
            background: #f2f5f7;
            border-bottom-left-radius: 4px;
          }

          .usuario {
            align-self: flex-end;
            background: #f9e6de;
            border-bottom-right-radius: 4px;
          }

          .autor {
            display: block;
            margin-bottom: 7px;
            color: #5b514b;
            font-size: 12px;
            font-weight: 800;
          }

          .mensagem p {
            margin: 0;
            font-size: 14px;
            line-height: 1.8;
            white-space: pre-wrap;
          }

          .formulario {
            padding: 20px 24px 14px;
            border-top: 1px solid #f0ebe6;
          }

          .campo-envio {
            display: flex;
            gap: 10px;
            padding: 7px;
            border: 1px solid #e0d8d2;
            border-radius: 14px;
            background: #fff;
          }

          .campo-envio input {
            flex: 1;
            min-width: 0;
            padding: 10px;
            border: 0;
            border-radius: 8px;
            background: transparent;
            color: #353535;
          }

          .campo-envio button {
            padding: 11px 18px;
            border: 0;
            border-radius: 10px;
            background: #a94f39;
            color: #fff;
            font-weight: 700;
          }

          .campo-envio button:hover:not(:disabled) {
            background: #91412e;
          }

          .campo-envio button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .rodape-chat {
            margin: 12px 0 0;
            color: #737373;
            text-align: center;
            font-size: 11px;
            line-height: 1.6;
          }

          .somente-leitor {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          @media (max-width: 900px) {
            .estrutura {
              grid-template-columns: 1fr;
            }

            .painel {
              padding: 20px;
            }

            .simbolo,
            .lembrete {
              display: none;
            }

            .sugestoes {
              margin-top: 16px;
            }
          }

          @media (max-width: 560px) {
            .pagina-ia {
              padding: 24px 14px;
            }

            .cabecalho {
              align-items: flex-start;
              flex-direction: column;
            }

            .mensagens {
              height: 390px;
              padding: 20px 14px;
            }

            .mensagem {
              max-width: 95%;
            }

            .topo-chat {
              padding: 18px 16px;
            }

            .formulario {
              padding: 14px;
            }

            .campo-envio button {
              padding: 10px 12px;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
