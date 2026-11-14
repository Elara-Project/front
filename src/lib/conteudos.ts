type Artigo = {
  id: number;
  categoria: string;
  titulo: string;
  resumo: string;
  conteudo: string;
};

export const artigos: Artigo[] = [
  {
    id: 1,
    categoria: "Desenvolvimento",
    titulo: "Rotina e desenvolvimento infantil",
    resumo:
      "Entenda como uma rotina organizada pode contribuir para o desenvolvimento e o bem-estar da criança.",
    conteudo:
      "A organização da rotina pode ajudar a criança a compreender melhor o que acontece ao longo do dia. Horários relativamente previsíveis para atividades, refeições, descanso, escola e terapias podem trazer mais segurança e facilitar a adaptação às tarefas diárias. Cada criança possui necessidades diferentes, por isso a rotina deve ser flexível e adaptada à realidade da família.",
  },
  {
    id: 2,
    categoria: "Cuidados",
    titulo: "Estratégias para o cotidiano",
    resumo:
      "Veja formas simples de organizar atividades e tornar o dia a dia mais previsível e acolhedor.",
    conteudo:
      "Algumas estratégias podem facilitar a rotina da família, como organizar compromissos com antecedência, usar calendários visuais, dividir tarefas maiores em pequenas etapas e registrar informações importantes. Também é importante observar quais estratégias funcionam melhor para cada criança e ajustar a rotina sempre que necessário.",
  },
  {
    id: 3,
    categoria: "Apoio",
    titulo: "Construindo uma rede de apoio",
    resumo:
      "Saiba por que compartilhar responsabilidades pode ser importante para quem cuida.",
    conteudo:
      "Uma rede de apoio pode ser formada por familiares, amigos, profissionais, instituições e outras pessoas de confiança. Compartilhar informações e responsabilidades pode tornar a rotina mais organizada e reduzir a sobrecarga dos responsáveis. Procurar apoio não significa deixar de acompanhar a criança, mas ampliar as possibilidades de cuidado.",
  },
  {
    id: 4,
    categoria: "Escola",
    titulo: "Comunicação entre família e escola",
    resumo:
      "Conheça a importância do diálogo entre responsáveis e profissionais da educação.",
    conteudo:
      "A comunicação entre a família e a escola pode ajudar no acompanhamento da criança. Informações sobre rotina, comportamento, necessidades e estratégias que funcionam em casa podem contribuir para o ambiente escolar. Da mesma forma, os responsáveis podem acompanhar informações importantes sobre a experiência da criança na escola.",
  },
  {
    id: 5,
    categoria: "Organização",
    titulo: "Como organizar consultas e terapias",
    resumo:
      "Aprenda algumas formas de acompanhar compromissos sem perder informações importantes.",
    conteudo:
      "Manter consultas e terapias organizadas pode ser mais simples quando todas as informações ficam concentradas em um único lugar. Data, horário, local, profissional responsável e observações podem ser registrados antecipadamente. Também pode ser útil anotar orientações recebidas durante cada atendimento.",
  },
  {
    id: 6,
    categoria: "Cuidados",
    titulo: "Registrando informações importantes",
    resumo:
      "Veja quais informações podem ajudar no acompanhamento da rotina da criança.",
    conteudo:
      "Registrar acontecimentos importantes pode facilitar o acompanhamento ao longo do tempo. Mudanças na rotina, observações escolares, orientações profissionais, alimentação e outros aspectos podem ser registrados de maneira organizada. Essas informações também podem ajudar durante conversas com profissionais responsáveis pelo acompanhamento da criança.",
  },
];
