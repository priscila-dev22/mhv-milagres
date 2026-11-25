import { CONCIERGE_WHATSAPP_NUMBER } from "./conciergeServices";

export type BioLink = {
  id: string;
  label: string;
  /** Deixe `null` até a URL definitiva ser definida. Não preencher com placeholders. */
  href: string | null;
  featured?: boolean;
  external?: boolean;
};

export const bioPage = {
  title: "MHV Milagres",
  location: "São Miguel dos Milagres",
  tagline: "Você vive. A gente cuida.",
  photo: {
    src: "/media/images/experience/fim-de-tarde.jpg",
    alt: "Propriedade MHV em São Miguel dos Milagres, com piscina ao entardecer",
  },
} as const;

const contactHref = `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de falar com a MHV Milagres.",
)}`;

export const bioLinks: BioLink[] = [
  {
    id: "reserva",
    label: "Faça sua reserva",
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
    href: null,
    external: true,
  },
];
