import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--elara-offwhite)]">
      <header className="flex items-center justify-between px-8 py-5">
        <h1 className="text-3xl font-bold text-[var(--elara-terracota)]">
          ELARA
        </h1>

        <nav className="hidden gap-8 md:flex">
          <a href="#inicio" className="text-[var(--elara-grafite)]">
            Início
          </a>

          <a href="#sobre" className="text-[var(--elara-grafite)]">
            Sobre
          </a>

          <a href="#funcionalidades" className="text-[var(--elara-grafite)]">
            Funcionalidades
          </a>
        </nav>

<Link
  href="/login"
  className="rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-semibold text-white"
>
  Entrar
</Link>
      </header>

      <section
        id="inicio"
        className="flex min-h-[80vh] items-center justify-center px-8"
      >
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-lg font-semibold text-[var(--elara-azul)]">
            Apoio, organização e informação em um só lugar
          </p>

          <h2 className="text-5xl font-bold leading-tight text-[var(--elara-grafite)] md:text-6xl">
            Cuidando de quem cuida.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--elara-grafite)]">
            O ELARA é uma plataforma desenvolvida para apoiar responsáveis por
            crianças atípicas, reunindo recursos para organização da rotina,
            acompanhamento e acesso a informações importantes.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-[var(--elara-terracota)] px-8 py-4 font-bold text-white">
              Começar agora
            </button>

            <button className="rounded-full border-2 border-[var(--elara-azul)] px-8 py-4 font-bold text-[var(--elara-azul)]">
              Conhecer o ELARA
            </button>
          </div>
        </div>
      </section>
      <section
  id="sobre"
  className="px-8 py-20"
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
          O ELARA foi criado para reunir, em um único ambiente, recursos que
          auxiliam responsáveis por crianças atípicas na organização da rotina,
          no acompanhamento de informações importantes e no acesso a conteúdos
          úteis para o dia a dia.
        </p>
      </div>

      <div className="rounded-[40px] bg-[var(--elara-azul)] p-10 text-white">
        <p className="text-2xl font-bold">
          Organização também é uma forma de cuidado.
        </p>

        <p className="mt-4 leading-relaxed">
          Agenda, informações, conteúdos e apoio reunidos em uma plataforma
          simples, acolhedora e fácil de usar.
        </p>
      </div>

    </div>
  </div>
</section>
<section
  id="funcionalidades"
  className="bg-white px-8 py-20"
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

      <div className="rounded-3xl bg-[var(--elara-offwhite)] p-8">
        <div className="mb-5 text-4xl"></div>

        <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
          Agenda
        </h3>

        <p className="mt-3 leading-relaxed">
          Organize consultas, terapias, compromissos e atividades importantes.
        </p>
      </div>

      <div className="rounded-3xl bg-[var(--elara-offwhite)] p-8">
        <div className="mb-5 text-4xl"></div>

        <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
          Biblioteca
        </h3>

        <p className="mt-3 leading-relaxed">
          Acesse conteúdos e informações importantes para apoiar o cuidado.
        </p>
      </div>

      <div className="rounded-3xl bg-[var(--elara-offwhite)] p-8">
        <div className="mb-5 text-4xl"></div>

        <h3 className="text-xl font-bold text-[var(--elara-grafite)]">
          Fórum
        </h3>

        <p className="mt-3 leading-relaxed">
          Compartilhe experiências e encontre uma rede de apoio.
        </p>
      </div>

    </div>
  </div>
</section>
    </main>
  );
}