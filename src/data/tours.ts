export type TourDetailSection = {
  label: string;
  body: string | string[];
};

export type TourModality = {
  name: string;
  sections: TourDetailSection[];
};

export type Tour = {
  id: string;
  name: string;
  category: string;
  image?: string;
  objectPosition?: string;
  imageAlt?: string;
  summary: string;
  highlight: string;
  duration?: string;
  location?: string;
  ctaLabel: string;
  ctaMessage: string;
  modalities?: TourModality[];
  sections?: TourDetailSection[];
};

const IMG = {
  mergulho: "/media/images/passeios/mergulho.jpg.jpg",
  buggy: "/media/images/passeios/Buggy.jpg.png",
  praia: "/media/images/passeios/praiaazul.jpg.jpg",
  agua: "/media/images/passeios/pexels-monstro-15009318.jpg",
  folhas: "/media/images/passeios/pexels-monstro-15009277.jpg",
} as const;

export const TOURS_WHATSAPP_NUMBER = "5582988701957";

function ctaMessage(passeio: string) {
  return `Olá! Sou hóspede da MHV e gostaria de consultar disponibilidade para o ${passeio}.`;
}

export function getTourCtaHref(tour: Tour): string {
  return `https://wa.me/${TOURS_WHATSAPP_NUMBER}?text=${encodeURIComponent(tour.ctaMessage)}`;
}

