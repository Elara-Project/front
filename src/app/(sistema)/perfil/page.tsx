"use client";
import { FormEvent, useState } from "react";
import { errorMessage, saveUser, send, User } from "@/lib/api";
import {
  Button,
  Card,
  Feedback,
  Field,
  inputClass,
  Shell,
  useResource,
} from "@/components/api/ui";
function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  async function save(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const result = await send<User>(`/users/${user.idUser}`, "PATCH", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      });
      saveUser(result);
      setSuccess("Perfil atualizado.");
      setName(result.name);
      setEmail(result.email);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card>
      <form onSubmit={save} className="max-w-2xl space-y-5">
        <Field label="Nome completo">
          <input
            required
            minLength={2}
            maxLength={200}
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field label="E-mail">
          <input
            required
            type="email"
            maxLength={200}
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Feedback error={error} success={success} />
        <Button type="submit" disabled={busy}>
          {busy ? "Salvando…" : "Salvar perfil"}
        </Button>
        <p className="text-sm text-[var(--elara-texto-secundario)]">
          CPF e telefone aguardam suporte no servidor. O parentesco é informado
          no cadastro da criança.
        </p>
      </form>
    </Card>
  );
}
export default function Perfil() {
  const r = useResource<User>("/users/me");
  return (
    <Shell title="Perfil" description="Consulte e atualize sua conta.">
      <Feedback busy={r.loading} error={r.error} retry={r.reload} />
      {r.data && <ProfileForm user={r.data} />}
    </Shell>
  );
}
