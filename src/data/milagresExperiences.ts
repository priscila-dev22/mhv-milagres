export type MilagresExperience = {
  id: string;
  image: string;
  alt: string;
  moment: string;
  title: string;
  support: string;
  width: number;
  height: number;
  objectPosition: string;
  objectPositionMd?: string;
  objectPositionLg?: string;
};

export const milagresExperiences: MilagresExperience[] = [
  {
    id: "praia-manha",
    image: "/media/images/experience/praia-manha.jpg",
    alt: "Escada de madeira e placa na praia ao amanhecer, com coqueiros e mar calmo em Milagres",
    moment: "MANHÃ",
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
    moment: "Café da manhã",
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
    moment: "ENCONTROS",
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
    id: "lua",
    image: "/media/images/experience/lua.jpg",
    alt: "Lua sobre a paisagem noturna em Milagres, com céu escuro e atmosfera serena",
    moment: "Noite",
    title: "Sob o céu de Milagres",
    support: "A paisagem muda de tom e o tempo parece passar ainda mais devagar.",
    width: 1440,
    height: 1817,
    objectPosition: "50% 42%",
    objectPositionMd: "50% 40%",
    objectPositionLg: "50% 38%",
  },
  {
    id: "chuveiro",
    image: "/media/images/experience/chuveiro.png",
    alt: "Chuveiro ao ar livre à noite em Milagres, entre vegetação e luz suave",
    moment: "Frescor",
    title: "Um instante só seu",
    support:
      "Entre a brisa de Milagres e a tranquilidade da noite, até os momentos mais simples se tornam parte da experiência.",
    width: 1440,
    height: 1920,
    objectPosition: "50% 42%",
    objectPositionMd: "50% 40%",
    objectPositionLg: "50% 38%",
  },
];

/** Slide central ao carregar a seção (lua.jpg). */
export const milagresExperienceInitialRealIndex = milagresExperiences.findIndex(
  (item) => item.id === "lua",
);
