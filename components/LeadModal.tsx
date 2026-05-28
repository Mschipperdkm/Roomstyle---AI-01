'use client'

import { useState } from 'react'
import { Product } from '@/lib/products'
import { Style } from '@/lib/styles'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  style: Style | null
}

interface LeadFormData {
  name: string
  email: string
  woonwens: string
  stijl: string
  product: string
}

export function LeadModal({ isOpen, onClose, product, style }: LeadModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    woonwens: '',
    stijl: style?.name || '',
    product: product?.name || '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Sla op in local state (later: Supabase integratie hier)
    const leadData = {
      ...formData,
      stijl: style?.name || formData.stijl,
      product: product?.name || formData.product,
      timestamp: new Date().toISOString(),
    }

    console.log('[LeadCapture] Nieuwe aanvraag:', leadData)

    // ======================================================
    // INTEGRATIE PUNT: Supabase lead opslag
    // const { error } = await supabase.from('leads').insert([leadData])
    // ======================================================

    // Simuleer API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Sla op in localStorage als fallback
    try {
      const existing = JSON.parse(localStorage.getItem('roomstyle_leads') || '[]')
      existing.push(leadData)
      localStorage.setItem('roomstyle_leads', JSON.stringify(existing))
    } catch (err) {
      console.warn('localStorage niet beschikbaar')
    }

    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-deep/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative bg-cream-50 rounded-3xl shadow-2xl w-full max-w-lg p-8 animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-cream-200 hover:bg-cream-300 transition-colors flex items-center justify-center text-stone-warm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <h2 className="font-display text-2xl text-stone-deep mb-2">Vraag interieuradvies aan</h2>
              <p className="text-sm text-stone-warm/70 font-sans leading-relaxed">
                Laat je gegevens achter en we sturen je persoonlijk interieuradvies op maat.
              </p>
            </div>

            {/* Context banner */}
            {product && style && (
              <div className="bg-cream-200 rounded-xl p-3 mb-6 flex items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-stone-warm/60 font-sans">Je keuze</p>
                  <p className="text-sm text-stone-deep font-sans font-medium">
                    {product.name} · {style.name}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-medium text-stone-warm/70 uppercase tracking-wider mb-1.5">
                  Naam
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jouw naam"
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-stone-deep font-sans text-sm placeholder:text-stone-warm/40 focus:outline-none focus:ring-2 focus:ring-stone-warm/30 focus:border-stone-warm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-stone-warm/70 uppercase tracking-wider mb-1.5">
                  E-mailadres
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="naam@email.nl"
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-stone-deep font-sans text-sm placeholder:text-stone-warm/40 focus:outline-none focus:ring-2 focus:ring-stone-warm/30 focus:border-stone-warm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-stone-warm/70 uppercase tracking-wider mb-1.5">
                  Jouw woonwens
                </label>
                <textarea
                  value={formData.woonwens}
                  onChange={(e) => setFormData({ ...formData, woonwens: e.target.value })}
                  placeholder="Beschrijf kort je woonwens, ruimte of vragen..."
                  rows={3}
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-3 text-stone-deep font-sans text-sm placeholder:text-stone-warm/40 focus:outline-none focus:ring-2 focus:ring-stone-warm/30 focus:border-stone-warm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-stone-deep text-cream-50 font-sans font-medium py-4 rounded-2xl hover:bg-stone-mid transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Aanvraag versturen...
                  </>
                ) : (
                  'Verstuur aanvraag'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-stone-deep mb-2">Dank je!</h3>
            <p className="text-sm text-stone-warm/70 font-sans leading-relaxed mb-6">
              Je aanvraag is ontvangen. We nemen binnenkort contact met je op met persoonlijk interieuradvies.
            </p>
            <button
              onClick={onClose}
              className="bg-stone-warm text-cream-50 font-sans font-medium py-3 px-8 rounded-xl hover:bg-stone-mid transition-colors"
            >
              Terug naar de tool
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
