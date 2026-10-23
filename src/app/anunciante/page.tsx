"use client";

import Link from "next/link";

type StatusCampanha =
  | "Aprovado"
  | "Em análise"
  | "Rejeitado";

export default function AnunciantePage() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#2C3E44]">
      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-[#E8E2DC] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/anunciante"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#D97D64] font-black text-white">
              E
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-extrabold tracking-[0.1em] text-[#D97D64]">
                  ELARA
                </p>

                <span className="rounded-full bg-[#E7F0F4] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#668FA2]">
                  Anunciante
                </span>
              </div>

              <p className="text-[10px] font-semibold text-[#8A969A]">
                Central de campanhas
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-extrabold text-[#40545B]">
                Conta anunciante
              </p>

              <p className="text-[10px] text-[#89969A]">
                Gerenciamento de anúncios
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4] text-xs font-black text-[#668B9D]">
              AN
            </div>

            <Link
              href="/"
              className="hidden rounded-full border border-[#D9E2E5] bg-white px-4 py-2 text-xs font-extrabold text-[#66818B] transition hover:border-[#7FA2B8] hover:bg-[#F2F7F9] md:block"
            >
              Página inicial
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 py-6 md:px-8 md:py-8">
        {/* NAVEGAÇÃO */}

        <nav className="mb-6 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            <Link
              href="/anunciante"
              className="rounded-full bg-[#2C3E44] px-4 py-2 text-xs font-extrabold text-white"
            >
              Visão geral
            </Link>

            <a
              href="#campanhas"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Minhas campanhas
            </a>

            <Link
              href="/anunciante/novo-anuncio"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Criar campanha
            </Link>

            <a
              href="#como-funciona"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Como funciona
            </a>
          </div>
        </nav>

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[32px] bg-[#7FA2B8] p-6 text-white md:p-9">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-white/10" />

          <div className="pointer-events-none absolute -bottom-32 right-[25%] h-72 w-72 rounded-full border-[55px] border-white/10" />

          <div className="relative z-10 flex flex-col justify-between gap-8 xl:flex-row xl:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#DDEEDC]" />

                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5F0F4]">
                  Publicidade no ELARA
                </p>
              </div>

              <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Gerencie suas campanhas
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F0F6F8]">
                Crie anúncios, acompanhe o processo de análise e
                consulte quais campanhas estão disponíveis para
                exibição na plataforma.
              </p>
            </div>

            <Link
              href="/anunciante/novo-anuncio"
              className="w-fit rounded-full bg-[#D97D64] px-6 py-3 text-xs font-extrabold text-white shadow-[0_8px_25px_rgba(75,80,82,0.15)] transition hover:-translate-y-0.5 hover:bg-[#CA7059]"
            >
              + Criar nova campanha
            </Link>
          </div>
        </section>

        {/* RESUMOS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CardResumo
            titulo="Campanhas"
            valor="3"
            descricao="Campanhas cadastradas"
            detalhe="Total da conta"
            simbolo="C"
            fundo="#E7F0F4"
            cor="#668FA2"
          />

          <CardResumo
            titulo="Ativas"
            valor="1"
            descricao="Campanha em exibição"
            detalhe="Aprovada"
            simbolo="✓"
            fundo="#EDF5ED"
            cor="#6F996F"
          />

          <CardResumo
            titulo="Em análise"
            valor="1"
            descricao="Aguardando aprovação"
            detalhe="Em avaliação"
            simbolo="…"
            fundo="#FFF3D9"
            cor="#A67B27"
          />

          <CardResumo
            titulo="Rejeitadas"
            valor="1"
            descricao="Campanha não aprovada"
            detalhe="Requer alterações"
            simbolo="!"
            fundo="#F7E4DF"
            cor="#C46A54"
          />
        </section>

        {/* CAMPANHAS */}

        <section
          id="campanhas"
          className="mt-9 scroll-mt-28"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7FA2B8]">
                Publicidade
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em]">
                Minhas campanhas
              </h2>

              <p className="mt-1 text-sm text-[#7B888C]">
                Acompanhe o andamento dos anúncios enviados.
              </p>
            </div>

            <Link
              href="/anunciante/novo-anuncio"
              className="w-fit rounded-full border border-[#D97D64] px-5 py-2.5 text-xs font-extrabold text-[#D97D64] transition hover:bg-[#D97D64] hover:text-white"
            >
              Nova campanha
            </Link>
          </div>

          <div className="mt-5 grid gap-4">
            <Campanha
              titulo="Clínica Bem Viver"
              descricao="Acompanhamento especializado para crianças e famílias."
              categoria="Saúde e cuidado"
              status="Aprovado"
              data="18 SET"
            />

            <Campanha
              titulo="Espaço Aprender"
              descricao="Atendimento multidisciplinar e apoio ao desenvolvimento."
              categoria="Desenvolvimento"
              status="Em análise"
              data="21 SET"
            />

            <Campanha
              titulo="Curso para responsáveis"
              descricao="Curso online sobre rotina, organização e desenvolvimento."
              categoria="Educação"
              status="Rejeitado"
              data="15 SET"
            />
          </div>
        </section>

        {/* INFORMAÇÕES */}

        <div className="mt-9 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          {/* COMO FUNCIONA */}

          <section
            id="como-funciona"
            className="scroll-mt-28 rounded-[30px] border border-[#E5DFD9] bg-white p-6 md:p-7"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#D97D64]">
                Processo
              </p>

              <h2 className="mt-2 text-xl font-extrabold">
                Como funciona?
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#7B888C]">
                Antes de aparecer no ELARA, uma campanha passa
                pela análise da equipe responsável.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <Etapa
                numero="01"
                titulo="Crie a campanha"
                descricao="Informe os dados e o conteúdo que deseja divulgar."
                fundo="#E7F0F4"
                cor="#668FA2"
              />

              <Etapa
                numero="02"
                titulo="Envie para análise"
                descricao="A equipe administrativa verifica a campanha antes da publicação."
                fundo="#FFF3D9"
                cor="#A67B27"
              />

              <Etapa
                numero="03"
                titulo="Publicação"
                descricao="Depois da aprovação, o anúncio poderá ser exibido na plataforma."
                fundo="#EDF5ED"
                cor="#6F996F"
              />
            </div>
          </section>

          {/* REGRAS */}

          <aside className="rounded-[30px] bg-[#2C3E44] p-6 text-white md:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white/10 text-lg font-black text-[#D5E6EC]">
              i
            </span>

            <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#9EC0CE]">
              Antes de enviar
            </p>

            <h2 className="mt-2 text-xl font-extrabold">
              Campanhas passam por análise
            </h2>

            <p className="mt-3 text-xs leading-6 text-[#CCD9DE]">
              O envio de uma campanha não significa publicação
              automática. O conteúdo precisa ser analisado antes
              de ser disponibilizado aos usuários do ELARA.
            </p>

            <div className="mt-6 space-y-3">
              <ItemRegra texto="Informações claras e adequadas" />
              <ItemRegra texto="Conteúdo relacionado ao público da plataforma" />
              <ItemRegra texto="Análise antes da publicação" />
            </div>
          </aside>
        </div>

        {/* RODAPÉ */}

        <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-[#E4DED8] py-6 text-[11px] font-semibold text-[#929C9F] sm:flex-row">
          <p>ELARA • Área do Anunciante</p>

          <p>
            Os dados exibidos nesta versão são demonstrativos.
          </p>
        </footer>
      </div>
    </main>
  );
}

