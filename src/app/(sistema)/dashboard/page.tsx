"use client";

import Link from "next/link";
import Image from "next/image";
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

  const [anuncioAtual, setAnuncioAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [mouseSobre, setMouseSobre] = useState(false);
  const [focoDentro, setFocoDentro] = useState(false);

  useEffect(() => {
    if (pausado || mouseSobre || focoDentro) return;

    const movimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (movimento.matches) return;

    const intervalo = window.setInterval(() => {
      if (!document.hidden && !movimento.matches) {
        setAnuncioAtual((atual) => (atual + 1) % anuncios.length);
      }
    }, 6000);

    return () => window.clearInterval(intervalo);
  }, [pausado, mouseSobre, focoDentro]);

  function mudarAnuncio(direcao: number) {
    setPausado(true);
    setAnuncioAtual(
      (atual) => (atual + direcao + anuncios.length) % anuncios.length,
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
                  `/children/${c.idChildren}/appointments`,
                ),
                api<Prescription[]>(
                  `/children/${c.idChildren}/prescriptions`,
                ),
              ]);

              return { appointments, prescriptions };
            }),
        );

        if (active) {
          setData({
            user,
            children,
            appointments: lists.flatMap((l) => l.appointments),
            prescriptions: lists.flatMap((l) => l.prescriptions),
          });
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar o resumo.",
          );
        }
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

  const anuncio = anuncios[anuncioAtual];

  return (
    <Shell
      title={
        data
          ? `Olá, ${data.user.name.trim().split(" ")[0]}`
          : "Visão geral"
      }
      description="Uma visão clara da rotina, dos compromissos e das informações da sua família."
    >
      {/* ANÚNCIOS */}

      <section
        className="dashboard-anuncios"
        aria-label="Anúncios ELARA"
        aria-roledescription="carrossel"
        onMouseEnter={() => setMouseSobre(true)}
        onMouseLeave={() => setMouseSobre(false)}
        onFocusCapture={() => setFocoDentro(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null,
            )
          ) {
            setFocoDentro(false);
          }
        }}
      >
        <div className="dashboard-banner">
          <Image
            key={anuncio.imagem}
            src={anuncio.imagem}
            alt={anuncio.titulo}
            width={2172}
            height={724}
            sizes="(max-width: 768px) 100vw, 1300px"
            unoptimized
            priority={anuncioAtual === 0}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="dashboard-anuncios-controles">
          <button
            type="button"
            className="dashboard-anuncio-seta"
            onClick={() => mudarAnuncio(-1)}
            aria-label="Anúncio anterior"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div
            className="dashboard-anuncios-indicadores"
            role="group"
            aria-label="Escolher anúncio"
          >
            {anuncios.map((item, index) => (
              <button
                key={item.imagem}
                type="button"
                onClick={() => {
                  setPausado(true);
                  setAnuncioAtual(index);
                }}
                aria-label={`Mostrar anúncio ${index + 1}: ${item.titulo}`}
                aria-current={
                  index === anuncioAtual ? "true" : undefined
                }
                className="dashboard-anuncio-indicador"
              >
                <span />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="dashboard-anuncio-seta"
            onClick={() => mudarAnuncio(1)}
            aria-label="Próximo anúncio"
          >
            <span aria-hidden="true">›</span>
          </button>

          <button
            type="button"
            className="dashboard-anuncio-pausa"
            onClick={() => setPausado((atual) => !atual)}
            aria-label={
              pausado
                ? "Retomar troca automática dos anúncios"
                : "Pausar troca automática dos anúncios"
            }
          >
            {pausado ? "Reproduzir" : "Pausar"}
          </button>
        </div>
      </section>

      <Feedback
        busy={!data && !error}
        error={error}
        retry={() => {
          setError("");
          setRevision((n) => n + 1);
        }}
      />

      {/* RESUMO */}

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
                  data.prescriptions.filter((p) => p.status === 1)
                    .length,
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
        {/* AGENDA */}

        <Card className="elara-schedule-card">
          <div className="elara-section-heading">
            <div>
              <p className="elara-section-label">PLANEJAMENTO</p>
              <h2>Sua agenda</h2>
            </div>

            <Link href="/agenda" className="elara-text-link">
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
                  {dateLabel(next.appointmentDateTime)} · {next.local}
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
                      a.appointmentDateTime,
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

        {/* ACESSO RÁPIDO */}

        <Card className="elara-shortcuts-card">
          <div className="elara-section-heading">
            <div>
              <p className="elara-section-label">ACESSO RÁPIDO</p>
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

      {/* ASSISTENTE */}

      <section className="elara-assistant-strip">
        <div className="elara-assistant-label">
          <span>
            <Icon name="assistant" size={22} />
          </span>

          <div>
            <h2>Um apoio para as dúvidas do dia a dia.</h2>
            <p>
              Converse com o assistente ELARA sobre organização e
              cuidado.
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

      <style jsx>{`
        .dashboard-anuncios {
          width: 100%;
          min-width: 0;
          margin-bottom: 24px;
        }

        .dashboard-banner {
          width: 100%;
          overflow: hidden;
          border: 1px solid var(--elara-borda, #e6e4df);
          border-radius: 14px;
          background: var(--elara-superficie, #ffffff);
        }

        .dashboard-anuncios-controles {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 10px;
        }

        .dashboard-anuncio-seta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid var(--elara-borda, #e6e4df);
          border-radius: 8px;
          background: var(--elara-superficie, #ffffff);
          color: var(--elara-texto, #34474e);
          font-size: 25px;
          cursor: pointer;
        }

        .dashboard-anuncio-seta:hover {
          background: var(--elara-offwhite, #faf8f5);
        }

        .dashboard-anuncios-indicadores {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .dashboard-anuncio-indicador {
          display: grid;
          place-items: center;
          width: 32px;
          height: 40px;
          padding: 0;
          border: 0;
          border-radius: 6px;
          background: transparent;
          cursor: pointer;
        }

        .dashboard-anuncio-indicador span {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 10px;
          background: #b7bfbe;
        }

        .dashboard-anuncio-indicador[aria-current="true"] span {
          width: 24px;
          background: var(--elara-terracota, #d97d64);
        }

        .dashboard-anuncio-pausa {
          min-height: 40px;
          padding: 8px;
          border: 0;
          border-radius: 6px;
          background: transparent;
          color: var(--elara-texto-secundario, #687578);
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .dashboard-anuncios button:focus-visible {
          outline: 2px solid var(--elara-terracota, #d97d64);
          outline-offset: 3px;
        }

        @media (max-width: 640px) {
          .dashboard-banner {
            border-radius: 10px;
          }

          .dashboard-anuncios-controles {
            gap: 6px;
          }
        }
      `}</style>
    </Shell>
  );
}
