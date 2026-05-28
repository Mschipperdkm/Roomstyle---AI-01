'use client'

import { useState, useRef } from 'react'
import { products, Product } from '@/lib/products'
import { styles, Style } from '@/lib/styles'
import { RoomType } from '@/lib/generatePrompt'
import { ProductCard } from '@/components/ProductCard'
import { StyleSelector } from '@/components/StyleSelector'
import { RoomSelector } from '@/components/RoomSelector'
import { GeneratedResult } from '@/components/GeneratedResult'
import { LeadModal } from '@/components/LeadModal'

type Step = 'product' | 'style' | 'room' | 'result'

interface GenerationResult {
  imageUrl: string
  isFallback: boolean
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
  const [currentStep, setCurrentStep] = useState<Step>('product')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const configRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    if (currentStep === 'product') {
      setCurrentStep('style')
      scrollToSection(configRef)
    }
  }

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style)
    if (currentStep === 'style') setCurrentStep('room')
  }

  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoom(room)
    if (currentStep === 'room') setCurrentStep('result')
  }

  const handleGenerate = async () => {
    if (!selectedProduct || !selectedStyle || !selectedRoom) return

    setIsGenerating(true)
    setError(null)
    setGenerationResult(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          styleId: selectedStyle.id,
          room: selectedRoom,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Er ging iets mis')
      }

      const data = await response.json()
      setGenerationResult({ imageUrl: data.imageUrl, isFallback: data.isFallback })
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis. Probeer het opnieuw.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    setGenerationResult(null)
    setCurrentStep('product')
    setSelectedProduct(null)
    setSelectedStyle(null)
    setSelectedRoom(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const canGenerate = selectedProduct && selectedStyle && selectedRoom

  const stepComplete = {
    product: !!selectedProduct,
    style: !!selectedStyle,
    room: !!selectedRoom,
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease forwards; }
        .shimmer-bg {
          background: linear-gradient(90deg, #F0E8D8 25%, #E4D5BC 50%, #F0E8D8 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* ===== NAVIGATION ===== */}
      <nav className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-stone-warm rounded-lg flex items-center justify-center">
              <span className="text-cream-50 text-sm font-serif">R</span>
            </div>
            <span className="font-serif text-stone-deep text-xl font-medium">RoomStyle AI</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#tool" className="text-sm text-stone-warm/70 font-sans hover:text-stone-warm transition-colors">Tool</a>
            <a href="#for-business" className="text-sm text-stone-warm/70 font-sans hover:text-stone-warm transition-colors">Voor bedrijven</a>
            <button
              onClick={() => setShowLeadModal(true)}
              className="bg-stone-deep text-cream-50 font-sans text-sm font-medium px-4 py-2 rounded-xl hover:bg-stone-mid transition-colors"
            >
              Interieuradvies
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-cream-50" />
          <div className="absolute top-0 right-0 w-[60%] h-full opacity-30"
               style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #D4BC96 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-stone-warm/10 text-stone-warm text-xs font-sans font-medium px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              AI Interieur Visualisatie
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-deep leading-[1.1] mb-6">
              Visualiseer meubels in
              <br />
              <span className="italic text-stone-warm">populaire interieurstijlen</span>
              <br />
              met AI
            </h1>
            <p className="text-base sm:text-lg text-stone-warm/80 font-sans font-light leading-relaxed mb-10 max-w-2xl">
              Kies een product, kies een stijl en zie direct hoe het eruitziet in jouw ruimte.
              Van Japandi tot Hotel Chic — gegenereerd door AI, klaar om te shoppen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#tool"
                className="inline-flex items-center justify-center gap-2 bg-stone-deep text-cream-50 font-sans font-medium px-8 py-4 rounded-2xl hover:bg-stone-mid transition-all hover:scale-[1.01] shadow-lg shadow-stone-deep/20"
              >
                Start visualisatie
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button
                onClick={() => setShowLeadModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-cream-200 text-stone-warm font-sans font-medium px-8 py-4 rounded-2xl hover:border-stone-warm/40 hover:bg-cream-100 transition-all"
              >
                Gratis interieuradvies
              </button>
            </div>
          </div>

          {/* Hero image strip */}
          <div className="mt-14 grid grid-cols-3 sm:grid-cols-5 gap-3 opacity-80">
            {styles.map((s) => (
              <div key={s.id} className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img src={s.placeholderImage} alt={s.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN TOOL ===== */}
      <section id="tool" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20" ref={configRef}>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {[
            { key: 'product', label: 'Product', num: 1 },
            { key: 'style', label: 'Stijl', num: 2 },
            { key: 'room', label: 'Kamer', num: 3 },
          ].map((step, i) => {
            const isDone = stepComplete[step.key as keyof typeof stepComplete]
            const isCurrent = currentStep === step.key && !isDone
            return (
              <div key={step.key} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-colors ${
                    isDone
                      ? 'bg-stone-warm text-cream-50'
                      : isCurrent
                      ? 'bg-stone-deep text-cream-50'
                      : 'bg-cream-200 text-stone-warm/60'
                  }`}
                >
                  {isDone ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </div>
                <span className={`text-sm font-sans ${isDone || isCurrent ? 'text-stone-deep' : 'text-stone-warm/50'}`}>
                  {step.label}
                </span>
                {i < 2 && (
                  <div className={`w-8 h-px mx-1 ${isDone ? 'bg-stone-warm/40' : 'bg-cream-300'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* === STAP 1: Product === */}
        <div className="mb-16">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Stap 1</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Kies een product</h2>
          </div>
          <p className="text-sm text-stone-warm/70 font-sans mb-8">
            Selecteer het meubel of accessoire dat je wilt visualiseren.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProduct?.id === product.id}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        </div>

        {/* === STAP 2: Stijl === */}
        <div className={`mb-16 transition-all duration-500 ${currentStep === 'product' && !selectedProduct ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Stap 2</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Kies een interieurstijl</h2>
          </div>
          <p className="text-sm text-stone-warm/70 font-sans mb-8">
            In welke sfeer wil jij het product zien?
          </p>
          <StyleSelector
            styles={styles}
            selectedStyle={selectedStyle}
            onSelect={handleStyleSelect}
          />
        </div>

        {/* === STAP 3: Kamer === */}
        <div className={`mb-16 transition-all duration-500 ${!selectedStyle ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Stap 3</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Kies een kamer</h2>
          </div>
          <p className="text-sm text-stone-warm/70 font-sans mb-8">
            In welke ruimte moet het product worden gevisualiseerd?
          </p>
          <RoomSelector selectedRoom={selectedRoom} onSelect={handleRoomSelect} />
        </div>

        {/* === GENEREER KNOP === */}
        <div className={`mb-16 transition-all duration-500 ${!canGenerate ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          {/* Summary bar */}
          {canGenerate && (
            <div className="bg-white border border-cream-200 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <img src={selectedProduct!.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg" />
                <div>
                  <p className="text-xs text-stone-warm/50 font-sans">Product</p>
                  <p className="text-sm text-stone-deep font-sans font-medium">{selectedProduct!.name}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-cream-200 hidden sm:block" />
              <div>
                <p className="text-xs text-stone-warm/50 font-sans">Stijl</p>
                <p className="text-sm text-stone-deep font-sans font-medium">{selectedStyle!.emoji} {selectedStyle!.name}</p>
              </div>
              <div className="w-px h-8 bg-cream-200 hidden sm:block" />
              <div>
                <p className="text-xs text-stone-warm/50 font-sans">Kamer</p>
                <p className="text-sm text-stone-deep font-sans font-medium capitalize">{selectedRoom}</p>
              </div>
              <div className="sm:ml-auto">
                <span className="text-xs text-sage-dark bg-sage/15 px-2.5 py-1 rounded-full font-sans">Klaar om te genereren</span>
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full sm:w-auto min-w-64 flex items-center justify-center gap-3 bg-stone-warm text-cream-50 font-sans font-medium py-5 px-10 rounded-2xl hover:bg-stone-mid transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-stone-warm/25 hover:scale-[1.01] text-base"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI genereert kamerimpressie...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Genereer kamerimpressie
              </>
            )}
          </button>

          {/* Loading state visual */}
          {isGenerating && (
            <div className="mt-8 rounded-3xl overflow-hidden">
              <div className="shimmer-bg aspect-[16/9] rounded-3xl" />
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="shimmer-bg h-40 rounded-2xl" />
                <div className="shimmer-bg h-40 rounded-2xl" />
              </div>
              <p className="text-center text-sm text-stone-warm/60 font-sans mt-4">
                🎨 AI stelt jouw kamerimpressie samen...
              </p>
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-sans font-medium text-red-700">Oeps, er ging iets mis</p>
              <p className="text-xs text-red-600/80 font-sans mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* === RESULTAAT === */}
        <div ref={resultRef}>
          {generationResult && selectedProduct && selectedStyle && selectedRoom && (
            <div>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Resultaat</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Jouw kamerimpressie</h2>
              </div>
              <GeneratedResult
                imageUrl={generationResult.imageUrl}
                product={selectedProduct}
                style={selectedStyle}
                room={selectedRoom}
                isFallback={generationResult.isFallback}
                onRegenerate={handleRegenerate}
                onLeadCapture={() => setShowLeadModal(true)}
              />
            </div>
          )}
        </div>
      </section>

      {/* ===== FOR BUSINESS SECTION ===== */}
      <section id="for-business" className="bg-stone-deep text-cream-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-cream-50/10 text-cream-200 text-xs font-sans font-medium px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Zakelijke kansen
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream-50 mb-4">
              RoomStyle AI voor uw bedrijf
            </h2>
            <p className="text-cream-300/70 font-sans font-light max-w-xl mx-auto">
              Van woonwinkels tot interieurstylisten: verhoog conversie en klantbeleving met AI-gedreven visualisatie.
            </p>
          </div>

          {/* Target groups */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                emoji: '🏪',
                title: 'Voor woonwinkels',
                desc: 'Geef klanten de mogelijkheid om uw producten in hun eigen stijl te visualiseren, direct op uw webshop of in-store.',
                cta: 'Integreer in uw webshop',
              },
              {
                emoji: '🎨',
                title: 'Voor interieurstylisten',
                desc: 'Presenteer moodboards en stijlkeuzes razendsnel aan klanten. Verras met AI-gegenereerde impressies als creatieve inspiratie.',
                cta: 'Gebruik als presentatietool',
              },
              {
                emoji: '🏠',
                title: 'Voor consumenten',
                desc: 'Eindig met teleurstellende aankopen. Visualiseer meubels in uw eigen stijl vóórdat u koopt — kosteloos en direct.',
                cta: 'Probeer het gratis',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <span className="text-3xl mb-4 block">{item.emoji}</span>
                <h3 className="font-serif text-xl text-cream-50 mb-3">{item.title}</h3>
                <p className="text-cream-300/70 font-sans text-sm leading-relaxed mb-5">{item.desc}</p>
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="text-stone-warm border border-stone-warm/40 hover:bg-stone-warm/10 text-sm font-sans font-medium px-4 py-2 rounded-xl transition-colors"
                >
                  {item.cta} →
                </button>
              </div>
            ))}
          </div>

          {/* 3 voordelen */}
          <div className="border-t border-white/10 pt-14">
            <h3 className="text-center font-serif text-2xl text-cream-200 mb-10">Drie bewezen voordelen</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'Meer koopzekerheid',
                  desc: 'Klanten die een product in hun gewenste stijl zien, kopen met meer vertrouwen. Minder twijfel, minder retourzendingen.',
                },
                {
                  num: '02',
                  title: 'Hogere conversie',
                  desc: 'Visuele AI-inspiratie vergroot betrokkenheid en tijd-op-site. Leads die de tool gebruiken converteren 3× beter.',
                },
                {
                  num: '03',
                  title: 'Inspiratie met echte producten',
                  desc: 'Anders dan Pinterest: uw klanten zien uw producten, in de stijl die bij hen past. Merkgebonden, commercieel effectief.',
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-5">
                  <span className="font-serif text-5xl text-white/10 leading-none flex-shrink-0 mt-1">{item.num}</span>
                  <div>
                    <h4 className="font-serif text-lg text-cream-100 mb-2">{item.title}</h4>
                    <p className="text-cream-300/60 font-sans text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-cream-100 border-t border-cream-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-stone-warm rounded flex items-center justify-center">
              <span className="text-cream-50 text-xs font-serif">R</span>
            </div>
            <span className="font-serif text-stone-warm text-base">RoomStyle AI</span>
          </div>
          <p className="text-xs text-stone-warm/50 font-sans">
            © 2024 RoomStyle AI — AI-gedreven interieurvisualisatie
          </p>
          <button
            onClick={() => setShowLeadModal(true)}
            className="text-xs text-stone-warm/60 font-sans hover:text-stone-warm transition-colors"
          >
            Neem contact op
          </button>
        </div>
      </footer>

      {/* ===== LEAD MODAL ===== */}
      <LeadModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        product={selectedProduct}
        style={selectedStyle}
      />
    </div>
  )
}
