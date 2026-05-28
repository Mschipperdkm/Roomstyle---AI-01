'use client'

import { Product } from '@/lib/products'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  isSelected: boolean
  onSelect: (product: Product) => void
}

export function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <button
      onClick={() => onSelect(product)}
      className={`group relative w-full text-left rounded-2xl overflow-hidden transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-stone-warm shadow-xl scale-[1.02]'
          : 'hover:shadow-lg hover:scale-[1.01] shadow-sm'
      } bg-white`}
    >
      {/* Product image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-stone-warm/10 flex items-center justify-center">
            <div className="bg-stone-warm text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-warm text-xs font-sans font-medium px-2.5 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="text-xs text-stone-warm/70 font-sans uppercase tracking-wider mb-1">{product.store}</p>
        <h3 className="font-serif text-stone-deep text-base leading-snug mb-1">{product.name}</h3>
        {product.color && (
          <p className="text-xs text-stone-warm/60 font-sans mb-2">{product.color}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="font-sans font-semibold text-stone-deep text-sm">{product.price}</span>
          <span
            className={`text-xs font-sans px-2 py-1 rounded-full transition-colors ${
              isSelected ? 'bg-stone-warm text-white' : 'bg-cream-100 text-stone-warm group-hover:bg-cream-200'
            }`}
          >
            {isSelected ? 'Gekozen' : 'Kies'}
          </span>
        </div>
      </div>
    </button>
  )
}
