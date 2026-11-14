"use client";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {
  api,
  Child,
  LibraryCategory,
  Media,
  downloadMedia,
  errorMessage,
  send,
} from "@/lib/api";
import { artigos } from "@/lib/conteudos";
import {
  Button,
  Card,
  ChildPicker,
  Feedback,
  Field,
  inputClass,
  Shell,
  useChildren,
  useResource,
} from "@/components/api/ui";
function Documents({
  child,
  categories,
}: {
  child: Child;
  categories: LibraryCategory[];
}) {
  const r = useResource<Media[]>(`/children/${child.idChildren}/media`);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  async function upload(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setSuccess("");
    if (!file || !category) {
      setError("Escolha a categoria e um arquivo.");
      return;
    }
    if (
      !["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(
        file.type,
      ) ||
      file.size > 10 * 1024 * 1024
    ) {
      setError("Use PDF, JPG, PNG ou WEBP com até 10 MB.");
      return;
    }
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("title", title.trim());
      body.append("descript", description.trim());
      body.append("libraryIdlibrary", String(category));
      await api(`/children/${child.idChildren}/media`, {
        method: "POST",
        body,
      });
      setTitle("");
      setDescription("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      r.reload();
      setSuccess("Documento enviado.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function action(item: Media, remove = false) {
    if (busy || (remove && !confirm("Excluir este documento?"))) return;
    setBusy(true);
    setError("");
    try {
      if (remove) {
        await send(`/media/${item.idmedia}`, "DELETE");
        r.reload();
      } else await downloadMedia(item.idmedia, item.title);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Feedback
        busy={r.loading}
        error={r.error || error}
        success={success}
        retry={r.reload}
      />
      <Card>
        <h2 className="text-xl font-extrabold">
          Enviar documento de {child.name}
        </h2>
        <form onSubmit={upload} className="grid gap-5 md:grid-cols-2">
          <Field label="Título">
            <input
              required
              minLength={2}
              maxLength={50}
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field label="Categoria">
            <select
              required
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
            >
              <option value={0} disabled>
                Selecione
              </option>
              {categories.map((c) => (
                <option key={c.idlibrary} value={c.idlibrary}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Descrição">
            <textarea
              required
              minLength={2}
              maxLength={300}
              className={inputClass}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <Field label="Arquivo (até 10 MB)">
            <input
              ref={fileRef}
              required
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              className={inputClass}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </Field>
          <Button type="submit" disabled={busy || !category}>
            {busy ? "Enviando…" : "Enviar documento"}
          </Button>
        </form>
      </Card>
      {r.data?.length === 0 && <Card>Nenhum documento cadastrado.</Card>}
      {r.data?.map((item) => (
        <Card key={item.idmedia}>
          <h2 className="text-xl font-extrabold">{item.title}</h2>
          <p>{item.descript}</p>
          <div className="flex gap-3">
            <Button disabled={busy} onClick={() => action(item)}>
              Baixar arquivo
            </Button>
            <Button disabled={busy} onClick={() => action(item, true)}>
              Excluir
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
}
export default function Library() {
  const [tab, setTab] = useState<"conteudos" | "documentos">("conteudos");
  const [search, setSearch] = useState("");
  const r = useChildren();
  const categories = useResource<LibraryCategory[]>("/library");
  return (
    <Shell
      title="Conteúdos e documentos"
      description="Informações de apoio e documentos da criança organizados em um só lugar."
    >
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setTab("conteudos")}>Conteúdos</Button>
        <Button onClick={() => setTab("documentos")}>Documentos</Button>
        <Link
          href="/direitos"
          className="rounded-full border border-[var(--elara-borda)] px-5 py-3 font-bold"
        >
          Direitos e benefícios →
        </Link>
      </div>
      {tab === "conteudos" ? (
        <>
          <p className="text-sm text-[var(--elara-texto-secundario)]">
            Conteúdo editorial do ELARA. A API atual não possui um catálogo de
            artigos; estes textos fazem parte do site.
          </p>
          <Field label="Buscar conteúdo">
            <input
              type="search"
              className={inputClass}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          <div className="grid gap-5 lg:grid-cols-2">
            {artigos
              .filter((a) =>
                `${a.titulo} ${a.categoria}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((a) => (
                <Card key={a.id}>
                  <p className="font-bold text-[var(--elara-azul)]">
                    {a.categoria}
                  </p>
                  <h2 className="text-xl font-extrabold">{a.titulo}</h2>
                  <p>{a.resumo}</p>
                  <details>
                    <summary className="cursor-pointer font-bold text-[var(--elara-terracota)]">
                      Ler conteúdo
                    </summary>
                    <p className="mt-4 leading-7">{a.conteudo}</p>
                  </details>
                </Card>
              ))}
          </div>
        </>
      ) : (
        <>
          <Feedback
            busy={r.loading || categories.loading}
            error={r.error || categories.error}
            retry={() => {
              r.reload();
              categories.reload();
            }}
          />
          <Card>
            <ChildPicker
              childrenList={r.children}
              selected={r.selected}
              onChange={r.setSelected}
            />
          </Card>
          {r.child && categories.data && (
            <Documents
              key={r.selected}
              child={r.child}
              categories={categories.data}
            />
          )}
          {!r.loading && !r.children.length && (
            <Card>Cadastre uma criança para organizar seus documentos.</Card>
          )}
        </>
      )}
    </Shell>
  );
}
