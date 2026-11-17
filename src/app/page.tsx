import Image from "next/image";
import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

const funcionalidades: {
  numero: string;
  titulo: string;
  descricao: string;
  icone: IconName;
}[] = [
  {
    numero: "01",
    titulo: "Sua rotina organizada",
    descricao:
      "Reúna consultas, terapias e compromissos em uma agenda que acompanha o dia a dia da sua família.",
    icone: "calendar",
  },
  {
    numero: "02",
    titulo: "Informações da criança",
    descricao:
      "Mantenha dados e informações importantes da criança organizados para consultar quando precisar.",
    icone: "children",
  },
  {
    numero: "03",
    titulo: "Cuidados e medicamentos",
    descricao:
      "Acompanhe prescrições e os cuidados que fazem parte da rotina.",
    icone: "care",
  },
  {
    numero: "04",
    titulo: "Informação ao seu alcance",
    descricao:
      "Encontre conteúdos, documentos e orientações para apoiar suas decisões.",
    icone: "library",
  },
  {
    numero: "05",
    titulo: "Uma rede de apoio",
    descricao:
      "Compartilhe experiências e encontre outras pessoas que também vivem o cuidado.",
    icone: "forum",
  },
  {
    numero: "06",
    titulo: "Apoio para suas dúvidas",
    descricao:
      "Converse com o assistente ELARA sobre organização e cuidado no dia a dia.",
    icone: "assistant",
  },
];

