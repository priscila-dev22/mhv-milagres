/**
 * Localizações do mapa — curadoria MHV.
 * Coordenadas de praias/pontos: OpenStreetMap Nominatim (consulta em mar/2026).
 * Restaurantes: pendente geocodificação confirmada — sem marcador até haver lat/lng.
 */

export type MapLocationCategory =
  | "gastronomia"
  | "passeios"
  | "beach-clubs"
  | "pontos-uteis";

export type RouteMapCategoryId = "all" | MapLocationCategory;

export type RouteMapCategory = {
  id: RouteMapCategoryId;
  label: string;
};

export type MapLocation = {
  id: string;
  name: string;
  category: MapLocationCategory;
  address: string;
  /** Subtítulo na lista lateral */
  region: string;
  latitude?: number;
  longitude?: number;
  /** Sem marcador no mapa interativo */
  coordinatesPending?: boolean;
  description?: string;
  instagram?: string;
  whatsapp?: string;
  mapsUrl?: string;
  /** Fallback para rotas quando não há mapsUrl */
  mapsQuery?: string;
};

export const mapLocations: MapLocation[] = [
  {
    id: "patricia-bistro",
    name: "Patrícia Bistrô",
    category: "gastronomia",
    region: "São Miguel dos Milagres, AL",
    address: "São Miguel dos Milagres, AL",
    coordinatesPending: true,
    mapsQuery: "Patrícia Bistrô São Miguel dos Milagres",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Patr%C3%ADcia+Bistr%C3%B4+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/patriciabistro/",
  },
  {
    id: "no-quintal",
    name: "No Quintal",
    category: "gastronomia",
    region: "São Miguel dos Milagres",
    address: "São Miguel dos Milagres",
    coordinatesPending: true,
    mapsQuery: "No Quintal restaurante São Miguel dos Milagres",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=No+Quintal+restaurante+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/restaurantenoquintal/",
  },
  {
    id: "nacasa",
    name: "NACASA de boa",
    category: "gastronomia",
    region: "Litoral norte, Alagoas",
    address: "Litoral norte, Alagoas",
    coordinatesPending: true,
    mapsQuery: "NACASA de boa São Miguel dos Milagres",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=NACASA+de+boa+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/nacasadeboa/",
  },
  {
    id: "o-beco",
    name: "O beco",
    category: "gastronomia",
    region: "São Miguel dos Milagres",
    address: "São Miguel dos Milagres",
    coordinatesPending: true,
    mapsQuery: "O beco São Miguel dos Milagres",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=O+beco+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/restauranteobeco/",
  },
  {
    id: "sur",
    name: "Sur",
    category: "gastronomia",
    region: "Milagres · costa",
    address: "Milagres · costa",
    coordinatesPending: true,
    mapsQuery: "Sur restaurante São Miguel dos Milagres",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sur+restaurante+S%C3%A3o+Miguel+dos+Milagres",
    instagram: "https://www.instagram.com/restaurantesur/",
  },
  {
    id: "milagres-do-toque",
    name: "Milagres do Toque",
    category: "gastronomia",
    region: "Praia do Toque",
    address: "Praia do Toque",
    coordinatesPending: true,
    mapsQuery: "Milagres do Toque Praia do Toque",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Milagres+do+Toque+Praia+do+Toque",
    instagram: "https://www.instagram.com/milagresdotoque/",
  },
  {
    id: "patacho",
    name: "Praia do Patacho",
    category: "passeios",
    region: "Zona Norte · Patacho / Lages",
    address: "Praia do Patacho, AL",
    latitude: -9.1830895,
    longitude: -35.3003583,
    mapsQuery: "Praia do Patacho, AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+do+Patacho,+AL",
  },
  {
    id: "toque",
    name: "Praia do Toque",
    category: "passeios",
    region: "Litoral norte · Toque",
    address: "Praia do Toque, AL",
    latitude: -9.2831598,
    longitude: -35.3833077,
    mapsQuery: "Praia do Toque, AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+do+Toque,+AL",
  },
  {
    id: "jetski-japaratinga",
    name: "Japaratinga Jet Ski",
    category: "passeios",
    region: "Orla de Japaratinga",
    address: "Orla de Japaratinga, litoral norte de Alagoas",
    latitude: -9.0896423,
    longitude: -35.2572606,
    description: "Saídas na orla — horários via concierge MHV.",
    mapsQuery: "Praia de Japaratinga, AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Praia+de+Japaratinga,+AL",
  },
  {
    id: "porto-da-rua",
    name: "Porto da Rua",
    category: "passeios",
    region: "Zona Central · Milagres / Porto da Rua",
    address: "Porto da Rua, São Miguel dos Milagres, AL",
    latitude: -9.238257,
    longitude: -35.352504,
    mapsQuery: "Porto da Rua, São Miguel dos Milagres, AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Porto+da+Rua,+S%C3%A3o+Miguel+dos+Milagres,+AL",
  },
  {
    id: "milagres",
    name: "São Miguel dos Milagres",
    category: "pontos-uteis",
    region: "Zona Central · Milagres",
    address: "São Miguel dos Milagres, AL",
    latitude: -9.267217,
    longitude: -35.376312,
    mapsQuery: "São Miguel dos Milagres, AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Miguel+dos+Milagres,+AL",
  },
  {
    id: "japaratinga",
    name: "Japaratinga",
    category: "pontos-uteis",
    region: "Zona Sul · Litoral",
    address: "Japaratinga, AL",
    latitude: -9.087464,
    longitude: -35.263403,
    mapsQuery: "Japaratinga, AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Japaratinga,+AL",
  },
];

