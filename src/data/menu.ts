export type MenuCategoryId = "almoco" | "jantar" | "petiscos";

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  dishes: string[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "almoco",
    label: "Almoço",
    dishes: [
      "Arroz de polvo com saladas",
      "Moqueca de peixe com arroz branco e legumes",
      "Peixe grelhado com purê de banana-da-terra e arroz branco",
      "Bobó de camarão com arroz branco e salada",
      "Moqueca de frutos do mar com arroz branco e pirão",
      "Camarão ao molho com arroz branco e saladas",
      "Espaguete com camarão",
      "Carne de sol com queijo coalho, arroz branco e salada",
    ],
  },
  {
    id: "jantar",
    label: "Jantar",
    dishes: [
      "Fettuccine na manteiga com filé mignon acebolado",
      "Filé mignon ao molho madeira com arroz branco, batatas rústicas e farofa de banana com bacon",
      "Escondidinho de carne de sol",
      "Estrogonofe de frango com arroz branco e batata palha",
      "Filé mignon com batata gratinada",
    ],
  },
  {
    id: "petiscos",
    label: "Petiscos",
    dishes: [
      "Camarão alho e óleo",
      "Camarão empanado",
      "Isca de peixe empanado",
      "Ceviche de peixe",
      "Vinagrete de polvo",
      "Dadinho de tapioca",
    ],
  },
];

export const shoppingOptions = [
  {
    title: "Opção 1 — Empresa especializada",
    body: "Existe uma empresa parceira da região que realiza as compras em Maceió. Após a definição do cardápio e dos dias da estadia, é elaborada uma lista de compras.",
  },
  {
    title: "Opção 2 — Compras pela cozinheira",
    body: "A cozinheira pode realizar as compras necessárias. Taxa de 20% sobre o valor total das compras. Ingredientes são pagos à parte.",
  },
];

export const SHOPPING_CTA_MESSAGE =
  "Olá! Sou hóspede da MHV e gostaria de organizar as compras de feira e insumos para a estadia.";
