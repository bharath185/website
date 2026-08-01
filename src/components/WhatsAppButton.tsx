"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phone = "919530208882"
  const message = encodeURIComponent("Hello! I would like to enquire about your products and services.")
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 w-12 h-12 lg:w-14 lg:h-14 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 hover:shadow-emerald-500/25 hover:shadow-xl transition-all flex items-center justify-center print:hidden"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7" />
    </a>
  )
}