export const tours: Tour[] = [
  {
    id: "jangada",
    name: "Passeio de jangada",
    category: "Mar",
    image: "/media/images/passeios/passeiojangada.webp",
    objectPosition: "50% 50%",
    imageAlt: "Jangada nas piscinas naturais da Rota Ecológica dos Milagres",
    summary:
      "Piscinas naturais, bancos de areia e o litoral da Rota Ecológica — em modalidades regular, privativa, com frutos do mar ou ao pôr do sol.",
    highlight: "A partir de R$ 100,00",
    duration: "2 a 3 horas",
    location: "Rota Ecológica dos Milagres",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio de jangada"),
    modalities: [
      {
        name: "Diurno regular",
        sections: [
          {
            label: "Valores",
            body: [
              "São Miguel, Patacho e Toque: R$ 120,00 por pessoa.",
              "Marceneiro: R$ 100,00 por pessoa.",
            ],
          },
          { label: "Duração", body: "2 a 3 horas." },
          {
            label: "Embarque",
            body: [
              "Avenida do Marceneiro — Praia do Marceneiro",
              "Beach Club Corais — São Miguel e Toque",
              "Orla da Praia do Patacho",
            ],
          },
          {
            label: "Destinos possíveis",
            body: [
              "Piscinas naturais",
              "Bancos de areia",
              "Poço fundo",
              "Marceneiro",
              "Patacho",
              "São Miguel",
              "Toque",
            ],
          },
          {
            label: "Capacidade",
            body: [
              "Até 20 pessoas em Patacho, Toque e Milagres.",
              "Até 16 pessoas em Marceneiro.",
            ],
          },
          { label: "Não inclui", body: "Alimentos e bebidas." },
        ],
      },
      {
        name: "Jangada diurna privativa",
        sections: [
          {
            label: "Valores",
            body: [
              "São Miguel, Patacho e Toque: R$ 1.800,00 por embarcação.",
              "Marceneiro: R$ 250,00 por embarcação para casal.",
              "Marceneiro: R$ 720,00 por embarcação para até 6 pessoas.",
            ],
          },
          { label: "Duração", body: "2 a 3 horas." },
          {
            label: "Embarque e destinos",
            body: "Mesmos pontos gerais de embarque e destinos do passeio regular.",
          },
          { label: "Não inclui", body: "Alimentos e bebidas." },
        ],
      },
      {
        name: "Jangada com frutos do mar",
        sections: [
          {
            label: "Valor",
            body: "R$ 200,00 a R$ 300,00 por pessoa, conforme a quantidade de participantes. Quanto maior o grupo, menor o valor por pessoa.",
          },
          { label: "Duração", body: "2 a 3 horas." },
          { label: "Embarque", body: "Avenida do Marceneiro." },
          {
            label: "Destino",
            body: "Piscina natural e banco de areia de Marceneiro.",
          },
          { label: "Capacidade", body: "Até 16 pessoas." },
          {
            label: "Inclui",
            body: [
              "Preparação no local de itens como camarão, lagostim, peixe, frutas tropicais, polvo e carne.",
            ],
          },
          { label: "Não inclui", body: "Bebidas alcoólicas." },
        ],
      },
      {
        name: "Jangada — pôr do sol",
        sections: [
          { label: "Local", body: "Foz do Rio Camaragibe." },
          {
            label: "Valores",
            body: ["R$ 100,00 por pessoa.", "R$ 250,00 por casal."],
          },
          { label: "Duração", body: "2 a 3 horas." },
          { label: "Embarque", body: "Avenida do Marceneiro." },
          { label: "Capacidade", body: "Até 16 pessoas." },
          { label: "Não inclui", body: "Alimentos e bebidas." },
        ],
      },
    ],
  },
  {
    id: "jetski",
    name: "Jet Ski — Japaratinga",
    category: "Mar",
    image: "/media/images/passeios/jetskijaparatinga.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Águas da costa alagoana",
    summary:
      "Saídas na Praia do Boqueirão, em Japaratinga, com horários de 20 minutos, 30 minutos ou 1 hora.",
    highlight: "A partir de R$ 250,00",
    duration: "20 min, 30 min ou 1 h",
    location: "Praia do Boqueirão — Japaratinga",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio de Jet Ski em Japaratinga"),
    sections: [
      {
        label: "Valores",
        body: [
          "20 minutos: R$ 250,00 por Jet Ski.",
          "30 minutos: R$ 350,00 por Jet Ski.",
          "1 hora: R$ 600,00 por Jet Ski.",
        ],
      },
      { label: "Local", body: "Praia do Boqueirão." },
      { label: "Reserva", body: "Somente através da MHV." },
    ],
  },
  {
    id: "buggy",
    name: "Buggy / Bugre",
    category: "Terra",
    image: IMG.buggy,
    objectPosition: "50% 42%",
    imageAlt: "Buggies na praia, com coqueirais e mar ao fundo",
    summary:
      "Três rotas pelo litoral, com motorista, entre Marceneiro, São Miguel dos Milagres e Patacho.",
    highlight: "A partir de R$ 300,00",
    duration: "2 a 3 horas",
    location: "Litoral da Rota Ecológica",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio de buggy"),
    modalities: [
      {
        name: "Rota Sul",
        sections: [
          { label: "Valor", body: "R$ 300,00 por buggy." },
          { label: "Duração", body: "2 a 3 horas." },
          { label: "Embarque", body: "O motorista busca o hóspede no local." },
          { label: "Percurso", body: "Marceneiro → São Miguel dos Milagres." },
          { label: "Capacidade", body: "Até 4 pessoas." },
          { label: "Não inclui", body: "Alimentos e bebidas." },
        ],
      },
      {
        name: "Rota Norte",
        sections: [
          { label: "Valor", body: "R$ 300,00 por buggy." },
          { label: "Duração", body: "2 a 3 horas." },
          { label: "Percurso", body: "São Miguel dos Milagres → Patacho." },
          { label: "Capacidade", body: "Até 4 pessoas." },
        ],
      },
      {
        name: "Rota Milagres",
        sections: [
          { label: "Valor", body: "R$ 500,00 por buggy." },
          { label: "Duração", body: "2 a 3 horas." },
          { label: "Percurso", body: "Marceneiro → Patacho." },
          { label: "Capacidade", body: "Até 4 pessoas." },
        ],
      },
    ],
  },
  {
    id: "quadriciclo",
    name: "Quadriciclo",
    category: "Terra",
    image: "/media/images/passeios/quadriciclo.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Veículo na areia da praia, entre coqueirais",
    summary:
      "Passeio regular de 2 a 3 horas ou diária de 24 horas. É necessário possuir habilitação categoria B.",
    highlight: "A partir de R$ 400,00",
    duration: "2 a 3 horas ou 24 h",
    location: "Beach Club Corais ou no local",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio de quadriciclo"),
    modalities: [
      {
        name: "Passeio regular",
        sections: [
          { label: "Valor", body: "R$ 400,00 por quadriciclo." },
          { label: "Duração", body: "2 a 3 horas." },
          {
            label: "Partida",
            body: "Beach Club Corais ou busca do cliente no local.",
          },
          {
            label: "Rotas possíveis",
            body: [
              "Marceneiro",
              "São Miguel",
              "Toque",
              "Praia dos Morros de Camaragibe",
              "Trechos de mata atlântica ciliar preservada",
            ],
          },
          { label: "Requisito", body: "Habilitação categoria B." },
        ],
      },
      {
        name: "Diária 24h",
        sections: [
          { label: "Valor", body: "R$ 1.200,00 por quadriciclo." },
          { label: "Duração", body: "24 horas." },
          {
            label: "Entrega",
            body: "Beach Club Corais ou entrega no local do cliente.",
          },
          { label: "Requisito", body: "Habilitação categoria B." },
        ],
      },
    ],
  },
  {
    id: "lancha",
    name: "Passeio de lancha",
    category: "Mar",
    image: "/media/images/passeios/passeiolancha.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Mar e orla da costa dos Milagres",
    summary:
      "Saídas a partir do centro de Japaratinga, com opção de lancha privativa.",
    highlight: "A partir de R$ 120,00",
    duration: "2 a 3 horas",
    location: "Centro de Japaratinga",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio de lancha"),
    sections: [
      {
        label: "Valores",
        body: ["R$ 120,00 por pessoa.", "Lancha privativa: R$ 1.000,00."],
      },
      { label: "Duração", body: "2 a 3 horas." },
      { label: "Embarque", body: "Centro de Japaratinga." },
      {
        label: "Destinos possíveis",
        body: [
          "Praia de Japaratinga",
          "Piscinas naturais",
          "Banco de areia",
          "Antunes",
          "Caminho de Moisés",
        ],
      },
      { label: "Capacidade", body: "Até 12 pessoas." },
      { label: "Não inclui", body: "Alimentos e bebidas." },
    ],
  },
  {
    id: "batismo-mergulho",
    name: "Batismo de Mergulho — Patacho Dive",
    category: "Mergulho",
    image: "/media/images/passeios/passeiomergulho.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Águas rasas e cristalinas na costa dos Milagres",
    summary:
      "Primeira experiência de mergulho acompanhada por instrutor PADI na APA Costa dos Corais.",
    highlight: "R$ 350,00 por pessoa",
    duration: "30 a 40 min submerso",
    location: "APA Costa dos Corais",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("batismo de mergulho Patacho Dive"),
    sections: [
      {
        label: "Valores",
        body: [
          "R$ 350,00 por pessoa.",
          "R$ 650,00 por casal.",
          "Fotos e vídeos inclusos.",
        ],
      },
      { label: "Tempo submerso", body: "Aproximadamente 30 a 40 minutos." },
      {
        label: "Funcionamento",
        body: [
          "Recepção no ponto de embarque",
          "Embarque em jangada",
          "Deslocamento até o ponto de mergulho na APA",
          "Acompanhamento por instrutor PADI",
          "Apresentação sobre corais e vida marinha",
          "Briefing de segurança",
          "Equipamento completo",
          "Adaptação na água",
          "Mergulho realizado em duplas",
          "Exploração da área dos corais",
          "Registros fotográficos e em vídeo",
        ],
      },
      {
        label: "Equipamentos incluídos",
        body: [
          "Roupa de neoprene",
          "Nadadeira",
          "Máscara",
          "Colete",
          "Cilindro",
          "Lastro",
        ],
      },
      {
        label: "Inclui",
        body: [
          "Navegação",
          "Equipamentos",
          "Adaptação",
          "Acompanhamento",
          "Fotos",
          "Vídeos em 4K/HD",
        ],
      },
      { label: "Reserva", body: "Somente através da MHV." },
    ],
  },
  {
    id: "open-water",
    name: "Open Water Diver PADI",
    category: "Mergulho",
    image: "/media/images/passeios/mergulhoopen.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Águas da APA Costa dos Corais",
    summary:
      "Curso de certificação internacional para mergulho autônomo até 18 metros de profundidade, em quatro etapas.",
    highlight: "R$ 2.800,00 à vista",
    duration: "4 etapas",
    location: "APA Costa dos Corais / Praia do Patacho",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("curso Open Water Diver PADI"),
    modalities: [
      {
        name: "Etapa 1 — Conteúdo teórico",
        sections: [
          {
            label: "Conteúdo",
            body: "Leitura do material e realização das questões online.",
          },
        ],
      },
      {
        name: "Etapa 2 — Águas confinadas",
        sections: [
          { label: "Local", body: "Aula em piscina." },
          {
            label: "Conteúdo",
            body: [
              "Equipamentos",
              "Montagem",
              "Como se equipar",
              "Circuito de 48 habilidades",
              "Desenvolvimento de domínio das habilidades",
            ],
          },
          { label: "Duração média", body: "4 a 5 horas." },
        ],
      },
      {
        name: "Etapa 3 — Águas abertas",
        sections: [
          { label: "Local", body: "APA Costa dos Corais / Praia do Patacho." },
          {
            label: "Foco",
            body: [
              "Novo circuito de habilidades em águas abertas",
              "Utilização simultânea das habilidades",
              "Flutuabilidade",
              "Familiaridade com equipamentos",
            ],
          },
          { label: "Duração média", body: "4 a 5 horas." },
        ],
      },
      {
        name: "Etapa 4 — Mergulho final",
        sections: [
          {
            label: "Conteúdo",
            body: "Últimas habilidades em profundidade aproximada de 12 metros. Após as habilidades, mergulho completo aplicando o aprendizado.",
          },
          { label: "Duração", body: "4 a 5 horas." },
          {
            label: "Certificação",
            body: "Ao concluir: certificação Open Water Diver PADI. Permite mergulho autônomo até 18 metros, conforme certificação PADI.",
          },
        ],
      },
    ],
    sections: [
      {
        label: "Valor à vista",
        body: "R$ 2.800,00.",
      },
      {
        label: "Parcelamento",
        body: "R$ 800,00 de entrada + 4 parcelas de R$ 560,00.",
      },
    ],
  },
  {
    id: "snorkel",
    name: "Mergulho com snorkel",
    category: "Mergulho",
    image: "/media/images/passeios/passeiosnorkel.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Águas rasas da costa dos corais",
    summary: "Disponibilidade e detalhes mediante consulta com a MHV.",
    highlight: "Sob consulta",
    location: "Rota Ecológica dos Milagres",
    ctaLabel: "Consultar com a MHV",
    ctaMessage: ctaMessage("mergulho com snorkel"),
    sections: [
      {
        label: "Disponibilidade",
        body: "Disponibilidade e detalhes mediante consulta.",
      },
    ],
  },
  {
    id: "stand-up",
    name: "Stand up paddle",
    category: "Mar",
    image: "/media/images/passeios/passeiostandup.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Água calma na costa de Milagres",
    summary:
      "Na Praia do Marceneiro e na Vilinha do Marceneiro, com instrutor, câmera para fotos e filmagens, e colete de segurança.",
    highlight: "Valor e disponibilidade sob consulta.",
    location: "Praia do Marceneiro / Vilinha do Marceneiro",
    ctaLabel: "Consultar com a MHV",
    ctaMessage: ctaMessage("stand up paddle"),
    sections: [
      {
        label: "Local",
        body: "Praia do Marceneiro / Vilinha do Marceneiro.",
      },
      {
        label: "Inclui",
        body: [
          "Instrutor para orientação",
          "Câmera para fotos e filmagens",
          "Colete de segurança",
        ],
      },
      {
        label: "Valor",
        body: "Valor e disponibilidade sob consulta.",
      },
    ],
  },
  {
    id: "fat-bike",
    name: "Fat bike / aluguel de bike",
    category: "Terra",
    image: "/media/images/passeios/passeiobike.jpg",
    objectPosition: "38% 50%",
    summary:
      "Aluguel na Praia do Marceneiro, com rotas à beira-mar, pedal ao pôr do sol, tour por praias e pontos turísticos locais.",
    highlight: "A partir de R$ 60,00",
    location: "Praia do Marceneiro",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("aluguel de fat bike"),
    sections: [
      { label: "Local", body: "Praia do Marceneiro." },
      {
        label: "Rotas sugeridas",
        body: [
          "Passeio à beira-mar",
          "Pedal ao pôr do sol",
          "Tour por praias",
          "Pontos turísticos locais",
        ],
      },
      {
        label: "Valores",
        body: [
          "1 hora: R$ 60,00.",
          "2 horas: R$ 80,00.",
          "Meio período, até 12h: R$ 100,00.",
          "Diária completa: R$ 130,00.",
        ],
      },
    ],
  },
  {
    id: "trilha-bike",
    name: "Trilha de bike — Praia dos Morros",
    category: "Terra",
    image: "/media/images/passeios/passeiomorros.jpg",
    objectPosition: "65% 50%",
    imageAlt: "Vegetação de mata atlântica na região de Milagres",
    summary:
      "Pedal nas Praias dos Morros de Camaragibe, com travessia de balsa e trecho preservado de mata atlântica ciliar.",
    highlight: "R$ 120,00 por bicicleta",
    duration: "2 a 3 horas",
    location: "Praias dos Morros de Camaragibe",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("trilha de bike na Praia dos Morros"),
    sections: [
      { label: "Valor", body: "R$ 120,00 por bicicleta." },
      { label: "Duração", body: "2 a 3 horas." },
      { label: "Local", body: "Praias dos Morros de Camaragibe." },
      {
        label: "Inclui",
        body: ["Travessia da balsa", "Água"],
      },
      {
        label: "Observação",
        body: "A região possui trecho preservado de mata atlântica ciliar.",
      },
    ],
  },
  {
    id: "caiaque",
    name: "Caiaque transparente",
    category: "Mar",
    image: "/media/images/passeios/passeiotransparente.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Águas da Rota Ecológica dos Milagres",
    summary: "Valor, duração e disponibilidade sob consulta.",
    highlight: "Sob consulta",
    location: "Rota Ecológica dos Milagres",
    ctaLabel: "Consultar com a MHV",
    ctaMessage: ctaMessage("passeio de caiaque transparente"),
    sections: [
      {
        label: "Valor, duração e disponibilidade",
        body: "Sob consulta.",
      },
    ],
  },
  {
    id: "cavalo",
    name: "Passeio a cavalo",
    category: "Terra",
    image: "/media/images/passeios/passeiocavalo.jpg",
    objectPosition: "50% 50%",
    summary:
      "Visita guiada a cavalo por fazendas da região, Praia do Marceneiro e Praia do Riacho.",
    highlight: "R$ 250,00 por cavalo",
    duration: "2 a 3 horas",
    location: "Marceneiro",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio a cavalo"),
    sections: [
      { label: "Valor", body: "R$ 250,00 por cavalo." },
      { label: "Duração", body: "2 a 3 horas." },
      { label: "Local", body: "Marceneiro." },
      {
        label: "Percursos possíveis",
        body: [
          "Fazendas da região",
          "Praia do Marceneiro",
          "Praia do Riacho",
        ],
      },
    ],
  },
  {
    id: "paramotor",
    name: "Paramotor",
    category: "Ar",
    image: "/media/images/passeios/passeioparamotor.jpg",
    objectPosition: "50% 50%",
    summary:
      "Experiência acompanhada em paramotor, com vista panorâmica da Rota Ecológica.",
    highlight: "R$ 400,00",
    duration: "10 a 15 minutos",
    location: "Praias da Rota Ecológica",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio de paramotor"),
    sections: [
      { label: "Valor", body: "R$ 400,00." },
      { label: "Duração", body: "10 a 15 minutos." },
      { label: "Local", body: "Praias da Rota Ecológica." },
      {
        label: "Descrição",
        body: "Experiência acompanhada em paramotor com vista panorâmica da região.",
      },
    ],
  },
  {
    id: "peixe-boi",
    name: "Projeto Peixe-Boi",
    category: "Natureza",
    image: "/media/images/passeios/passeiopeixeboi.avif",
    objectPosition: "50% 50%",
    imageAlt: "Águas da região de Tatuamunha",
    summary:
      "Visita guiada ao santuário do peixe-boi, de jangada pelo Rio Tatuamunha.",
    highlight: "R$ 120,00 por pessoa",
    duration: "2 a 3 horas",
    location: "Instituto Peixe-Boi — Tatuamunha",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("passeio Projeto Peixe-Boi"),
    sections: [
      { label: "Valor", body: "R$ 120,00 por pessoa." },
      { label: "Duração", body: "2 a 3 horas." },
      { label: "Local", body: "Instituto Peixe-Boi — Tatuamunha." },
      {
        label: "Realização",
        body: "Passeio realizado de jangada pelo Rio Tatuamunha.",
      },
    ],
  },
  {
    id: "capela",
    name: "Capela dos Milagres",
    category: "Cultura",
    image: "/media/images/passeios/passeiocapelamilagres.jpg",
    objectPosition: "50% 50%",
    summary: "Visita guiada à Capela dos Milagres, na Praia do Marceneiro.",
    highlight: "R$ 75,00 por pessoa",
    duration: "Até 1 hora",
    location: "Capela dos Milagres — Praia do Marceneiro",
    ctaLabel: "Solicitar passeio",
    ctaMessage: ctaMessage("visita guiada à Capela dos Milagres"),
    sections: [
      { label: "Valor", body: "R$ 75,00 por pessoa." },
      { label: "Duração", body: "Até 1 hora." },
      {
        label: "Local",
        body: "Capela dos Milagres — Praia do Marceneiro.",
      },
    ],
  },
  {
    id: "golfe",
    name: "Campo de golfe",
    category: "Natureza",
    image: "/media/images/passeios/passeiogolf.jpg",
    objectPosition: "50% 50%",
    imageAlt: "Vegetação nativa na região de Tatuamunha",
    summary:
      "Visita guiada ao campo de golfe de Tatuamunha — trilha em mata atlântica nativa, jogo ou aula, mediante agendamento.",
    highlight: "Sob consulta",
    location: "Tatuamunha",
    ctaLabel: "Consultar com a MHV",
    ctaMessage: ctaMessage("visita ao campo de golfe de Tatuamunha"),
    sections: [
      {
        label: "Experiências possíveis",
        body: [
          "Trilha em área de mata atlântica nativa",
          "Jogo de golfe",
          "Aula de golfe",
        ],
      },
      { label: "Valores", body: "Sob consulta." },
      {
        label: "Disponibilidade",
        body: "Sob consulta e agendamento prévio.",
      },
      { label: "Duração", body: "Sob consulta." },
      { label: "Local", body: "Tatuamunha." },
    ],
  },
];

export const TOUR_COUNT = tours.length;
