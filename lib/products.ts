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
  {
    id: 'bank-kyoto',
    name: 'Kyoto 3-zitsbank',
    category: 'bank',
    price: '€ 849,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Strakke 3-zitsbank met zachte bekleding in warm beige. Perfect voor minimalistische interieurs.',
    color: 'Beige / Naturel',
  },
  {
    id: 'fauteuil-luna',
    name: 'Luna Fauteuil',
    category: 'fauteuil',
    price: '€ 399,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Ronde, organische fauteuil met fluwelen bekleding. Een statement stuk in elke kamer.',
    color: 'Mosgroen / Velvet',
  },
  {
    id: 'salontafel-oak',
    name: 'Oak Salontafel',
    category: 'salontafel',
    price: '€ 229,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Massief eiken salontafel met subtiele metalen poten. Tijdloos en duurzaam.',
    color: 'Naturel Eiken / Zwart Staal',
  },
  {
    id: 'kast-nordic',
    name: 'Nordic Wandkast',
    category: 'kast',
    price: '€ 549,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Open wandkast in licht hout met strakke lijnen. Ideaal voor een opgeruimde look.',
    color: 'Licht Hout / Wit',
  },
  {
    id: 'eettafel-marble',
    name: 'Marble Eettafel',
    category: 'eettafel',
    price: '€ 699,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Ronde eettafel met marmer blad en gouden poot. Luxe touch voor de eetkamer.',
    color: 'Wit Marmer / Goud',
  },
  {
    id: 'vloerkleed-berber',
    name: 'Berber Vloerkleed',
    category: 'vloerkleed',
    price: '€ 189,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Handgeweven Berber-stijl vloerkleed met geometrische patronen. Sfeervol en warm.',
    color: 'Crème / Camel',
  },
  {
    id: 'lamp-arc',
    name: 'Arc Vloerlamp',
    category: 'lamp',
    price: '€ 149,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Staande booglamp met messing details en linnen kap. Warm en sfeervol licht.',
    color: 'Messing / Linnen',
  },
  {
    id: 'stoel-rattan',
    name: 'Rattan Eetkamerstoel',
    category: 'stoel',
    price: '€ 129,-',
    store: 'Leen Bakker',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    productUrl: 'https://www.leenbakker.nl',
    description: 'Lichte eetkamerstoel met rotan rugleuning en houten frame. Boho meets minimalism.',
    color: 'Naturel Rattan / Hout',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
