import { CONCIERGE_WHATSAPP_NUMBER } from "./conciergeServices";

export type BioLink = {
  id: string;
  label: string;
  /** Deixe `null` até a URL definitiva ser definida. Não preencher com placeholders. */
  href: string | null;
  description?: string;
  featured?: boolean;
  external?: boolean;
};

/** Troque para `"amber"` ou `"birds"` para restaurar o fundo anterior. */
const LINKS_BACKGROUND = "tropical" as "tropical" | "amber" | "birds";

const LINKS_BACKGROUNDS = {
  tropical: "/media/images/bio-editorial/tropical.jpg",
  amber: "/media/images/bio-editorial/agua-ambar.jpg",
  birds: "/media/images/bio-editorial/passaros.jpg",
} as const;

export const bioPage = {
  title: "MHV Milagres",
  location: "São Miguel dos Milagres",
  tagline: "Você vive. A gente cuida.",
  editorial: {
    background: {
      src: LINKS_BACKGROUNDS[LINKS_BACKGROUND],
    },
    previousBackground: {
      src: LINKS_BACKGROUNDS.amber,
    },
    logo: {
      src: "/media/images/bio-editorial/logo-mhv-marfim.png",
      alt: "My Home Vacation Milagres",
    },
  },
} as const;

const contactHref = `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de falar com a MHV Milagres.",
)}`;

export const bioLinks: BioLink[] = [
  {
    id: "reserva",
    label: "Faça sua reserva",
    description: "Encontre seu próximo refúgio.",
    href: "https://www.mhvmilagres.com.br/pt/",
    featured: true,
    external: true,
  },
  {
    id: "guia",
    label: "Guia do hóspede",
    href: "https://mhv-milagres.vercel.app",
    external: true,
  },
  {
    id: "contato",
    label: "Fale conosco",
    href: contactHref,
    external: true,
  },
  {
    id: "proprietarios",
    label: "Apresentação para proprietários",
    href: "/media/pdfs/apresentacao-proprietarios.pdf",
    external: true,
  },
  {
    id: "orientacoes",
    label: "Check-in, check-out e orientações",
    href: "/media/pdfs/guia-hospedagem.pdf",
    external: true,
  },
  {
    id: "airbnb",
    label: "Conheça nosso perfil no Airbnb",
    href: "https://www.airbnb.com.br/users/profile/1469907696937638911?previous_page_name=PdpHomeMarketplace",
    external: true,
  },
];
