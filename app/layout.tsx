import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RoomStyle AI — Visualiseer meubels in populaire interieurstijlen',
  description:
    'Kies een product, kies een interieurstijl en zie direct hoe het eruitziet in jouw ruimte. Van Japandi tot Hotel Chic, gegenereerd door AI.',
  keywords: ['interieur', 'AI', 'visualisatie', 'meubels', 'Japandi', 'Scandinavisch', 'woonkamer'],
  openGraph: {
    title: 'RoomStyle AI',
    description: 'AI-gedreven interieurvisualisatie voor meubels',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
