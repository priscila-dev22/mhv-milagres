export type DestinationCategory =
  | "praias"
  | "mirantes"
  | "historia-cultura"
  | "natureza"
  | "por-do-sol";

export type Destination = {
  id: string;
  name: string;
  location: string;
  description: string;
  highlights: string[];
  mapsQuery: string;
  categories: DestinationCategory[];
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  objectPosition?: string;
  objectPositionMd?: string;
  objectPositionLg?: string;
};

export const destinationFilters: {
  id: DestinationCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "praias", label: "Praias" },
  { id: "mirantes", label: "Mirantes" },
  { id: "historia-cultura", label: "História & Cultura" },
  { id: "natureza", label: "Natureza" },
  { id: "por-do-sol", label: "Pôr do sol" },
];

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Ordem editorial intercalada — praias existentes preservadas */
export const destinations: Destination[] = [
  {
    id: "marceneiro",
    name: "Praia do Marceneiro",
    location: "Marceneiro",
    description:
      "Uma das portas de entrada da Rota. Piscinas naturais, bancos de areia e a Capela dos Milagres, com gastronomia e serviços por perto — ponto de partida para diferentes experiências.",
    highlights: [
      "Praia do Marceneiro",
      "Piscinas naturais",
      "Bancos de areia",
      "Capela dos Milagres",
      "Gastronomia e serviços",
      "Ponto de partida",
    ],
    mapsQuery: "Praia do Marceneiro, Passo de Camaragibe, AL",
    categories: ["praias"],
    image: encodeURI(
      "/media/images/Descubra Milagres/Praia_do_Marceneiro_-_São_Miguel_dos_Milagres_(51729288329).jpg",
    ),
    imageAlt: "Praia do Marceneiro com faixa de areia, coqueiros e mar",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "mirante-alto-do-cruzeiro",
    name: "Mirante Alto do Cruzeiro",
    location: "São Miguel dos Milagres",
    description:
      "Vista panorâmica de São Miguel dos Milagres, em um ponto simples e privilegiado para contemplar a região e fotografar a paisagem.",
    highlights: ["Vista panorâmica", "Ponto para fotografar"],
    mapsQuery: "Mirante Alto do Cruzeiro São Miguel dos Milagres AL",
    categories: ["mirantes", "por-do-sol"],
    image: encodeURI(
      "/media/images/Descubra Milagres/mirantealtodocruzeiro.jpg",
    ),
    imageAlt: "Monumento do Mirante Alto do Cruzeiro com cruz no topo",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "riacho",
    name: "Praia do Riacho",
    location: "Riacho",
    description:
      "Trecho tranquilo da Rota Ecológica, com uma atmosfera serena e acesso às opções gastronômicas da região.",
    highlights: [
      "Praia do Riacho",
      "Atmosfera tranquila",
      "Rota Ecológica",
      "Gastronomia da região",
    ],
    mapsQuery: "Praia do Riacho, Passo de Camaragibe, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praia_do_riacho.jpg"),
    imageAlt: "Praia do Riacho com coqueiro, faixa de areia e mar",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "igrejinha-sao-miguel",
    name: "Capela dos Milagres",
    location: "São Miguel dos Milagres / região da Praia do Riacho",
    description:
      "Um dos cartões-postais de São Miguel dos Milagres, próximo à Praia do Riacho e integrado à paisagem litorânea da região.",
    highlights: ["Cartão-postal", "Praia do Riacho"],
    mapsQuery: "Igrejinha de São Miguel dos Milagres AL",
    categories: ["historia-cultura"],
    image: encodeURI(
      "/media/images/Descubra Milagres/capeladosmilagres.jpg",
    ),
    imageAlt: "Capela dos Milagres com fachada branca, cruz e coqueiros",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "sao-miguel",
    name: "São Miguel dos Milagres",
    location: "São Miguel dos Milagres",
    description:
      "Praias, piscinas naturais e jangadas, com estrutura local e proximidade com Porto da Rua.",
    highlights: [
      "Praias da região",
      "Piscinas naturais",
      "Jangadas",
      "Gastronomia",
      "Estrutura local",
      "Porto da Rua",
    ],
    mapsQuery: "São Miguel dos Milagres, AL",
    categories: ["praias"],
    image: encodeURI(
      "/media/images/Descubra Milagres/praia_saomigueldosmilagres.jpg",
    ),
    imageAlt: "Paisagem de praia e mar na região de São Miguel dos Milagres",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "fonte-dos-milagres",
    name: "Fonte dos Milagres",
    location: "São Miguel dos Milagres",
    description:
      "Uma das referências históricas de São Miguel dos Milagres, a tradicional Fonte dos Milagres faz parte da identidade e da memória do município. Também conhecida como Fonte Milagrosa.",
    highlights: ["Referência histórica", "Memória do município"],
    mapsQuery: "Fonte dos Milagres São Miguel dos Milagres AL",
    categories: ["historia-cultura"],
    image: encodeURI("/media/images/Descubra Milagres/fontemilagres.jpg"),
    imageAlt: "Interior da Fonte dos Milagres com painel religioso e fonte",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "toque",
    name: "Praia do Toque",
    location: "Toque",
    description:
      "Águas claras, piscinas naturais e jangadas, com gastronomia da região.",
    highlights: [
      "Praia do Toque",
      "Piscinas naturais",
      "Águas claras",
      "Jangadas",
      "Gastronomia da região",
    ],
    mapsQuery: "Praia do Toque, São Miguel dos Milagres, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadotoque.jpg"),
    imageAlt: "Praia do Toque com coqueiros e o mar ao fundo",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "tatuamunha",
    name: "Tatuamunha",
    location: "Tatuamunha",
    description:
      "Natureza preservada no Rio Tatuamunha, com o Projeto Peixe-Boi e o passeio de jangada pelo rio. Campo de golfe mediante consulta.",
    highlights: [
      "Rio Tatuamunha",
      "Projeto Peixe-Boi",
      "Passeio de jangada pelo rio",
      "Natureza preservada",
      "Campo de golfe mediante consulta",
    ],
    mapsQuery: "Rio Tatuamunha, Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadetatuamunha.jpg"),
    imageAlt: "Águas do Rio Tatuamunha",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "santuario-peixe-boi",
    name: "Santuário do Peixe-Boi",
    location: "Rio Tatuamunha — Porto de Pedras",
    description:
      "Uma experiência de contato com o ecossistema do Rio Tatuamunha e com o trabalho de conservação do peixe-boi marinho realizado na região.",
    highlights: ["Rio Tatuamunha", "Conservação do peixe-boi"],
    mapsQuery: "Santuário Peixe Boi Tatuamunha Porto de Pedras AL",
    categories: ["natureza"],
    image: encodeURI(
      "/media/images/Descubra Milagres/santuariopeixeboi.jpg",
    ),
    imageAlt: "Passeio pelo Rio Tatuamunha a partir da embarcação no Santuário do Peixe-Boi",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "ponte-rio-tatuamunha",
    name: "Ponte do Rio Tatuamunha",
    location: "Tatuamunha — Porto de Pedras",
    description:
      "A tradicional travessia de madeira sobre o Rio Tatuamunha revela manguezais e uma das paisagens mais especiais do povoado.",
    highlights: ["Travessia de madeira", "Manguezais"],
    mapsQuery: "Ponte do Rio Tatuamunha Porto de Pedras AL",
    categories: ["natureza", "por-do-sol"],
    image: encodeURI(
      "/media/images/Descubra Milagres/pontetatuamunha.jpg",
    ),
    imageAlt: "Passarela de madeira sobre o Rio Tatuamunha entre manguezais",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "tatuamunha-encontro-rio-mar",
    name: "Tatuamunha — Encontro do Rio com o Mar",
    location: "Praia de Tatuamunha — Porto de Pedras",
    description:
      "Na foz do Rio Tatuamunha, o encontro entre rio, manguezal, coqueiros e mar cria um dos cenários mais bonitos da região ao entardecer. Na extremidade da praia, o Riacho Tabatinga encontra o mar em uma paisagem cercada por vegetação e águas tranquilas.",
    highlights: ["Foz do Rio Tatuamunha", "Riacho Tabatinga", "Entardecer"],
    mapsQuery: "Boca do Rio Tatuamunha Porto de Pedras AL",
    categories: ["natureza", "por-do-sol"],
    image: encodeURI("/media/images/Descubra Milagres/rioemar.jpg"),
    imageAlt: "Vista aérea do encontro do Rio Tatuamunha com o mar, com banco de areia, coqueiral e manguezal",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "povoado-tatuamunha",
    name: "Povoado de Tatuamunha",
    location: "Tatuamunha — Porto de Pedras",
    description:
      "Além das praias, Tatuamunha preserva casarões, igrejas, artesanato e a atmosfera tranquila de um povoado tradicional da Rota dos Milagres.",
    highlights: ["Casarões", "Igrejas", "Artesanato"],
    mapsQuery: "Povoado de Tatuamunha Porto de Pedras AL",
    categories: ["historia-cultura"],
    image: encodeURI("/media/images/Descubra Milagres/povoadotatuamunha.jpg"),
    imageAlt:
      "Igreja amarela, praça e casario tradicional no Povoado de Tatuamunha",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "patacho",
    name: "Praia do Patacho",
    location: "Patacho",
    description:
      "Piscinas naturais na APA Costa dos Corais, com experiências de mergulho na região do Patacho Dive.",
    highlights: [
      "Praia do Patacho",
      "Piscinas naturais",
      "APA Costa dos Corais",
      "Experiências de mergulho",
      "Patacho Dive",
    ],
    mapsQuery: "Praia do Patacho, Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadopatacho.jpg"),
    imageAlt: "Águas rasas e cristalinas na Praia do Patacho",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "capela-sao-joao-patacho",
    name: "Capela São João do Patacho",
    location: "Praia do Patacho — Porto de Pedras",
    description:
      "Entre coqueiros e jardins, a pequena capela do Patacho é um dos cenários mais delicados e fotogênicos da região.",
    highlights: ["Coqueiros e jardins", "Cenário fotogênico"],
    mapsQuery: "Capela São João do Patacho Porto de Pedras AL",
    categories: ["historia-cultura"],
    image: encodeURI("/media/images/Descubra Milagres/capelapatacho.jpg"),
    imageAlt:
      "Capela São João do Patacho entre coqueiros e jardim, com céu de entardecer",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "porto-de-pedras",
    name: "Porto de Pedras",
    location: "Porto de Pedras",
    description:
      "Parte da experiência da Rota Ecológica dos Milagres, ao norte da costa.",
    highlights: ["Rota Ecológica dos Milagres"],
    mapsQuery: "Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiaporto.jpg"),
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "praia-de-lages",
    name: "Praia de Lages",
    location: "Porto de Pedras",
    description:
      "Vizinha à Praia do Patacho, reúne mar tranquilo, coqueirais e piscinas naturais que se formam na maré baixa, em um trecho mais reservado do litoral de Porto de Pedras.",
    highlights: [
      "Praia de Lages",
      "Mar tranquilo",
      "Piscinas naturais",
      "Porto de Pedras",
    ],
    mapsQuery: "Praia de Lages, Porto de Pedras, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadelages.jpg"),
    imageAlt: "Praia de Lages com faixa de areia, coqueirais e mar",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "praia-dos-morros",
    name: "Praia dos Morros",
    location: "Passo de Camaragibe",
    description:
      "Trecho mais preservado e isolado da Rota Ecológica, conhecido pela paisagem marcada por falésias, extensa faixa de areia e natureza praticamente intocada.",
    highlights: [
      "Praia dos Morros",
      "Falésias",
      "Faixa de areia",
      "Passo de Camaragibe",
    ],
    mapsQuery: "Praia dos Morros, Passo de Camaragibe, AL",
    categories: ["praias"],
    image: encodeURI("/media/images/Descubra Milagres/praiadosmorros.jpg"),
    imageAlt: "Praia dos Morros com falésias, faixa de areia e vegetação",
    imageFit: "contain",
    objectPosition: "50% 50%",
    objectPositionMd: "50% 50%",
    objectPositionLg: "50% 50%",
  },
  {
    id: "alto-do-casado",
    name: "Alto do Casado",
    location: "Porto de Pedras",
    description:
      "Um dos pontos indicados para conhecer além das praias e explorar outros cenários de Porto de Pedras e da Rota Ecológica.",
    highlights: ["Alto do Casado", "Porto de Pedras"],
    mapsQuery: "Alto do Casado, Porto de Pedras, AL",
    categories: ["historia-cultura"],
  },
  {
    id: "museu-cadeia-das-artes",
    name: "Museu Cadeia das Artes",
    location: "Porto de Pedras",
    description:
      "Um dos patrimônios históricos de Porto de Pedras, instalado no edifício da antiga Cadeia Pública e hoje dedicado à memória, à cultura e às artes da região.",
    highlights: [
      "Museu Cadeia das Artes",
      "Patrimônio histórico",
      "Porto de Pedras",
    ],
    mapsQuery: "Museu Cadeia das Artes, Porto de Pedras, AL",
    categories: ["historia-cultura"],
  },
  {
    id: "centro-historico-tatuamunha",
    name: "Centro Histórico de Tatuamunha",
    location: "Tatuamunha · Porto de Pedras",
    description:
      "Um passeio pelo lado histórico de Tatuamunha, entre casarios antigos, igrejas e ruas que preservam a atmosfera de um dos povoados mais charmosos da Rota Ecológica.",
    highlights: [
      "Centro histórico",
      "Casarios",
      "Igrejas",
      "Tatuamunha",
    ],
    mapsQuery: "Centro Histórico de Tatuamunha, Porto de Pedras, AL",
    categories: ["historia-cultura"],
  },
  {
    id: "centro-historico-porto-de-pedras",
    name: "Centro Histórico de Porto de Pedras",
    location: "Porto de Pedras",
    description:
      "Casarios, igrejas e construções antigas ajudam a contar a história de Porto de Pedras e revelam um lado cultural da Rota Ecológica além das praias.",
    highlights: [
      "Centro histórico",
      "Casarios",
      "Igrejas",
      "Porto de Pedras",
    ],
    mapsQuery: "Centro Histórico de Porto de Pedras, AL",
    categories: ["historia-cultura"],
  },
];

export function getDestinationMapsUrl(destination: Destination): string {
  return mapsSearch(destination.mapsQuery);
}

export function filterDestinationsByCategory(
  category: DestinationCategory | "all",
): Destination[] {
  if (category === "all") return destinations;
  return destinations.filter((item) => item.categories.includes(category));
}
