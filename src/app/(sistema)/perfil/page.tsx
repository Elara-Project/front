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
  const [cpf, setCpf] = useState(user.cpf ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
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
        cpf: cpf.trim(),
        phone: phone.trim(),
      });
      saveUser(result);
      setSuccess("Perfil atualizado.");
      setName(result.name);
      setEmail(result.email);
      setCpf(result.cpf ?? "");
      setPhone(result.phone ?? "");
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
        <Field label="CPF">
          <input
            inputMode="numeric"
            autoComplete="off"
            maxLength={14}
            placeholder="000.000.000-00"
            className={inputClass}
            value={cpf}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
              const formatted = digits
                .replace(/^(\d{3})(\d)/, "$1.$2")
                .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1-$2");
              setCpf(formatted);
            }}
          />
        </Field>
        <Field label="Telefone">
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="(00) 00000-0000"
            className={inputClass}
            value={phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
              const formatted = digits.length <= 10
                ? digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
                : digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
              setPhone(formatted);
            }}
          />
        </Field>
        <Feedback error={error} success={success} />
        <Button type="submit" disabled={busy}>
          {busy ? "Salvando…" : "Salvar perfil"}
        </Button>
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
