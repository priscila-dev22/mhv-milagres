export type TourFrame = "tall" | "wide" | "narrow" | "standard";

export type MilagresTour = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  mapsQuery: string;
  frame: TourFrame;
  objectPosition: string;
  objectPositionMd?: string;
  width: number;
  height: number;
  /** Jet ski usa o contato do fornecedor; demais usam concierge. */
  reserveVia: "jetski" | "concierge";
};

export const milagresTours: MilagresTour[] = [
  {
    id: "buggy",
    name: "BUGGY",
    description:
      "Percorra praias quase intocadas entre coqueiros e mar cristalino.",
    image: "/media/images/turista/buggy.jpg",
    alt: "Buggy em trilha de praia com coqueiros e mar azul em Milagres",
    mapsQuery: "passeio de buggy São Miguel dos Milagres AL",
    frame: "tall",
    objectPosition: "50% 45%",
    objectPositionMd: "50% 42%",
    width: 1600,
    height: 2000,
    reserveVia: "concierge",
  },
  {
    id: "mergulho",
    name: "MERGULHO",
    description:
      "Descubra piscinas naturais e a transparência única das águas de Milagres.",
    image: "/media/images/turista/mergulho.jpg",
    alt: "Mergulho em águas claras e piscinas naturais na costa de Milagres",
    mapsQuery: "mergulho piscinas naturais São Miguel dos Milagres",
    frame: "wide",
    objectPosition: "50% 50%",
    objectPositionMd: "48% 48%",
    width: 1800,
    height: 1200,
    reserveVia: "concierge",
  },
  {
    id: "jetski",
    name: "JET SKI",
    description: "Explore a costa por uma perspectiva completamente diferente.",
    image: "/media/images/turista/jetski.jpg",
    alt: "Jet ski na costa de Milagres com mar aberto e horizonte amplo",
    mapsQuery: "jet ski São Miguel dos Milagres AL",
    frame: "narrow",
    objectPosition: "52% 44%",
    objectPositionMd: "50% 40%",
    width: 1400,
    height: 1750,
    reserveVia: "jetski",
  },
  {
    id: "passeio",
    name: "PASSEIO",
    description: "Cada roteiro revela um novo ritmo da Rota Ecológica.",
    image: "/media/images/turista/passeio.jpg",
    alt: "Trilha e paisagem da Rota Ecológica em Milagres",
    mapsQuery: "Rota Ecológica dos Milagres São Miguel dos Milagres",
    frame: "standard",
    objectPosition: "50% 48%",
    objectPositionMd: "50% 46%",
    width: 1600,
    height: 1800,
    reserveVia: "concierge",
  },
];

export const milagresToursInitialIndex = 0;