/* =========================================
   CARD DE RESUMO
========================================= */

type CardResumoProps = {
  titulo: string;
  valor: string;
  descricao: string;
  detalhe: string;
  simbolo: string;
  fundo: string;
  cor: string;
};

function CardResumo({
  titulo,
  valor,
  descricao,
  detalhe,
  simbolo,
  fundo,
  cor,
}: CardResumoProps) {
  return (
    <div className="rounded-[26px] border border-[#E6E0DA] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold text-[#748388]">
            {titulo}
          </p>

          <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#2C3E44]">
            {valor}
          </p>
        </div>

        <span
          className="flex h-11 w-11 items-center justify-center rounded-[15px] text-sm font-black"
          style={{
            backgroundColor: fundo,
            color: cor,
          }}
        >
          {simbolo}
        </span>
      </div>

      <p className="mt-3 text-xs font-semibold text-[#66777D]">
        {descricao}
      </p>

      <p
        className="mt-1 text-[10px] font-bold"
        style={{ color: cor }}
      >
        {detalhe}
      </p>
    </div>
  );
}

/* =========================================
   CAMPANHA
========================================= */

type CampanhaProps = {
  titulo: string;
  descricao: string;
  categoria: string;
  status: StatusCampanha;
  data: string;
};

function Campanha({
  titulo,
  descricao,
  categoria,
  status,
  data,
}: CampanhaProps) {
  function estiloStatus() {
    if (status === "Aprovado") {
      return {
        fundo: "#EDF5ED",
        cor: "#668D66",
        bolinha: "#8FBC8F",
      };
    }

    if (status === "Rejeitado") {
      return {
        fundo: "#FCEBE6",
        cor: "#B95F49",
        bolinha: "#D97D64",
      };
    }

    return {
      fundo: "#FFF3D9",
      cor: "#987020",
      bolinha: "#D4A843",
    };
  }

  const estilo = estiloStatus();

  return (
    <article className="group rounded-[26px] border border-[#E5DFD9] bg-white p-5 transition hover:border-[#D6CFCA] hover:shadow-[0_10px_30px_rgba(44,62,68,0.05)] md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          {/* DATA */}

          <div className="hidden h-16 w-16 shrink-0 flex-col items-center justify-center rounded-[18px] bg-[#F5F2EE] sm:flex">
            <span className="text-xs font-black text-[#66777D]">
              {data.split(" ")[0]}
            </span>

            <span className="mt-1 text-[9px] font-extrabold text-[#9AA4A7]">
              {data.split(" ")[1]}
            </span>
          </div>

          {/* TEXTO */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#F3F6F7] px-3 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#74878E]">
                {categoria}
              </span>

              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] font-extrabold"
                style={{
                  backgroundColor: estilo.fundo,
                  color: estilo.cor,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: estilo.bolinha,
                  }}
                />

                {status}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-extrabold text-[#35494F]">
              {titulo}
            </h3>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-[#7B888C]">
              {descricao}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {status === "Rejeitado" && (
            <button
              type="button"
              onClick={() =>
                alert(
                  "A edição da campanha será implementada junto ao cadastro de anúncios."
                )
              }
              className="rounded-full bg-[#F7E4DF] px-4 py-2.5 text-[11px] font-extrabold text-[#B9634D] transition hover:bg-[#F1D4CC]"
            >
              Corrigir
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              alert(
                `Detalhes da campanha "${titulo}" serão conectados ao gerenciamento de anúncios.`
              )
            }
            className="rounded-full border border-[#D8E2E5] px-4 py-2.5 text-[11px] font-extrabold text-[#668B9D] transition hover:border-[#7FA2B8] hover:bg-[#F3F8FA]"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================
   ETAPA
========================================= */

type EtapaProps = {
  numero: string;
  titulo: string;
  descricao: string;
  fundo: string;
  cor: string;
};

function Etapa({
  numero,
  titulo,
  descricao,
  fundo,
  cor,
}: EtapaProps) {
  return (
    <div className="rounded-[22px] bg-[#FAF8F5] p-5">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[13px] text-xs font-black"
        style={{
          backgroundColor: fundo,
          color: cor,
        }}
      >
        {numero}
      </span>

      <h3 className="mt-4 text-sm font-extrabold text-[#465A61]">
        {titulo}
      </h3>

      <p className="mt-2 text-[11px] leading-5 text-[#7F8C90]">
        {descricao}
      </p>
    </div>
  );
}

/* =========================================
   REGRA
========================================= */

function ItemRegra({ texto }: { texto: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[15px] bg-white/[0.06] px-4 py-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FBC8F]/20 text-[9px] font-black text-[#B9DBB9]">
        ✓
      </span>

      <p className="text-[11px] font-bold text-[#D5E0E4]">
        {texto}
      </p>
    </div>
  );
}