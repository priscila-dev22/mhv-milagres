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
  headline: "Milagres começa aqui.",
  tagline: "Você vive. A gente cuida.",
  mosaic: [
    {
      id: "sunset",
      src: "/media/images/links/sunset.jpg",
      alt: "Pôr do sol sobre a propriedade MHV, com piscina e palmeiras",
    },
    {
      id: "beach",
      src: "/media/images/links/beach.jpg",
      alt: "Acesso à praia entre coqueiros na Rota Ecológica dos Milagres",
    },
    {
      id: "table",
      src: "/media/images/links/table.jpg",
      alt: "Mesa posta com frutas tropicais na hospedagem MHV",
    },
    {
      id: "interior",
      src: "/media/images/links/interior.jpg",
      alt: "Estar em linho e luz natural em uma casa MHV",
    },
  ],
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
    href: "https://www.airbnb.com.br/users/profile/1469907696937638911?previous_page_name=PdpHomeMarketplace",
    external: true,
  },
];
