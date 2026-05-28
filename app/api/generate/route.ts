import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'
import { getStyleById } from '@/lib/styles'
import { generateInteriorPrompt, RoomType } from '@/lib/generatePrompt'
import { Style } from '@/lib/styles'

function generateUploadPrompt(style: Style, room: RoomType, uploadType: 'product' | 'room'): string {
  const keywordsText = style.promptKeywords.join(', ')
  if (uploadType === 'product') {
    return (
      `Create a stunning photorealistic interior design render of a ${room} in ${style.name} style. ` +
      `The room should prominently feature the uploaded product as the hero piece. ` +
      `The overall aesthetic should embody: ${keywordsText}. ` +
      `Composition: wide-angle architectural photography perspective, balanced and harmonious layout. ` +
      `Lighting: warm, natural, professional interior photography lighting with soft shadows. ` +
      `Quality: high-end ecommerce interior inspiration image, magazine-worthy, photorealistic render. ` +
      `No people, no text overlays, no logos, no watermarks.`
    )
  } else {
    return (
      `Transform this room into a ${style.name} style interior. ` +
      `Redesign the space with: ${keywordsText}. ` +
      `Keep the same room layout and proportions but apply the ${style.name} aesthetic throughout. ` +
      `Lighting: warm, natural, professional interior photography. ` +
      `Quality: high-end interior inspiration image, photorealistic, magazine-worthy. ` +
      `No people, no text overlays, no logos.`
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, styleId, room, uploadedImage, uploadType } = body as {
      productId?: string
      styleId: string
      room: RoomType
      uploadedImage?: string
      uploadType?: 'product' | 'room'
    }

    if (!styleId || !room) {
      return NextResponse.json({ error: 'styleId en room zijn verplicht' }, { status: 400 })
    }

    const style = getStyleById(styleId)
    if (!style) {
      return NextResponse.json({ error: 'Ongeldige stijl' }, { status: 404 })
    }

    let prompt: string

    if (uploadedImage && uploadType) {
      prompt = generateUploadPrompt(style, room, uploadType)
    } else if (productId) {
      const product = getProductById(productId)
      if (!product) {
        return NextResponse.json({ error: 'Ongeldig product' }, { status: 404 })
      }
      prompt = generateInteriorPrompt(product, style, room)
    } else {
      return NextResponse.json({ error: 'Kies een product of upload een foto' }, { status: 400 })
    }

    // Pollinations.ai met Flux model — gratis, betere kwaliteit
    const encodedPrompt = encodeURIComponent(prompt)
    const seed = Math.floor(Math.random() * 1000000)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1024&height=768&seed=${seed}&nologo=true`

    return NextResponse.json({ imageUrl, prompt, isFallback: false })

  } catch (error) {
    console.error('[generate] Error:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het genereren. Probeer het opnieuw.' },
      { status: 500 }
    )
  }
}
