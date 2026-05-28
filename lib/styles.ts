export interface Style {
  id: string
  name: string
  description: string
  promptKeywords: string[]
  accentColor: string
  emoji: string
  placeholderImage: string
}

export const styles: Style[] = [
  {
    id: 'japandi',
    name: 'Japandi',
    description:
      'Een harmonieuze mix van Japanse wabi-sabi filosofie en Scandinavisch design. Rustige neutralen, warme houttinten en een gevoel van serene balans.',
    promptKeywords: [
      'calm minimalist aesthetic',
      'warm wood tones',
      'beige and off-white palette',
      'natural textures and linen',
      'wabi-sabi philosophy',
      'soft diffused natural light',
      'handcrafted ceramic accents',
      'low furniture profile',
      'rattan and bamboo elements',
    ],
    accentColor: '#C4A882',
    emoji: '🍃',
    placeholderImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
  },
  {
    id: 'hotel-chic',
    name: 'Hotel Chic',
    description:
      'De glamour van een vijfsterrenhotel thuis nagebouwd. Donkere accenten, fluweel, messing details en een sfeer van onberispelijke luxe.',
    promptKeywords: [
      'luxury boutique hotel aesthetic',
      'dark moody color palette with deep navy and charcoal',
      'velvet upholstery and silk accents',
      'brass and gold metallic details',
      'dramatic ambient lighting with warm glow',
      'premium materials and finishes',
      'symmetrical composition',
      'art deco inspired details',
    ],
    accentColor: '#B8963E',
    emoji: '✦',
    placeholderImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
  },
  {
    id: 'scandinavisch',
    name: 'Scandinavisch',
    description:
      'Licht, luchtig en functioneel. Wit en licht hout domineren, met gezellige textielen en een gevoel van hyggelige warmte.',
    promptKeywords: [
      'bright airy Scandinavian interior',
      'white walls and light birch wood',
      'clean functional lines',
      'cozy hygge textiles and wool throws',
      'large windows with natural light flooding in',
      'simple geometric forms',
      'potted plants and greenery',
      'pastel accents',
    ],
    accentColor: '#8FA688',
    emoji: '❄',
    placeholderImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=85',
  },
  {
    id: 'industrieel',
    name: 'Industrieel',
    description:
      'Rauwe schoonheid van een New Yorkse loft. Beton, zwart staal, leer en zichtbare balken geven ruimte karakter en authenticiteit.',
    promptKeywords: [
      'urban industrial loft aesthetic',
      'exposed concrete walls and ceiling',
      'black steel and iron frames',
      'worn leather furniture',
      'exposed brick accent wall',
      'Edison bulb pendant lighting',
      'dark moody atmosphere',
      'raw unfinished materials',
      'distressed wood',
    ],
    accentColor: '#7A7A7A',
    emoji: '⚙',
    placeholderImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85',
  },
  {
    id: 'organic-modern',
    name: 'Organic Modern',
    description:
      'Zachte organische vormen ontmoeten moderne elegantie. Natuursteen, linnen, sculptuurachtige meubels en een rustgevend neutraal palet.',
    promptKeywords: [
      'organic modern interior design',
      'soft curved sculptural furniture',
      'travertine and natural stone accents',
      'warm neutral palette of sand and cream',
      'textured linen and boucle fabrics',
      'dried botanicals and sculptural branches',
      'arched doorways and rounded forms',
      'warm indirect lighting',
    ],
    accentColor: '#C4704A',
    emoji: '◌',
    placeholderImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
  },
]

export function getStyleById(id: string): Style | undefined {
  return styles.find((s) => s.id === id)
}
