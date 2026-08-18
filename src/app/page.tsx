import React from "react"
import IntroVideo from "@/components/v2/IntroVideo"
import V2Hero from "@/components/v2/V2Hero"
import V2About from "@/components/v2/V2About"
import V2MDProfile from "@/components/v2/V2MDProfile"
import V2Industries from "@/components/v2/V2Industries"
import V2NewProductShowcase from "@/components/v2/V2NewProductShowcase"
import V2Updates from "@/components/v2/V2Updates"
import { db } from "@/lib/db"

export default async function Home() {
  const mdInfo = await db.mDInfo.findUnique({
    where: { id: "md-info" }
  })

  return (
    <>
      {/* Immersive cinematic intro preloader */}
      <IntroVideo />
      
      {/* High-end sections */}
      <V2Hero />
      <V2About />
      <V2MDProfile initialData={mdInfo} />
      
      {/* Dynamic precision industries and inspection dashboard */}
      <V2Industries />
      
      {/* Interactive new product showcase */}
      <V2NewProductShowcase />
      
      {/* Scraped updates feed */}
      <V2Updates />
    </>
  )
}
