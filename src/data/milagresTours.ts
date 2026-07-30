export type MilagresTour = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  objectPosition?: string;
};

/** Ordem e conteúdo: altere apenas este array para mudar a composição. */
export const milagresTours: MilagresTour[] = [
  {
    id: "buggy",
    name: "BUGGY",
    description: "Entre praias praticamente intocadas.",
    image: "/media/images/turista/buggy.jpg",
    alt: "Buggy em trilha de praia com coqueiros e mar azul em Milagres",
    objectPosition: "50% 42%",
  },
  {
    id: "mergulho",
    name: "MERGULHO",
    description: "Piscinas naturais de águas cristalinas.",
    image: "/media/images/turista/mergulho.jpg",
    alt: "Mergulho em águas claras e piscinas naturais na costa de Milagres",
    objectPosition: "50% 48%",
  },
  {
    id: "jetski",
    name: "JET SKI",
    description: "Milagres vista do mar.",
    image: "/media/images/turista/jetski.jpg",
    alt: "Jet ski na costa de Milagres com mar aberto e horizonte amplo",
    objectPosition: "50% 40%",
  },
  {
    id: "passeio",
    name: "PASSEIO",
    description: "Cada roteiro revela uma nova paisagem.",
    image: "/media/images/turista/passeio.jpg",
    alt: "Trilha e paisagem da Rota Ecológica em Milagres",
    objectPosition: "50% 46%",
  },
];

export function getTourDisplayRank(
  tourIndex: number,
  activeIndex: number,
  total: number,
): number {
  return (tourIndex - activeIndex + total) % total;
}
