"use client";
import { FormEvent, useState } from "react";
import { Comment, Forum, User, dateLabel, errorMessage, send } from "@/lib/api";
import {
  Button,
  Card,
  Feedback,
  Field,
  inputClass,
  Shell,
  useChildren,
  useResource,
} from "@/components/api/ui";
function Discussion({ forum, user }: { forum: Forum; user: User }) {
  const r = useResource<Comment[]>(`/forum/${forum.idForum}/comments`);
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [now] = useState(() => Date.now());
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy || !content.trim()) return;
    setBusy(true);
    setError("");
    try {
      await send(
        editing === null
          ? `/forum/${forum.idForum}/comments`
          : `/comments/${editing}`,
        editing === null ? "POST" : "PATCH",
        { content: content.trim() },
      );
      r.reload();
      setEditing(null);
      setContent("");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function remove(id: number) {
    if (busy || !confirm("Excluir comentário?")) return;
    setBusy(true);
    setError("");
    try {
      await send(`/comments/${id}`, "DELETE");
      r.reload();
      if (editing === id) {
        setEditing(null);
        setContent("");
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card>
      <h2 className="text-2xl font-extrabold">{forum.title}</h2>
      <p>{forum.descript}</p>
      <Feedback busy={r.loading} error={r.error || error} retry={r.reload} />
      {r.data
        ?.filter((c) => c.status === "visivel")
        .map((c) => {
          const editable =
            user.role === "admin" ||
            (c.userIdUser === user.idUser &&
              now - new Date(c.createAt).getTime() <= 3 * 60 * 60 * 1000);
          return (
            <article
              key={c.idComments}
              className="space-y-3 rounded-2xl bg-[var(--elara-superficie-secundaria)] p-4"
            >
              <p className="text-sm font-bold">
                {c.userIdUser === user.idUser
                  ? "Você"
                  : `Participante ${c.userIdUser}`}{" "}
                · {dateLabel(c.createAt)}
              </p>
              <p className="whitespace-pre-wrap break-words">{c.content}</p>
              {editable && (
                <div className="elara-actions">
                  <Button
                    disabled={busy}
                    onClick={() => {
                      setEditing(c.idComments);
                      setContent(c.content);
                    }}
                  >
                    Editar
                  </Button>
                  <Button disabled={busy} onClick={() => remove(c.idComments)}>
                    Excluir
                  </Button>
                </div>
              )}
            </article>
          );
        })}
      {r.data?.length === 0 && (
        <p>Ainda não há comentários. Compartilhe sua experiência.</p>
      )}
      <form onSubmit={save} className="space-y-4">
        <Field
          label={editing === null ? "Seu comentário" : "Editar comentário"}
        >
          <textarea
            required
            className={inputClass}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>
        <div className="elara-actions">
          <Button type="submit" disabled={busy}>
            {busy
              ? "Enviando…"
              : editing === null
                ? "Publicar comentário"
                : "Salvar edição"}
          </Button>
          {editing !== null && (
            <Button
              disabled={busy}
              onClick={() => {
                setEditing(null);
                setContent("");
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
      <p className="text-xs">
        Você pode editar ou excluir seu comentário por até 3 horas. A moderação
        segue as permissões do servidor.
      </p>
    </Card>
  );
}
function Topics({ diagnosis, user }: { diagnosis: number; user: User }) {
  const r = useResource<Forum[]>(`/diagnoses/${diagnosis}/forum`);
  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const chosen = r.data?.find((f) => f.idForum === selected) ?? r.data?.[0];
  async function create(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const f = await send<Forum>("/forum", "POST", {
        title: title.trim(),
        descript: description.trim(),
        diagnosesIdDiagnoses: diagnosis,
      });
      setSelected(f.idForum);
      setTitle("");
      setDescription("");
      r.reload();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Feedback busy={r.loading} error={r.error || error} retry={r.reload} />
      {r.data?.length === 0 && (
        <Card>Nenhum tópico disponível para este diagnóstico.</Card>
      )}
      {!!r.data?.length && (
        <Card>
          <Field label="Tópico">
            <select
              className={inputClass}
              value={chosen?.idForum ?? 0}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {r.data.map((f) => (
                <option key={f.idForum} value={f.idForum}>
                  {f.title}
                </option>
              ))}
            </select>
          </Field>
        </Card>
      )}
      {chosen && <Discussion key={chosen.idForum} forum={chosen} user={user} />}
      {user.role === "admin" && (
        <Card>
          <h2 className="text-xl font-extrabold">Criar tópico</h2>
          <form onSubmit={create} className="space-y-4">
            <Field label="Título">
              <input
                required
                minLength={2}
                maxLength={45}
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field label="Descrição">
              <textarea
                required
                minLength={2}
                maxLength={200}
                className={inputClass}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <Button type="submit" disabled={busy}>
              Criar tópico
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
export default function ForumPage() {
  const children = useChildren();
  const user = useResource<User>("/users/me");
  const diagnoses =
    useResource<{ idDiagnoses: number; nameDiagnosis: string }[]>("/diagnoses");
  const [selected, setSelected] = useState(0);
  const available =
    diagnoses.data?.filter(
      (d) =>
        user.data?.role === "admin" ||
        children.children.some((c) => c.diagnosesIdDiagnoses === d.idDiagnoses),
    ) ?? [];
  const id =
    available.find((d) => d.idDiagnoses === selected)?.idDiagnoses ??
    available[0]?.idDiagnoses;
  return (
    <Shell
      title="Fórum"
      description="Participe dos tópicos relacionados ao diagnóstico das crianças cadastradas."
    >
      <Feedback
        busy={children.loading || user.loading || diagnoses.loading}
        error={children.error || user.error || diagnoses.error}
        retry={() => {
          children.reload();
          user.reload();
          diagnoses.reload();
        }}
      />
      {!!available.length && (
        <Card>
          <Field label="Diagnóstico">
            <select
              className={inputClass}
              value={id}
              onChange={(e) => setSelected(Number(e.target.value))}
            >
              {available.map((d) => (
                <option key={d.idDiagnoses} value={d.idDiagnoses}>
                  {d.nameDiagnosis}
                </option>
              ))}
            </select>
          </Field>
        </Card>
      )}
      {id && user.data && <Topics key={id} diagnosis={id} user={user.data} />}
      {!children.loading && !diagnoses.loading && !available.length && (
        <Card>
          Informe o diagnóstico da criança para acessar os fóruns disponíveis.
        </Card>
      )}
      <p className="text-sm">
        Os tópicos são criados pela administração. Responsáveis participam por
        comentários.
      </p>
    </Shell>
  );
}
