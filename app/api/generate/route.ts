import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'
import { getStyleById } from '@/lib/styles'
import { generateInteriorPrompt, RoomType } from '@/lib/generatePrompt'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, styleId, room } = body as {
      productId: string
      styleId: string
      room: RoomType
    }

    if (!productId || !styleId || !room) {
      return NextResponse.json({ error: 'productId, styleId en room zijn verplicht' }, { status: 400 })
    }

    const product = getProductById(productId)
    const style = getStyleById(styleId)

    if (!product || !style) {
      return NextResponse.json({ error: 'Ongeldig product of stijl' }, { status: 404 })
    }

    const prompt = generateInteriorPrompt(product, style, room)

    // Gebruik Pollinations.ai — volledig gratis, geen API key nodig
    const encodedPrompt = encodeURIComponent(prompt)
    const seed = Math.floor(Math.random() * 1000000)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&seed=${seed}&nologo=true`

    return NextResponse.json({ imageUrl, prompt, isFallback: false })

  } catch (error) {
    console.error('[generate] Error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het genereren. Probeer het opnieuw.' },
      { status: 500 }
    )
  }
}
