'use client'

import { Style } from '@/lib/styles'

interface StyleSelectorProps {
  styles: Style[]
  selectedStyle: Style | null
  onSelect: (style: Style) => void
}

export function StyleSelector({ styles, selectedStyle, onSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {styles.map((style) => {
        const isSelected = selectedStyle?.id === style.id
        return (
          <button
            key={style.id}
            onClick={() => onSelect(style)}
            className={`relative group text-left rounded-2xl p-5 transition-all duration-300 border-2 ${
              isSelected
                ? 'border-stone-warm bg-cream-100 shadow-lg scale-[1.02]'
                : 'border-cream-200 bg-white hover:border-cream-300 hover:shadow-md hover:scale-[1.01]'
            }`}
          >
            {/* Style image preview */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-cream-100">
              <img
                src={style.placeholderImage}
                alt={style.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Emoji + name */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{style.emoji}</span>
              <h3 className="font-serif text-stone-deep text-base font-medium">{style.name}</h3>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-warm/70 font-sans leading-relaxed line-clamp-2">
              {style.description}
            </p>

            {/* Selected indicator */}
            {isSelected && (
              <div
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: style.accentColor }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
