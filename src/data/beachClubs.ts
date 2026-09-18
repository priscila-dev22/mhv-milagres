export type BeachClub = {
  id: string;
  name: string;
  location: string;
  description: string;
  phone?: string;
  instagram?: string;
  mapsQuery: string;
  image?: string;
  objectPosition?: string;
};

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const beachClubs: BeachClub[] = [
  {
    id: "santo-milagres",
    name: "Santo Milagres Beach Club",
    location: "São Miguel dos Milagres",
    description:
      "Beach club à beira-mar com estrutura de day use, gastronomia e espaços de lazer, incluindo sua característica piscina viva com peixinhos.",
    phone: "+55 82 98108-2307",
    instagram: "https://www.instagram.com/santomilagres/",
    mapsQuery: "Santo Milagres Beach Club São Miguel dos Milagres AL",
  },
  {
    id: "corais-milagres",
    name: "Corais Milagres Beach Club",
    location: "São Miguel dos Milagres",
    description:
      "Beach club em São Miguel dos Milagres com estrutura para aproveitar o dia à beira-mar e opções de gastronomia.",
    phone: "+55 82 98705-5656",
    mapsQuery: "Corais Milagres Beach Club São Miguel dos Milagres AL",
  },
  {
    id: "sonhos-de-milagres",
    name: "Sonhos de Milagres",
    location: "Povoado do Toque · São Miguel dos Milagres",
    description:
      "Beach club e restaurante no Povoado do Toque, com estrutura à beira-mar para aproveitar o dia em São Miguel dos Milagres.",
    phone: "+55 82 99131-2000",
    mapsQuery:
      "Restaurante Sonhos de Milagres Povoado do Toque São Miguel dos Milagres AL",
  },
];

export function getBeachClubPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getBeachClubMapsUrl(club: BeachClub): string {
  return mapsSearch(club.mapsQuery);
}
