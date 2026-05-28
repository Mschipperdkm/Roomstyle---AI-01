'use client'

import { Product } from '@/lib/products'
import { Style } from '@/lib/styles'
import { RoomType } from '@/lib/generatePrompt'

interface GeneratedResultProps {
  imageUrl: string
  product: Product | null
  style: Style
  room: RoomType
  isFallback: boolean
  onRegenerate: () => void
  onLeadCapture: () => void
}

const roomLabels: Record<RoomType, string> = {
  woonkamer: 'Woonkamer',
  slaapkamer: 'Slaapkamer',
  eetkamer: 'Eetkamer',
}

export function GeneratedResult({
  imageUrl,
  product,
  style,
  room,
  isFallback,
  onRegenerate,
  onLeadCapture,
}: GeneratedResultProps) {
  return (
    <div className="animate-fade-up">
      <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl bg-cream-100">
        <img
          src={imageUrl}
          alt={`${style.name} ${roomLabels[room]}`}
          className="w-full aspect-[16/9] object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-stone-warm text-xs font-sans font-medium px-3 py-1.5 rounded-full shadow-sm">
            {style.emoji} {style.name}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-stone-warm text-xs font-sans font-medium px-3 py-1.5 rounded-full shadow-sm">
            {roomLabels[room]}
          </span>
        </div>
        {isFallback && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-black/50 backdrop-blur-sm text-white/80 text-xs font-sans px-3 py-1.5 rounded-full">
              Demo afbeelding
            </span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {product ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200">
            <p className="text-xs text-stone-warm/60 font-sans uppercase tracking-wider mb-3">Gekozen product</p>
            <div className="flex gap-4 items-start">
              <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
              <div>
                <p className="text-xs text-stone-warm/60 font-sans mb-1">{product.store}</p>
                <h3 className="font-serif text-stone-deep text-lg leading-snug mb-1">{product.name}</h3>
                <p className="font-sans font-semibold text-stone-warm text-base mb-2">{product.price}</p>
                <p className="text-xs text-stone-warm/70 font-sans leading-relaxed">{product.description}</p>
              </div>
            </div>
            
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-stone-deep text-cream-50 font-sans text-sm font-medium py-3 px-4 rounded-xl hover:bg-stone-mid transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop dit product
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-200 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-3 block">📸</span>
              <p className="font-serif text-stone-deep text-lg mb-1">Eigen foto gebruikt</p>
              <p className="text-xs text-stone-warm/60 font-sans">Gegenereerd op basis van jouw upload</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl p-6 border" style={{ backgroundColor: style.accentColor + '15', borderColor: style.accentColor + '40' }}>
          <p className="text-xs font-sans uppercase tracking-wider mb-3" style={{ color: style.accentColor }}>Over deze stijl</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{style.emoji}</span>
            <h3 className="font-serif text-stone-deep text-xl">{style.name}</h3>
          </div>
          <p className="text-sm text-stone-warm/80 font-sans leading-relaxed mb-4">{style.description}</p>
          <div className="flex flex-wrap gap-2">
            {style.promptKeywords.slice(0, 4).map((keyword, i) => (
              <span key={i} className="text-xs font-sans px-2.5 py-1 rounded-full" style={{ backgroundColor: style.accentColor + '25', color: style.accentColor }}>
                {keyword.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onLeadCapture}
          className="flex-1 bg-stone-warm text-cream-50 font-sans font-medium py-4 px-6 rounded-2xl hover:bg-stone-mid transition-all hover:scale-[1.01] shadow-lg shadow-stone-warm/20 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Vraag interieuradvies aan
        </button>
        <button
          onClick={onRegenerate}
          className="flex-1 bg-white text-stone-warm border-2 border-cream-200 font-sans font-medium py-4 px-6 rounded-2xl hover:border-stone-warm/40 hover:bg-cream-50 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Genereer opnieuw
        </button>
      </div>
    </div>
  )
}
