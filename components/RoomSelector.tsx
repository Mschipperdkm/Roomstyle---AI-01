'use client'

import { RoomType, rooms } from '@/lib/generatePrompt'

interface RoomSelectorProps {
  selectedRoom: RoomType | null
  onSelect: (room: RoomType) => void
}

export function RoomSelector({ selectedRoom, onSelect }: RoomSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {rooms.map((room) => {
        const isSelected = selectedRoom === room.id
        return (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={`group relative text-left rounded-2xl p-6 transition-all duration-300 border-2 ${
              isSelected
                ? 'border-stone-warm bg-cream-100 shadow-lg scale-[1.02]'
                : 'border-cream-200 bg-white hover:border-cream-300 hover:shadow-md hover:scale-[1.01]'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl">{room.emoji}</span>
              <div>
                <h3 className="font-serif text-stone-deep text-lg mb-1">{room.name}</h3>
                <p className="text-xs text-stone-warm/70 font-sans leading-relaxed">
                  {room.description}
                </p>
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-stone-warm rounded-full flex items-center justify-center shadow-sm">
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
