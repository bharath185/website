import { NextRequest, NextResponse } from 'next/server'

const OPENCODE_API_URL = 'https://opencode.ai/zen/go/v1/chat/completions'
const OPENCODE_API_KEY = 'sk-wHDJt5C9BNt9hDtLVL2bsOkfHz3u6ca8Xa0vBOhGl093YPescuB0S05c9BE0rCEm'

const BMT_SYSTEM_PROMPT = `
You are the Senior Technical Specialist at Bharat Machine Tools (BMT) in Bangalore, India.
Converse in a warm, concise, human-like, and expert manner. Keep replies under 3 sentences for fast communication.

STRICT DOMAIN RULE:
- Answer ONLY about Bharat Machine Tools products, CNC retrofitting, pricing, order tracking, admin portal, and Bangalore contact info.
- If asked about external topics (news, weather, sports), reply: "I am the Senior Technical Specialist for Bharat Machine Tools. How can I help you with our machinery, CNC tools, or orders today?"

PRODUCTS & DETAILS:
- Location: Bangalore Industrial Area | Phone: +91 95302 08882 | Email: sales@bmtbharat.com
- Admin Credentials: Email admin@bmtbharat.com | Password Admin@123
- CNC Spindle Assembly (₹1,85,000) | Hydrostatic Bearings (₹98,000) | Lathe Drive Ring (₹42,500)
- Mandrels & Tooling (₹1,45,000) | Helical GearBox (₹65,000) | Precision Ball Screws (₹54,000)

ROUTING CONTROL TAGS:
Append redirect tag at end if applicable:
- Products: [REDIRECT:/products]
- Contact: [REDIRECT:/contact]
- Enquiry/Cart: [REDIRECT:/enquiry]
- Orders: [REDIRECT:/orders]
- Admin: [REDIRECT:/admin/products]
`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 })
    }

    const payloadMessages = [
      { role: 'system', content: BMT_SYSTEM_PROMPT },
      ...messages.slice(-4).map((m: { sender?: string; role?: string; text?: string; content?: string }) => ({
        role: m.role || (m.sender === 'user' ? 'user' : 'assistant'),
        content: m.content || m.text || '',
      })),
    ]

    const response = await fetch(OPENCODE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENCODE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'glm-5.1',
        messages: payloadMessages,
        max_tokens: 180,
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Opencode API error:', errText)
      return NextResponse.json({ error: 'Failed to communicate with AI model' }, { status: 502 })
    }

    const data = await response.json()
    const botReply = data?.choices?.[0]?.message?.content || 'Namaste! How may I assist you with Bharat Machine Tools products today?'

    return NextResponse.json({ reply: botReply })
  } catch (error) {
    console.error('AI chat endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
