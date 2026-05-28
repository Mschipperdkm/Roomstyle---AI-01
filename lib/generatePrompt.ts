import { Product } from './products'
import { Style } from './styles'

export type RoomType = 'woonkamer' | 'slaapkamer' | 'eetkamer'

export const rooms: { id: RoomType; name: string; emoji: string; description: string }[] = [
  {
    id: 'woonkamer',
    name: 'Woonkamer',
    emoji: '🛋',
    description: 'Een warme, uitnodigende leefruimte voor ontspanning en ontvangst.',
  },
  {
    id: 'slaapkamer',
    name: 'Slaapkamer',
    emoji: '🛏',
    description: 'Een rustige, comfortabele ruimte voor rust en herstel.',
  },
  {
    id: 'eetkamer',
    name: 'Eetkamer',
    emoji: '🍽',
    description: 'Een gezellige ruimte om samen te eten en te genieten.',
  },
]

/**
 * Genereert een hoogwaardige DALL-E prompt op basis van product, stijl en kamertype.
 * Voeg hier eventueel extra parameters toe voor meer precisie of A/B-testing.
 */
export function generateInteriorPrompt(product: Product, style: Style, room: RoomType): string {
  const keywordsText = style.promptKeywords.join(', ')

  return (
    `Create a stunning photorealistic interior design render of a ${room} in ${style.name} style. ` +
    `The room should prominently feature a ${product.name}, a beautiful ${product.category} from ${product.store}. ` +
    `The overall aesthetic should embody: ${keywordsText}. ` +
    `Composition: wide-angle architectural photography perspective, balanced and harmonious layout. ` +
    `Lighting: warm, natural, professional interior photography lighting with soft shadows. ` +
    `Quality: high-end ecommerce interior inspiration image, magazine-worthy, photorealistic render, 8K resolution quality. ` +
    `Style notes: no people, no text overlays, no logos, no watermarks. ` +
    `The ${product.category} should be the hero piece, styled perfectly within the ${style.name} aesthetic.`
  )
}

/**
 * Fallback afbeeldingen per stijl voor als de AI API niet beschikbaar is.
 * Vervang deze door echte gegenereerde afbeeldingen in productie.
 */
export const fallbackImages: Record<string, Record<RoomType, string>> = {
  japandi: {
    woonkamer: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85',
    slaapkamer: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85',
    eetkamer: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=85',
  },
  'hotel-chic': {
    woonkamer: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85',
    slaapkamer: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85',
    eetkamer: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=1400&q=85',
  },
  scandinavisch: {
    woonkamer: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1400&q=85',
    slaapkamer: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85',
    eetkamer: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=1400&q=85',
  },
  industrieel: {
    woonkamer: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85',
    slaapkamer: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85',
    eetkamer: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1400&q=85',
  },
  'organic-modern': {
    woonkamer: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85',
    slaapkamer: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&q=85',
    eetkamer: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=85',
  },
}
