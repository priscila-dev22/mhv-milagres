export type EssentialCategoryId =
  | "mercados"
  | "farmacias"
  | "saude"
  | "combustivel"
  | "bancos";

export type EssentialPlace = {
  id: string;
  name: string;
  category: EssentialCategoryId;
  region?: string;
  address?: string;
  phone?: string | string[];
  mapsQuery?: string;
  notes?: string;
};

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const essentialPlaces: EssentialPlace[] = [
  {
    id: "mercadinho-tiao",
    name: "Mercadinho do Tião",
    category: "mercados",
    region: "Marceneiro",
    address: "Rua da Praia, 126, Marceneiro, Passo de Camaragibe - AL",
    mapsQuery: "Mercadinho do Tião Rua da Praia Marceneiro Passo de Camaragibe AL",
  },
  {
    id: "mercadinho-mendonca",
    name: "Mercadinho Mendonça",
    category: "mercados",
    region: "Passo de Camaragibe",
    address: "Passo de Camaragibe - AL",
    notes: "Próximo à Igreja São José.",
    mapsQuery: "Mercadinho Mendonça Igreja São José Passo de Camaragibe AL",
  },
  {
    id: "mercadinho-milagrense",
    name: "Mercadinho Milagrense",
    category: "mercados",
    region: "São Miguel dos Milagres",
    address: "Rua Felisberto de Ataíde, São Miguel dos Milagres - AL",
    phone: "++1-555-0025",
    mapsQuery: "Mercadinho Milagrense Rua Felisberto de Ataíde São Miguel dos Milagres AL",
  },
  {
    id: "supermercado-amigao",
    name: "Supermercado O Amigão",
    category: "mercados",
    region: "São Miguel dos Milagres",
    address: "Rua Agnelo João dos Santos, 2-18, São Miguel dos Milagres - AL",
    phone: "++1-555-0006",
    notes: "Realiza entrega.",
    mapsQuery: "Supermercado O Amigão São Miguel dos Milagres AL",
  },
  {
    id: "supermercado-irmao",
    name: "Supermercado do Irmão",
    category: "mercados",
    region: "Povoado do Toque",
    address:
      "Rua Felisberto de Ataíde, 886, Povoado do Toque, São Miguel dos Milagres — AL",
    phone: "++1-555-0011",
    notes: "Realiza entrega.",
    mapsQuery:
      "Supermercado do Irmão Rua Felisberto de Ataíde 886 Povoado do Toque Sao Miguel dos Milagres AL",
  },
  {
    id: "supermercado-preco-bom",
    name: "Supermercado Preço Bom",
    category: "mercados",
    region: "São Miguel dos Milagres",
    address: "Avenida Francisco Lima, São Miguel dos Milagres - AL",
    phone: "+55 82 3295-1284",
    mapsQuery: "Supermercado Preço Bom Avenida Francisco Lima São Miguel dos Milagres AL",
  },
  {
    id: "farmacia-porto-da-rua",
    name: "Farmácia Porto da Rua",
    category: "farmacias",
    region: "Porto da Rua",
    address: "Porto da Rua, São Miguel dos Milagres - AL",
    phone: "+55 82 3295-1413",
    mapsQuery: "Farmácia Porto da Rua São Miguel dos Milagres AL",
  },
  {
    id: "farmacia-milagres",
    name: "Farmácia Milagres",
    category: "farmacias",
    region: "São Miguel dos Milagres",
    address: "São Miguel dos Milagres - AL",
    phone: "+55 82 3295-1522",
    mapsQuery: "Farmácia Milagres São Miguel dos Milagres AL",
  },
  {
    id: "farmacia-trabalhador-laje",
    name: "Farmácia do Trabalhador da Laje",
    category: "farmacias",
    phone: "+55 82 99193-4075",
  },
  {
    id: "farma-lins",
    name: "Farma Lins Drogaria",
    category: "farmacias",
    phone: "+55 82 99672-8970",
  },
  {
    id: "usf-porto-da-rua",
    name: "Unidade de Saúde da Família de Porto da Rua",
    category: "saude",
    region: "Porto da Rua",
    address: "Porto da Rua, São Miguel dos Milagres - AL",
    phone: "+55 82 3295-1598",
    mapsQuery: "Unidade de Saúde da Família Porto da Rua São Miguel dos Milagres AL",
  },
  {
    id: "ubs-riacho",
    name: "Unidade Básica de Saúde da Família do Riacho",
    category: "saude",
    region: "Riacho",
    address: "AL-101, São Miguel dos Milagres - AL",
    mapsQuery: "Unidade Básica de Saúde da Família do Riacho AL-101 São Miguel dos Milagres AL",
  },
  {
    id: "ubs-toque",
    name: "Unidade Básica de Saúde da Família do Toque",
    category: "saude",
    region: "Toque",
    address: "AL-101, 230, São Miguel dos Milagres - AL",
    mapsQuery: "Unidade Básica de Saúde da Família do Toque AL-101 São Miguel dos Milagres AL",
  },
  {
    id: "usf-divaldo-suruagy",
    name: "Unidade de Saúde da Família Divaldo Suruagy",
    category: "saude",
    region: "São Miguel dos Milagres",
    address: "Rua Prefeito Augusto de Barros Falcão, São Miguel dos Milagres - AL",
    mapsQuery:
      "Unidade de Saúde da Família Divaldo Suruagy São Miguel dos Milagres AL",
  },
  {
    id: "unidade-carlos-gomes",
    name: "Unidade Dr. Carlos Gomes de Barros",
    category: "saude",
    region: "Passo de Camaragibe",
    address: "Rua São Sebastião, 170, Passo de Camaragibe - AL, CEP 57930-000",
    phone: "+55 82 3641-6226",
    mapsQuery: "Unidade Dr. Carlos Gomes de Barros Rua São Sebastião Passo de Camaragibe AL",
  },
];

export const essentialCategoryMeta: {
  id: EssentialCategoryId;
  label: string;
}[] = [
  { id: "mercados", label: "Mercados" },
  { id: "farmacias", label: "Farmácias" },
  { id: "saude", label: "Saúde" },
  { id: "combustivel", label: "Combustível" },
  { id: "bancos", label: "Bancos / Caixas" },
];

export const visibleEssentialCategories = essentialCategoryMeta.filter((category) =>
  essentialPlaces.some((place) => place.category === category.id),
);

export function getEssentialsByCategory(category: EssentialCategoryId): EssentialPlace[] {
  return essentialPlaces.filter((place) => place.category === category);
}

export function getEssentialMapsUrl(place: EssentialPlace): string | undefined {
  if (!place.mapsQuery) return undefined;
  return mapsSearch(place.mapsQuery);
}

export function getEssentialPhoneList(place: EssentialPlace): string[] {
  if (!place.phone) return [];
  return Array.isArray(place.phone) ? place.phone : [place.phone];
}

export function getEssentialPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const HEALTH_NOTICE =
  "Contatos e funcionamento podem sofrer alterações. Em situações de urgência, utilize os canais oficiais de atendimento de emergência.";
