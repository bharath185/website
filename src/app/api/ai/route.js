import { NextResponse } from 'next/server'

export async function POST(request) {
  const apiKey = process.env.OPENCODE_API_KEY
  const apiUrl = process.env.OPENCODE_API_URL || 'https://opencode.ai/zen/go/v1/chat/completions'

  if (!apiKey) {
    return NextResponse.json({ error: { message: 'API configuration missing' } }, { status: 500 })
  }

  try {
    const body = await request.json()

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (err) {
    console.error('Proxy error:', err)
    return NextResponse.json({ error: { message: 'Upstream request failed' } }, { status: 502 })
  }
}
