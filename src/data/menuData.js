export const categories = [
  {
    id: 1,
    name: "Entradas",
    description: "Comece a sua refeição com as nossas deliciosas opções de entradas"
  },
  {
    id: 2,
    name: "Pratos Principais",
    description: "Experimente os nossos pratos principais preparados com ingredientes frescos"
  },
  {
    id: 3,
    name: "Petiscos",
    description: "Deliciosos petiscos portugueses para partilhar"
  },
  {
    id: 4,
    name: "Sobremesas",
    description: "Finalize a sua refeição com as nossas sobremesas irresistíveis"
  },
  {
    id: 5,
    name: "Bebidas",
    description: "Acompanhe a sua refeição com as nossas opções de bebidas"
  }
];

export const menuItems = [
  // Entradas
  {
    id: 101,
    categoryId: 1,
    name: "Caldo Verde",
    description: "Sopa tradicional portuguesa com couve, batata e chouriço.",
    price: 4.50,
    image: "caldo_verde" 
  },
  {
    id: 102,
    categoryId: 1,
    name: "Amêijoas à Bulhão Pato",
    description: "Amêijoas frescas cozinhadas em azeite, alho e coentros.",
    price: 12.90,
    image: "ameijoas_bulhao_pato"
  },
  {
    id: 103,
    categoryId: 1,
    name: "Pão com Chouriço",
    description: "Pão caseiro recheado com chouriço tradicional, cozido em forno a lenha.",
    price: 3.50,
    image: "pao_com_chourico"
  },
  
  // Pratos Principais
  {
    id: 201,
    categoryId: 2,
    name: "Bacalhau à Brás",
    description: "Bacalhau desfiado salteado com cebola, batata palha, ovos e azeitonas.",
    price: 15.90,
    image: "bacalhau_a_bras"
  },
  {
    id: 202,
    categoryId: 2,
    name: "Arroz de Marisco",
    description: "Arroz cremoso com uma variedade de mariscos frescos, tomate e coentros.",
    price: 18.50,
    image: "arroz_de_marisco"
  },
  {
    id: 203,
    categoryId: 2,
    name: "Francesinha",
    description: "Sanduíche robusta com várias carnes, queijo e molho especial. Acompanha batata frita.",
    price: 14.00,
    image: "francesinha"
  },
  {
    id: 204,
    categoryId: 2,
    name: "Cozido à Portuguesa",
    description: "Prato tradicional com uma variedade de carnes, enchidos e legumes cozidos.",
    price: 19.90,
    image: "cozido_a_portuguesa"
  },
  
  // Petiscos
  {
    id: 301,
    categoryId: 3,
    name: "Pastéis de Bacalhau",
    description: "Deliciosos bolinhos fritos de bacalhau desfiado com batata e salsa.",
    price: 1.80, // Preço por unidade
    image: "pasteis_de_bacalhau"
  },
  {
    id: 302,
    categoryId: 3,
    name: "Moelas Estufadas",
    description: "Moelas de galinha estufadas num molho rico de tomate e vinho.",
    price: 7.50,
    image: "moelas_estufadas"
  },
  {
    id: 303,
    categoryId: 3,
    name: "Pica-Pau",
    description: "Pequenos pedaços de carne de vaca frita, temperados com alho e pickles.",
    price: 9.00,
    image: "pica_pau"
  },
  
  // Sobremesas
  {
    id: 401,
    categoryId: 4,
    name: "Pastel de Nata",
    description: "Tartelete de massa folhada com creme de ovos, polvilhada com canela.",
    price: 1.50,
    image: "pastel_de_nata"
  },
  {
    id: 402,
    categoryId: 4,
    name: "Arroz Doce",
    description: "Arroz cozido em leite com açúcar, limão e canela.",
    price: 3.50,
    image: "arroz_doce"
  },
  {
    id: 403,
    categoryId: 4,
    name: "Serradura",
    description: "Sobremesa cremosa com natas e bolacha Maria ralada.",
    price: 4.00,
    image: "serradura"
  },
  
  // Bebidas
  {
    id: 501,
    categoryId: 5,
    name: "Vinho Verde (Garrafa)",
    description: "Vinho branco leve e refrescante, típico da região noroeste de Portugal.",
    price: 9.50,
    image: "vinho_verde"
  },
  {
    id: 502,
    categoryId: 5,
    name: "Sumol",
    description: "Refrigerante português de sumo de fruta (Laranja, Ananás).",
    price: 1.80,
    image: "sumol"
  },
  {
    id: 503,
    categoryId: 5,
    name: "Água das Pedras",
    description: "Água mineral natural gasocarbónica.",
    price: 1.50,
    image: "agua_das_pedras"
  }
];