const CATEGORY_LABELS: Record<MapLocationCategory, string> = {
  gastronomia: "Gastronomia",
  passeios: "Passeios",
  "beach-clubs": "Beach clubs",
  "pontos-uteis": "Pontos úteis",
};

const BASE_FILTERS: RouteMapCategory[] = [
  { id: "all", label: "Todos" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "passeios", label: "Passeios" },
  { id: "beach-clubs", label: "Beach clubs" },
  { id: "pontos-uteis", label: "Pontos úteis" },
];

/** Filtros visíveis — oculta categorias sem nenhum local cadastrado. */
export const routeMapCategories: RouteMapCategory[] = BASE_FILTERS.filter(
  (cat) =>
    cat.id === "all" ||
    mapLocations.some((loc) => loc.category === cat.id),
);

export function mapLocationHasMarker(loc: MapLocation): boolean {
  return (
    !loc.coordinatesPending &&
    typeof loc.latitude === "number" &&
    typeof loc.longitude === "number"
  );
}

export function mapLocationsWithMarkers(
  locations: MapLocation[],
): MapLocation[] {
  return locations.filter(mapLocationHasMarker);
}

export function mapLocationCategoryLabel(
  category: MapLocationCategory,
): string {
  return CATEGORY_LABELS[category];
}

export const routeMapPlacesMissingCoordinates = mapLocations.filter(
  (loc) => loc.coordinatesPending || !mapLocationHasMarker(loc),
);

/** @deprecated use mapLocations — alias para compatibilidade interna */
export type RouteMapPlace = MapLocation;

export const routeMapPlaces = mapLocations;

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

export const ROUTE_MAP_FULL_URL =
  "https://www.google.com/maps/search/?api=1&query=Rota+Ecológica+dos+Milagres,+S%C3%A3o+Miguel+dos+Milagres,+AL&hl=pt";

export const ROUTE_MAP_DEFAULT_CENTER: [number, number] = [
  -9.25, -35.33,
];

export const ROUTE_MAP_DEFAULT_ZOOM = 10;

export function routeMapDirectionsUrl(place: MapLocation): string {
  if (mapLocationHasMarker(place)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}&hl=pt`;
  }
  const q = place.mapsQuery ?? place.name;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}&hl=pt`;
}

export function routeMapOpenMapsHref(place: MapLocation): string {
  if (place.mapsUrl) return place.mapsUrl;
  if (mapLocationHasMarker(place)) {
    return `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}&hl=pt`;
  }
  const q = place.mapsQuery ?? place.name;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}&hl=pt`;
}

export function mapLocationWhatsappHref(
  whatsapp: string | undefined,
): string | null {
  if (!whatsapp?.trim()) return null;
  if (whatsapp.startsWith("http")) return whatsapp;
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}`;
}
