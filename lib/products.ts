export interface Product {
  id: string
  name: string
  category: string
  price: string
  store: string
  imageUrl: string
  productUrl: string
  description: string
  color?: string
}
 
export const products: Product[] = [
  // ===== LEEN BAKKER =====
  {
    id: 'lb-bank-hopper',
    name: 'Hopper 3-zitsbank',
    category: 'bank',
    price: '€ 699,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl/banken',
    description: 'Strakke 3-zitsbank met zachte stof bekleding. Tijdloos design voor elke woonkamer.',
    color: 'Lichtgrijs',
  },
  {
    id: 'lb-fauteuil-ease',
    name: 'Ease Fauteuil',
    category: 'fauteuil',
    price: '€ 349,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl/fauteuils',
    description: 'Comfortabele fauteuil met ronde vormen en zachte bekleding. Perfect voor een leeshoek.',
    color: 'Olijfgroen',
  },
  {
    id: 'lb-eettafel-nordic',
    name: 'Nordic Eettafel',
    category: 'eettafel',
    price: '€ 449,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl/eettafels',
    description: 'Strakke rechthoekige eettafel in eikenhout look. Geschikt voor 6 personen.',
    color: 'Naturel eiken',
  },
  {
    id: 'lb-kast-oslo',
    name: 'Oslo Kledingkast',
    category: 'kast',
    price: '€ 599,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl/kasten',
    description: '3-deurs kledingkast met strakke deuren en veel opbergruimte.',
    color: 'Mat wit',
  },
 
  // ===== LOODS 5 =====
  {
    id: 'l5-bank-milan',
    name: 'Milan Velvet Bank',
    category: 'bank',
    price: '€ 1.299,-',
    store: 'Loods 5',
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80',
    productUrl: 'https://www.loods5.nl/banken',
    description: 'Luxe velvet bank met gouden poten. Een echte eyecatcher in elke woonkamer.',
    color: 'Donkerblauw velvet',
  },
  {
    id: 'l5-salontafel-brass',
    name: 'Brass Salontafel',
    category: 'salontafel',
    price: '€ 449,-',
    store: 'Loods 5',
    imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80',
    productUrl: 'https://www.loods5.nl/salontafels',
    description: 'Ronde salontafel met messing frame en glazen blad. Modern en elegant.',
    color: 'Messing / Glas',
  },
  {
    id: 'l5-lamp-arc',
    name: 'Arc Vloerlamp',
    category: 'lamp',
    price: '€ 229,-',
    store: 'Loods 5',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    productUrl: 'https://www.loods5.nl/lampen',
    description: 'Elegante booglamp met messing details en linnen kap. Warme sfeervolle verlichting.',
    color: 'Messing / Linnen',
  },
 
  // ===== IKEA =====
  {
    id: 'ikea-kallax',
    name: 'KALLAX Kast',
    category: 'kast',
    price: '€ 179,-',
    store: 'IKEA',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    productUrl: 'https://www.ikea.com/nl/nl/p/kallax-kast-wit-20275848/',
    description: 'Veelzijdige open kast die je ook als boekenkast of roomdivider kunt gebruiken.',
    color: 'Wit',
  },
  {
    id: 'ikea-poang',
    name: 'POÄNG Fauteuil',
    category: 'fauteuil',
    price: '€ 119,-',
    store: 'IKEA',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    productUrl: 'https://www.ikea.com/nl/nl/p/poaeng-fauteuil-berkenfineer-knisa-lichtbeige-s99300806/',
    description: 'Iconische fauteuil met veerkrachtig beukenfineer frame en wasbare hoes.',
    color: 'Beige',
  },
  {
    id: 'ikea-lack',
    name: 'LACK Salontafel',
    category: 'salontafel',
    price: '€ 29,-',
    store: 'IKEA',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    productUrl: 'https://www.ikea.com/nl/nl/p/lack-salontafel-wit-20011408/',
    description: 'Eenvoudige en betaalbare salontafel. Licht van gewicht en makkelijk te verplaatsen.',
    color: 'Wit / Zwart',
  },
 
  // ===== WESTWING =====
  {
    id: 'ww-bank-luca',
    name: 'Luca Chesterfield Bank',
    category: 'bank',
    price: '€ 1.899,-',
    store: 'Westwing',
    imageUrl: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80',
    productUrl: 'https://www.westwing.nl/banken/',
    description: 'Klassieke Chesterfield bank in premium leer met kenmerkende knoopdetails.',
    color: 'Cognac leer',
  },
  {
    id: 'ww-eettafel-marble',
    name: 'Marble Eettafel',
    category: 'eettafel',
    price: '€ 1.299,-',
    store: 'Westwing',
    imageUrl: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80',
    productUrl: 'https://www.westwing.nl/eettafels/',
    description: 'Ronde eettafel met wit marmer blad en gouden onderstel. Pure luxe.',
    color: 'Wit marmer / Goud',
  },
 
  // ===== HAY =====
  {
    id: 'hay-about-chair',
    name: 'About A Chair AAC22',
    category: 'stoel',
    price: '€ 395,-',
    store: 'HAY',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    productUrl: 'https://www.hay.com/nl-nl/chairs/about-a-chair/',
    description: 'Iconische Deense designstoel met ergonomische zitting en slanke poten.',
    color: 'Mosterdgeel',
  },
  {
    id: 'hay-loop-table',
    name: 'Loop Stand Tafel',
    category: 'salontafel',
    price: '€ 549,-',
    store: 'HAY',
    imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80',
    productUrl: 'https://www.hay.com/nl-nl/tables/',
    description: 'Speelse salontafel met organisch gevormde poten. Scandinavisch design op zijn best.',
    color: 'Wit / Naturel hout',
  },
 
  // ===== VTWONEN =====
  {
    id: 'vtw-vloerkleed-berber',
    name: 'Berber Vloerkleed',
    category: 'vloerkleed',
    price: '€ 249,-',
    store: 'vtwonen',
    imageUrl: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80',
    productUrl: 'https://www.vtwonen.nl/vloerkleden/',
    description: 'Handgeweven vloerkleed met Berber-patronen. Voegt warmte toe aan elke ruimte.',
    color: 'Crème / Camel',
  },
  {
    id: 'vtw-bank-morgan',
    name: 'Morgan Bank',
    category: 'bank',
    price: '€ 1.099,-',
    store: 'vtwonen',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    productUrl: 'https://www.vtwonen.nl/banken/',
    description: 'Ruime hoekbank met afgeronde hoeken en diepe zitting. Maximaal comfort.',
    color: 'Taupe',
  },
 
  // ===== BOLIA =====
  {
    id: 'bolia-nancy-bank',
    name: 'Nancy Sofa',
    category: 'bank',
    price: '€ 2.499,-',
    store: 'Bolia',
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80',
    productUrl: 'https://www.bolia.com/nl-nl/sofas/',
    description: 'Scandinavische designbank met slanke houten poten en diepe zitting. Tijdloos en luxe.',
    color: 'Lichtgrijs wol',
  },
  {
    id: 'bolia-eettafel-grace',
    name: 'Grace Eettafel',
    category: 'eettafel',
    price: '€ 1.799,-',
    store: 'Bolia',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    productUrl: 'https://www.bolia.com/nl-nl/tables/',
    description: 'Massief eiken eettafel met elegante afwerking. Handgemaakt Scandinavisch design.',
    color: 'Massief eiken',
  },
]
 
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
 
export const stores: string[] = Array.from(new Set(products.map((p) => p.store)))
