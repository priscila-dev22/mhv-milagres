export type RouteMapCategoryId =
  | "all"
  | "praias"
  | "gastronomia"
  | "passeios"
  | "beach-clubs"
  | "mercados"
  | "farmacias"
  | "emergencia"
  | "hospedagens-mhv";

export type RouteMapCategory = {
  id: RouteMapCategoryId;
  label: string;
};

/** Categorias exibidas nos filtros — locais filtrados por `category`. */
export const routeMapCategories: RouteMapCategory[] = [
  { id: "all", label: "Todos" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "passeios", label: "Passeios" },
  { id: "beach-clubs", label: "Beach clubs" },
  { id: "praias", label: "Praias" },
  { id: "mercados", label: "Mercados" },
  { id: "farmacias", label: "Farmácias" },
  { id: "emergencia", label: "Emergência" },
  { id: "hospedagens-mhv", label: "Hospedagens MHV" },
];

export type RouteMapPlace = {
  id: string;
  name: string;
  category: Exclude<RouteMapCategoryId, "all">;
  region: string;
  mapsQuery: string;
  address?: string;
  description?: string;
  /** Pendente geocodificação — não inventar valores. */
  latitude?: number;
  longitude?: number;
  instagram?: string;
  whatsapp?: string;
  locationUrl?: string;
  image?: string;
};

/** Curadoria MHV — apenas dados reais já usados no site (Gastronomia + rota). */
export const routeMapPlaces: RouteMapPlace[] = [
  {
    id: "patricia-bistro",
    name: "Patrícia Bistrô",
    category: "gastronomia",
    region: "São Miguel dos Milagres, AL",
    address: "São Miguel dos Milagres, AL",
    mapsQuery: "Patrícia Bistrô São Miguel dos Milagres",
    locationUrl:
      "https://www.google.com/maps/search/?api=1&query=Patr%C3%ADcia+Bistr%C3%B4+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/patriciabistro/",
  },
  {
    id: "no-quintal",
    name: "No Quintal",
    category: "gastronomia",
    region: "São Miguel dos Milagres",
    address: "São Miguel dos Milagres",
    mapsQuery: "No Quintal restaurante São Miguel dos Milagres",
    locationUrl:
      "https://www.google.com/maps/search/?api=1&query=No+Quintal+restaurante+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/restaurantenoquintal/",
  },
  {
    id: "nacasa",
    name: "NACASA de boa",
    category: "gastronomia",
    region: "Litoral norte, Alagoas",
    address: "Litoral norte, Alagoas",
    mapsQuery: "NACASA de boa São Miguel dos Milagres",
    locationUrl:
      "https://www.google.com/maps/search/?api=1&query=NACASA+de+boa+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/nacasadeboa/",
  },
  {
    id: "o-beco",
    name: "O beco",
    category: "gastronomia",
    region: "São Miguel dos Milagres",
    address: "São Miguel dos Milagres",
    mapsQuery: "O beco São Miguel dos Milagres",
    locationUrl:
      "https://www.google.com/maps/search/?api=1&query=O+beco+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/restauranteobeco/",
  },
  {
    id: "sur",
    name: "Sur",
    category: "gastronomia",
    region: "Milagres · costa",
    address: "Milagres · costa",
    mapsQuery: "Sur restaurante São Miguel dos Milagres",
    locationUrl:
      "https://www.google.com/maps/search/?api=1&query=Sur+restaurante+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/restaurantesur/",
  },
  {
    id: "milagres-do-toque",
    name: "Milagres do Toque",
    category: "gastronomia",
    region: "Praia do Toque",
    address: "Praia do Toque",
    mapsQuery: "Milagres do Toque Praia do Toque",
    locationUrl:
      "https://www.google.com/maps/search/?api=1&query=Milagres+do+Toque+Praia+do+Toque",
    instagram: "https://www.instagram.com/milagresdotoque/",
  },
  {
    id: "patacho",
    name: "Praia do Patacho",
    category: "passeios",
    region: "Zona Norte · Patacho / Lages",
    address: "Praia do Patacho, AL",
    mapsQuery: "Praia do Patacho, AL",
  },
  {
    id: "toque",
    name: "Praia do Toque",
    category: "passeios",
    region: "Litoral norte · Toque",
    address: "Praia do Toque, AL",
    mapsQuery: "Praia do Toque, AL",
  },
  {
    id: "jetski-japaratinga",
    name: "Japaratinga Jet Ski",
    category: "passeios",
    region: "Orla de Japaratinga",
    address: "Orla de Japaratinga, litoral norte de Alagoas",
    mapsQuery: "Japaratinga, AL",
    description: "Saídas na orla — horários via concierge MHV.",
  },
  {
    id: "porto-da-rua",
    name: "Porto da Rua",
    category: "passeios",
    region: "Zona Central · Milagres / Porto da Rua",
    address: "Porto da Rua, São Miguel dos Milagres, AL",
    mapsQuery: "Porto da Rua, São Miguel dos Milagres, AL",
  },
  {
    id: "milagres",
    name: "São Miguel dos Milagres",
    category: "praias",
    region: "Zona Central · Milagres",
    address: "São Miguel dos Milagres, AL",
    mapsQuery: "São Miguel dos Milagres, AL",
  },
  {
    id: "japaratinga",
    name: "Japaratinga",
    category: "praias",
    region: "Zona Sul · Litoral",
    address: "Japaratinga, AL",
    mapsQuery: "Japaratinga, AL",
  },
];

