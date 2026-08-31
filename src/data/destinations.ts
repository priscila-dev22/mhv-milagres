export type Destination = {
  id: string;
  name: string;
  location: string;
  description: string;
  highlights: string[];
  mapsQuery: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  objectPositionMd?: string;
  objectPositionLg?: string;
};

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

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
    // Fotografia real da Praia do Marceneiro — atribuição da licença a tratar posteriormente, fora do card.
    image: encodeURI(
      "/media/images/Descubra Milagres/Praia_do_Marceneiro_-_São_Miguel_dos_Milagres_(51729288329).jpg",
    ),
    imageAlt: "Praia do Marceneiro com faixa de areia, coqueiros e mar",
    objectPosition: "34% 52%",
    objectPositionMd: "42% 48%",
    objectPositionLg: "46% 44%",
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
    image: encodeURI("/media/images/Descubra Milagres/praia_do_riacho.jpg"),
    imageAlt: "Praia do Riacho com coqueiro, faixa de areia e mar",
    objectPosition: "38% 50%",
    objectPositionMd: "42% 48%",
    objectPositionLg: "46% 46%",
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
    image: encodeURI(
      "/media/images/Descubra Milagres/praia_saomigueldosmilagres.jpg",
    ),
    imageAlt: "Paisagem de praia e mar na região de São Miguel dos Milagres",
    objectPosition: "48% 56%",
    objectPositionMd: "50% 52%",
    objectPositionLg: "50% 48%",
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
    image: encodeURI("/media/images/Descubra Milagres/praiadetatuamunha.jpg"),
    imageAlt: "Águas do Rio Tatuamunha",
    objectPosition: "50% 58%",
    objectPositionMd: "50% 54%",
    objectPositionLg: "50% 52%",
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
    image: encodeURI("/media/images/Descubra Milagres/praiadopatacho.jpg"),
    imageAlt: "Águas rasas e cristalinas na Praia do Patacho",
    objectPosition: "54% 52%",
    objectPositionMd: "52% 50%",
    objectPositionLg: "50% 48%",
  },
  {
    id: "porto-de-pedras",
    name: "Porto de Pedras",
    location: "Porto de Pedras",
    description:
      "Parte da experiência da Rota Ecológica dos Milagres, ao norte da costa.",
    highlights: ["Rota Ecológica dos Milagres"],
    mapsQuery: "Porto de Pedras, AL",
  },
];

export function getDestinationMapsUrl(destination: Destination): string {
  return mapsSearch(destination.mapsQuery);
}
