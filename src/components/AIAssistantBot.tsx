"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Sparkles, X, Send, RefreshCw, ChevronRight, Compass, PhoneCall, CheckCircle2, User, Phone, MessageSquare, Zap } from "lucide-react"

interface Message {
  id: string
  sender: "bot" | "user"
  text: string
  timestamp: string
  redirectUrl?: string
  isLeadForm?: boolean
  leadSubmitted?: boolean
}

// Instant 0ms knowledge matcher for common queries
function matchInstantKnowledge(text: string): { reply: string; redirect?: string; isLeadForm?: boolean } | null {
  const q = text.toLowerCase().trim()

  if (q.includes("callback") || q.includes("call back") || q.includes("request call") || q.includes("talk to engineer") || q.includes("phone number")) {
    return {
      reply: "I would be delighted to have our Senior Engineer in Bangalore call you directly! Please share your contact details below:",
      isLeadForm: true,
    }
  }

  if (q.includes("cnc") || q.includes("spindle") || q.includes("product") || q.includes("catalog") || q.includes("machine")) {
    return {
      reply: "We stock premium Machine Spindles, Bearings, Ball Screws, and drive accessories in our Bangalore warehouse. Let me direct you to our Catalogue:",
      redirect: "/products",
    }
  }

  if (q.includes("address") || q.includes("location") || q.includes("where") || q.includes("office") || q.includes("bangalore")) {
    return {
      reply: "Our main BMT corporate office and warehouse is located in Peenya Industrial Area, Bangalore. Let me direct you to our Contact page:",
      redirect: "/contact",
    }
  }

  if (q.includes("forgot") || q.includes("reset") || q.includes("password") || q.includes("change password")) {
    return {
      reply: "If you forgot your password or need a reset request, you can perform it in the login panel or the settings page. Let me direct you:",
      redirect: "/admin/settings",
    }
  }

  if (q.includes("order") || q.includes("status") || q.includes("track") || q.includes("my orders")) {
    return {
      reply: "To check your order history or track current statuses, visit the Orders panel:",
      redirect: "/orders",
    }
  }

  if (q.includes("price") || q.includes("quote") || q.includes("enquiry") || q.includes("cart")) {
    return {
      reply: "Add items to your Enquiry Cart to request a custom quotation! Directing you to the Enquiry Cart. [REDIRECT:/enquiry]",
      redirect: "/enquiry",
    }
  }

  if (q.includes("contact") || q.includes("address") || q.includes("location") || q.includes("bangalore")) {
    return {
      reply: "We are located in Bangalore Industrial Area, Karnataka. You can reach our technical team at +91 95302 08882 or sales@bmtbharat.com. Guiding you to Contact page! [REDIRECT:/contact]",
      redirect: "/contact",
    }
  }

  if (q.includes("admin") || q.includes("login") || q.includes("manage")) {
    return {
      reply: "For Admin Access, click Log In and select 'Admin Autofill' (Email: admin@bmtbharat.com / Password: Admin@123). Directing you to Admin Products Dashboard! [REDIRECT:/admin/products]",
      redirect: "/admin/products",
    }
  }

  return null
}

