"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phone = "919945678900"
  const message = encodeURIComponent("Hello! I would like to enquire about your products and services.")
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all flex items-center justify-center print:hidden animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
