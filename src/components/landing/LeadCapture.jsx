import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Send, Loader2, CheckCircle } from 'lucide-react'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidMobile(mobile) {
  const digits = mobile.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export function LeadCapture({ onSubmit, status = 'idle' }) {
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ mobile: false, email: false })

  const mobileError = touched.mobile && !isValidMobile(mobile)
  const emailError = touched.email && !isValidEmail(email)
  const canSubmit = isValidMobile(mobile) && isValidEmail(email) && status !== 'submitting'

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ mobile: true, email: true })
    if (!canSubmit) return
    onSubmit?.({ mobile, email })
  }

  if (status === 'submitted') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-green-500/10 p-5 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle size={24} className="text-green-500" />
        </div>
        <span className="font-sans text-sm font-bold text-white md:text-base">
          We received your details!
        </span>
        <span className="font-mono text-xs text-gray-400">
          The Prigenix team will reach out shortly.
        </span>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl bg-[#252a2d] p-4"
    >
      <div className="mb-1 flex items-center gap-2 font-sans text-sm font-bold text-white">
        <Send size={16} className="text-accent" />
        Get started
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 rounded-xl bg-[#1a1d20] px-3 py-2.5 ring-1 ring-white/5 focus-within:ring-accent/50">
          <Phone size={16} className="text-gray-500" />
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
            placeholder="Mobile number"
            className="flex-1 bg-transparent font-mono text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none"
          />
        </div>
        {mobileError && (
          <span className="ml-1 font-mono text-[10px] text-accent">
            Please enter a valid mobile number.
          </span>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 rounded-xl bg-[#1a1d20] px-3 py-2.5 ring-1 ring-white/5 focus-within:ring-accent/50">
          <Mail size={16} className="text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="Email address"
            className="flex-1 bg-transparent font-mono text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none"
          />
        </div>
        {emailError && (
          <span className="ml-1 font-mono text-[10px] text-accent">
            Please enter a valid email address.
          </span>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.02 } : {}}
        whileTap={canSubmit ? { scale: 0.98 } : {}}
        className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-sans text-sm font-bold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send my details
          </>
        )}
      </motion.button>
    </motion.form>
  )
}
