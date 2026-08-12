import React from "react"
import V2Header from "@/components/v2/V2Header"
import V2Footer from "@/components/v2/V2Footer"

export const metadata = {
  title: "BMT V2 | Premium Precision Engineering",
  description: "Experience the next generation of Bharat Machine Tools. World-class industrial machining spindles, hydrostatic bearings, and custom high-speed rotation equipment.",
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 flex flex-col justify-between overflow-x-hidden antialiased">
      {/* Google Fonts Link */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <V2Header />
      <main className="flex-1 relative z-10 w-full">
        {children}
      </main>
      <V2Footer />
    </div>
  )
}
