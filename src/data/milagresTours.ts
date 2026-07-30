/** Opções exibidas na linha editorial (frase contínua). */
export type MilagresTourOption = {
  id: string;
  label: string;
  instagram?: string;
  whatsapp?: string;
  partnerName?: string;
  contactLabel?: string;
};

/** Imagem da colagem — slot define posição em cada breakpoint (CSS). */
export type MilagresCollageImage = {
  id: string;
  src: string;
  alt: string;
  slot: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  objectPosition?: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const milagresTourOptions: MilagresTourOption[] = [
  { id: "jangada", label: "Passeio de jangada" },
  { id: "piscinas", label: "Piscinas naturais" },
  { id: "buggy", label: "Passeio de buggy" },
  { id: "mergulho", label: "Mergulho" },
  { id: "jetski", label: "Jet ski" },
  { id: "barco", label: "Passeio de barco" },
  { id: "rota", label: "Roteiros pela Rota Ecológica" },
];

/** Ordem narrativa da colagem — apenas arquivos em /media/images/passeios/. */
export const milagresCollageImages: MilagresCollageImage[] = [
  {
    id: "mergulho",
    src: "/media/images/passeios/mergulho.jpg.jpg",
    alt: "Casal em rede sobre águas cristalinas rasas, luz tropical refletindo no mar",
    slot: "1",
    objectPosition: "50% 35%",
    aspectRatio: "3 / 4",
    width: 1200,
    height: 1600,
  },
  {
    id: "buggy",
    src: "/media/images/passeios/Buggy.jpg.png",
    alt: "Buggyes em fila na praia de areia clara, coqueirais e mar azul ao fundo",
    slot: "2",
    objectPosition: "50% 42%",
    aspectRatio: "16 / 10",
    width: 1920,
    height: 1200,
  },
  {
    id: "agua-dourada",
    src: "/media/images/passeios/pexels-monstro-15009318.jpg",
    alt: "Superfície da água com reflexos dourados e ondulações suaves",
    slot: "3",
    objectPosition: "50% 50%",
    aspectRatio: "5 / 4",
    width: 1600,
    height: 1280,
  },
  {
    id: "praia",
    src: "/media/images/passeios/praiaazul.jpg.jpg",
    alt: "Paisagem de praia e mar na região de Milagres",
    slot: "4",
    objectPosition: "50% 40%",
    aspectRatio: "3 / 4",
    width: 1200,
    height: 1600,
  },
  {
    id: "folhas-verdes",
    src: "/media/images/passeios/pexels-monstro-15009277.jpg",
    alt: "Folhas tropicais verdes com gotas de água em close-up",
    slot: "5",
    objectPosition: "50% 50%",
    aspectRatio: "4 / 3",
    width: 1600,
    height: 1200,
  },
  {
    id: "folhas-douradas",
    src: "/media/images/passeios/pexels-monstro-15009493.jpg",
    alt: "Folhas de bananeira em tons de verde e amarelo-dourado",
    slot: "6",
    objectPosition: "50% 45%",
    aspectRatio: "16 / 11",
    width: 1600,
    height: 1100,
  },
  {
    id: "passaros",
    src: "/media/images/passeios/pexels-rafael-silva-2159116735-35848160.jpg",
    alt: "Passaros de praia caminhando na areia molhada refletida, fotografia em preto e branco",
    slot: "7",
    objectPosition: "50% 55%",
    aspectRatio: "3 / 2",
    width: 1500,
    height: 1000,
  },
];

function isContactConfigured(option: MilagresTourOption): boolean {
  const ig = option.instagram?.trim();
  const wa = option.whatsapp?.trim();
  return Boolean(
    (ig && ig.startsWith("http")) ||
      (wa && wa !== "INSERIR_NUMERO_AQUI" && /^\d+$/.test(wa.replace(/\D/g, ""))),
  );
}

export function getTourOptionContactHref(option: MilagresTourOption): string | undefined {
  const wa = option.whatsapp?.trim();
  if (wa && wa !== "INSERIR_NUMERO_AQUI") {
    const digits = wa.replace(/\D/g, "");
    if (digits.length >= 10) {
      return `https://wa.me/${digits}`;
    }
  }
  const ig = option.instagram?.trim();
  if (ig && ig.startsWith("http")) {
    return ig;
  }
  return undefined;
}

export function tourOptionHasContact(option: MilagresTourOption): boolean {
  return isContactConfigured(option) && Boolean(getTourOptionContactHref(option));
}
