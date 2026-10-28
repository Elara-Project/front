
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      id="inicio"
      className="min-h-screen bg-[var(--elara-offwhite)]"
    >
      {/* CABEÇALHO */}

      <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-8">
        <a
          href="#inicio"
          aria-label="ELARA - Voltar ao início"
          className="flex items-center"
        >
          <Image
            src="/logo-elara.png"
            alt="ELARA - Cuidando de Quem Cuida"
            width={180}
            height={90}
            priority
            className="h-auto w-[125px] object-contain sm:w-[160px]"
          />
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="#inicio"
            className="font-semibold text-[var(--elara-grafite)] transition hover:text-[var(--elara-terracota)]"
          >
            Início
          </a>

          <a
            href="#sobre"
            className="font-semibold text-[var(--elara-grafite)] transition hover:text-[var(--elara-terracota)]"
          >
            Sobre
          </a>

          <a
            href="#funcionalidades"
            className="font-semibold text-[var(--elara-grafite)] transition hover:text-[var(--elara-terracota)]"
          >
            Funcionalidades
          </a>
        </nav>

        <Link
          href="/login"
          className="rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Entrar
        </Link>
      </header>

      {/* SEÇÃO INICIAL */}

      <section className="flex min-h-[80vh] items-center justify-center px-6 py-16 md:px-8">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-lg font-semibold text-[var(--elara-azul)]">
            Apoio, organização e informação em um só lugar
          </p>

          <h1 className="text-4xl font-bold leading-tight text-[var(--elara-grafite)] md:text-6xl">
            Cuidando de quem cuida.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--elara-grafite)]">
            O ELARA é uma plataforma desenvolvida para
            apoiar responsáveis por crianças atípicas,
            reunindo recursos para organização da rotina,
            acompanhamento e acesso a informações
            importantes.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/cadastro"
              className="rounded-full bg-[var(--elara-terracota)] px-8 py-4 text-center font-bold text-white transition hover:opacity-90"
            >
              Começar agora
            </Link>

            <a
              href="#sobre"
              className="rounded-full border-2 border-[var(--elara-azul)] px-8 py-4 text-center font-bold text-[var(--elara-azul)] transition hover:bg-[var(--elara-azul)] hover:text-white"
            >
              Conhecer o ELARA
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE O ELARA */}

      <section
        id="sobre"
        className="scroll-mt-8 px-6 py-20 md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 font-semibold text-[var(--elara-azul)]">
                Sobre o ELARA
              </p>

              <h2 className="text-4xl font-bold text-[var(--elara-grafite)]">
                Um espaço pensado para apoiar quem cuida.
              </h2>

              <p className="mt-5 leading-relaxed text-[var(--elara-grafite)]">
                O ELARA foi criado para reunir, em um único
                ambiente, recursos que auxiliam responsáveis
                por crianças atípicas na organização da rotina,
                no acompanhamento de informações importantes
                e no acesso a conteúdos úteis para o dia a dia.
              </p>
            </div>

            <div className="rounded-[40px] bg-[var(--elara-azul)] p-10 text-white">
              <p className="text-2xl font-bold">
                Organização também é uma forma de cuidado.
              </p>

              <p className="mt-4 leading-relaxed">
                Agenda, informações, conteúdos e apoio reunidos
                em uma plataforma simples, acolhedora e fácil
                de usar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}

      <section
        id="funcionalidades"
        className="scroll-mt-8 bg-[var(--elara-superficie)] px-6 py-20 md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-semibold text-[var(--elara-terracota)]">
              Funcionalidades
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[var(--elara-grafite)]">
              Tudo que você precisa em um só lugar
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* AGENDA */}

            <div className="rounded-3xl bg-[var(--elara-offwhite)] p-8">
              <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
                Agenda
              </h3>

              <p className="mt-3 leading-relaxed text-[var(--elara-grafite)]">
                Organize consultas, terapias, compromissos
                e atividades importantes.
              </p>
            </div>

            {/* BIBLIOTECA */}

            <div className="rounded-3xl bg-[var(--elara-offwhite)] p-8">
              <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
                Biblioteca
              </h3>

              <p className="mt-3 leading-relaxed text-[var(--elara-grafite)]">
                Acesse conteúdos e informações importantes
                para apoiar o cuidado.
              </p>
            </div>

            {/* FÓRUM */}

            <div className="rounded-3xl bg-[var(--elara-offwhite)] p-8">
              <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
                Fórum
              </h3>

              <p className="mt-3 leading-relaxed text-[var(--elara-grafite)]">
                Compartilhe experiências e encontre uma
                rede de apoio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}

      <footer className="border-t border-[var(--elara-borda)] bg-[var(--elara-offwhite)] px-6 py-8 text-center">
        <p className="text-sm text-[var(--elara-grafite)]">
          ELARA — Cuidando de Quem Cuida
        </p>
      </footer>
    </main>
  );
}
