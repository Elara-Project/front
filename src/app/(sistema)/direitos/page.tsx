'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, Field, inputClass, Shell } from '@/components/api/ui';

const leiAutismo =
  'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12764.htm';

const guias = [
  {
    id: 'direitos-tea',
    categoria: 'Saúde',
    titulo: 'Direitos da pessoa autista',
    resumo: 'Conheça a Lei Berenice Piana e as garantias de acesso à saúde.',
    conteudo:
      'A Lei nº 12.764/2012 considera a pessoa com transtorno do espectro autista (TEA) pessoa com deficiência para todos os efeitos legais. Entre as garantias previstas estão o acesso a diagnóstico precoce, atendimento multiprofissional e informações que auxiliem no cuidado. Para orientação sobre o atendimento pelo SUS, procure a unidade básica de saúde (UBS) de referência.',
    fonte: 'Lei nº 12.764/2012 (Planalto)',
    url: leiAutismo,
  },
  {
    id: 'inclusao-escolar',
    categoria: 'Educação',
    titulo: 'Inclusão e apoio na escola',
    resumo: 'Entenda o direito à educação inclusiva e ao apoio escolar.',
    conteudo:
      'A Lei Brasileira de Inclusão prevê medidas de acessibilidade e apoio à participação e à aprendizagem de estudantes com deficiência. As escolas privadas ficam proibidas de cobrar valores adicionais para cumprir as obrigações do art. 28, § 1º. Para conversar sobre as necessidades de apoio do estudante, procure a coordenação ou a direção da escola.',
    fonte: 'Lei nº 13.146/2015, arts. 27 e 28 (Planalto)',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm',
  },
  {
    id: 'tdah-dislexia',
    categoria: 'Educação',
    titulo: 'Acompanhamento escolar para TDAH e dislexia',
    resumo:
      'Saiba o que a legislação prevê para estudantes com transtornos de aprendizagem.',
    conteudo:
      'A Lei nº 14.254/2021 prevê acompanhamento integral para estudantes com dislexia, TDAH ou outro transtorno de aprendizagem. O programa inclui identificação precoce, encaminhamento para diagnóstico e apoio educacional. A família pode conversar com a equipe pedagógica sobre as dificuldades observadas e as formas de acompanhamento.',
    fonte: 'Lei nº 14.254/2021 (Câmara dos Deputados)',
    url: 'https://www2.camara.leg.br/legin/fed/lei/2021/lei-14254-30-novembro-2021-792022-publicacaooriginal-164005-pl.html',
  },
  {
    id: 'ciptea',
    categoria: 'Documentação e prioridade',
    titulo: 'Carteira de identificação da pessoa autista (Ciptea)',
    resumo:
      'Veja para que serve a carteira e onde buscar informações para solicitá-la.',
    conteudo:
      'A Ciptea é gratuita e facilita a identificação da pessoa autista para o atendimento prioritário. A emissão é feita pelo órgão responsável no estado, no Distrito Federal ou no município. A solicitação exige relatório médico com o código CID. Consulte o canal oficial da sua região para saber onde enviar o pedido e quais documentos apresentar.',
    fonte: 'Lei nº 12.764/2012, art. 3º-A (Planalto)',
    url: leiAutismo,
  },
  {
    id: 'bpc',
    categoria: 'Benefícios',
    titulo: 'Benefício de Prestação Continuada (BPC/LOAS)',
    resumo:
      'Conheça os critérios de renda e avaliação para solicitar o benefício.',
    conteudo:
      'O BPC é um benefício assistencial de um salário mínimo mensal para pessoas com deficiência que cumpram os critérios do programa. A concessão considera a renda familiar e a avaliação do INSS. O CRAS pode orientar sobre o Cadastro Único, e o pedido pode ser feito pelo Meu INSS ou pela Central 135.',
    fonte: 'Orientações sobre o BPC (Ministério do Desenvolvimento Social)',
    url: 'https://www.gov.br/mds/pt-br/acoes-e-programas/beneficio-de-prestacao-continuada-bpc/conheca-todos-os-detalhes-do-bpc',
  },
];

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

export default function DireitosPage() {
  const [busca, setBusca] = useState('');
  const termo = normalizar(busca);
  const resultados = guias.filter(
    ({ categoria, titulo, resumo, conteudo, fonte }) =>
      normalizar(
        `${categoria} ${titulo} ${resumo} ${conteudo} ${fonte}`
      ).includes(termo)
  );

  return (
    <Shell
      title="Direitos e benefícios"
      description="Consulte guias sobre leis, direitos e benefícios no Brasil para pessoas neurodivergentes e suas famílias."
    >
      <div className="elara-actions">
        <Link
          href="/biblioteca"
          className="rounded-full border border-[var(--elara-borda)] px-5 py-3 font-bold"
        >
          ← Voltar para Conteúdos
        </Link>
      </div>
      <Field label="Buscar por direito, benefício ou lei">
        <input
          type="search"
          className={inputClass}
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Ex.: escola, Ciptea ou BPC"
        />
      </Field>
      <p className="sr-only" role="status">
        Resultados encontrados: {resultados.length}.
      </p>
      {resultados.length === 0 ? (
        <Card>Nenhum guia encontrado. Tente outro termo.</Card>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {resultados.map((guia) => (
            <Card key={guia.id}>
              <p className="font-bold text-[var(--elara-azul)]">
                {guia.categoria}
              </p>
              <h2 className="text-xl font-extrabold">{guia.titulo}</h2>
              <p>{guia.resumo}</p>
              <details>
                <summary className="cursor-pointer font-bold text-[var(--elara-terracota)]">
                  Ler guia<span className="sr-only"> sobre {guia.titulo}</span>
                </summary>
                <p className="mt-4 leading-7">{guia.conteudo}</p>
                <a
                  className="mt-3 inline-block font-bold underline"
                  href={guia.url}
                >
                  {guia.fonte}
                </a>
              </details>
            </Card>
          ))}
        </div>
      )}
    </Shell>
  );
}
