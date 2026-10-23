"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#2C3E44]">
      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-[#E8E2DC] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#D97D64] font-black text-white shadow-sm">
              E
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="font-extrabold tracking-[0.1em] text-[#D97D64]">
                  ELARA
                </p>

                <span className="rounded-full bg-[#F7E4DF] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#B9634D]">
                  Admin
                </span>
              </div>

              <p className="text-[10px] font-semibold text-[#8A969A]">
                Central administrativa
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-extrabold text-[#40545B]">
                Administrador
              </p>

              <p className="text-[10px] text-[#89969A]">
                Acesso administrativo
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4] text-xs font-black text-[#668B9D]">
              AD
            </div>

            <Link
              href="/dashboard"
              className="hidden rounded-full border border-[#D9E2E5] bg-white px-4 py-2 text-xs font-extrabold text-[#66818B] transition hover:border-[#7FA2B8] hover:bg-[#F2F7F9] md:block"
            >
              Ver sistema
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-6 md:px-8 md:py-8">
        {/* NAVEGAÇÃO */}

        <nav className="mb-6 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            <Link
              href="/admin"
              className="rounded-full bg-[#2C3E44] px-4 py-2 text-xs font-extrabold text-white"
            >
              Visão geral
            </Link>

            <Link
              href="/admin/usuarios"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Usuários
            </Link>

            <Link
              href="/admin/biblioteca"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Conteúdos
            </Link>

            <Link
              href="/admin/forum"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Fórum
            </Link>

            <Link
              href="/admin/anuncios"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Anúncios
            </Link>

            <Link
              href="/admin/notificacoes"
              className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#65767C] transition hover:bg-[#E7F0F4]"
            >
              Notificações
            </Link>
          </div>
        </nav>

        {/* APRESENTAÇÃO */}

        <section className="relative overflow-hidden rounded-[32px] bg-[#2C3E44] p-6 text-white md:p-9">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#7FA2B8]/20" />

          <div className="pointer-events-none absolute -bottom-24 right-40 h-52 w-52 rounded-full bg-[#D97D64]/15" />

          <div className="relative z-10 flex flex-col justify-between gap-8 xl:flex-row xl:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#8FBC8F]" />

                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#B9CDD5]">
                  Sistema operacional
                </p>
              </div>

              <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Painel Administrativo
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D4E0E4]">
                Acompanhe a plataforma, gerencie conteúdos,
                usuários, comunidade, anúncios e comunicações
                do ELARA.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/biblioteca"
                className="rounded-full bg-[#D97D64] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#CA7059]"
              >
                + Novo conteúdo
              </Link>

              <Link
                href="/admin/notificacoes"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-extrabold text-white transition hover:bg-white/15"
              >
                Enviar aviso
              </Link>
            </div>
          </div>
        </section>

        {/* RESUMOS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CardResumo
            titulo="Usuários"
            valor="128"
            descricao="Contas cadastradas"
            detalhe="+8 neste mês"
            simbolo="U"
            fundo="#E7F0F4"
            cor="#668FA2"
          />

          <CardResumo
            titulo="Conteúdos"
            valor="24"
            descricao="Artigos publicados"
            detalhe="Biblioteca e direitos"
            simbolo="C"
            fundo="#F7E4DF"
            cor="#C46A54"
          />

          <CardResumo
            titulo="Anúncios"
            valor="6"
            descricao="Campanhas em análise"
            detalhe="3 aguardam revisão"
            simbolo="A"
            fundo="#FFF3D9"
            cor="#A67B27"
          />

          <CardResumo
            titulo="Notificações"
            valor="12"
            descricao="Envios recentes"
            detalhe="Últimos 30 dias"
            simbolo="N"
            fundo="#EDF5ED"
            cor="#6F996F"
          />
        </section>

        {/* CONTEÚDO PRINCIPAL */}

        <div className="mt-8 grid gap-7 xl:grid-cols-[1.55fr_0.85fr]">
          {/* GERENCIAMENTO */}

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#7FA2B8]">
                  Administração
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em]">
                  Gerenciamento
                </h2>

                <p className="mt-1 text-sm text-[#7B888C]">
                  Escolha uma área para administrar.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <CardMenu
                numero="01"
                titulo="Usuários"
                descricao="Visualize contas cadastradas e acompanhe os usuários da plataforma."
                href="/admin/usuarios"
                fundo="#E7F0F4"
                cor="#668FA2"
              />

              <CardMenu
                numero="02"
                titulo="Conteúdos"
                descricao="Gerencie artigos da Biblioteca e informações sobre direitos."
                href="/admin/biblioteca"
                fundo="#F7E4DF"
                cor="#C46A54"
              />

              <CardMenu
                numero="03"
                titulo="Comunidade"
                descricao="Acompanhe publicações e faça a moderação do Fórum."
                href="/admin/forum"
                fundo="#EDF5ED"
                cor="#6F996F"
              />

              <CardMenu
                numero="04"
                titulo="Anúncios"
                descricao="Analise campanhas enviadas pelos anunciantes antes da publicação."
                href="/admin/anuncios"
                fundo="#FFF3D9"
                cor="#A67B27"
              />

              <CardMenu
                numero="05"
                titulo="Notificações"
                descricao="Crie avisos e comunicações importantes para os usuários."
                href="/admin/notificacoes"
                fundo="#EEEAF6"
                cor="#7A6C9D"
              />

              <CardMenu
                numero="06"
                titulo="Configurações"
                descricao="Acesse preferências e configurações gerais da plataforma."
                href="/admin/configuracoes"
                fundo="#F0F1F1"
                cor="#65767C"
              />
            </div>
          </section>

          {/* COLUNA DIREITA */}

          <aside className="space-y-5">
            {/* PENDÊNCIAS */}

            <div className="rounded-[28px] border border-[#E5DFD9] bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#D97D64]">
                    Atenção
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold">
                    Pendências
                  </h2>
                </div>

                <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#FFF3D9] text-sm font-black text-[#A67B27]">
                  4
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <Pendencia
                  titulo="3 anúncios aguardam análise"
                  href="/admin/anuncios"
                />

                <Pendencia
                  titulo="1 conteúdo precisa de revisão"
                  href="/admin/biblioteca"
                />
              </div>
            </div>

            {/* ATIVIDADES */}

            <div className="rounded-[28px] border border-[#E5DFD9] bg-white p-6">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#7FA2B8]">
                  Plataforma
                </p>

                <h2 className="mt-2 text-xl font-extrabold">
                  Atividades recentes
                </h2>
              </div>

              <div className="mt-6">
                <Atividade
                  titulo="Novo artigo publicado"
                  descricao="Conteúdo adicionado à Biblioteca."
                  tempo="Hoje"
                  primeira
                />

                <Atividade
                  titulo="Novo anúncio enviado"
                  descricao="Uma campanha aguarda aprovação."
                  tempo="Hoje"
                />

                <Atividade
                  titulo="Novo usuário cadastrado"
                  descricao="Uma nova conta foi criada."
                  tempo="Ontem"
                />

                <Atividade
                  titulo="Notificação enviada"
                  descricao="Aviso enviado aos responsáveis."
                  tempo="2 dias"
                  ultima
                />
              </div>
            </div>
          </aside>
        </div>

        {/* RODAPÉ */}

        <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-[#E4DED8] py-6 text-[11px] font-semibold text-[#929C9F] sm:flex-row">
          <p>ELARA • Painel Administrativo</p>

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
   CARD DE GERENCIAMENTO
========================================= */

type CardMenuProps = {
  numero: string;
  titulo: string;
  descricao: string;
  href: string;
  fundo: string;
  cor: string;
};

function CardMenu({
  numero,
  titulo,
  descricao,
  href,
  fundo,
  cor,
}: CardMenuProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[26px] border border-[#E5DFD9] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(44,62,68,0.07)]"
    >
      <div
        className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full opacity-60 transition group-hover:scale-125"
        style={{ backgroundColor: fundo }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-[13px] text-xs font-black"
            style={{
              backgroundColor: fundo,
              color: cor,
            }}
          >
            {numero}
          </span>

          <span
            className="text-lg font-black transition group-hover:translate-x-1"
            style={{ color: cor }}
          >
            →
          </span>
        </div>

        <h3 className="mt-5 text-lg font-extrabold text-[#35494F]">
          {titulo}
        </h3>

        <p className="mt-2 text-xs leading-5 text-[#78868A]">
          {descricao}
        </p>

        <p
          className="mt-5 text-[11px] font-extrabold"
          style={{ color: cor }}
        >
          Gerenciar
        </p>
      </div>
    </Link>
  );
}

/* =========================================
   PENDÊNCIA
========================================= */

type PendenciaProps = {
  titulo: string;
  href: string;
};

function Pendencia({
  titulo,
  href,
}: PendenciaProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-[17px] bg-[#FAF8F5] p-4 transition hover:bg-[#F5F1EC]"
    >
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#D97D64]" />

        <p className="text-xs font-bold text-[#56686E]">
          {titulo}
        </p>
      </div>

      <span className="text-xs font-black text-[#D97D64]">
        →
      </span>
    </Link>
  );
}

/* =========================================
   ATIVIDADE
========================================= */

type AtividadeProps = {
  titulo: string;
  descricao: string;
  tempo: string;
  primeira?: boolean;
  ultima?: boolean;
};

function Atividade({
  titulo,
  descricao,
  tempo,
  ultima,
}: AtividadeProps) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <span className="mt-1 h-3 w-3 shrink-0 rounded-full border-[3px] border-[#DDE9ED] bg-[#7FA2B8]" />

        {!ultima && (
          <div className="min-h-16 w-px flex-1 bg-[#E1E7E9]" />
        )}
      </div>

      <div className={ultima ? "pb-0" : "pb-5"}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-xs font-extrabold text-[#455A61]">
            {titulo}
          </p>

          <span className="text-[9px] font-bold uppercase text-[#A0AAAD]">
            {tempo}
          </span>
        </div>

        <p className="mt-1 text-[11px] leading-5 text-[#879397]">
          {descricao}
        </p>
      </div>
    </div>
  );
}