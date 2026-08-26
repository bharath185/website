"use client"

import React from "react"

export interface TicketVoucherTagProps {
  topText?: string       // e.g. "DISCOUNT", "NEW ARRIVAL", "FEATURED", "SPECIAL"
  bottomText?: string    // e.g. "25%", "HOT DEAL", "SUB-MICRON", "BESTSELLER"
  sideText?: string      // e.g. "BIG SALE", "BMT TECH", "LIMITED"
  className?: string
}

export default function TicketVoucherTag({
  topText = "DISCOUNT",
  bottomText = "25%",
  sideText = "BIG SALE",
  className = "",
}: TicketVoucherTagProps) {
  return (
    <div
      className={`inline-flex items-center select-none filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105 ${className}`}
      title={`${topText} ${bottomText}`}
    >
      <svg
        viewBox="0 0 178 72"
        className="h-8 sm:h-9 md:h-10 w-auto overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Warm Gradient for the yellow ticket */}
          <linearGradient id="ticketYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff385" />
            <stop offset="50%" stopColor="#fed766" />
            <stop offset="100%" stopColor="#fecd50" />
          </linearGradient>

          {/* Eyelet gradient ring */}
          <linearGradient id="eyeletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>

        {/* ========================================================================= */}
        {/* TICKET BACKGROUND PATH WITH SERRATED LEFT EDGE & ROUNDED RIGHT EYELET     */}
        {/* ========================================================================= */}
        <path
          d="
            M 14,3 
            L 152,3 
            A 6,6 0 0 1 158,9 
            L 158,22 
            A 14,14 0 0 1 174,36 
            A 14,14 0 0 1 158,50 
            L 158,63 
            A 6,6 0 0 1 152,69 
            L 14,69 
            A 4,4 0 0 1 10,65 
            Q 13,61 10,57 
            Q 7,53 10,49 
            Q 13,45 10,41 
            Q 7,37 10,33 
            Q 13,29 10,25 
            Q 7,21 10,17 
            Q 13,13 10,9 
            A 4,4 0 0 1 14,3 
            Z
          "
          fill="url(#ticketYellowGrad)"
          stroke="#ca8a04"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* 4 Decorative Corner dots on left serration */}
        <circle cx="16" cy="10" r="1.2" fill="#ca8a04" opacity="0.6" />
        <circle cx="21" cy="10" r="1.2" fill="#ca8a04" opacity="0.6" />
        <circle cx="26" cy="10" r="1.2" fill="#ca8a04" opacity="0.6" />
        <circle cx="16" cy="62" r="1.2" fill="#ca8a04" opacity="0.6" />
        <circle cx="21" cy="62" r="1.2" fill="#ca8a04" opacity="0.6" />
        <circle cx="26" cy="62" r="1.2" fill="#ca8a04" opacity="0.6" />

        {/* Mini Barcode Lines on the left */}
        <g fill="#451a03" opacity="0.75">
          <rect x="18" y="20" width="1.5" height="32" rx="0.5" />
          <rect x="21" y="20" width="0.8" height="32" rx="0.4" />
          <rect x="23" y="20" width="2" height="32" rx="0.5" />
          <rect x="26.5" y="20" width="1" height="32" rx="0.5" />
          <rect x="28.5" y="20" width="1.8" height="32" rx="0.5" />
        </g>

        {/* Vertical Text: "BIG SALE" / "BMT TECH" */}
        <text
          x="-36"
          y="37"
          transform="rotate(-90)"
          fill="#451a03"
          fontSize="7"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          {sideText}
        </text>

        {/* Perforated Dashed Line Divider */}
        <line
          x1="45"
          y1="5"
          x2="45"
          y2="67"
          stroke="#ca8a04"
          strokeWidth="1.2"
          strokeDasharray="2.5,2.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Semi-circular cutouts at top and bottom of perforation line */}
        <circle cx="45" cy="3" r="3.2" fill="#ffffff" />
        <circle cx="45" cy="69" r="3.2" fill="#ffffff" />

        {/* Top Text: "DISCOUNT" / "NEW ARRIVAL" / "FEATURED" */}
        <text
          x="100"
          y="27"
          fill="#1c1917"
          fontSize="12.5"
          fontWeight="900"
          fontFamily="Impact, 'Arial Black', sans-serif"
          letterSpacing="0.6"
          textAnchor="middle"
        >
          {topText.toUpperCase()}
        </text>

        {/* Bottom Main Text: "25%" / "HOT DEAL" / "SPECIAL" in Crimson Red */}
        <text
          x="100"
          y="56"
          fill="#991b1b"
          fontSize="22"
          fontWeight="900"
          fontFamily="Impact, 'Arial Black', sans-serif"
          letterSpacing="-0.5"
          textAnchor="middle"
        >
          {bottomText.toUpperCase()}
        </text>

        {/* Tag Eyelet Hole with Cyan/Turquoise Ring (Exact match to reference!) */}
        <g>
          {/* Ring */}
          <circle cx="163" cy="36" r="6" fill="url(#eyeletGrad)" stroke="#0e7490" strokeWidth="0.8" />
          {/* Hole */}
          <circle cx="163" cy="36" r="2.8" fill="#1e293b" />
          {/* Subtle string/loop */}
          <path
            d="M 166,35 C 172,32 178,34 182,32"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.8"
            strokeDasharray="1,1"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  )
}