export default function AIAssistantBot() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname.startsWith('/v2') || pathname.startsWith('/redesign')) {
    return null
  }

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null)

  // Interactive Lead Form State
  const [leadName, setLeadName] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadReq, setLeadReq] = useState("")
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! Welcome to **Bharat Machine Tools**. 👋 I am your Senior Technical Consultant in Bangalore. How can I help you find precision machine tools, get custom CNC quotes, or track your orders today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input
    if (!textToSend.trim() || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    if (!customText) setInput("")

    // Check instant matcher
    const instantMatch = matchInstantKnowledge(textToSend)
    if (instantMatch) {
      let replyText = instantMatch.reply
      let targetRoute = instantMatch.redirect

      if (replyText.includes("[REDIRECT:")) {
        replyText = replyText.replace(/\[REDIRECT:.*?\]/g, "").trim()
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        redirectUrl: targetRoute,
        isLeadForm: instantMatch.isLeadForm,
      }

      setMessages((prev) => [...prev, botMsg])

      if (targetRoute) {
        setRedirectNotice(`Guiding you to ${targetRoute}...`)
        setTimeout(() => {
          router.push(targetRoute!)
          setTimeout(() => setRedirectNotice(null), 2000)
        }, 500)
      }
      return
    }

    // Call Fast AI API Endpoint
    setIsTyping(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      })

      if (!res.ok) throw new Error("Failed to reach AI server")

      const data = await res.json()
      let replyText = data.reply || "I am here to help you with Bharat Machine Tools products."

      let targetRoute: string | undefined
      const redirectMatch = replyText.match(/\[REDIRECT:(.*?)\]/)
      if (redirectMatch) {
        targetRoute = redirectMatch[1].trim()
        replyText = replyText.replace(/\[REDIRECT:.*?\]/g, "").trim()
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        redirectUrl: targetRoute,
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)

      if (targetRoute) {
        setRedirectNotice(`Guiding you to ${targetRoute}...`)
        setTimeout(() => {
          router.push(targetRoute!)
          setTimeout(() => setRedirectNotice(null), 2000)
        }, 500)
      }
    } catch (err) {
      console.error("AI API error:", err)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I am ready to assist you with Bharat Machine Tools products! Explore our Products or call our Bangalore team at +91 95302 08882.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMsg])
      setIsTyping(false)
    }
  }

  const handleLeadSubmit = (msgId: string) => {
    if (!leadName.trim() || !leadPhone.trim()) return

    setSubmittedLeadId(msgId)

    const confirmationMsg: Message = {
      id: Date.now().toString(),
      sender: "bot",
      text: `Thank you **${leadName}**! 🎉 Our Senior Technical Engineer in Bangalore will call you at **+91 ${leadPhone}** within 15 minutes regarding **${leadReq || 'your machinery requirements'}**.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, confirmationMsg])
    setLeadName("")
    setLeadPhone("")
    setLeadReq("")
  }

  const quickPrompts = [
    "📞 Request Technical Call Back",
    "Explore CNC Spindles & Products",
    "How to request a custom price quote?",
    "Track my order status",
  ]

  return (
    <>
      {/* Floating AI Assistant Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-full shadow-2xl hover:shadow-blue-900/40 hover:scale-105 transition-all duration-200 flex items-center justify-center border border-blue-400/40 group print:hidden"
        aria-label="Open AI Assistant"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </span>
        <div className="relative flex items-center justify-center">
          <Bot className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:rotate-12 transition-transform duration-200" />
        </div>
      </button>

      {/* Ultra-Fast Responsive AI Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 550, damping: 32 }}
            className="fixed bottom-20 right-4 lg:bottom-24 lg:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] md:w-[440px] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[590px] h-[530px] print:hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-4 text-white flex items-center justify-between border-b border-blue-800/60 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold text-white tracking-wide">BMT Technical Specialist</h3>
                    <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-extrabold rounded-md flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Live AI
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-slate-300 font-medium">Online • Technical Support</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auto Redirect Banner */}
            {redirectNotice && (
              <div className="bg-blue-900 text-white text-xs px-4 py-2 flex items-center gap-2 font-bold animate-pulse shrink-0">
                <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>{redirectNotice}</span>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-xs shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-900 text-white rounded-br-none"
                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Interactive Lead Contact Card */}
                    {msg.isLeadForm && submittedLeadId !== msg.id && (
                      <div className="mt-3 p-3 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-2 text-slate-900">
                        <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-[11px]">
                          <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
                          <span>Request Instant Technical Callback</span>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="relative flex items-center">
                            <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                            <input
                              type="text"
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              placeholder="Your Full Name *"
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-900"
                            />
                          </div>
                          <div className="relative flex items-center">
                            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                            <span className="text-[10px] font-bold text-slate-500 absolute left-7">+91</span>
                            <input
                              type="tel"
                              value={leadPhone}
                              onChange={(e) => setLeadPhone(e.target.value)}
                              placeholder="Mobile / WhatsApp *"
                              className="w-full bg-white border border-slate-200 rounded-xl pl-13 pr-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-900"
                            />
                          </div>
                          <div className="relative flex items-center">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                            <input
                              type="text"
                              value={leadReq}
                              onChange={(e) => setLeadReq(e.target.value)}
                              placeholder="Product / Requirement (Optional)"
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-900"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleLeadSubmit(msg.id)}
                          disabled={!leadName.trim() || !leadPhone.trim()}
                          className="w-full mt-1 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Submit Call Back Request</span>
                        </button>
                      </div>
                    )}

                    {msg.redirectUrl && (
                      <button
                        onClick={() => router.push(msg.redirectUrl!)}
                        className="mt-2 text-[10px] font-extrabold text-blue-700 hover:text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Compass className="w-3 h-3 text-blue-700" /> Open {msg.redirectUrl} Page
                      </button>
                    )}
                    <span
                      className={`block text-[9px] mt-1 text-right font-medium ${
                        msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 max-w-[210px] shadow-sm">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-700 animate-spin" />
                  <span className="text-[11px] font-semibold text-slate-700">Specialist replying...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length < 5 && (
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 text-[10px] font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                  >
                    {prompt} <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask BMT Specialist about machines or orders..."
                className="flex-1 bg-slate-100 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
