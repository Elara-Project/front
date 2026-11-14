"use client";
import Link from "next/link";
import { Appointment, Child, Prescription, User, dateLabel } from "@/lib/api";
import { Card, Feedback, Shell } from "@/components/api/ui";
type DashboardData = {
  user: User;
  children: Child[];
  appointments: Appointment[];
  prescriptions: Prescription[];
};
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [now] = useState(() => Date.now());
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [user, children] = await Promise.all([
          api<User>("/users/me"),
          api<Child[]>("/children"),
        ]);
        const lists = await Promise.all(
          children
            .filter((c) => c.clinicalDataIdClinicalData)
            .map(async (c) => ({
              appointments: await api<Appointment[]>(
                `/children/${c.idChildren}/appointments`,
              ),
              prescriptions: await api<Prescription[]>(
                `/children/${c.idChildren}/prescriptions`,
              ),
            })),
        );
        if (active)
          setData({
            user,
            children,
            appointments: lists.flatMap((l) => l.appointments),
            prescriptions: lists.flatMap((l) => l.prescriptions),
          });
      } catch (err) {
        if (active)
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar o resumo.",
          );
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [revision]);
  const next = data?.appointments
    .filter(
      (a) =>
        !["cancelado", "concluido"].includes(a.status) &&
        new Date(a.appointmentDateTime).getTime() >= now,
    )
    .sort((a, b) =>
      a.appointmentDateTime.localeCompare(b.appointmentDateTime),
    )[0];
  return (
    <Shell
      title={data ? `Olá, ${data.user.name.split(" ")[0]}` : "Meu espaço"}
      description="Informações da sua família, organização e apoio em um só lugar."
    >
      <Feedback
        busy={!data && !error}
        error={error}
        retry={() => {
          setError("");
          setRevision((n) => n + 1);
        }}
      />
      {data && (
        <>
          <div className="grid gap-5 lg:grid-cols-3">
            <Card>
              <p className="font-bold text-[var(--elara-terracota)]">
                Próximo compromisso
              </p>
              <h2 className="text-2xl font-extrabold">
                {next?.reason ?? "Sem compromissos futuros"}
              </h2>
              {next && (
                <>
                  <p>{next.local}</p>
                  <p>{dateLabel(next.appointmentDateTime)}</p>
                </>
              )}
              <Link
                href="/agenda"
                className="font-bold text-[var(--elara-terracota)]"
              >
                Abrir agenda →
              </Link>
            </Card>
            <Card>
              <p className="text-4xl font-extrabold text-[var(--elara-verde-texto)]">
                {data.prescriptions.filter((p) => p.status === 1).length}
              </p>
              <h2 className="text-xl font-bold">Prescrições em uso</h2>
              <Link href="/cuidados">Ver cuidados →</Link>
            </Card>
            <Card>
              <p className="text-4xl font-extrabold text-[var(--elara-azul)]">
                {data.children.length}
              </p>
              <h2 className="text-xl font-bold">Crianças cadastradas</h2>
              <Link href="/crianca">Gerenciar crianças →</Link>
            </Card>
          </div>
          <Card>
            <h2 className="text-xl font-extrabold">Compromissos de hoje</h2>
            {data.appointments
              .filter(
                (a) =>
                  new Date(a.appointmentDateTime).toLocaleDateString() ===
                  new Date().toLocaleDateString(),
              )
              .map((a) => (
                <div
                  key={a.idAppointments}
                  className="border-b border-[var(--elara-borda)] py-3"
                >
                  <p className="font-bold">{a.reason}</p>
                  <p>
                    {dateLabel(a.appointmentDateTime)} · {a.local} · {a.status}
                  </p>
                </div>
              ))}
            {!data.appointments.some(
              (a) =>
                new Date(a.appointmentDateTime).toLocaleDateString() ===
                new Date().toLocaleDateString(),
            ) && <p>Nenhum compromisso para hoje.</p>}
          </Card>
        </>
      )}
      <div className="grid gap-5 md:grid-cols-3">
        {[
          [
            "/biblioteca",
            "Conteúdos e documentos",
            "Informação e documentos organizados.",
          ],
          [
            "/forum",
            "Fórum",
            "Compartilhe experiências nos espaços disponíveis.",
          ],
          ["/ia", "Assistente ELARA", "Tire dúvidas sobre a rotina."],
        ].map(([href, title, description]) => (
          <Card key={href}>
            <h2 className="text-xl font-extrabold">{title}</h2>
            <p>{description}</p>
            <Link
              href={href}
              className="font-bold text-[var(--elara-terracota)]"
            >
              Acessar →
            </Link>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
