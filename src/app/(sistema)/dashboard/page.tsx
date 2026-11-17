
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  api,
  Appointment,
  Child,
  Prescription,
  User,
  dateLabel,
} from "@/lib/api";
import Icon, { IconName } from "@/components/Icon";
import { Card, Feedback, Shell } from "@/components/api/ui";

type DashboardData = {
  user: User;
  children: Child[];
  appointments: Appointment[];
  prescriptions: Prescription[];
};

const shortcuts: {
  href: string;
  title: string;
  description: string;
  icon: IconName;
}[] = [
  {
    href: "/crianca",
    title: "Dados da criança",
    description: "Cadastro e prontuário",
    icon: "children",
  },
  {
    href: "/cuidados",
    title: "Cuidados e medicamentos",
    description: "Acompanhamento da rotina",
    icon: "care",
  },
  {
    href: "/biblioteca",
    title: "Conteúdos e documentos",
    description: "Informação ao seu alcance",
    icon: "library",
  },
  {
    href: "/forum",
    title: "Rede de apoio",
    description: "Experiências compartilhadas",
    icon: "forum",
  },
];

// CARROSSEL DE ANÚNCIOS
const anuncios = [
  {
    imagem: "/banner-principal.png",
    titulo: "Anuncie no ELARA",
  },
  {
    imagem: "/banner-terapia.png",
    titulo: "Apoio e cuidado",
  },
  {
    imagem: "/banner-atividades.png",
    titulo: "Atividades e desenvolvimento",
  },
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [now] = useState(() => Date.now());

  // CONTROLE DO CARROSSEL
  const [anuncioAtual, setAnuncioAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnuncioAtual(
        (atual) => (atual + 1) % anuncios.length
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  function mudarAnuncio(direcao: number) {
    setAnuncioAtual(
      (atual) =>
        (atual + direcao + anuncios.length) % anuncios.length
    );
  }

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
            .map(async (c) => {
              const [appointments, prescriptions] = await Promise.all([
                api<Appointment[]>(
                  `/children/${c.idChildren}/appointments`
                ),
                api<Prescription[]>(
                  `/children/${c.idChildren}/prescriptions`
                ),
              ]);

              return { appointments, prescriptions };
            }),
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

  const future =
    data?.appointments
      .filter(
        (a) =>
          !["cancelado", "concluido"].includes(a.status) &&
          new Date(a.appointmentDateTime).getTime() >= now,
      )
      .sort((a, b) =>
        a.appointmentDateTime.localeCompare(b.appointmentDateTime),
      ) ?? [];

  const next = future[0];

  const today =
    data?.appointments.filter(
      (a) =>
        new Date(a.appointmentDateTime).toLocaleDateString() ===
        new Date(now).toLocaleDateString(),
    ) ?? [];

  return (
    <Shell
      title={
        data
          ? `Olá, ${data.user.name.trim().split(" ")[0]}`
          : "Visão geral"
      }
      description="Uma visão clara da rotina, dos compromissos e das informações da sua família."
    >
      <section className="elara-dashboard-hero">
        <div>
          <p className="elara-hero-label">
            CUIDANDO DE QUEM CUIDA
          </p>

          <h2>
            O cuidado começa
            <br />
            com espaço para você.
          </h2>

          <p>
            Organize o que importa e acompanhe cada etapa,
            no seu tempo.
          </p>

          <Link href="/agenda" className="elara-hero-link">
            Organizar minha agenda
            <Icon name="arrow" size={17} />
          </Link>
        </div>

        <div className="elara-hero-side">
          <span>SEU DIA, COM MAIS CLAREZA</span>

          <p>
            Rotina.
            <br />
            Informação.
            <br />
            Apoio.
          </p>

          <div className="elara-hero-date">
            <Icon name="calendar" size={16} />

            {new Date(now).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>
      </section>

      {/* CARROSSEL DE ANÚNCIOS - NOVO */}
      <section
        aria-label="Anúncios ELARA"
        className="relative my-6 overflow-hidden rounded-[24px] bg-[#E7F0F4]"
      >
        <div className="relative h-[190px] sm:h-[280px] lg:h-[340px]">
          {anuncios.map((anuncio, index) => (
            <div
              key={index}
              aria-hidden={index !== anuncioAtual}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === anuncioAtual
                  ? "z-10 opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div
                role="img"
                aria-label={anuncio.titulo}
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${anuncio.imagem}")`,
                }}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => mudarAnuncio(-1)}
          aria-label="Anúncio anterior"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#34474E] shadow-md transition hover:bg-white"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={() => mudarAnuncio(1)}
          aria-label="Próximo anúncio"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#34474E] shadow-md transition hover:bg-white"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {anuncios.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setAnuncioAtual(index)}
              aria-label={`Mostrar anúncio ${index + 1}`}
              aria-current={
                index === anuncioAtual ? "true" : undefined
              }
              className={`h-2 rounded-full transition-all ${
                anuncioAtual === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>
      {/* FIM DO CARROSSEL */}

      <Feedback
        busy={!data && !error}
        error={error}
        retry={() => {
          setError("");
          setRevision((n) => n + 1);
        }}
      />

      <div className="elara-stats-grid">
        {[
          {
            title: "Crianças cadastradas",
            value: data ? String(data.children.length) : "—",
            detail: "Informações da família",
            href: "/crianca",
            icon: "children" as IconName,
          },
          {
            title: "Próximos compromissos",
            value: data ? String(future.length) : "—",
            detail: "Sua agenda organizada",
            href: "/agenda",
            icon: "calendar" as IconName,
          },
          {
            title: "Prescrições em uso",
            value: data
              ? String(
                  data.prescriptions.filter(
                    (p) => p.status === 1
                  ).length
                )
              : "—",
            detail: "Acompanhamento dos cuidados",
            href: "/cuidados",
            icon: "care" as IconName,
          },
        ].map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="elara-stat"
          >
            <div className="elara-stat-top">
              <p>{stat.title}</p>
              <Icon name={stat.icon} size={19} />
            </div>

            <strong>{stat.value}</strong>

            <div className="elara-stat-bottom">
              <span>{stat.detail}</span>
              <Icon name="arrow" size={16} />
            </div>
          </Link>
        ))}
      </div>

      <div className="elara-dashboard-grid">
        <Card className="elara-schedule-card">
          <div className="elara-section-heading">
            <div>
              <p className="elara-section-label">
                PLANEJAMENTO
              </p>
              <h2>Sua agenda</h2>
            </div>

            <Link
              href="/agenda"
              className="elara-text-link"
            >
              Ver agenda
              <Icon name="arrow" size={15} />
            </Link>
          </div>

          {next ? (
            <div className="elara-next-appointment">
              <span className="elara-appointment-symbol">
                <Icon name="calendar" size={22} />
              </span>

              <div>
                <span className="elara-section-label">
                  PRÓXIMO COMPROMISSO
                </span>

                <h3>{next.reason}</h3>

                <p>
                  {dateLabel(next.appointmentDateTime)} ·{" "}
                  {next.local}
                </p>
              </div>
            </div>
          ) : (
            <div className="elara-empty-state">
              <span className="elara-empty-symbol">
                <Icon name="calendar" size={26} />
              </span>

              <h3>
                {data
                  ? "Seu próximo compromisso começa aqui"
                  : "Sua rotina, em um só lugar"}
              </h3>

              <p>
                {data
                  ? "Adicione consultas, terapias e outras atividades para acompanhar a semana."
                  : "Quando seus dados estiverem disponíveis, os compromissos aparecerão neste espaço."}
              </p>

              <Link
                href="/agenda"
                className="elara-button elara-button-primary"
              >
                <Icon name="plus" size={17} />
                Abrir agenda
              </Link>
            </div>
          )}

          {!!today.length && (
            <div className="elara-today-list">
              <p className="elara-section-label">HOJE</p>

              {today.map((a) => (
                <div
                  className="elara-today-row"
                  key={a.idAppointments}
                >
                  <time>
                    {new Date(
                      a.appointmentDateTime
                    ).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>

                  <div>
                    <strong>{a.reason}</strong>
                    <p>{a.local}</p>
                  </div>

                  <span>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="elara-shortcuts-card">
          <div className="elara-section-heading">
            <div>
              <p className="elara-section-label">
                ACESSO RÁPIDO
              </p>
              <h2>O que você precisa?</h2>
            </div>
          </div>

          <div className="elara-shortcut-list">
            {shortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="elara-shortcut"
              >
                <span className="elara-shortcut-icon">
                  <Icon name={item.icon} size={19} />
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <Icon name="chevron" size={16} />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <section className="elara-assistant-strip">
        <div className="elara-assistant-label">
          <span>
            <Icon name="assistant" size={22} />
          </span>

          <div>
            <h2>
              Um apoio para as dúvidas do dia a dia.
            </h2>

            <p>
              Converse com o assistente ELARA sobre
              organização e cuidado.
            </p>
          </div>
        </div>

        <Link
          href="/ia"
          className="elara-button elara-button-secondary"
        >
          Conversar com o assistente
          <Icon name="arrow" size={16} />
        </Link>
      </section>
    </Shell>
  );
}
