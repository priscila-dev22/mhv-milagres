export type BabyItem = {
  id: string;
  name: string;
  price: string;
  ctaMessage: string;
};

export const babyItems: BabyItem[] = [
  {
    id: "banheira",
    name: "Banheira de bebê",
    price: "Gratuito",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar a banheira de bebê.",
  },
  {
    id: "berco",
    name: "Berço",
    price: "R$ 30,00 por dia",
    ctaMessage: "Olá! Sou hóspede da MHV e gostaria de solicitar o berço.",
  },
  {
    id: "berco-cadeira",
    name: "Berço + cadeira alta de alimentação",
    price: "R$ 40,00 por dia",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o berço com cadeira alta de alimentação.",
  },
  {
    id: "kit-completo",
    name: "Berço + cadeira alta + carrinho de bebê + suporte para banheira",
    price: "R$ 80,00 por dia",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o kit berço, cadeira alta, carrinho de bebê e suporte para banheira.",
  },
  {
    id: "berco-cadeira-suporte",
    name: "Berço + cadeira alta + suporte para banheira",
    price: "R$ 50,00 por dia",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o berço com cadeira alta e suporte para banheira.",
  },
  {
    id: "cadeira-alta",
    name: "Cadeira alta de alimentação",
    price: "R$ 20,00 por dia",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar a cadeira alta de alimentação.",
  },
  {
    id: "carrinho",
    name: "Carrinho de bebê",
    price: "R$ 40,00 por dia",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o carrinho de bebê.",
  },
  {
    id: "suporte-banheira",
    name: "Suporte para banheira",
    price: "R$ 15,00 por dia",
    ctaMessage:
      "Olá! Sou hóspede da MHV e gostaria de solicitar o suporte para banheira.",
  },
];

export const babyItemNotes = [
  "Solicitar com pelo menos 1 dia de antecedência.",
  "Itens sujeitos à disponibilidade.",
  "Todos os itens são higienizados após o uso.",
  "Quando contratados, são montados e preparados antes do check-in.",
];
