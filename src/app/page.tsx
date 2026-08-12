import React from "react"
import IntroVideo from "@/components/v2/IntroVideo"
import V2Hero from "@/components/v2/V2Hero"
import V2About from "@/components/v2/V2About"
import V2Industries from "@/components/v2/V2Industries"
import V2Products from "@/components/v2/V2Products"

export default function Home() {
  return (
    <>
      {/* Immersive cinematic intro preloader */}
      <IntroVideo />
      
      {/* High-end sections */}
      <V2Hero />
      <V2About />
      
      {/* Dynamic precision industries and inspection dashboard */}
      <V2Industries />
      
      <V2Products />
    </>
  )
}
