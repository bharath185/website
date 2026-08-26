"use client"

import React from "react"

export interface TicketVoucherTagProps {
  tagType?: "new_arrival" | "featured" | "top_seller" | "make_in_india" | "precision" | "custom"
  topText?: string
  mainText?: string
  sideText?: string
  className?: string
}

export default function TicketVoucherTag({
  tagType = "featured",
  topText,
  mainText,
  sideText,
  className = "",
}: TicketVoucherTagProps) {
  // Determine copy and colors based on tagType
  let defaultTop = "OFFICIAL"
  let defaultMain = "FEATURED"
  let defaultSide = "BMT"
  let mainColor = "text-[#122f87]" // BMT Royal Blue

  if (tagType === "new_arrival") {
    defaultTop = "NEW LAUNCH"
    defaultMain = "NEW ARRIVAL"
    defaultSide = "NEW"
    mainColor = "text-[#0284c7]" // Cyan / Ocean Blue
  } else if (tagType === "top_seller") {
    defaultTop = "BEST CHOICE"
    defaultMain = "TOP SELLER"
    defaultSide = "HOT"
    mainColor = "text-[#047857]" // Emerald
  } else if (tagType === "make_in_india") {
    defaultTop = "BANGALORE WORKS"
    defaultMain = "MAKE IN INDIA"
    defaultSide = "INDIA"
    mainColor = "text-[#b91c1c]" // Crimson
  } else if (tagType === "precision") {
    defaultTop = "SUB-MICRON"
    defaultMain = "PRECISION"
    defaultSide = "PRO"
    mainColor = "text-[#4338ca]" // Indigo
  }

  const resolvedTop = topText || defaultTop
  const resolvedMain = mainText || defaultMain
  const resolvedSide = sideText || defaultSide

  return (
    <div
      className={`inline-flex items-center select-none shadow-[0_3px_10px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-200 rounded-r-xl rounded-l-md overflow-hidden bg-gradient-to-r from-[#fff799] via-[#fed766] to-[#fec740] border border-amber-500/90 py-1 pl-1.5 pr-2.5 ${className}`}
      title={`${resolvedTop} • ${resolvedMain}`}
    >
      {/* Left Stub: Serrated mini border & Barcode stripes & Vertical text */}
      <div className="flex items-center gap-1 border-r-2 border-dashed border-amber-700/50 pr-2 relative">
        {/* Semi-circular notch cutouts */}
        <span className="absolute -top-[7px] -right-[5px] w-2 h-2 bg-white rounded-full border-b border-amber-600/40" />
        <span className="absolute -bottom-[7px] -right-[5px] w-2 h-2 bg-white rounded-full border-t border-amber-600/40" />

        {/* Barcode lines */}
        <div className="flex items-center gap-[1.5px] h-6 py-0.5 opacity-80 shrink-0">
          <span className="w-[2px] h-full bg-amber-950 rounded-xs" />
          <span className="w-[1px] h-full bg-amber-950 rounded-xs" />
          <span className="w-[2.5px] h-full bg-amber-950 rounded-xs" />
          <span className="w-[1px] h-full bg-amber-950 rounded-xs" />
          <span className="w-[2px] h-full bg-amber-950 rounded-xs" />
        </div>

        {/* Rotated side text */}
        <span className="text-[7px] font-black tracking-widest text-amber-950 uppercase -rotate-90 origin-center leading-none select-none py-1">
          {resolvedSide}
        </span>
      </div>

      {/* Center Main Text Area - Razor Sharp HTML Typography */}
      <div className="flex flex-col items-center justify-center px-2.5 min-w-[76px]">
        <span className="text-[7.5px] font-black tracking-wider text-amber-950 uppercase leading-none opacity-85">
          {resolvedTop}
        </span>
        <span className={`text-[11px] sm:text-[11.5px] font-black tracking-tight uppercase leading-tight drop-shadow-[0_1px_0px_rgba(255,255,255,0.9)] ${mainColor}`}>
          {resolvedMain}
        </span>
      </div>

      {/* Right Eyelet Punch Ring */}
      <div className="pl-1 flex items-center justify-center shrink-0">
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 border border-sky-700 flex items-center justify-center shadow-inner">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
        </div>
      </div>
    </div>
  )
}
