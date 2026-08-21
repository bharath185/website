import React from "react"
import IntroVideo from "@/components/v2/IntroVideo"
import V2Hero from "@/components/v2/V2Hero"
import V2About from "@/components/v2/V2About"
import V2MDProfile from "@/components/v2/V2MDProfile"
import V2ServicesShowcase from "@/components/v2/V2ServicesShowcase"
import V2Industries from "@/components/v2/V2Industries"
import V2NewProductShowcase from "@/components/v2/V2NewProductShowcase"
import V2Updates from "@/components/v2/V2Updates"
import { getPgClient } from "@/lib/pg-products"

export default async function Home() {
  let mdInfo = null
  try {
    const client = await getPgClient()
    try {
      const res = await client.query('SELECT * FROM "MDInfo" WHERE id = $1 LIMIT 1;', ['md-info'])
      if (res.rows.length > 0) {
        mdInfo = res.rows[0]
      }
    } finally {
      await client.end().catch(() => {})
    }
  } catch (err) {
    // Graceful fallback
  }

  return (
    <>
      {/* Immersive cinematic intro preloader */}
      <IntroVideo />
      
      {/* High-end sections */}
      <V2Hero />
      <V2About />
      <V2MDProfile initialData={mdInfo} />
      
      {/* Specialized Services & Capabilities showcase */}
      <V2ServicesShowcase />

      {/* Dynamic precision industries and inspection dashboard */}
      <V2Industries />
      
      {/* Interactive new product showcase */}
      <V2NewProductShowcase />
      
      {/* Scraped updates feed */}
      <V2Updates />
    </>
  )
}
