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

export const routeMapCategories: RouteMapCategory[] = [
  { id: "all", label: "Todos" },
  { id: "praias", label: "Praias" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "passeios", label: "Passeios" },
  { id: "beach-clubs", label: "Beach clubs" },
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
};

/** Pontos reais da Rota — queries alinhadas às dicas e zonas já usadas no site. */
export const routeMapPlaces: RouteMapPlace[] = [
  {
    id: "patacho",
    name: "Praia do Patacho",
    category: "praias",
    region: "Zona Norte · Patacho / Lages",
    mapsQuery: "Praia do Patacho, AL",
  },
  {
    id: "milagres",
    name: "São Miguel dos Milagres",
    category: "praias",
    region: "Zona Central · Milagres",
    mapsQuery: "São Miguel dos Milagres, AL",
  },
  {
    id: "porto-da-rua",
    name: "Porto da Rua",
    category: "praias",
    region: "Zona Central · Milagres / Porto da Rua",
    mapsQuery: "Porto da Rua, São Miguel dos Milagres, AL",
  },
  {
    id: "toque",
    name: "Praia do Toque",
    category: "praias",
    region: "Litoral norte · Toque",
    mapsQuery: "Praia do Toque, AL",
  },
  {
    id: "japaratinga",
    name: "Japaratinga",
    category: "praias",
    region: "Zona Sul · Litoral",
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

export function routeMapEmbedUrl(mapsQuery: string, zoom = 11): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&hl=pt&z=${zoom}&output=embed`;
}

export function routeMapDirectionsUrl(mapsQuery: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}&hl=pt`;
}

export function routeMapSearchUrl(mapsQuery: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}&hl=pt`;
}
