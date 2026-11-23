"use client";
import { FormEvent, useState } from "react";
import { Child, Prescription, Medication, errorMessage, send } from "@/lib/api";
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
function Prescriptions({ child }: { child: Child }) {
  const r = useResource<Prescription[]>(
    `/children/${child.idChildren}/prescriptions`,
  );
  const meds = useResource<Medication[]>("/medications");
  const [editing, setEditing] = useState<number | null>(null);
  const [medication, setMedication] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function reset() {
    setEditing(null);
    setMedication(0);
    setFrequency("");
    setStart("");
    setEnd("");
    setStatus(1);
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setSuccess("");
    if (!medication || end < start) {
      setError("Selecione o medicamento e informe um período válido.");
      return;
    }
    setBusy(true);
    try {
      await send(
        `/children/${child.idChildren}/prescriptions${editing === null ? "" : `/${editing}`}`,
        editing === null ? "POST" : "PATCH",
        {
          ...(editing === null
            ? { medicationsIdCurrentMedications: medication }
            : {}),
          frequency: frequency.trim(),
          status,
          startDate: start,
          endDate: end,
        },
      );
      r.reload();
      reset();
      setSuccess("Prescrição salva.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  async function remove(id: number) {
    if (busy || !confirm("Excluir esta prescrição?")) return;
    setBusy(true);
    setError("");
    try {
      await send(`/children/${child.idChildren}/prescriptions/${id}`, "DELETE");
      r.reload();
      if (editing === id) reset();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Feedback
        busy={r.loading || meds.loading}
        error={r.error || meds.error}
        retry={() => {
          r.reload();
          meds.reload();
        }}
      />
      <Feedback error={error} success={success} />
      <Card>
        <h2 className="text-xl font-extrabold">
          {editing === null ? "Registrar prescrição" : "Editar prescrição"}
        </h2>
        <p className="text-sm">
          Registre apenas prescrições orientadas pela equipe de saúde.
        </p>
        <form onSubmit={save} className="elara-form-grid">
          <Field label="Medicamento">
            <select
              required
              disabled={editing !== null}
              className={inputClass}
              value={medication}
              onChange={(e) => setMedication(Number(e.target.value))}
            >
              <option value={0} disabled>
                Selecione
              </option>
              {meds.data?.map((m) => (
                <option
                  key={m.idCurrentMedications}
                  value={m.idCurrentMedications}
                >
                  {m.medicineName} — {m.route}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Frequência prescrita">
            <input
              required
              minLength={2}
              maxLength={45}
              className={inputClass}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </Field>
          <Field label="Início">
            <input
              required
              type="date"
              className={inputClass}
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Field>
          <Field label="Fim">
            <input
              required
              type="date"
              min={start}
              className={inputClass}
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Field>
          <Field label="Situação">
            <select
              className={inputClass}
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <option value={1}>Em uso</option>
              <option value={0}>Suspenso / inativo</option>
            </select>
          </Field>
          <div className="elara-actions elara-actions-end">
            <Button type="submit" disabled={busy || !medication}>
              {busy ? "Salvando…" : "Salvar prescrição"}
            </Button>
            {editing !== null && (
              <Button onClick={reset} disabled={busy}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>
      {!r.loading && !r.error && !r.data?.length && (
        <Card>Nenhuma prescrição cadastrada.</Card>
      )}
      {r.data?.map((p) => {
        const m = meds.data?.find(
          (m) => m.idCurrentMedications === p.medicationsIdCurrentMedications,
        );
        return (
          <Card key={p.medicationsIdCurrentMedications}>
            <h2 className="text-xl font-extrabold">
              {m?.medicineName ??
                `Medicamento ${p.medicationsIdCurrentMedications}`}
            </h2>
            <p>
              {p.frequency} · {p.status === 1 ? "Em uso" : "Inativo"}
            </p>
            <p>
              {p.startDate.slice(0, 10)} até {p.endDate.slice(0, 10)}
            </p>
            {m && (
              <p>
                {m.route} · {m.instructions}
              </p>
            )}
            <div className="elara-actions">
              <Button
                disabled={busy}
                onClick={() => {
                  setEditing(p.medicationsIdCurrentMedications);
                  setMedication(p.medicationsIdCurrentMedications);
                  setFrequency(p.frequency);
                  setStart(p.startDate.slice(0, 10));
                  setEnd(p.endDate.slice(0, 10));
                  setStatus(p.status);
                }}
              >
                Editar
              </Button>
              <Button
                disabled={busy}
                onClick={() => remove(p.medicationsIdCurrentMedications)}
              >
                Excluir
              </Button>
            </div>
          </Card>
        );
      })}
    </>
  );
}

type CareItem = { idCareItem: number; kind: "alimentacao" | "horario"; title: string; details: string; time: string | null; weekdays: string | null };
function CarePlanner({ child }: { child: Child }) {
  const items = useResource<CareItem[]>(`/children/${child.idChildren}/care`);
  const [kind, setKind] = useState<CareItem["kind"]>("alimentacao");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [time, setTime] = useState("");
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await send(`/children/${child.idChildren}/care`, "POST", {
        kind, title: title.trim(), details: details.trim(),
        ...(time ? { time } : {}),
        ...(weekdays.length ? { weekdays: weekdays.join(",") } : {}),
      });
      setTitle(""); setDetails(""); setTime(""); setWeekdays([]); items.reload();
    } catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  }
  async function remove(id: number) {
    setBusy(true); setError("");
    try { await send(`/children/${child.idChildren}/care/${id}`, "DELETE"); items.reload(); }
    catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  }
  return <>
    <Feedback busy={items.loading} error={items.error || error} retry={items.reload} />
    <Card>
      <h2 className="text-xl font-extrabold">Alimentação e horários</h2>
      <p className="text-sm">Anote preferências, restrições e horários importantes de {child.name}.</p>
      <form onSubmit={save} className="elara-form-grid">
        <Field label="Tipo"><select className={inputClass} value={kind} onChange={(e) => setKind(e.target.value as CareItem["kind"])}><option value="alimentacao">Alimentação</option><option value="horario">Horário / rotina</option></select></Field>
        <Field label={kind === "alimentacao" ? "Alimento ou orientação" : "Atividade"}><input required minLength={2} maxLength={120} className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="Detalhes"><textarea required maxLength={500} className={inputClass} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Ex.: evitar lactose; levar lanche de casa" /></Field>
        <Field label="Horário (opcional)"><input type="time" className={inputClass} value={time} onChange={(e) => setTime(e.target.value)} /></Field>
        <Field label="Dias (opcional)"><div className="flex flex-wrap gap-3">{days.map((day) => <label key={day} className="flex items-center gap-1 text-sm"><input type="checkbox" checked={weekdays.includes(day)} onChange={(e) => setWeekdays((current) => e.target.checked ? [...current, day] : current.filter((d) => d !== day))} />{day}</label>)}</div></Field>
        <Button type="submit" disabled={busy}>{busy ? "Salvando…" : "Adicionar à rotina"}</Button>
      </form>
    </Card>
    {items.data?.map((item) => <Card key={item.idCareItem}>
      <div className="flex items-start justify-between gap-4"><div><h3 className="font-bold">{item.title}</h3><p className="text-sm">{item.details}</p><p className="text-xs">{item.kind === "alimentacao" ? "Alimentação" : "Rotina"}{item.time ? ` · ${item.time}` : ""}{item.weekdays ? ` · ${item.weekdays}` : ""}</p></div><Button disabled={busy} onClick={() => remove(item.idCareItem)}>Excluir</Button></div>
    </Card>)}
  </>;
}
export default function Care() {
  const r = useChildren();
  return (
    <Shell
      title="Cuidados"
      description="Acompanhe os medicamentos prescritos para cada criança."
    >
      <Feedback busy={r.loading} error={r.error} retry={r.reload} />
      <Card>
        <ChildPicker
          childrenList={r.children}
          selected={r.selected}
          onChange={r.setSelected}
        />
      </Card>
      {r.child && <CarePlanner key={`care-${r.selected}`} child={r.child} />}
      {r.child?.clinicalDataIdClinicalData ? (
        <Prescriptions key={`prescriptions-${r.selected}`} child={r.child} />
      ) : (
        !r.loading && r.child && <Card>Cadastre o prontuário na página Crianças antes de registrar prescrições.</Card>
      )}
    </Shell>
  );
}
