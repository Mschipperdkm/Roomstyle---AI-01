'use client'

import { useState, useRef } from 'react'
import { products, Product, stores } from '@/lib/products'
import { styles, Style } from '@/lib/styles'
import { RoomType } from '@/lib/generatePrompt'
import { ProductCard } from '@/components/ProductCard'
import { StyleSelector } from '@/components/StyleSelector'
import { RoomSelector } from '@/components/RoomSelector'
import { GeneratedResult } from '@/components/GeneratedResult'
import { LeadModal } from '@/components/LeadModal'
import { PhotoUpload } from '@/components/PhotoUpload'

type ProductMode = 'catalog' | 'upload-product' | 'upload-room'

interface GenerationResult {
  imageUrl: string
  isFallback: boolean
}

export default function Home() {
  const [productMode, setProductMode] = useState<ProductMode>('catalog')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [uploadedProductImage, setUploadedProductImage] = useState<string | null>(null)
  const [uploadedRoomImage, setUploadedRoomImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [selectedStore, setSelectedStore] = useState<string>('Alle winkels')
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle categorieën')
  const resultRef = useRef<HTMLDivElement>(null)
  const configRef = useRef<HTMLDivElement>(null)

  const categories = ['Alle categorieën', ...Array.from(new Set(products.map(p => p.category)))]
  const storeOptions = ['Alle winkels', ...stores]

  const filteredProducts = products.filter(p => {
    const storeMatch = selectedStore === 'Alle winkels' || p.store === selectedStore
    const categoryMatch = selectedCategory === 'Alle categorieën' || p.category === selectedCategory
    return storeMatch && categoryMatch
  })

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    scrollToSection(configRef)
  }

  const canGenerate = () => {
    if (!selectedStyle || !selectedRoom) return false
    if (productMode === 'catalog') return !!selectedProduct
    if (productMode === 'upload-product') return !!uploadedProductImage
    if (productMode === 'upload-room') return !!uploadedRoomImage
    return false
  }

  const handleGenerate = async () => {
    if (!canGenerate()) return
    setIsGenerating(true)
    setError(null)
    setGenerationResult(null)

    try {
      const body: any = { styleId: selectedStyle!.id, room: selectedRoom }
      if (productMode === 'catalog') {
        body.productId = selectedProduct!.id
      } else if (productMode === 'upload-product') {
        body.uploadedImage = uploadedProductImage
        body.uploadType = 'product'
      } else if (productMode === 'upload-room') {
        body.uploadedImage = uploadedRoomImage
        body.uploadType = 'room'
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
    setSelectedProduct(null)
    setSelectedStyle(null)
    setSelectedRoom(null)
    setUploadedProductImage(null)
    setUploadedRoomImage(null)
    setProductMode('catalog')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
        .shimmer-bg { background: linear-gradient(90deg, #F0E8D8 25%, #E4D5BC 50%, #F0E8D8 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }
      `}</style>

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
            <button onClick={() => setShowLeadModal(true)} className="bg-stone-deep text-cream-50 font-sans text-sm font-medium px-4 py-2 rounded-xl hover:bg-stone-mid transition-colors">
              Interieuradvies
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-cream-50" />
          <div className="absolute top-0 right-0 w-[60%] h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #D4BC96 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            <span className="inline-block bg-stone-warm/10 text-stone-warm text-xs font-sans font-medium px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              AI Interieur Visualisatie
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-deep leading-[1.1] mb-6">
              Visualiseer meubels van<br />
              <span className="italic text-stone-warm">Leen Bakker, IKEA, Loods 5</span><br />
              met AI
            </h1>
            <p className="text-base sm:text-lg text-stone-warm/80 font-sans font-light leading-relaxed mb-10 max-w-2xl">
              Kies een product uit onze catalogus of upload je eigen foto. Zie direct hoe het eruitziet in Japandi, Hotel Chic, Scandinavisch en meer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#tool" className="inline-flex items-center justify-center gap-2 bg-stone-deep text-cream-50 font-sans font-medium px-8 py-4 rounded-2xl hover:bg-stone-mid transition-all hover:scale-[1.01] shadow-lg shadow-stone-deep/20">
                Start visualisatie
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <button onClick={() => setShowLeadModal(true)} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-cream-200 text-stone-warm font-sans font-medium px-8 py-4 rounded-2xl hover:border-stone-warm/40 hover:bg-cream-100 transition-all">
                Gratis interieuradvies
              </button>
            </div>
          </div>

          {/* Store logos */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span className="text-xs text-stone-warm/50 font-sans uppercase tracking-wider">Producten van:</span>
            {stores.map(store => (
              <span key={store} className="bg-white border border-cream-200 text-stone-warm text-sm font-sans font-medium px-4 py-2 rounded-full shadow-sm">
                {store}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="tool" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20" ref={configRef}>

        {/* STAP 1 */}
        <div className="mb-16">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Stap 1</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Kies je startpunt</h2>
          </div>
          <p className="text-sm text-stone-warm/70 font-sans mb-8">Kies een product uit onze catalogus of upload je eigen foto.</p>

          {/* Mode selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { id: 'catalog', label: 'Uit de catalogus', emoji: '🛋', desc: 'Leen Bakker, IKEA, Loods 5 en meer' },
              { id: 'upload-product', label: 'Upload een product', emoji: '📦', desc: 'Upload een foto van een meubel' },
              { id: 'upload-room', label: 'Upload je kamer', emoji: '🏠', desc: 'Visualiseer je eigen ruimte' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setProductMode(mode.id as ProductMode)}
                className={`text-left rounded-2xl p-5 border-2 transition-all ${
                  productMode === mode.id
                    ? 'border-stone-warm bg-cream-100 shadow-lg scale-[1.02]'
                    : 'border-cream-200 bg-white hover:border-cream-300 hover:shadow-md'
                }`}
              >
                <span className="text-2xl mb-2 block">{mode.emoji}</span>
                <h3 className="font-serif text-stone-deep text-base mb-1">{mode.label}</h3>
                <p className="text-xs text-stone-warm/60 font-sans">{mode.desc}</p>
              </button>
            ))}
          </div>

          {/* Catalog mode met filters */}
          {productMode === 'catalog' && (
            <div>
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div>
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="bg-white border border-cream-200 text-stone-deep font-sans text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-warm/30 cursor-pointer"
                  >
                    {storeOptions.map(store => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border border-cream-200 text-stone-deep font-sans text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-warm/30 cursor-pointer capitalize"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="capitalize">{cat}</option>
                    ))}
                  </select>
                </div>
                <span className="text-sm text-stone-warm/50 font-sans self-center">
                  {filteredProducts.length} producten
                </span>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {productMode === 'upload-product' && (
            <div className="max-w-lg">
              <PhotoUpload
                onUpload={(file, preview) => setUploadedProductImage(preview)}
                onClear={() => setUploadedProductImage(null)}
                uploadedImage={uploadedProductImage}
                label="Upload een foto van je product"
                hint="JPG, PNG of WEBP — meubel, lamp, tapijt, etc."
              />
            </div>
          )}

          {productMode === 'upload-room' && (
            <div className="max-w-lg">
              <PhotoUpload
                onUpload={(file, preview) => setUploadedRoomImage(preview)}
                onClear={() => setUploadedRoomImage(null)}
                uploadedImage={uploadedRoomImage}
                label="Upload een foto van je kamer"
                hint="JPG, PNG of WEBP — woonkamer, slaapkamer of eetkamer"
              />
            </div>
          )}
        </div>

        {/* STAP 2 */}
        <div className="mb-16">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Stap 2</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Kies een interieurstijl</h2>
          </div>
          <p className="text-sm text-stone-warm/70 font-sans mb-8">In welke sfeer wil jij het zien?</p>
          <StyleSelector styles={styles} selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
        </div>

        {/* STAP 3 */}
        <div className="mb-16">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-sans text-stone-warm/50 uppercase tracking-widest">Stap 3</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-deep">Kies een kamer</h2>
          </div>
          <p className="text-sm text-stone-warm/70 font-sans mb-8">In welke ruimte?</p>
          <RoomSelector selectedRoom={selectedRoom} onSelect={setSelectedRoom} />
        </div>

        {/* GENEREER */}
        <div className="mb-16">
          {canGenerate() && (
            <div className="bg-white border border-cream-200 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-4 shadow-sm">
              {selectedProduct && (
                <div className="flex items-center gap-3">
                  <img src={selectedProduct.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <p className="text-xs text-stone-warm/50 font-sans">Product</p>
                    <p className="text-sm text-stone-deep font-sans font-medium">{selectedProduct.name} — {selectedProduct.store}</p>
                  </div>
                </div>
              )}
              {selectedStyle && (
                <div>
                  <p className="text-xs text-stone-warm/50 font-sans">Stijl</p>
                  <p className="text-sm text-stone-deep font-sans font-medium">{selectedStyle.emoji} {selectedStyle.name}</p>
                </div>
              )}
              {selectedRoom && (
                <div>
                  <p className="text-xs text-stone-warm/50 font-sans">Kamer</p>
                  <p className="text-sm text-stone-deep font-sans font-medium capitalize">{selectedRoom}</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!canGenerate() || isGenerating}
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

          {isGenerating && (
            <div className="mt-8">
              <div className="shimmer-bg aspect-[16/9] rounded-3xl" />
              <p className="text-center text-sm text-stone-warm/60 font-sans mt-4">
                🎨 AI genereert jouw kamerimpressie... (15-30 seconden)
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-sm font-sans text-red-700">{error}</p>
          </div>
        )}

        <div ref={resultRef}>
          {generationResult && selectedStyle && selectedRoom && (
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

      <section id="for-business" className="bg-stone-deep text-cream-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream-50 mb-4">RoomStyle AI voor uw bedrijf</h2>
            <p className="text-cream-300/70 font-sans font-light max-w-xl mx-auto">Van woonwinkels tot interieurstylisten.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { emoji: '🏪', title: 'Voor woonwinkels', desc: 'Laat klanten uw producten in hun gewenste stijl visualiseren — direct in uw webshop.' },
              { emoji: '🎨', title: 'Voor interieurstylisten', desc: 'Genereer razendsnel AI-moodboards voor klantpresentaties.' },
              { emoji: '🏠', title: 'Voor consumenten', desc: 'Zie meubels van Leen Bakker, IKEA en Loods 5 in jouw gewenste stijl.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <span className="text-3xl mb-4 block">{item.emoji}</span>
                <h3 className="font-serif text-xl text-cream-50 mb-3">{item.title}</h3>
                <p className="text-cream-300/70 font-sans text-sm leading-relaxed mb-5">{item.desc}</p>
                <button onClick={() => setShowLeadModal(true)} className="text-stone-warm border border-stone-warm/40 text-sm font-sans font-medium px-4 py-2 rounded-xl transition-colors hover:bg-stone-warm/10">
                  Meer info →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-cream-100 border-t border-cream-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-stone-warm rounded flex items-center justify-center">
              <span className="text-cream-50 text-xs font-serif">R</span>
            </div>
            <span className="font-serif text-stone-warm text-base">RoomStyle AI</span>
          </div>
          <p className="text-xs text-stone-warm/50 font-sans">© 2024 RoomStyle AI</p>
          <button onClick={() => setShowLeadModal(true)} className="text-xs text-stone-warm/60 font-sans hover:text-stone-warm transition-colors">Neem contact op</button>
        </div>
      </footer>

      <LeadModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} product={selectedProduct} style={selectedStyle} />
    </div>
  )
}
