export type BeachClub = {
  id: string;
  name: string;
  location: string;
  description: string;
  phone?: string;
  instagram?: string;
  mapsQuery: string;
  image?: string;
  imageFit?: "cover" | "contain";
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
    image: "/media/images/beach-clubs/santomilagres.jpg",
    imageFit: "contain",
    objectPosition: "50% 50%",
  },
  {
    id: "corais-milagres",
    name: "Corais Milagres Beach Club",
    location: "São Miguel dos Milagres",
    description:
      "Beach club em São Miguel dos Milagres com estrutura para aproveitar o dia à beira-mar e opções de gastronomia.",
    phone: "+55 82 98705-5656",
    mapsQuery: "Corais Milagres Beach Club São Miguel dos Milagres AL",
    image: "/media/images/beach-clubs/coraismilagres.jpg",
    imageFit: "contain",
    objectPosition: "50% 50%",
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
    image: "/media/images/beach-clubs/sonhosdemilagres.jpg",
    imageFit: "contain",
    objectPosition: "50% 50%",
  },
  {
    id: "milagres-do-toque",
    name: "Milagres do Toque Beach Club",
    location: "Praia do Toque · São Miguel dos Milagres",
    description:
      "Beach club localizado na Praia do Toque, com estrutura de day use, gastronomia e espaços de lazer à beira-mar.",
    phone: "+55 82 99329-7013",
    instagram: "https://www.instagram.com/milagresdotoque/",
    mapsQuery:
      "Milagres do Toque Beach Club Praia do Toque São Miguel dos Milagres AL",
    image: "/media/images/beach-clubs/milagres-do-toque.jpg",
    objectPosition: "50% 44%",
  },
  {
    id: "loha-beach-club",
    name: "Loha Beach Club",
    location: "Porto da Rua · São Miguel dos Milagres",
    description:
      "Beach club à beira-mar em Porto da Rua, com estrutura para aproveitar o dia, gastronomia e ambiente pé na areia.",
    instagram: "https://www.instagram.com/lohabeachclub_/",
    mapsQuery: "Loha Beach Club Porto da Rua São Miguel dos Milagres AL",
    image: "/media/images/beach-clubs/lohanbeach.jpg",
    imageFit: "contain",
    objectPosition: "50% 50%",
  },
  {
    id: "patacho-praia",
    name: "Patacho Praia",
    location: "Praia do Patacho · Porto de Pedras",
    description:
      "Beach club na Praia do Patacho com estrutura de day use, gastronomia e espaços para aproveitar o dia à beira-mar.",
    instagram: "https://www.instagram.com/patachopraia/",
    mapsQuery: "Patacho Praia Porto de Pedras AL",
    image: "/media/images/beach-clubs/patachopraia.jpg",
    imageFit: "contain",
    objectPosition: "50% 50%",
  },
  {
    id: "sonhos-do-patacho",
    name: "Sonhos do Patacho Beach Club",
    location: "Praia do Patacho · Porto de Pedras",
    description:
      "Beach club à beira-mar na Praia do Patacho, com estrutura de lazer e gastronomia para aproveitar o dia em Porto de Pedras.",
    instagram: "https://www.instagram.com/sonhosdopatacho/",
    mapsQuery: "Sonhos do Patacho Beach Club Porto de Pedras AL",
    image: "/media/images/beach-clubs/SonhosdopatachoBeachClub.jpeg",
    imageFit: "contain",
    objectPosition: "50% 50%",
  },
];

export function getBeachClubPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getBeachClubMapsUrl(club: BeachClub): string {
  return mapsSearch(club.mapsQuery);
}
