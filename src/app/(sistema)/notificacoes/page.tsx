"use client";
import { useEffect, useState } from "react";
import {
  api,
  Calendar,
  Notice,
  dateLabel,
  errorMessage,
  send,
} from "@/lib/api";
import { Button, Card, Feedback, Shell } from "@/components/api/ui";
export default function Notices() {
  const [data, setData] = useState<Notice[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const calendars = await api<Calendar[]>("/calendar");
        const lists = await Promise.all(
          calendars.map((c) =>
            api<Notice[]>(`/notify/calendar/${c.idCalendar}`),
          ),
        );
        if (active)
          setData(
            lists
              .flat()
              .sort((a, b) => b.notifyDate.localeCompare(a.notifyDate)),
          );
      } catch (err) {
        if (active) setError(errorMessage(err));
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [revision]);
  async function remove(id: number) {
    if (busy || !confirm("Excluir este lembrete?")) return;
    setBusy(true);
    setError("");
    try {
      await send(`/notify/${id}`, "DELETE");
      setData((items) => items?.filter((n) => n.idNotify !== id) ?? null);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Shell
      title="Notificações"
      description="Lembretes cadastrados no servidor para os compromissos da sua família."
    >
      <Feedback
        busy={data === null && !error}
        error={error}
        retry={() => {
          setError("");
          setRevision((n) => n + 1);
        }}
      />
      {data?.length === 0 && <Card>Nenhum lembrete cadastrado.</Card>}
      {data?.map((n) => (
        <Card key={n.idNotify}>
          <h2 className="text-xl font-extrabold">{n.descript}</h2>
          <p>{dateLabel(n.notifyDate)}</p>
          <p>{n.sent ? "Enviado" : "Envio pendente"}</p>
          <Button onClick={() => remove(n.idNotify)} disabled={busy}>
            Excluir lembrete
          </Button>
        </Card>
      ))}
      <p className="text-sm text-[var(--elara-texto-secundario)]">
        O servidor informa o envio dos lembretes, mas ainda não registra se
        foram lidos.
      </p>
    </Shell>
  );
}
