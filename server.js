import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Proxy /api/ai to OpenCode API (keeps API key server-side)
app.post('/api/ai', async (req, res) => {
  const apiKey = process.env.OPENCODE_API_KEY
  const apiUrl = process.env.OPENCODE_API_URL || 'https://opencode.ai/zen/go/v1/chat/completions'

  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API configuration missing' } })
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(502).json({ error: { message: 'Upstream request failed' } })
  }
})

// Serve static files from dist/
app.use(express.static(join(__dirname, 'dist')))

// SPA fallback: all non-API routes serve index.html
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Prigenix running on port ${PORT}`)
})
