// Imagens profissionais do Unsplash para receitas saudáveis

export interface Recipe {
  id: number
  title: string
  category: string
  time: string
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  likes: number
  image: string
  ingredients: Array<string>
  instructions: Array<string>
  description: string
  servings: number
  calories: number
}

export var MOCK_RECIPES: Recipe[] = [
  {
    id: 2,
    title: 'Overnight Oats de Morango',
    category: 'Café da Manhã',
    time: '5 min (+noite)',
    difficulty: 'Fácil',
    likes: 162,
    image: 'https://images.unsplash.com/photo-1517673408680-ac1e3c67cf8d?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '½ xícara de flocos de aveia',
      '½ xícara de leite desnatado',
      '1 colher de semente de chia',
      '½ xícara de morango picado',
      '1 colher de mel'
    ],
    instructions: [
      'Misture aveia, leite e chia em um pote.',
      'Adicione morango e mel.',
      'Tampe e leve à geladeira durante a noite.',
      'Sirva gelado pela manhã.'
    ],
    description: 'Preparo noturno que garante um café da manhã cremoso, doce e rico em fibra.',
    servings: 1,
    calories: 285
  },
  {
    id: 3,
    title: 'Salmão Grelhado com Aspargos',
    category: 'Low Carb',
    time: '20 min',
    difficulty: 'Médio',
    likes: 178,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 filé de salmão (150 g)',
      '1 molho de aspargos',
      '1 colher de azeite',
      'Sal e pimenta-do-reino a gosto',
      'Suco de ½ limão'
    ],
    instructions: [
      'Aqueça a grelha ou frigideira antiaderente.',
      'Tempere o salmão com sal, pimenta e limão.',
      'Grelhe o salmão por 4 min de cada lado.',
      'Refogue os aspargos no azeite por 3 min.',
      'Sirva juntos com uma fatia de limão.'
    ],
    description: 'Prato leve, rico em ômega-3 e pronto em menos de 20 minutos.',
    servings: 1,
    calories: 365
  },
  {
    id: 4,
    title: 'Bowl de Quinoa com Legumes',
    category: 'Veganas',
    time: '25 min',
    difficulty: 'Fácil',
    likes: 143,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '½ xícara de quinoa cozida',
      '¼ de abobrinha em cubos',
      '½ pimentão vermelho',
      '½ cenoura ralada grossa',
      '1 colher de tahine'
    ],
    instructions: [
      'Cozinhe a quinoa conforme instruções da embalagem.',
      'Refogue os legumes rapidamente (3-4 min).',
      'Monte o bowl com quinoa na base e legumes por cima.',
      'Regue com tahine e sirva morno.'
    ],
    description: 'Refeição vegana colorida, completa em proteínas e micronutrientes.',
    servings: 1,
    calories: 390
  },
  {
    id: 5,
    title: 'Wrap de Alface com Atum',
    category: 'Low Carb',
    time: '10 min',
    difficulty: 'Fácil',
    likes: 95,
    image: 'https://images.unsplash.com/photo-1626301909932-13259b484545?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '4 folhas grandes de alface',
      '1 lata de atum light',
      '2 colheres de iogurte natural desnatado',
      '1 colher de mostarda',
      'Salsinha a gosto'
    ],
    instructions: [
      'Escorra o atum e misture com iogurte, mostarda e salsinha.',
      'Distribua o recheio nas folhas de alface.',
      'Enrole como wraps e prenda com palito.',
      'Sirva imediatamente.'
    ],
    description: 'Substituição prática ao pão, com proteína de peixe e quase zero carboidrato.',
    servings: 2,
    calories: 180
  },
  {
    id: 6,
    title: 'Smoothie Verde Detox',
    category: 'Detox',
    time: '5 min',
    difficulty: 'Fácil',
    likes: 112,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 maçã verde',
      '½ pepino',
      '1 punhado de espinafre',
      'Suco de ½ limão',
      '200 ml de água de coco'
    ],
    instructions: [
      'Corte a maçã e o pepino.',
      'Coloque todos os ingredientes no liquidificador.',
      'Bata até ficar homogêneo.',
      'Sirva com gelo se desejar.'
    ],
    description: 'Bebida refrescante que ajuda na hidratação e na eliminação de toxinas.',
    servings: 1,
    calories: 95
  },
  {
    id: 7,
    title: 'Omelete de Claras com Legumes',
    category: 'Low Carb',
    time: '10 min',
    difficulty: 'Fácil',
    likes: 130,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '4 claras',
      '2 colheres de leite desnatado',
      '2 colheres de cebola picada',
      '2 colheres de tomate picado',
      'Sal e ervas a gosto'
    ],
    instructions: [
      'Bata as claras com leite e temperos.',
      'Aqueça frigideira antiaderente.',
      'Refogue rapidamente os legumes.',
      'Adicione as claras e cozinhe até firmar.',
      'Dobre ao meio e sirva.'
    ],
    description: 'Alta proteína, baixa caloria e sem carboidrato – ideal pós-treino.',
    servings: 1,
    calories: 140
  },
  {
    id: 8,
    title: 'Mousse de Chocolate com Tofu',
    category: 'Sobremesas Saudáveis',
    time: '10 min',
    difficulty: 'Fácil',
    likes: 155,
    image: 'https://images.unsplash.com/photo-1553452118-621e1f860f43?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '150 g de tofu firme',
      '2 colheres de cacau em pó 100%',
      '2 colheres de mel',
      '1 colher de extrato de baunilha',
      'Pitada de sal'
    ],
    instructions: [
      'Escorra o tofu e lave bem.',
      'Processe todos os ingredientes até ficar liso.',
      'Leve à geladeira por 30 min para firmar.',
      'Sirva com frutas vermelhas.'
    ],
    description: 'Sem leite, sem ovos e zero culpa: cremoso e cheio de antioxidantes.',
    servings: 2,
    calories: 160
  },
  {
    id: 9,
    title: 'Cuscuz de Legumes',
    category: 'Veganas',
    time: '15 min',
    difficulty: 'Fácil',
    likes: 88,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 xícara de cuscuz marroquino',
      '1 xícara de água fervente',
      '½ cenoura ralada',
      '½ pimentão picado',
      '1 colher de azeite'
    ],
    instructions: [
      'Coloque o cuscuz em tigela e cubra com água fervente.',
      'Tampe por 5 min.',
      'Refogue os legumes no azeite.',
      'Misture ao cuscuz solto e sirva.'
    ],
    description: 'Receita rápida, vegana e perfeita para marmita.',
    servings: 2,
    calories: 220
  },
  {
    id: 10,
    title: 'Hambúrguer de Grão-de-Bico',
    category: 'Veganas',
    time: '30 min',
    difficulty: 'Médio',
    likes: 121,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 xícara de grão-de-bico cozido',
      '2 colheres de farinha de aveia',
      '1 colher de cebola ralada',
      '1 dente de alho amassado',
      'Sal, cominho e páprica a gosto'
    ],
    instructions: [
      'Triture o grão-de-bico até formar massa.',
      'Incorpore os demais ingredientes.',
      'Modele hambúrgueres e leve à frigideira com óleo em spray.',
      'Asse 4 min cada lado.'
    ],
    description: 'Fonte vegetal de proteína que satisfaz até os onívoros.',
    servings: 3,
    calories: 175
  },
  {
    id: 11,
    title: 'Salada de Frutas com Hortelã',
    category: 'Sobremesas Saudáveis',
    time: '10 min',
    difficulty: 'Fácil',
    likes: 67,
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 kiwi',
      '½ mamão',
      '10 morangos',
      '1 colher de hortelã picada',
      'Suco de ½ limão'
    ],
    instructions: [
      'Corte as frutas em cubos.',
      'Misture em tigela.',
      'Regue com limão e polvilhe hortelã.',
      'Sirva gelado.'
    ],
    description: 'Sobremesa natural, vitamínica e cheia de cor.',
    servings: 2,
    calories: 120
  },
  {
    id: 12,
    title: 'Tapioca de Coco',
    category: 'Café da Manhã',
    time: '8 min',
    difficulty: 'Fácil',
    likes: 102,
    image: 'https://images.unsplash.com/photo-1599660524908-6c1f9b5c6f8e?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '3 colheres de goma de tapioca',
      '2 colheres de coco ralado',
      '1 colher de mel',
      '1 fatia de queijo branco opcional'
    ],
    instructions: [
      'Unte frigideira antiaderente.',
      'Espalhe a goma formando disco.',
      'Polvilhe coco e mel.',
      'Dobre ao meio e sirva.'
    ],
    description: 'Sem glúten, sem leite e pronta em minutos.',
    servings: 1,
    calories: 210
  },
  {
    id: 13,
    title: 'Chips de Batata-Doce',
    category: 'Snacks',
    time: "25 min",
    difficulty: 'Fácil',
    likes: 115,
    image: 'https://images.unsplash.com/photo-1627998691522-385c5b72160a?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 batata-doce média',
      '1 colher de azeite',
      'Sal rosa a gosto',
      'Páprica doce opcional'
    ],
    instructions: [
      'Corte a batata em fatias finas.',
      'Misture com azeite e temperos.',
      'Distribua em forma única camada.',
      'Asse 20 min a 180 °C virando na metade.'
    ],
    description: 'Substituto crocante dos salgados industrializados.',
    servings: 2,
    calories: 135
  },
  {
    id: 14,
    title: 'Curry de Lentilha',
    category: 'Veganas',
    time: '35 min',
    difficulty: 'Médio',
    likes: 108,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 xícara de lentilha cozida',
      '1 lata de tomate pelado',
      '½ cebola picada',
      '1 dente de alho',
      '1 colher de curry em pó'
    ],
    instructions: [
      'Refogue cebola e alho.',
      'Acrescente tomate e curry.',
      'Adicione lentilha e cozinhe 10 min.',
      'Sirva com arroz integral ou purê.'
    ],
    description: 'Apimentado, cremoso e cheio de proteína vegetal.',
    servings: 3,
    calories: 245
  },
  {
    id: 15,
    title: 'Mini-Pão de Aveia',
    category: 'Café da Manhã',
    time: '20 min',
    difficulty: 'Fácil',
    likes: 98,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 xícara de aveia em flocos',
      '1 ovo',
      '½ xícara de iogurte natural',
      '1 colher de fermento em pó',
      '1 pitada de sal'
    ],
    instructions: [
      'Pré-aqueça forno a 180 °C.',
      'Misture tudo até virar massa.',
      'Distribua em forminhas.',
      'Asse 15 min ou até dourar.'
    ],
    description: 'Sem farinha refinada e ótimo para sandubas saudáveis.',
    servings: 6,
    calories: 85
  },
  {
    id: 16,
    title: 'Iogurte com Frutas e Granola',
    category: 'Café da Manhã',
    time: '3 min',
    difficulty: 'Fácil',
    likes: 76,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '200 ml iogurte natural desnatado',
      '½ banana em rodelas',
      '3 morangos',
      '2 colheres de granola sem açúcar'
    ],
    instructions: [
      'Coloque o iogurte em taça.',
      'Adicione frutas e granola.',
      'Sirva imediatamente.'
    ],
    description: 'Clássico rápido, equilibrado e crocante.',
    servings: 1,
    calories: 220
  },
  {
    id: 17,
    title: 'Salada de Rúcula com Damasco',
    category: 'Entradas',
    time: '7 min',
    difficulty: 'Fácil',
    likes: 82,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '2 punhados de rúcula',
      '4 damascos secos em tiras',
      '1 colher de nozes quebradas',
      '1 colher de azeite',
      'Suco de ½ limão'
    ],
    instructions: [
      'Lave e seque a rúcula.',
      'Misture com damasco e nozes.',
      'Regue azeite e limão.',
      'Sirva como entrada.'
    ],
    description: 'Contraste amargo-doce com gorduras boas.',
    servings: 2,
    calories: 155
  },
  {
    id: 18,
    title: 'Bolinho de Banana Assado',
    category: 'Sobremesas Saudáveis',
    time: '15 min',
    difficulty: 'Fácil',
    likes: 90,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 banana madura',
      '½ xícara de aveia',
      '1 ovo',
      '1 colher de cacau nibs',
      '½ colher de canela'
    ],
    instructions: [
      'Amasse a banana.',
      'Misture os demais ingredientes.',
      'Distribua em forminhas.',
      'Asse 12 min a 180 °C.'
    ],
    description: 'Docinho de forno sem açúcar adicionado.',
    servings: 6,
    calories: 65
  },
  {
    id: 19,
    title: 'Sopa de Abobrinha e Gengibre',
    category: 'Light',
    time: '20 min',
    difficulty: 'Fácil',
    likes: 70,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '2 abobrinhas médias',
      '1 cebola',
      '1 colher de gengibre ralado',
      '500 ml de caldo de legumes',
      'Salsinha a gosto'
    ],
    instructions: [
      'Refogue cebola e gengibre.',
      'Acrescente abobrinha e caldo.',
      'Cozinhe 15 min.',
      'Bata no liquidificador e decore com salsinha.'
    ],
    description: 'Saudável, digestiva e reconfortante.',
    servings: 3,
    calories: 85
  },
  {
    id: 20,
    title: 'Misto Fitness',
    category: 'Lanches',
    time: '5 min',
    difficulty: 'Fácil',
    likes: 125,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '2 fatias de pão integral',
      '2 fatias de peito de peru',
      '1 fatia de queijo magro',
      '1 colher de mostarda',
      'Tomates opcionais'
    ],
    instructions: [
      'Passe mostarda no pão.',
      'Monte o sanduíche.',
      'Aqueie na frigideira ou sanduicheira sem manteiga.',
      'Sirva quente.'
    ],
    description: 'Versão slim do clássico misto quente.',
    servings: 1,
    calories: 245
  },
  {
    id: 21,
    title: 'Pasta de Abacate',
    category: 'Snacks',
    time: '5 min',
    difficulty: 'Fácil',
    likes: 118,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 abacate maduro',
      'Suco de ½ limão',
      'Sal e pimenta a gosto',
      'Tomate-cereja opcional'
    ],
    instructions: [
      'Amasse o abacate.',
      'Misture limão e temperos.',
      'Sirva com palitos de cenoura ou torradas integrais.'
    ],
    description: 'Substituto saudável para patês industrializados.',
    servings: 2,
    calories: 160
  },
  {
    id: 22,
    title: 'Marmita de Frango à Mostarda',
    category: 'Marmitas Fit',
    time: '35 min',
    difficulty: 'Médio',
    likes: 147,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '150 g de peito de frango',
      '1 colher de mostarda Dijon',
      '1 xícara de brócolis',
      '½ xícara de arroz integral',
      '1 colher de mel'
    ],
    instructions: [
      'Cozinhe o arroz.',
      'Grelhe o frango com mel e mostarda.',
      'Cozinhe brócolis no vapor.',
      'Monte a marmita e leve para esquentar no trabalho.'
    ],
    description: 'Sabor marcante, baixo teor de gordura e fácil de transportar.',
    servings: 1,
    calories: 420
  },
  {
    id: 23,
    title: 'Vitamina de Café',
    category: 'Café da Manhã',
    time: '3 min',
    difficulty: 'Fácil',
    likes: 84,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '200 ml de café gelado',
      '1 banana',
      '1 colher de proteína de ervilha',
      '1 colher de cacau em pó',
      'Gelo a gosto'
    ],
    instructions: [
      'Bata tudo no liquidificador.',
      'Sirva imediatamente.'
    ],
    description: 'Energia da cafeína + nutrientes da fruta e proteína.',
    servings: 1,
    calories: 190
  },
  {
    id: 24,
    title: 'Salada de Macarrão Integral',
    category: 'Marmitas Fit',
    time: '20 min',
    difficulty: 'Fácil',
    likes: 93,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '1 xícara de macarrão integral cozido',
      '½ pepino em cubos',
      '1 tomate sem sementes',
      '1 colher de azeite',
      'Orégano a gosto'
    ],
    instructions: [
      'Cozinhe o macarrão al dente.',
      'Espere esfriar e misture vegetais.',
      'Tempere com azeite e orégano.',
      'Leve na geladeira para consumir frio.'
    ],
    description: 'Marmita prática que não necessita aquecimento.',
    servings: 2,
    calories: 260
  },
  {
    id: 25,
    title: 'Brownie de Chocolate e Beterraba',
    category: 'Sobremesas Saudáveis',
    time: '40 min',
    difficulty: 'Médio',
    likes: 132,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '½ xícara de beterraba cozida',
      '2 ovos',
      '3 colheres de cacau em pó',
      '3 colheres de xylitol',
      '½ xícara de farinha de aveia'
    ],
    instructions: [
      'Bata tudo no liquidificador.',
      'Despeje em forma untada.',
      'Asse 30 min a 180 °C.',
      'Espete palito para verificar ponto.'
    ],
    description: 'Umidificado natural da beterraba reduz a necessidade de gordura.',
    servings: 8,
    calories: 95
  },
  {
    id: 26,
    title: 'Ovos Poachê sobre Espinafre',
    category: 'Low Carb',
    time: '10 min',
    difficulty: 'Médio',
    likes: 99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d81141?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '2 ovos',
      '1 punhado de espinafre',
      '1 colher de vinagre',
      'Sal e pimenta a gosto'
    ],
    instructions: [
      'Refogue espinafre com alho.',
      'Ferva água com vinagre e faça redemoinho.',
      'Quebre os ovos e cozinhe 3-4 min.',
      'Sirva sobre o espinafre.'
    ],
    description: 'Café da manhã proteico e quase zero carboidrato.',
    servings: 1,
    calories: 180
  },
  {
    id: 27,
    title: 'Pudim de Chia com Cacau',
    category: 'Sobremesas Saudáveis',
    time: '15 min (+noite)',
    difficulty: 'Fácil',
    likes: 110,
    image: 'https://images.unsplash.com/photo-1514516870926-20598973e480?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '3 colheres de semente de chia',
      '200 ml de leite de amêndoas',
      '1 colher de cacau em pó',
      '1 colher de mel',
      '1 pitada de canela'
    ],
    instructions: [
      'Misture todos os ingredientes.',
      'Leve à geladeira overnight.',
      'Bata no liquidificador para textura lisa.',
      'Sirva com raspas de chocolate 70%.'
    ],
    description: 'Textura de pudim, sabor de chocolate e fibras de sobra.',
    servings: 2,
    calories: 150
  },
  {
    id: 28,
    title: 'Refresco de Hibisco',
    category: 'Detox',
    time: '10 min',
    difficulty: 'Fácil',
    likes: 71,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '2 colheres de flor de hibisco',
      '1 litro de água',
      '1 colher de mel',
      'Gelo e hortelã a gosto'
    ],
    instructions: [
      'Ferva água e despeje sobre o hibisco.',
      'Deixe tampado 8 min.',
      'Coe, adoce com mel e leve à geladeira.',
      'Sirva com gelo e hortelã.'
    ],
    description: 'Bebida antioxidante que ajuda na pressão arterial.',
    servings: 4,
    calories: 20
  },
  {
    id: 29,
    title: 'Panqueca de Clara e Banana',
    category: 'Café da Manhã',
    time: '10 min',
    difficulty: 'Fácil',
    likes: 138,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '2 claras',
      '½ banana madura',
      '1 colher de canela',
      'Óleo em spray'
    ],
    instructions: [
      'Bata claras e banana.',
      'Aqueça frigideira antiaderente.',
      'Despeje pequena porção.',
      'Vire quando firmar.'
    ],
    description: 'Substituto low carb para panqueca tradicional.',
    servings: 1,
    calories: 120
  },
  {
    id: 30,
    title: 'Bowl de Açaí Sem Açúcar',
    category: 'Café da Manhã',
    time: '5 min',
    difficulty: 'Fácil',
    likes: 156,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1350&q=80',
    ingredients: [
      '100 g de polpa de açaí sem adição',
      '½ banana congelada',
      '1 colher de granola',
      'Morangos para decorar'
    ],
    instructions: [
      'Bata açaí e banana até creme grosso.',
      'Transfira para tigela.',
      'Decore com granola e frutas.'
    ],
    description: 'Energético natural e cheio de antioxidantes.',
    servings: 1,
    calories: 235
  }
]