export default function Home() {
  return (
    <main id="inicio" className="elara-home">
      <header className="home-header">
        <div className="home-container home-header-content">
          <a href="#inicio" aria-label="ELARA — Voltar ao início">
            <Image
              src="/logo-elara.png"
              alt="ELARA"
              width={160}
              height={80}
              priority
              className="home-logo"
            />
          </a>

          <nav aria-label="Navegação principal" className="home-nav">
            <a href="#sobre">Sobre o ELARA</a>
            <a href="#funcionalidades">Funcionalidades</a>
          </nav>

          <Link href="/login" className="home-button home-button-outline">
            Entrar
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </header>

      <section className="home-container home-hero">
        <div className="home-hero-copy">
          <p className="home-label">APOIO, ORGANIZAÇÃO E INFORMAÇÃO</p>

          <h1>
            Ao seu lado em
            <br />
            cada <span>cuidado.</span>
          </h1>

          <p className="home-intro">
            Cuidar envolve muitos detalhes. O ELARA reúne recursos para
            apoiar responsáveis por crianças atípicas e trazer mais
            clareza à rotina da família.
          </p>

          <div className="home-actions">
            <Link href="/cadastro" className="home-button home-button-primary">
              Começar agora
              <Icon name="arrow" size={17} />
            </Link>

            <a href="#sobre" className="home-link">
              Conhecer o ELARA
              <Icon name="chevron" size={16} />
            </a>
          </div>

          <p className="home-hero-note">
            Um espaço para organizar o que importa, no seu tempo.
          </p>
        </div>

        <div className="home-preview">
          <div className="home-preview-heading">
            <span className="home-preview-symbol">
              <Icon name="calendar" size={21} />
            </span>

            <div>
              <p className="home-label">SEU DIA, COM MAIS CLAREZA</p>
              <h2>O cuidado começa com organização.</h2>
            </div>
          </div>

          <div className="home-preview-list">
            <div>
              <span className="home-feature-icon">
                <Icon name="calendar" size={20} />
              </span>
              <div>
                <h3>Uma rotina mais leve</h3>
                <p>Compromissos reunidos em um só lugar.</p>
              </div>
            </div>

            <div>
              <span className="home-feature-icon">
                <Icon name="library" size={20} />
              </span>
              <div>
                <h3>Informação que acolhe</h3>
                <p>Conteúdos para acompanhar cada etapa.</p>
              </div>
            </div>

            <div>
              <span className="home-feature-icon">
                <Icon name="forum" size={20} />
              </span>
              <div>
                <h3>Espaço para compartilhar</h3>
                <p>Experiências que aproximam famílias.</p>
              </div>
            </div>
          </div>

          <div className="home-preview-footer">
            Você também merece cuidado.
          </div>
        </div>
      </section>

      <section id="sobre" className="home-about">
        <div className="home-container home-about-grid">
          <div>
            <p className="home-label">SOBRE O ELARA</p>
            <h2 className="home-section-title">
              Um espaço pensado para quem cuida.
            </h2>
          </div>

          <div className="home-about-copy">
            <p>
              Entre consultas, terapias e responsabilidades, nem sempre
              sobra tempo para organizar tudo. O ELARA nasceu para
              apoiar familiares e responsáveis por crianças atípicas
              nesse dia a dia.
            </p>
            <p>
              Reunimos agenda, informações da criança, acompanhamento
              dos cuidados e conteúdos em um ambiente acolhedor e
              fácil de consultar.
            </p>
          </div>
        </div>
      </section>

      <section
        id="funcionalidades"
        className="home-container home-features"
      >
        <div className="home-section-heading">
          <div>
            <p className="home-label">RECURSOS PARA O DIA A DIA</p>
            <h2 className="home-section-title">
              O que importa, mais perto de você.
            </h2>
          </div>
          <p>
            Ferramentas que se complementam para acompanhar
            a rotina da sua família.
          </p>
        </div>

        <div className="home-feature-grid">
          {funcionalidades.map((item) => (
            <article className="home-feature-card" key={item.numero}>
              <div className="home-card-top">
                <span className="home-feature-icon">
                  <Icon name={item.icone} size={22} />
                </span>
                <span className="home-card-number">{item.numero}</span>
              </div>

              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-container home-bottom">
        <div className="home-cta">
          <div>
            <p className="home-label">UM PASSO DE CADA VEZ</p>
            <h2>Mais espaço para o que realmente importa.</h2>
            <p>Comece a organizar sua rotina com o ELARA.</p>
          </div>

          <Link href="/cadastro" className="home-button home-button-primary">
            Criar minha conta
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-container home-footer-content">
          <p>
            <strong>ELARA</strong>
            <span>Ao seu lado em cada cuidado.</span>
          </p>

          <a href="mailto:elarasac@gmail.com">elarasac@gmail.com</a>
        </div>
      </footer>

      <style>{`
        .elara-home {
          --home-bg: var(--elara-offwhite, #faf8f5);
          --home-surface: var(--elara-superficie, #ffffff);
          --home-text: var(--elara-texto, #34474e);
          --home-muted: var(--elara-texto-secundario, #687578);
          --home-border: var(--elara-borda, #e6e4df);
          --home-action: var(--elara-terracota, #d97d64);
          background: var(--home-bg);
          color: var(--home-text);
          min-height: 100vh;
          font-family: inherit;
        }

        .elara-home,
        .elara-home * {
          box-sizing: border-box;
        }

        .elara-home a {
          text-decoration: none;
        }

        .elara-home a:focus-visible {
          outline: 3px solid var(--home-action);
          outline-offset: 5px;
        }

        .home-container {
          width: min(1160px, calc(100% - 64px));
          margin-inline: auto;
        }

        .home-header {
          background: var(--home-surface);
          border-bottom: 1px solid var(--home-border);
        }

        .home-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 96px;
        }

        .home-logo {
          display: block;
          width: 125px;
          height: auto;
        }

        .home-nav,
        .home-actions,
        .home-button,
        .home-link {
          display: flex;
          align-items: center;
        }

        .home-nav {
          gap: 32px;
        }

        .home-nav a,
        .home-link {
          color: var(--home-text);
          font-size: 14px;
          font-weight: 600;
        }

        .home-nav a:hover,
        .home-link:hover,
        .home-footer a:hover {
          color: var(--home-action);
        }

        .home-button {
          justify-content: center;
          gap: 12px;
          min-height: 46px;
          padding: 13px 22px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
          transition: background-color 150ms;
        }

        .home-button-primary {
          background: var(--home-action);
          color: #fff;
        }

        .home-button-primary:hover {
          background: #c96f57;
        }

        .home-button-outline {
          border-color: var(--home-border);
          background: var(--home-surface);
          color: var(--home-text);
        }

        .home-button-outline:hover {
          background: var(--home-bg);
        }

        .home-hero {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: center;
          gap: 80px;
          padding-block: 88px;
        }

        .home-label {
          margin: 0 0 16px;
          color: var(--home-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          line-height: 1.7;
        }

        .home-hero h1 {
          margin: 0;
          font-size: clamp(40px, 4.6vw, 62px);
          line-height: 1.12;
          letter-spacing: -0.045em;
          font-weight: 800;
        }

        .home-hero h1 span {
          color: var(--home-action);
        }

        .home-intro {
          max-width: 490px;
          margin: 24px 0 0;
          color: var(--home-muted);
          font-size: 16px;
          line-height: 1.9;
        }

        .home-actions {
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 30px;
        }

        .home-link {
          gap: 8px;
          min-height: 44px;
        }

        .home-hero-note {
          margin: 24px 0 0;
          font-size: 12px;
          line-height: 1.7;
          color: var(--home-muted);
        }

        .home-preview {
          overflow: hidden;
          min-width: 0;
          background: var(--home-surface);
          border: 1px solid var(--home-border);
          border-radius: 14px;
        }

        .home-preview-heading {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 28px;
          background: var(--home-bg);
          border-bottom: 1px solid var(--home-border);
        }

        .home-preview-heading .home-label {
          margin-bottom: 8px;
          font-size: 9px;
        }

        .home-preview-heading h2 {
          margin: 0;
          font-size: 21px;
          line-height: 1.4;
          letter-spacing: -0.025em;
        }

        .home-preview-symbol,
        .home-feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: 1px solid var(--home-border);
          border-radius: 10px;
          background: var(--home-bg);
          color: var(--home-action);
        }

        .home-preview-symbol {
          background: var(--home-surface);
        }

        .home-preview-list {
          padding: 4px 28px;
        }

        .home-preview-list > div {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 0;
        }

        .home-preview-list > div + div {
          border-top: 1px solid var(--home-border);
        }

        .home-preview-list h3 {
          margin: 0 0 5px;
          font-size: 14px;
          font-weight: 700;
        }

        .home-preview-list p {
          margin: 0;
          color: var(--home-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .home-preview-footer {
          padding: 17px 28px;
          border-top: 1px solid var(--home-border);
          color: var(--home-muted);
          font-size: 12px;
        }

        .home-about,
        .home-features {
          scroll-margin-top: 24px;
        }

        .home-about {
          padding-block: 60px;
          background: var(--home-surface);
          border-block: 1px solid var(--home-border);
        }

        .home-about-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 100px;
        }

        .home-section-title {
          margin: 0;
          max-width: 480px;
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.25;
          letter-spacing: -0.035em;
        }

        .home-about-copy p {
          margin: 0;
          color: var(--home-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .home-about-copy p + p {
          margin-top: 16px;
        }

        .home-features {
          padding-block: 72px;
        }

        .home-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 32px;
        }

        .home-section-heading > p {
          max-width: 290px;
          margin: 0;
          color: var(--home-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .home-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .home-feature-card {
          padding: 26px;
          background: var(--home-surface);
          border: 1px solid var(--home-border);
          border-radius: 12px;
        }

        .home-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .home-card-number {
          color: var(--home-muted);
          font-size: 11px;
          font-variant-numeric: tabular-nums;
        }

        .home-feature-card h3 {
          margin: 0 0 10px;
          font-size: 16px;
          letter-spacing: -0.02em;
        }

        .home-feature-card > p {
          margin: 0;
          color: var(--home-muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .home-bottom {
          padding-bottom: 64px;
        }

        .home-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 36px;
          background: var(--home-surface);
          border: 1px solid var(--home-border);
          border-radius: 14px;
        }

        .home-cta .home-label {
          margin-bottom: 10px;
        }

        .home-cta h2 {
          margin: 0;
          font-size: 25px;
          line-height: 1.35;
          letter-spacing: -0.03em;
        }

        .home-cta > div > p:last-child {
          margin: 12px 0 0;
          color: var(--home-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .home-cta .home-button {
          flex-shrink: 0;
        }

        .home-footer {
          background: var(--home-surface);
          border-top: 1px solid var(--home-border);
        }

        .home-footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-block: 26px;
        }

        .home-footer-content p {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin: 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .home-footer-content strong {
          letter-spacing: 0.09em;
        }

        .home-footer-content span,
        .home-footer-content a {
          color: var(--home-muted);
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .home-hero {
            gap: 36px;
            padding-block: 60px;
          }

          .home-about-grid {
            gap: 40px;
          }

          .home-feature-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .home-section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .home-section-heading > p {
            max-width: 480px;
          }
        }

        @media (max-width: 640px) {
          .home-container {
            width: calc(100% - 36px);
          }

          .home-header-content {
            min-height: 80px;
            gap: 12px;
          }

          .home-logo {
            width: 105px;
          }

          .home-nav {
            display: none;
          }

          .home-hero,
          .home-about-grid {
            grid-template-columns: 1fr;
          }

          .home-hero {
            padding-block: 44px;
            gap: 32px;
          }

          .home-hero h1 {
            font-size: 44px;
          }

          .home-intro {
            font-size: 14px;
          }

          .home-actions {
            gap: 18px;
          }

          .home-preview-heading {
            padding: 22px;
          }

          .home-preview-list {
            padding-inline: 22px;
          }

          .home-about {
            padding-block: 40px;
          }

          .home-about-grid {
            gap: 24px;
          }

          .home-features {
            padding-block: 44px;
          }

          .home-feature-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .home-feature-card {
            padding: 24px;
          }

          .home-cta {
            align-items: flex-start;
            flex-direction: column;
            padding: 24px;
            gap: 24px;
          }

          .home-cta h2 {
            font-size: 23px;
          }

          .home-cta .home-button {
            width: 100%;
          }

          .home-bottom {
            padding-bottom: 40px;
          }

          .home-footer-content {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-button {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
