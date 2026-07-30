export type MilagresExperience = {
  id: string;
  image: string;
  alt: string;
  moment: string;
  title: string;
  support: string;
  width: number;
  height: number;
  /** Mobile (<768px), crop vertical 4:5 */
  objectPosition: string;
  /** Tablet (768px+) */
  objectPositionMd?: string;
  /** Desktop (1024px+) */
  objectPositionLg?: string;
};

export const milagresExperiences: MilagresExperience[] = [
  {
    id: "praia-manha",
    image: "/media/images/experience/praia-manha.jpg",
    alt: "Escada de madeira e placa na praia ao amanhecer, com coqueiros e mar calmo em Milagres",
    moment: "Manhã",
    title: "Começar sem pressa",
    support: "A brisa, o mar e o primeiro silêncio do dia.",
    width: 4032,
    height: 2268,
    objectPosition: "46% 62%",
    objectPositionMd: "48% 56%",
    objectPositionLg: "50% 52%",
  },
  {
    id: "cafe-da-manha",
    image: "/media/images/experience/cafe-da-manha.jpg",
    alt: "Mesa posta com frutas frescas, pratos e café da manhã em ambiente acolhedor",
    moment: "Sabores",
    title: "A manhã à mesa",
    support: "Frutas frescas e pequenos rituais para aproveitar o tempo.",
    width: 1600,
    height: 1071,
    objectPosition: "50% 48%",
    objectPositionMd: "50% 46%",
    objectPositionLg: "48% 42%",
  },
  {
    id: "area-gourmet",
    image: "/media/images/experience/area-gourmet.jpg",
    alt: "Área gourmet ao ar livre com mesa preparada para encontros ao entardecer",
    moment: "Encontros",
    title: "Tempo para compartilhar",
    support: "Ambientes preparados para reunir, celebrar e permanecer.",
    width: 4032,
    height: 3024,
    objectPosition: "50% 52%",
    objectPositionMd: "50% 48%",
    objectPositionLg: "50% 44%",
  },
  {
    id: "fim-de-tarde",
    image: "/media/images/experience/fim-de-tarde.jpg",
    alt: "Piscina ao pôr do sol com palmeira, casas e céu alaranjado refletindo na água",
    moment: "Entardecer",
    title: "Quando o céu muda de cor",
    support: "A luz se reflete na água e Milagres desacelera outra vez.",
    width: 941,
    height: 1672,
    objectPosition: "56% 40%",
    objectPositionMd: "54% 34%",
    objectPositionLg: "52% 30%",
  },
  {
    id: "casa-noite",
    image: "/media/images/experience/casa-noite.jpg",
    alt: "Fachada iluminada da casa à noite com piscina e jardim em Milagres",
    moment: "Noite",
    title: "Voltar para casa",
    support: "Privacidade e conforto para encerrar o dia no seu ritmo.",
    width: 3213,
    height: 5712,
    objectPosition: "50% 38%",
    objectPositionMd: "50% 36%",
    objectPositionLg: "50% 32%",
  },
];
