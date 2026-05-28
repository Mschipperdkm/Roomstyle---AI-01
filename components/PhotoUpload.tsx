'use client'

import { useState, useRef } from 'react'

interface PhotoUploadProps {
  onUpload: (file: File, preview: string) => void
  onClear: () => void
  uploadedImage: string | null
  label: string
  hint: string
}

export function PhotoUpload({ onUpload, onClear, uploadedImage, label, hint }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      onUpload(file, preview)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      {!uploadedImage ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-stone-warm bg-cream-200'
              : 'border-cream-300 bg-cream-50 hover:border-stone-warm/50 hover:bg-cream-100'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-stone-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p className="font-sans font-medium text-stone-deep text-sm">{label}</p>
              <p className="font-sans text-stone-warm/60 text-xs mt-1">{hint}</p>
            </div>
            <span className="text-xs font-sans bg-cream-200 text-stone-warm px-3 py-1.5 rounded-full">
              Klik of sleep een foto hierheen
            </span>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-cream-100">
          <img
            src={uploadedImage}
            alt="Geüploade foto"
            className="w-full aspect-[4/3] object-cover"
          />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-warm rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-stone-warm text-xs font-sans px-2.5 py-1 rounded-full">
              ✓ Foto geüpload
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