export const routeMapSequence = [
  { id: "patacho", short: "Patacho" },
  { id: "milagres", short: "Milagres" },
  { id: "toque", short: "Toque" },
  { id: "porto-da-rua", short: "Porto da Rua" },
  { id: "japaratinga", short: "Japaratinga" },
] as const;

export const routeMapZones = [
  {
    title: "Zona Norte",
    subtitle: "Patacho / Lages",
    text: "Sossego e águas turquesa — extensões de areia e mar calmo para dias longos à sombra dos coqueiros.",
  },
  {
    title: "Zona Central",
    subtitle: "Milagres / Porto da Rua",
    text: "O coração da vila: serviços, gastronomia e a praia principal da hospedagem.",
  },
  {
    title: "Zona Sul",
    subtitle: "Marceneiro / Riacho",
    text: "Calma, igrejinha e charme — ritmo mais lento e contato com a natureza.",
  },
];

export const ROUTE_MAP_EMBED_DEFAULT =
  "https://www.google.com/maps?q=São+Miguel+dos+Milagres,+AL&hl=pt&z=10&output=embed";

export const ROUTE_MAP_FULL_URL =
  "https://www.google.com/maps/search/?api=1&query=Rota+Ecológica+dos+Milagres,+São+Miguel+dos+Milagres,+AL&hl=pt";

const CATEGORY_EMBED_QUERY: Partial<
  Record<Exclude<RouteMapCategoryId, "all">, string>
> = {
  gastronomia: "restaurantes São Miguel dos Milagres, AL",
  passeios: "Rota Ecológica dos Milagres, AL",
  "beach-clubs": "beach club Japaratinga Litoral Norte Alagoas",
  praias: "praias São Miguel dos Milagres, AL",
};

export function routeMapEmbedUrl(mapsQuery: string, zoom = 11): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&hl=pt&z=${zoom}&output=embed`;
}

export function routeMapEmbedForCategory(
  category: RouteMapCategoryId,
  places: RouteMapPlace[],
  selectedId: string | null,
): string {
  if (selectedId) {
    const selected = places.find((p) => p.id === selectedId);
    if (selected) return routeMapEmbedUrl(selected.mapsQuery, 13);
  }
  if (places.length === 1) {
    return routeMapEmbedUrl(places[0]!.mapsQuery, 12);
  }
  if (places.length > 1) {
    return routeMapEmbedUrl(places[0]!.mapsQuery, 11);
  }
  if (category !== "all") {
    const q = CATEGORY_EMBED_QUERY[category];
    if (q) return routeMapEmbedUrl(q, 11);
  }
  return ROUTE_MAP_EMBED_DEFAULT;
}

export function routeMapDirectionsUrl(mapsQuery: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}&hl=pt`;
}

export function routeMapSearchUrl(mapsQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}&hl=pt`;
}

export function routeMapPlaceLocationHref(place: RouteMapPlace): string {
  return place.locationUrl ?? routeMapSearchUrl(place.mapsQuery);
}

/** Locais sem latitude/longitude — pendente geocodificação manual. */
export const routeMapPlacesMissingCoordinates = routeMapPlaces.filter(
  (p) => p.latitude == null || p.longitude == null,
);
