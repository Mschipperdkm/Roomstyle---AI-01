import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'
import { getStyleById } from '@/lib/styles'
import { generateInteriorPrompt, fallbackImages, RoomType } from '@/lib/generatePrompt'

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

    // ======================================================
    // INTEGRATIE PUNT: Vervang dit blok met echte OpenAI DALL-E 3 call
    // Uncomment de onderstaande code zodra OPENAI_API_KEY beschikbaar is:
    //
    // import OpenAI from 'openai'
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    // const response = await openai.images.generate({
    //   model: 'dall-e-3',
    //   prompt,
    //   n: 1,
    //   size: '1792x1024',
    //   quality: 'hd',
    //   style: 'vivid',
    // })
    // const imageUrl = response.data[0].url
    // ======================================================

    // Fallback: gebruik placeholder afbeeldingen per stijl/kamer
    const useFallback = !process.env.OPENAI_API_KEY

    if (useFallback) {
      // Simuleer een loading vertraging voor demo doeleinden
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const imageUrl = fallbackImages[styleId]?.[room] || fallbackImages['japandi']['woonkamer']
      return NextResponse.json({ imageUrl, prompt, isFallback: true })
    }

    // Echte OpenAI call
    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.images.generate({
      model: (process.env.OPENAI_IMAGE_MODEL as 'dall-e-3') || 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
    })

    const imageUrl = response.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('Geen afbeelding ontvangen van OpenAI')
    }

    return NextResponse.json({ imageUrl, prompt, isFallback: false })
  } catch (error) {
    console.error('[generate] Error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het genereren. Probeer het opnieuw.' },
      { status: 500 }
    )
  }
}
