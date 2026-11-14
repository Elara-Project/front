"use client";
import { FormEvent, useState } from "react";
import { Right, errorMessage, send } from "@/lib/api";
import {
  Button,
  Card,
  Feedback,
  Field,
  inputClass,
  Shell,
  useResource,
} from "@/components/api/ui";
const categories = {
  saude: "Saúde",
  educacao: "Educação",
  financeiro: "Financeiro",
  tributario: "Tributário",
  transporte: "Transporte",
  trabalho: "Trabalho",
  lazer_acessibilidade: "Lazer e acessibilidade",
};
const types = {
  bpc_loas: "BPC / LOAS",
  isencao_fiscal: "Isenção fiscal",
  passe_livre: "Passe livre",
  aee: "AEE",
  prioridade_atendimento: "Prioridade de atendimento",
  cotas_trabalhistas: "Cotas trabalhistas",
  carteira_estacionamento: "Carteira de estacionamento",
  outro: "Outro",
};
export default function Rights() {
  const r = useResource<Right[]>("/rights-and-benefits");
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("saude");
  const [type, setType] = useState("outro");
  const [status, setStatus] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function reset() {
    setId(null);
    setTitle("");
    setDescription("");
    setCategory("saude");
    setType("outro");
    setStatus(1);
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await send(
        id === null ? "/rights-and-benefits" : `/rights-and-benefits/${id}`,
        id === null ? "POST" : "PATCH",
        {
          title: title.trim(),
          descript: description.trim(),
          category,
          type,
          status,
        },
      );
      r.reload();
      reset();
      setSuccess("Registro salvo.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function remove(right: Right) {
    if (busy || !confirm("Excluir este registro?")) return;
    setBusy(true);
    setError("");
    try {
      await send(`/rights-and-benefits/${right.idRightsAndBenefits}`, "DELETE");
      r.reload();
      if (id === right.idRightsAndBenefits) reset();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Shell
      title="Direitos e benefícios"
      description="Registre e acompanhe os direitos e benefícios da sua família. Os registros são pessoais e não confirmam elegibilidade ou concessão."
    >
      <Feedback
        busy={r.loading}
        error={r.error || error}
        success={success}
        retry={r.reload}
      />
      <Card>
        <h2 className="text-xl font-extrabold">
          {id === null ? "Novo registro" : "Editar registro"}
        </h2>
        <form onSubmit={save} className="elara-form-grid">
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
          <Field label="Categoria">
            <select
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.entries(categories).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tipo">
            <select
              className={inputClass}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {Object.entries(types).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Situação do registro">
            <select
              className={inputClass}
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </select>
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
          <div className="elara-actions elara-actions-end">
            <Button type="submit" disabled={busy}>
              {busy ? "Salvando…" : "Salvar registro"}
            </Button>
            {id !== null && (
              <Button onClick={reset} disabled={busy}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>
      {r.data?.length === 0 && (
        <Card>Nenhum direito ou benefício registrado.</Card>
      )}
      {r.data?.map((right) => (
        <Card key={right.idRightsAndBenefits}>
          <h2 className="text-xl font-extrabold">{right.title}</h2>
          <p>
            {categories[right.category as keyof typeof categories] ??
              right.category}{" "}
            · {right.status ? "Ativo" : "Inativo"}
          </p>
          <p>{right.descript}</p>
          <div className="elara-actions">
            <Button
              disabled={busy}
              onClick={() => {
                setId(right.idRightsAndBenefits);
                setTitle(right.title);
                setDescription(right.descript);
                setCategory(right.category);
                setType(right.type);
                setStatus(right.status);
              }}
            >
              Editar
            </Button>
            <Button disabled={busy} onClick={() => remove(right)}>
              Excluir
            </Button>
          </div>
        </Card>
      ))}
    </Shell>
  );
}
