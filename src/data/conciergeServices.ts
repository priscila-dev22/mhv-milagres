export const CONCIERGE_WHATSAPP_NUMBER = "5582988701957";

export type ConciergeService = {
  id: string;
  role: string;
  price: string;
  extraHour: string;
  description: string;
  includes?: string[];
  notes?: string[];
  ctaMessage: string;
};

export const conciergeServices: ConciergeService[] = [
  {
    id: "cozinheira",
    role: "Cozinheira",
    price: "R$ 300,00 por dia",
    extraHour: "R$ 40,00 após 8 horas diárias",
    description: "Preparo de refeições personalizadas durante a estadia.",
    includes: [
      "Limpeza e arrumação da cozinha em reservas de até 8 pessoas.",
    ],
    notes: [
      "Para grupos acima de 8 pessoas, é necessária a contratação de uma auxiliar, pois a cozinheira não acumula funções.",
    ],
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o serviço de cozinheira.",
  },
  {
    id: "camareira",
    role: "Camareira / Auxiliar",
    price: "R$ 200,00 por dia",
    extraHour: "R$ 30,00 após 8 horas diárias",
    description: "Apoio na organização e manutenção diária da casa.",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o serviço de camareira/auxiliar.",
  },
  {
    id: "churrasqueiro",
    role: "Churrasqueiro",
    price: "R$ 350,00 por dia",
    extraHour: "R$ 50,00 após 8 horas diárias",
    description: "Preparo e serviço de churrasco para momentos especiais.",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o serviço de churrasqueiro.",
  },
  {
    id: "barman",
    role: "Barman",
    price: "R$ 300,00 por dia",
    extraHour: "R$ 40,00 após 8 horas diárias",
    description: "Preparo de drinks e atendimento durante a experiência.",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o serviço de barman.",
  },
  {
    id: "baba",
    role: "Babá / Babysitter",
    price: "R$ 350,00 por dia",
    extraHour: "R$ 50,00 após 8 horas diárias",
    description: "Acompanhamento e cuidado infantil durante a hospedagem.",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o serviço de babá/babysitter.",
  },
];

export const conciergeServiceRules = [
  {
    title: "Jornada",
    body: "A jornada padrão dos prestadores é de até 8 horas diárias. Caso o período seja ultrapassado, será cobrado o valor correspondente à hora extra de cada profissional.",
  },
  {
    title: "Confirmação",
    body: "Para garantir a contratação de qualquer serviço, é necessário o pagamento de 50% do valor do orçamento. O pagamento deve estar confirmado até 10 dias antes do check-in.",
  },
  {
    title: "Compras de insumos",
    body: "Opção 1: indicação de empresa especializada em Maceió. Opção 2: compras pela cozinheira (taxa 20%). Ingredientes e bebidas são pagos à parte.",
  },
];

export function getConciergeWhatsAppHref(message: string): string {
  return `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
