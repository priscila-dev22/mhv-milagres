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
  regionLabel: string;
  description?: string;
  address?: string;
  phone?: string;
  instagram?: string;
  mapsUrl?: string;
  mapsQuery?: string;
  image?: string;
  objectPosition?: string;
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
  {
    id: "araca",
    name: "Araçá",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    description:
      "Gastronomia alagoana e afetiva, localizado junto à Pousada O Casarão.",
    address: "Sítio Estância, Distrito do Marceneiro, Passo de Camaragibe - AL",
    phone: "++1-555-0010",
    instagram: "https://www.instagram.com/restaurantearaca/",
    mapsQuery: "Araçá Restaurante Praia do Marceneiro Passo de Camaragibe",
    mapsUrl: mapsSearch("Araçá Restaurante Praia do Marceneiro Passo de Camaragibe"),
    image: "/media/images/gastronomy/restaurantearaca.jpg",
  },
  {
    id: "vilinha-marceneiro",
    name: "Vilinha Marceneiro",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    isCommercialHub: true,
    description:
      "Centrinho comercial na Praia do Marceneiro — lojas, conveniências e diversas opções de restaurantes.",
    instagram: "https://www.instagram.com/vilinha_marceneiro/",
    mapsQuery: "Vilinha Marceneiro Passo de Camaragibe AL",
    mapsUrl: mapsSearch("Vilinha Marceneiro Passo de Camaragibe AL"),
    image: "/media/images/gastronomy/vilinhamarceneiro.jpg",
  },
  {
    id: "paru-bistro",
    name: "Paru Bistrô",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    description:
      "Bistrô à beira da Praia do Marceneiro, integrante do Paru Boutique Hotel, com gastronomia baseada em ingredientes locais.",
    phone: "++1-555-0021",
    instagram: "https://www.instagram.com/paruboutiquehotel/",
    mapsQuery: "Parú Bistrô Praia do Marceneiro Passo de Camaragibe",
    mapsUrl: mapsSearch("Parú Bistrô Praia do Marceneiro Passo de Camaragibe"),
    image: "/media/images/gastronomy/restauranteparubistro.png",
  },
  {
    id: "salsa",
    name: "Salsa",
    region: "marceneiro",
    regionLabel: "Praia do Marceneiro",
    phone: "++1-555-0026",
    instagram: "https://www.instagram.com/quadradopousada/",
    mapsQuery: "Salsa Restaurante Quadrado Pousada Praia do Marceneiro AL",
    mapsUrl: mapsSearch("Salsa Restaurante Quadrado Pousada Praia do Marceneiro AL"),
    image: "/media/images/gastronomy/restaurantesalsa.jpg",
    objectPosition: "50% 50%",
  },
  {
    id: "banami",
    name: "Banami",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    description:
      "Gastronomia inserida na Pousada Haya, na região da Praia do Riacho.",
    address:
      "Pousada Haya, Povoado do Riacho Antônio Dias, São Miguel dos Milagres - AL",
    phone: "++1-555-0004",
    mapsQuery: "Banami Pousada Haya São Miguel dos Milagres",
    mapsUrl: mapsSearch("Banami Pousada Haya São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/pousadahaya/",
    image: "/media/images/gastronomy/restaurantebanani.jpg",
    objectPosition: "50% 38%",
  },
  {
    id: "tahafa-milagres",
    name: "Tahafa Milagres",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    instagram: "https://www.instagram.com/tahafamilagres/",
    mapsQuery: "Tahafa Milagres Sao Miguel dos Milagres AL",
    mapsUrl: mapsSearch("Tahafa Milagres Sao Miguel dos Milagres AL"),
    image: "/media/images/gastronomy/restaurantetahafa.jpg",
    objectPosition: "50% 42%",
  },
  {
    id: "vila-da-mata-bistro",
    name: "Villa da Mata Bistrô",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    description:
      "Bistrô integrado à atmosfera tranquila do Riacho, com gastronomia em um ambiente acolhedor e cercado pela natureza.",
    address:
      "Estrada do Riacho Dourado, S/N, Riacho, São Miguel dos Milagres — AL",
    phone: "++1-555-0039",
    mapsQuery:
      "Villa da Mata Bistro Estrada do Riacho Dourado Sao Miguel dos Milagres AL",
    mapsUrl: mapsSearch(
      "Villa da Mata Bistro Estrada do Riacho Dourado Sao Miguel dos Milagres AL",
    ),
    image: "/media/images/gastronomy/restaurantevilladamata.jpg",
    objectPosition: "48% 42%",
  },
  {
    id: "micasa",
    name: "Mi Casa",
    region: "riacho",
    regionLabel: "Praia do Riacho",
    description:
      "Restaurante à beira-mar na Praia do Riacho, ideal para aproveitar a gastronomia local em uma atmosfera descontraída e integrada à praia.",
    address:
      "Rua João Paulo I, lotes 15, 17 e 18, Praia do Riacho, São Miguel dos Milagres — AL",
    phone: "++1-555-0035",
    instagram: "https://www.instagram.com/micasapraia/",
    mapsQuery:
      "Mi Casa Praia do Riacho Rua Joao Paulo I Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mi+Casa+Praia+do+Riacho+Rua+Joao+Paulo+I+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restaurantemicasa.jpg",
    objectPosition: "50% 28%",
  },
  {
    id: "aqua-gastrobar",
    name: "Acqua Gastrobar",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    description:
      "Gastrobar de atmosfera descontraída, com gastronomia brasileira, frutos do mar, drinks e música ao vivo.",
    address: "Rua Santa Fé, São Miguel dos Milagres — AL, CEP 57940-000",
    phone: "++1-555-0047",
    instagram: "https://www.instagram.com/acquamilagres/",
    mapsQuery: "Acqua Gastrobar Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Acqua+Gastrobar+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restauranteacqua.jpg",
    objectPosition: "50% 68%",
  },
  {
    id: "segredos-de-milagres",
    name: "Segredos de Milagres",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    description:
      "Gastronomia brasileira com sabores locais, em um ambiente acolhedor próximo à praia, no coração de São Miguel dos Milagres.",
    address:
      "Rua Prefeito Augusto de Barros Falcão, S/N, São Miguel dos Milagres — AL, CEP 57940-000",
    phone: "++1-555-0021",
    instagram: "https://www.instagram.com/segredosdemilagres/",
    mapsQuery:
      "Segredos de Milagres Rua Prefeito Augusto de Barros Falcao Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Segredos+de+Milagres+Rua+Prefeito+Augusto+de+Barros+Falcao+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restauratesegredos.jpg",
    objectPosition: "48% 58%",
  },
  {
    id: "nacasa",
    name: "NACASA de boa",
    region: "sao-miguel",
    regionLabel: "Litoral norte, Alagoas",
    image: "/media/images/gastronomy/nacasa.jpg",
    objectPosition: "50% 40%",
    mapsQuery: "NACASA de boa São Miguel dos Milagres",
    mapsUrl: mapsSearch("NACASA de boa São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/nacasadeboa/",
    phone: "++1-555-0004",
  },
  {
    id: "o-beco",
    name: "O Beco",
    region: "sao-miguel",
    regionLabel: "São Miguel dos Milagres",
    description:
      "Culinária com sabores do mar e influência mediterrânea, em um ambiente rústico, acolhedor e descontraído em São Miguel dos Milagres.",
    address:
      "Rua Prefeito Augusto de Barros Falcão, 129, São Miguel dos Milagres — AL, CEP 57940-000",
    phone: "++1-555-0036",
    instagram: "https://www.instagram.com/restauranteobeco/",
    mapsQuery:
      "Restaurante O Beco Rua Prefeito Augusto de Barros Falcao 129 Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Restaurante+O+Beco+Rua+Prefeito+Augusto+de+Barros+Falcao+129+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restauranteobeco.jpg",
    objectPosition: "60% 50%",
  },
  {
    id: "sur",
    name: "Sur",
    region: "sao-miguel",
    regionLabel: "Milagres · costa",
    image: "/media/images/gastronomy/sur.jpg",
    objectPosition: "50% 38%",
    mapsQuery: "Sur restaurante São Miguel dos Milagres",
    mapsUrl: mapsSearch("Sur restaurante São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/restaurantesur/",
  },
  {
    id: "quintal-do-ze",
    name: "Quintal do Zé",
    region: "toque",
    regionLabel: "Praia do Toque",
    description:
      "Gastronomia regional em um ambiente acolhedor e descontraído na Praia do Toque, em São Miguel dos Milagres.",
    address: "Praia do Toque, São Miguel dos Milagres — AL",
    phone: "++1-555-0039",
    instagram: "https://www.instagram.com/quintaldozemilagres/",
    mapsQuery: "Quintal do Ze Praia do Toque Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Quintal+do+Ze+Praia+do+Toque+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restaurantequintaldozé.jpg",
    objectPosition: "38% 50%",
  },
  {
    id: "zaya-bistro",
    name: "Zaya Bistrô",
    region: "toque",
    regionLabel: "Praia do Toque",
    description:
      "Cozinha contemporânea inspirada nos sabores locais, valorizando ingredientes da região em uma atmosfera integrada à natureza de Milagres.",
    address:
      "Rua em Projeto, S/Nº, Povoado do Toque, São Miguel dos Milagres — AL, CEP 57940-000",
    phone: "++1-555-0016",
    instagram: "https://www.instagram.com/pousadazaya/",
    mapsQuery: "Pousada Zaya Povoado do Toque Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pousada+Zaya+Povoado+do+Toque+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restaurantezaya.jpg",
    objectPosition: "35% 50%",
  },
  {
    id: "no-quintal",
    name: "No Quintal",
    region: "toque",
    regionLabel: "Praia do Toque",
    description:
      "Cozinha brasileira afetiva em ambiente integrado a jardim e horta.",
    address: "Rua do Campo, Praia do Toque, São Miguel dos Milagres - AL",
    phone: "++1-555-0046",
    image: "/media/images/gastronomy/quintal.jpg",
    objectPosition: "50% 45%",
    mapsQuery: "No Quintal restaurante Praia do Toque São Miguel dos Milagres",
    mapsUrl: mapsSearch("No Quintal restaurante Praia do Toque São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/restaurantenoquintal/",
  },
  {
    id: "dadiva-cozinha",
    name: "Dádiva Cozinha",
    region: "toque",
    regionLabel: "Praia do Toque",
    description:
      "Cozinha autoral que transforma ingredientes locais em novas experiências de sabor, valorizando a identidade gastronômica de Milagres.",
    address:
      "Rua Felisberto de Ataíde, 200, Povoado do Toque, São Miguel dos Milagres — AL, CEP 57940-000",
    phone: "++1-555-0016",
    instagram: "https://www.instagram.com/dadiva.cozinha/",
    mapsQuery:
      "Dadiva Cozinha Boutique Rua Felisberto de Ataide 200 Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dadiva+Cozinha+Boutique+Rua+Felisberto+de+Ataide+200+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restaurantedádiva.jpg",
    objectPosition: "50% 50%",
  },
  {
    id: "patricia-bistro",
    name: "Patrícia Bistrô",
    region: "toque",
    regionLabel: "Praia do Toque",
    description:
      "Cozinha criativa brasileira com valorização de produtos locais.",
    address: "Rua Eurico Marinho Leão, 37, São Miguel dos Milagres - AL",
    phone: "++1-555-0032",
    image: "/media/images/gastronomy/bistro.jpg",
    objectPosition: "50% 42%",
    mapsQuery: "Patrícia Bistrô São Miguel dos Milagres",
    mapsUrl: mapsSearch("Patrícia Bistrô São Miguel dos Milagres"),
    instagram: "https://www.instagram.com/patriciabistro/",
  },
  {
    id: "vila-milagres",
    name: "Villa Milagres",
    region: "toque",
    regionLabel: "Praia do Toque",
    description:
      "Cozinha contemporânea com destaque para sabores do mar, em uma experiência gastronômica acolhedora em São Miguel dos Milagres.",
    address:
      "Rua Aderbal da Costa Raposo, 585, São Miguel dos Milagres — AL, CEP 57940-000",
    phone: "++1-555-0013",
    instagram: "https://www.instagram.com/villamilagres/",
    mapsQuery:
      "Villa Milagres Rua Aderbal da Costa Raposo 585 Sao Miguel dos Milagres AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Villa+Milagres+Rua+Aderbal+da+Costa+Raposo+585+Sao+Miguel+dos+Milagres+AL",
    image: "/media/images/gastronomy/restaurantevillamilagres.jpg",
    objectPosition: "50% 50%",
  },
  {
    id: "milagres-do-toque",
    name: "Milagres do Toque",
    region: "toque",
    regionLabel: "Praia do Toque",
    image: "/media/images/gastronomy/toque.jpg",
    objectPosition: "50% 44%",
    mapsQuery: "Milagres do Toque Praia do Toque",
    mapsUrl: mapsSearch("Milagres do Toque Praia do Toque"),
    instagram: "https://www.instagram.com/milagresdotoque/",
  },
  {
    id: "jardim-secreto",
    name: "Jardim Secreto",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    description:
      "Café e empório de atmosfera acolhedora em Tatuamunha, com sabores artesanais e uma experiência cercada pelo charme e tranquilidade da Rota dos Milagres.",
    address:
      "Rua Luiz Ferreira Dorta, 645, Tatuamunha, Porto de Pedras — AL, CEP 57945-000",
    phone: "++1-555-0039",
    instagram: "https://www.instagram.com/jardimsecretomilagres/",
    mapsQuery:
      "Jardim Secreto Cafe Emporio Rua Luiz Ferreira Dorta 645 Tatuamunha Porto de Pedras AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jardim+Secreto+Cafe+Emporio+Rua+Luiz+Ferreira+Dorta+645+Tatuamunha+Porto+de+Pedras+AL",
    image: "/media/images/gastronomy/restaurantejardimsecreto.jpg",
    objectPosition: "58% 50%",
  },
  {
    id: "frutos-de-goias",
    name: "Frutos de Goiás",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    description:
      "Sorvetes, picolés e sabores inspirados nas frutas brasileiras, uma opção leve e refrescante para aproveitar durante a passagem pela Rota dos Milagres.",
    instagram: "https://www.instagram.com/frutosdegoiasmilagres/",
    mapsQuery: "Frutos de Goias Milagres Alagoas",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Frutos+de+Goias+Milagres+Alagoas",
    image: "/media/images/gastronomy/restaurantefrutos.jpg",
    objectPosition: "50% 50%",
  },
  {
    id: "guaja-villa-gourmet",
    name: "Guajá Vila Gourmet",
    region: "tatuamunha",
    regionLabel: "Tatuamunha",
    isCommercialHub: true,
    description:
      "Vila gastronômica em Tatuamunha que reúne diferentes opções para comer, beber e aproveitar a noite em um ambiente charmoso e descontraído.",
    address:
      "Rua Luiz Ferreira Dorta, 629, Tatuamunha, Porto de Pedras — AL, CEP 57945-000",
    phone: "++1-555-0012",
    instagram: "https://www.instagram.com/guajavilagourmet/",
    mapsQuery: "Vila Guaja Rua Luiz Ferreira Dorta 629 Porto de Pedras AL",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Vila+Guaja+Rua+Luiz+Ferreira+Dorta+629+Porto+de+Pedras+AL",
    image: "/media/images/gastronomy/restauranteguajá.jpg",
    objectPosition: "50% 58%",
  },
];

export function getRestaurantPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getRestaurantMapsUrl(restaurant: Restaurant): string | undefined {
  if (restaurant.mapsUrl) return restaurant.mapsUrl;
  if (restaurant.mapsQuery) return mapsSearch(restaurant.mapsQuery);
  return undefined;
}

export function filterRestaurantsByRegion(
  region: RestaurantRegion | "all",
): Restaurant[] {
  if (region === "all") return restaurants;
  return restaurants.filter((item) => item.region === region);
}
