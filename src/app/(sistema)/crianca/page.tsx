"use client";
import { FormEvent, useState } from "react";
import { Child, Clinical, errorMessage, send } from "@/lib/api";
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
type Relationship = { idRelationship: number; relationship: string };
type Diagnosis = { idDiagnoses: number; nameDiagnosis: string };
type Therapy = { idTherapy: number; nameTherapy: string };
type Allergy = { idAllergies: number; allergenName: string };
function ChildForm({
  child,
  relationships,
  diagnoses,
  saved,
  cancel,
}: {
  child?: Child;
  relationships: Relationship[];
  diagnoses: Diagnosis[];
  saved: (child: Child) => void;
  cancel: () => void;
}) {
  const [name, setName] = useState(child?.name ?? "");
  const [dob, setDob] = useState(child?.dob.slice(0, 10) ?? "");
  const [relationship, setRelationship] = useState(
    child?.relationshipIdRelationship ?? 0,
  );
  const [diagnosis, setDiagnosis] = useState(child?.diagnosesIdDiagnoses ?? 0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const payload = {
        name: name.trim(),
        dob,
        relationshipIdRelationship: relationship,
        ...(diagnosis ? { diagnosesIdDiagnoses: diagnosis } : {}),
      };
      const result = await send<Child>(
        child ? `/children/${child.idChildren}` : "/children",
        child ? "PATCH" : "POST",
        payload,
      );
      saved(result);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card>
      <h2 className="text-xl font-extrabold">
        {child ? "Dados da criança" : "Cadastrar criança"}
      </h2>
      <form onSubmit={save} className="elara-form-grid">
        <Field label="Nome">
          <input
            required
            minLength={2}
            maxLength={200}
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field label="Nascimento">
          <input
            required
            type="date"
            className={inputClass}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Field>
        <Field label="Seu parentesco">
          <select
            required
            className={inputClass}
            value={relationship}
            onChange={(e) => setRelationship(Number(e.target.value))}
          >
            <option value={0} disabled>
              Selecione
            </option>
            {relationships.map((r) => (
              <option key={r.idRelationship} value={r.idRelationship}>
                {r.relationship}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Diagnóstico">
          <select
            className={inputClass}
            value={diagnosis}
            onChange={(e) => setDiagnosis(Number(e.target.value))}
          >
            <option value={0} disabled={!!child?.diagnosesIdDiagnoses}>
              Não informado
            </option>
            {diagnoses.map((d) => (
              <option key={d.idDiagnoses} value={d.idDiagnoses}>
                {d.nameDiagnosis}
              </option>
            ))}
          </select>
        </Field>
        <div className="elara-form-footer">
          <Feedback error={error} />
          <div className="elara-actions">
            <Button type="submit" disabled={busy || !relationship}>
              {busy ? "Salvando…" : "Salvar dados"}
            </Button>
            <Button onClick={cancel} disabled={busy}>
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
function ClinicalForm({
  child,
  clinical,
  refresh,
}: {
  child: Child;
  clinical: Clinical | null;
  refresh: () => void;
}) {
  const [family, setFamily] = useState(clinical?.familyHistory ?? "");
  const [observations, setObservations] = useState(
    clinical?.observations ?? "",
  );
  const [therapy, setTherapy] = useState(clinical?.therapyIdTherapy ?? 0);
  const [allergy, setAllergy] = useState(clinical?.allergiesIdAllergies ?? 0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const therapies = useResource<Therapy[]>("/therapies");
  const allergies = useResource<Allergy[]>("/allergies");
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await send(
        `/children/${child.idChildren}/clinical-data`,
        clinical ? "PATCH" : "POST",
        {
          familyHistory: family.trim(),
          observations: observations.trim(),
          ...(therapy ? { therapyIdTherapy: therapy } : {}),
          ...(allergy ? { allergiesIdAllergies: allergy } : {}),
        },
      );
      setSuccess("Prontuário salvo.");
      refresh();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card>
      <h2 className="text-xl font-extrabold">Prontuário de {child.name}</h2>
      <p className="text-sm">
        Preencha o prontuário para cadastrar consultas e prescrições.
      </p>
      <Feedback error={therapies.error || allergies.error} />
      <form onSubmit={save} className="elara-form-grid">
        <Field label="Histórico familiar">
          <textarea
            required
            minLength={2}
            maxLength={100}
            className={inputClass}
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
        </Field>
        <Field label="Observações">
          <textarea
            required
            minLength={2}
            maxLength={300}
            className={inputClass}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Field>
        <Field label="Terapia">
          <select
            className={inputClass}
            value={therapy}
            onChange={(e) => setTherapy(Number(e.target.value))}
          >
            <option value={0} disabled={!!clinical?.therapyIdTherapy}>
              Não informada
            </option>
            {therapies.data?.map((t) => (
              <option key={t.idTherapy} value={t.idTherapy}>
                {t.nameTherapy}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Alergia">
          <select
            className={inputClass}
            value={allergy}
            onChange={(e) => setAllergy(Number(e.target.value))}
          >
            <option value={0} disabled={!!clinical?.allergiesIdAllergies}>
              Não informada
            </option>
            {allergies.data?.map((a) => (
              <option key={a.idAllergies} value={a.idAllergies}>
                {a.allergenName}
              </option>
            ))}
          </select>
        </Field>
        <div className="elara-form-footer">
          <Feedback error={error} success={success} />
          <Button type="submit" disabled={busy}>
            {busy ? "Salvando…" : "Salvar prontuário"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
export default function ChildrenPage() {
  const r = useChildren();
  const [newChild, setNewChild] = useState(false);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const relationships = useResource<Relationship[]>("/relationships");
  const diagnoses = useResource<Diagnosis[]>("/diagnoses");
  const clinical = useResource<Clinical>(
    r.child?.clinicalDataIdClinicalData
      ? `/children/${r.selected}/clinical-data`
      : null,
  );
  return (
    <Shell
      title="Crianças"
      description="Organize os dados e o prontuário de cada criança."
    >
      <Feedback
        busy={r.loading || relationships.loading || diagnoses.loading}
        error={r.error || relationships.error || diagnoses.error}
        success={success}
        retry={() => {
          r.reload();
          relationships.reload();
          diagnoses.reload();
        }}
      />
      <Card>
        <ChildPicker
          childrenList={r.children}
          selected={r.selected}
          onChange={(id) => {
            r.setSelected(id);
            setEditing(false);
            setNewChild(false);
            setSuccess("");
          }}
        />
        <div className="elara-actions">
          <Button
            onClick={() => {
              setNewChild(true);
              setEditing(false);
            }}
          >
            Cadastrar criança
          </Button>
          {r.child && (
            <Button
              onClick={() => {
                setEditing(true);
                setNewChild(false);
              }}
            >
              Editar dados
            </Button>
          )}
        </div>
      </Card>
      {(newChild || editing) && (
        <ChildForm
          key={newChild ? "new" : r.selected}
          child={newChild ? undefined : r.child}
          relationships={relationships.data ?? []}
          diagnoses={diagnoses.data ?? []}
          cancel={() => {
            setEditing(false);
            setNewChild(false);
          }}
          saved={(child) => {
            r.setSelected(child.idChildren);
            r.reload();
            setNewChild(false);
            setEditing(false);
            setSuccess("Dados da criança salvos.");
          }}
        />
      )}
      {r.child && !newChild && !editing && (
        <>
          <Card>
            <h2 className="text-xl font-extrabold">{r.child.name}</h2>
            <p>
              Nascimento:{" "}
              {r.child.dob.slice(0, 10).split("-").reverse().join("/")}
            </p>
            <p>
              Diagnóstico:{" "}
              {diagnoses.data?.find(
                (d) => d.idDiagnoses === r.child?.diagnosesIdDiagnoses,
              )?.nameDiagnosis ?? "Não informado"}
            </p>
          </Card>
          <Feedback
            busy={clinical.loading}
            error={clinical.error}
            retry={clinical.reload}
          />
          {!clinical.loading && !clinical.error && (
            <ClinicalForm
              key={`${r.selected}-${!!r.child.clinicalDataIdClinicalData}`}
              child={r.child}
              clinical={clinical.data}
              refresh={() => {
                r.reload();
                clinical.reload();
                setSuccess("Prontuário salvo.");
              }}
            />
          )}
        </>
      )}
      <Card>
        <p className="text-sm">
          Escola e CID ainda aguardam campos próprios no servidor. O responsável
          é identificado pela conta conectada. O prontuário atual aceita uma
          terapia e uma alergia por criança.
        </p>
      </Card>
    </Shell>
  );
}
