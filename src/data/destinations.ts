export type DestinationCategory =
  | "praias"
  | "mirantes"
  | "historia-cultura"
  | "natureza"
  | "por-do-sol";

export type Destination = {
  id: string;
  name: string;
  location: string;
  description: string;
  highlights: string[];
  mapsQuery: string;
  categories: DestinationCategory[];
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  objectPositionMd?: string;
  objectPositionLg?: string;
};

export const destinationFilters: {
  id: DestinationCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "praias", label: "Praias" },
  { id: "mirantes", label: "Mirantes" },
  { id: "historia-cultura", label: "História & Cultura" },
  { id: "natureza", label: "Natureza" },
  { id: "por-do-sol", label: "Pôr do sol" },
];

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Ordem editorial intercalada — praias existentes preservadas */
export const destinations: Destination[] = [
  {
    id: "marceneiro",
    name: "Praia do Marceneiro",
    location: "Marceneiro",
    description:
      "Uma das portas de entrada da Rota. Piscinas naturais, bancos de areia e a Capela dos Milagres, com gastronomia e serviços por perto — ponto de partida para diferentes experiências.",
    highlights: [
      "Praia do Marceneiro",
      "Piscinas naturais",
      "Bancos de areia",
      "Capela dos Milagres",
      "Gastronomia e serviços",
      "Ponto de partida",
    ],
    mapsQuery: "Praia do Marceneiro, Passo de Camaragibe, AL",
    categories: ["praias"],
    image: encodeURI(
      "/media/images/Descubra Milagres/Praia_do_Marceneiro_-_São_Miguel_dos_Milagres_(51729288329).jpg",
    ),
    imageAlt: "Praia do Marceneiro com faixa de areia, coqueiros e mar",
    objectPosition: "34% 52%",
    objectPositionMd: "42% 48%",
    objectPositionLg: "46% 44%",
  },
  {
    id: "mirante-alto-do-cruzeiro",
    name: "Mirante Alto do Cruzeiro",
    location: "São Miguel dos Milagres",
    description:
      "Vista panorâmica de São Miguel dos Milagres, em um ponto simples e privilegiado para contemplar a região e fotografar a paisagem.",
    highlights: ["Vista panorâmica", "Ponto para fotografar"],
    mapsQuery: "Mirante Alto do Cruzeiro São Miguel dos Milagres AL",
    categories: ["mirantes", "por-do-sol"],
  },
  {
    id: "riacho",
    name: "Praia do Riacho",
    location: "Riacho",
    description:
      "Trecho tranquilo da Rota Ecológica, com uma atmosfera serena e acesso às opções gastronômicas da região.",
    highlights: [
      "Praia do Riacho",
      "Atmosfera tranquila",
      "Rota Ecológica",
      "Gastronomia da região",
    ],
    mapsQuery: "Praia do Riacho, Passo de Camaragibe, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praia_do_riacho.jpg"),
    imageAlt: "Praia do Riacho com coqueiro, faixa de areia e mar",
    objectPosition: "38% 50%",
    objectPositionMd: "42% 48%",
    objectPositionLg: "46% 46%",
  },
  {
    id: "igrejinha-sao-miguel",
    name: "Igrejinha de São Miguel dos Milagres",
    location: "São Miguel dos Milagres / região da Praia do Riacho",
    description:
      "Um dos cartões-postais de São Miguel dos Milagres, próximo à Praia do Riacho e integrado à paisagem litorânea da região.",
    highlights: ["Cartão-postal", "Praia do Riacho"],
    mapsQuery: "Igrejinha de São Miguel dos Milagres AL",
    categories: ["historia-cultura"],
  },
  {
    id: "sao-miguel",
    name: "São Miguel dos Milagres",
    location: "São Miguel dos Milagres",
    description:
      "Praias, piscinas naturais e jangadas, com estrutura local e proximidade com Porto da Rua.",
    highlights: [
      "Praias da região",
      "Piscinas naturais",
      "Jangadas",
      "Gastronomia",
      "Estrutura local",
      "Porto da Rua",
    ],
    mapsQuery: "São Miguel dos Milagres, AL",
    categories: ["praias"],
    image: encodeURI(
      "/media/images/Descubra Milagres/praia_saomigueldosmilagres.jpg",
    ),
    imageAlt: "Paisagem de praia e mar na região de São Miguel dos Milagres",
    objectPosition: "48% 56%",
    objectPositionMd: "50% 52%",
    objectPositionLg: "50% 48%",
  },
  {
    id: "fonte-dos-milagres",
    name: "Fonte dos Milagres",
    location: "São Miguel dos Milagres",
    description:
      "Uma das referências históricas de São Miguel dos Milagres, a tradicional Fonte dos Milagres faz parte da identidade e da memória do município. Também conhecida como Fonte Milagrosa.",
    highlights: ["Referência histórica", "Memória do município"],
    mapsQuery: "Fonte dos Milagres São Miguel dos Milagres AL",
    categories: ["historia-cultura"],
  },
  {
    id: "toque",
    name: "Praia do Toque",
    location: "Toque",
    description:
      "Águas claras, piscinas naturais e jangadas, com gastronomia da região.",
    highlights: [
      "Praia do Toque",
      "Piscinas naturais",
      "Águas claras",
      "Jangadas",
      "Gastronomia da região",
    ],
    mapsQuery: "Praia do Toque, São Miguel dos Milagres, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadotoque.jpg"),
    imageAlt: "Praia do Toque com coqueiros e o mar ao fundo",
    objectPosition: "42% 46%",
    objectPositionMd: "46% 48%",
    objectPositionLg: "48% 50%",
  },
  {
    id: "tatuamunha",
    name: "Tatuamunha",
    location: "Tatuamunha",
    description:
      "Natureza preservada no Rio Tatuamunha, com o Projeto Peixe-Boi e o passeio de jangada pelo rio. Campo de golfe mediante consulta.",
    highlights: [
      "Rio Tatuamunha",
      "Projeto Peixe-Boi",
      "Passeio de jangada pelo rio",
      "Natureza preservada",
      "Campo de golfe mediante consulta",
    ],
    mapsQuery: "Rio Tatuamunha, Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadetatuamunha.jpg"),
    imageAlt: "Águas do Rio Tatuamunha",
    objectPosition: "50% 58%",
    objectPositionMd: "50% 54%",
    objectPositionLg: "50% 52%",
  },
  {
    id: "santuario-peixe-boi",
    name: "Santuário do Peixe-Boi",
    location: "Rio Tatuamunha — Porto de Pedras",
    description:
      "Uma experiência de contato com o ecossistema do Rio Tatuamunha e com o trabalho de conservação do peixe-boi marinho realizado na região.",
    highlights: ["Rio Tatuamunha", "Conservação do peixe-boi"],
    mapsQuery: "Santuário Peixe Boi Tatuamunha Porto de Pedras AL",
    categories: ["natureza"],
  },
  {
    id: "ponte-rio-tatuamunha",
    name: "Ponte do Rio Tatuamunha",
    location: "Tatuamunha — Porto de Pedras",
    description:
      "A tradicional travessia de madeira sobre o Rio Tatuamunha revela manguezais e uma das paisagens mais especiais do povoado.",
    highlights: ["Travessia de madeira", "Manguezais"],
    mapsQuery: "Ponte do Rio Tatuamunha Porto de Pedras AL",
    categories: ["natureza", "por-do-sol"],
  },
  {
    id: "tatuamunha-encontro-rio-mar",
    name: "Tatuamunha — Encontro do Rio com o Mar",
    location: "Praia de Tatuamunha — Porto de Pedras",
    description:
      "Na foz do Rio Tatuamunha, o encontro entre rio, manguezal, coqueiros e mar cria um dos cenários mais bonitos da região ao entardecer. Na extremidade da praia, o Riacho Tabatinga encontra o mar em uma paisagem cercada por vegetação e águas tranquilas.",
    highlights: ["Foz do Rio Tatuamunha", "Riacho Tabatinga", "Entardecer"],
    mapsQuery: "Boca do Rio Tatuamunha Porto de Pedras AL",
    categories: ["natureza", "por-do-sol"],
  },
  {
    id: "povoado-tatuamunha",
    name: "Povoado de Tatuamunha",
    location: "Tatuamunha — Porto de Pedras",
    description:
      "Além das praias, Tatuamunha preserva casarões, igrejas, artesanato e a atmosfera tranquila de um povoado tradicional da Rota dos Milagres.",
    highlights: ["Casarões", "Igrejas", "Artesanato"],
    mapsQuery: "Povoado de Tatuamunha Porto de Pedras AL",
    categories: ["historia-cultura"],
  },
  {
    id: "patacho",
    name: "Praia do Patacho",
    location: "Patacho",
    description:
      "Piscinas naturais na APA Costa dos Corais, com experiências de mergulho na região do Patacho Dive.",
    highlights: [
      "Praia do Patacho",
      "Piscinas naturais",
      "APA Costa dos Corais",
      "Experiências de mergulho",
      "Patacho Dive",
    ],
    mapsQuery: "Praia do Patacho, Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadopatacho.jpg"),
    imageAlt: "Águas rasas e cristalinas na Praia do Patacho",
    objectPosition: "54% 52%",
    objectPositionMd: "52% 50%",
    objectPositionLg: "50% 48%",
  },
  {
    id: "capela-sao-joao-patacho",
    name: "Capela São João do Patacho",
    location: "Praia do Patacho — Porto de Pedras",
    description:
      "Entre coqueiros e jardins, a pequena capela do Patacho é um dos cenários mais delicados e fotogênicos da região.",
    highlights: ["Coqueiros e jardins", "Cenário fotogênico"],
    mapsQuery: "Capela São João do Patacho Porto de Pedras AL",
    categories: ["historia-cultura"],
  },
  {
    id: "porto-de-pedras",
    name: "Porto de Pedras",
    location: "Porto de Pedras",
    description:
      "Parte da experiência da Rota Ecológica dos Milagres, ao norte da costa.",
    highlights: ["Rota Ecológica dos Milagres"],
    mapsQuery: "Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiaporto.jpg"),
  },
  {
    id: "farol-porto-de-pedras",
    name: "Farol de Porto de Pedras",
    location: "Morro dos Coqueiros — Porto de Pedras",
    description:
      "Em uma das áreas mais altas de Porto de Pedras, o farol oferece uma vista privilegiada da cidade e da paisagem da Rota dos Milagres.",
    highlights: ["Morro dos Coqueiros", "Vista privilegiada"],
    mapsQuery: "Farol de Porto de Pedras AL",
    categories: ["mirantes", "historia-cultura"],
  },
];

export function getDestinationMapsUrl(destination: Destination): string {
  return mapsSearch(destination.mapsQuery);
}

export function filterDestinationsByCategory(
  category: DestinationCategory | "all",
): Destination[] {
  if (category === "all") return destinations;
  return destinations.filter((item) => item.categories.includes(category));
}
