/** Guia gastronômico — Rota dos Milagres */

export type RestaurantRegion =
  | "marceneiro"
  | "riacho"
  | "sao-miguel"
  | "toque"
  | "tatuamunha";

export type Restaurant = {
  id: string;
  name: string;
  region: RestaurantRegion;
  /** Rótulo editorial exibido no card */
  regionLabel: string;
  description?: string;
  address?: string;
  phone?: string;
  instagram?: string;
  mapsUrl?: string;
  mapsQuery?: string;
  reservationRecommended?: boolean;
  image?: string;
  objectPosition?: string;
  /** Centrinho comercial — não apresentar como restaurante único */
  isCommercialHub?: boolean;
};

export const restaurantRegions: {
  id: RestaurantRegion | "all";
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "marceneiro", label: "Marceneiro" },
  { id: "riacho", label: "Riacho" },
  { id: "sao-miguel", label: "São Miguel" },
  { id: "toque", label: "Toque" },
  { id: "tatuamunha", label: "Tatuamunha" },
];

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Ordem geográfica — inclui estabelecimentos já existentes no projeto */
export const restaurants: Restaurant[] = [
  // —— Praia do Marceneiro ——
  {
    id: "araca",
    name: "Araçá",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    mapsQuery: "Araçá restaurante Praia do Marceneiro AL",
  },
  {
    id: "vilinha-marceneiro",
    name: "Vilinha Marceneiro",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    isCommercialHub: true,
    description:
      "Centrinho comercial na Praia do Marceneiro — lojas, conveniências e diversas opções de restaurantes.",
    mapsQuery: "Vilinha Marceneiro Praia do Marceneiro AL",
  },
  {
    id: "tanino-bistro",
    name: "Tanino Bistrô",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    mapsQuery: "Tanino Bistrô Praia do Marceneiro AL",
  },
  {
    id: "paru-bistro",
    name: "Parú Bistrô",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    reservationRecommended: true,
    mapsQuery: "Parú Bistrô Praia do Marceneiro AL",
  },
  {
    id: "salsa",
    name: "Salsa",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    reservationRecommended: true,
    mapsQuery: "Salsa restaurante Praia do Marceneiro AL",
  },

  // —— Praia do Riacho ——
  {
    id: "banami",
    name: "Banami",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    reservationRecommended: true,
    mapsQuery: "Banami restaurante Praia do Riacho AL",
  },
  {
    id: "raizero-dos-milagres",
    name: "Raizero dos Milagres",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    mapsQuery: "Raizero dos Milagres Praia do Riacho AL",
  },
  {
    id: "tarafa",
    name: "Tarafa",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    mapsQuery: "Tarafa restaurante Praia do Riacho AL",
  },
  {
    id: "vila-da-mata-bistro",
    name: "Vila da Mata Bistrô",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    reservationRecommended: true,
    mapsQuery: "Vila da Mata Bistrô Praia do Riacho AL",
  },
  {
    id: "micasa",
    name: "MiCasa",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    mapsQuery: "MiCasa restaurante Praia do Riacho AL",
  },

  // —— São Miguel dos Milagres ——
  {
    id: "aqua-gastrobar",
    name: "Aqua Gastrobar",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    mapsQuery: "Aqua Gastrobar São Miguel dos Milagres AL",
  },
  {
    id: "tenda-de-milagres",
    name: "Tenda de Milagres",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    mapsQuery: "Tenda de Milagres São Miguel dos Milagres AL",
  },
  {
    id: "segredos-de-milagres",
    name: "Segredos de Milagres",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    mapsQuery: "Segredos de Milagres São Miguel dos Milagres AL",
  },
  {
    id: "nacasa",
    name: "NACASA de boa",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    address: "Litoral norte, Alagoas",
    image: "/media/images/gastronomy/nacasa.jpg",
    mapsQuery: "NACASA de boa São Miguel dos Milagres",
    mapsUrl: mapsSearch("NACASA de boa São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/nacasadeboa/",
    objectPosition: "50% 40%",
  },
  {
    id: "o-beco",
    name: "O beco",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    address: "São Miguel dos Milagres",
    image: "/media/o-beco.png",
    mapsQuery: "O beco São Miguel dos Milagres",
    mapsUrl: mapsSearch("O beco São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/restauranteobeco/",
  },
  {
    id: "sur",
    name: "Sur",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    address: "Milagres · costa",
    image: "/media/images/gastronomy/sur.jpg",
    mapsQuery: "Sur restaurante São Miguel dos Milagres",
    mapsUrl: mapsSearch("Sur restaurante São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/restaurantesur/",
    objectPosition: "50% 38%",
  },

  // —— Praia do Toque ——
  {
    id: "quintal-do-ze",
    name: "Quintal do Zé",
    region: "toque",
    regionLabel: "Praia do Toque",
    mapsQuery: "Quintal do Zé Praia do Toque AL",
  },
  {
    id: "zaya-bistro",
    name: "Zaya Bistrô",
    region: "toque",
    regionLabel: "Praia do Toque",
    mapsQuery: "Zaya Bistrô Praia do Toque AL",
  },
  {
    id: "no-quintal",
    name: "Restaurante no Quintal",
    region: "toque",
    regionLabel: "Praia do Toque",
    address: "São Miguel dos Milagres",
    image: "/media/images/gastronomy/quintal.jpg",
    mapsQuery: "No Quintal restaurante São Miguel dos Milagres",
    mapsUrl: mapsSearch("No Quintal restaurante São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/restaurantenoquintal/",
    objectPosition: "50% 45%",
  },
  {
    id: "dadiva-cozinha",
    name: "Dádiva Cozinha",
    region: "toque",
    regionLabel: "Praia do Toque",
    mapsQuery: "Dádiva Cozinha Praia do Toque AL",
  },
  {
    id: "bruma-cafe",
    name: "Bruma Café",
    region: "toque",
    regionLabel: "Praia do Toque",
    mapsQuery: "Bruma Café Praia do Toque AL",
  },
  {
    id: "origami",
    name: "Origami",
    region: "toque",
    regionLabel: "Praia do Toque",
    reservationRecommended: true,
    mapsQuery: "Origami restaurante Praia do Toque AL",
  },
  {
    id: "patricia-bistro",
    name: "Patrícia Bistrô",
    region: "toque",
    regionLabel: "Praia do Toque",
    address: "São Miguel dos Milagres, AL",
    image: "/media/images/gastronomy/bistro.jpg",
    mapsQuery: "Patrícia Bistrô São Miguel dos Milagres",
    mapsUrl: mapsSearch("Patrícia Bistrô São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/patriciabistro/",
    objectPosition: "50% 42%",
  },
  {
    id: "vila-milagres",
    name: "Vila Milagres",
    region: "toque",
    regionLabel: "Praia do Toque",
    reservationRecommended: true,
    mapsQuery: "Vila Milagres Praia do Toque AL",
  },
  {
    id: "milagres-do-toque",
    name: "Milagres do Toque",
    region: "toque",
    regionLabel: "Praia do Toque",
    address: "Praia do Toque",
    image: "/media/images/gastronomy/toque.jpg",
    mapsQuery: "Milagres do Toque Praia do Toque",
    mapsUrl: mapsSearch("Milagres do Toque Praia do Toque"),
    instagram: "https://www.instagram.com/milagresdotoque/",
    objectPosition: "50% 44%",
  },

  // —— Tatuamunha ——
  {
    id: "jardim-secreto",
    name: "Jardim Secreto",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    mapsQuery: "Jardim Secreto restaurante Tatuamunha AL",
  },
  {
    id: "frutos-de-goias",
    name: "Frutos de Goiás",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    mapsQuery: "Frutos de Goiás Tatuamunha AL",
  },
  {
    id: "guaja-villa-gourmet",
    name: "Guajá Villa Gourmet",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    isCommercialHub: true,
    description:
      "Centrinho comercial em Tatuamunha — diferentes opções gastronômicas e serviços.",
    mapsQuery: "Guajá Villa Gourmet Tatuamunha AL",
  },
  {
    id: "vila-buriti",
    name: "Vila Buriti",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    mapsQuery: "Vila Buriti Tatuamunha AL",
  },
];

export function getRestaurantMapsUrl(restaurant: Restaurant): string | undefined {
  if (restaurant.mapsUrl) return restaurant.mapsUrl;
  if (restaurant.mapsQuery) return mapsSearch(restaurant.mapsQuery);
  return undefined;
}

export function filterRestaurantsByRegion(
  region: RestaurantRegion | "all",
): Restaurant[] {
  if (region === "all") return restaurants;
  return restaurants.filter((r) => r.region === region);
}

export const RESTAURANT_COUNT = restaurants.length;

export const reservationRestaurants = restaurants.filter(
  (r) => r.reservationRecommended,
);
