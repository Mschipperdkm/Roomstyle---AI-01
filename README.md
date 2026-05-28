# RoomStyle AI 🛋

> Visualiseer meubels in populaire interieurstijlen met AI

Een Next.js MVP die gebruikers in staat stelt meubels te visualiseren in verschillende interieurstijlen zoals Japandi, Hotel Chic, Scandinavisch, Industrieel en Organic Modern.

---

## 🚀 Snel aan de slag

```bash
# 1. Installeer dependencies
npm install

# 2. Kopieer env-bestand
cp .env.example .env.local

# 3. (Optioneel) Voeg je OpenAI API key toe in .env.local
# Zonder key gebruikt de tool mooie placeholder-afbeeldingen

# 4. Start de dev server
npm run dev

# 5. Open http://localhost:3000
```

---

## 🔑 Environment variabelen

| Variabele | Verplicht | Beschrijving |
|---|---|---|
| `OPENAI_API_KEY` | Nee | OpenAI API key voor DALL-E 3 generatie. Zonder key worden fallback placeholder-afbeeldingen gebruikt. |
| `OPENAI_IMAGE_MODEL` | Nee | Model override (standaard: `dall-e-3`) |

---

## 📁 Projectstructuur

```
roomstyle-ai/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts         # API endpoint voor AI afbeeldinggeneratie
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Hoofdpagina met volledige MVP flow
├── components/
│   ├── ProductCard.tsx          # Product selectiekaart
│   ├── StyleSelector.tsx        # Interieurstijl selector
│   ├── RoomSelector.tsx         # Kamerkeuze component
│   ├── GeneratedResult.tsx      # Resultaatweergave
│   └── LeadModal.tsx            # Lead capture formulier
├── lib/
│   ├── products.ts              # Mock productcatalogus (8 producten)
│   ├── styles.ts                # Interieurstijlen met prompt keywords
│   └── generatePrompt.ts        # AI prompt generator + fallback images
├── .env.example
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

---

## 🎨 Features

- **8 mock producten** uit de Leen Bakker stijl catalogus
- **5 interieurstijlen**: Japandi, Hotel Chic, Scandinavisch, Industrieel, Organic Modern
- **3 kamertypes**: Woonkamer, Slaapkamer, Eetkamer
- **AI generatie** via DALL-E 3 (of mooie fallback placeholders)
- **Lead capture modal** met lokale opslag + Supabase-ready
- **Responsive design** voor desktop en mobiel
- **B2B landingspagina** sectie

---

## 🔌 Integraties toevoegen

### OpenAI DALL-E 3
Voeg je API key toe aan `.env.local`:
```
OPENAI_API_KEY=sk-...
```
De app gebruikt automatisch DALL-E 3 als de key beschikbaar is.

### Supabase leads
In `components/LeadModal.tsx` staat een commentaarblok waar je Supabase kunt integreren:
```typescript
// const { error } = await supabase.from('leads').insert([leadData])
```

### Echte productfeed
Vervang `lib/products.ts` door een API call naar de Leen Bakker product feed of een andere datafeed.

---

## 🚀 Deployen naar Vercel

```bash
npx vercel
```

Of koppel je GitHub repo direct aan Vercel en voeg de `OPENAI_API_KEY` toe als environment variable.

---

## 📊 MVP Acceptatiecriteria

- [x] Product selecteren
- [x] Stijl selecteren  
- [x] Kamer selecteren
- [x] Genereer klikken met loading state
- [x] Visuele output zien
- [x] Gekozen product terugzien
- [x] Leadformulier invullen
- [x] Professionele demo-uitstraling
- [x] Schone, uitbreidbare code

---

## 🛠 Technologie

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **OpenAI SDK** (DALL-E 3)
- Vercel-ready

---

*Gebouwd als commerciële MVP voor interieur AI-visualisatie.*
