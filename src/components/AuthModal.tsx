'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { X, Lock, Mail, User as UserIcon, Phone, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react'

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register, checkUser, user } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [devTempPassword, setDevTempPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!isAuthModalOpen) return null

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setDevTempPassword('')
    setSubmitting(true)

    try {
      if (authMode === 'login') {
        const res = await login(email, password)
        if (!res.success) {
          setError(res.error || 'Login failed')
        }
      } else {
        const res = await register(name, email, password, phone)
        if (!res.success) {
          setError(res.error || 'Registration failed')
        }
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setDevTempPassword('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to send temporary password')
        return
      }

      if (data.tempPassword) {
        setDevTempPassword(data.tempPassword)
        setSuccessMsg('SMTP is not configured in Admin panel. Temporary password generated in development mode!')
      } else {
        setSuccessMsg('A temporary password has been successfully sent to your email address!')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setSubmitting(true)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setSubmitting(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to update password')
        return
      }

      setSuccessMsg('Password updated successfully! Redirecting...')
      setTimeout(async () => {
        if (user) {
          user.passwordResetRequired = false
        }
        await checkUser()
        setPassword('')
        setConfirmPassword('')
        setSuccessMsg('')
        closeAuthModal()
        if (user?.role === 'ADMIN') {
          window.location.href = '/admin/products'
        }
      }, 1000)
    } catch {
      setError('Network error updating password')
    } finally {
      setSubmitting(false)
    }
  }

  const isForcedReset = authMode === 'change-password' || !!user?.passwordResetRequired

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300">
      
      {/* Background click-away dismissal layer */}
      {!isForcedReset && (
        <div className="absolute inset-0 cursor-pointer" onClick={closeAuthModal} />
      )}

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative w-full max-w-md bg-white border-t sm:border border-slate-200 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] sm:max-h-none overflow-y-auto sm:overflow-visible flex flex-col"
      >
        
        {/* iOS/Android style drag handle bar (visible on mobile only) */}
        {!isForcedReset && (
          <div 
            onClick={closeAuthModal} 
            className="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mx-auto mb-5 sm:hidden cursor-pointer shrink-0" 
            aria-label="Drag down to close"
          />
        )}

        {/* Hide Close X Button during forced password reset on desktop */}
        {!isForcedReset && (
          <button
            onClick={closeAuthModal}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all cursor-pointer hidden sm:block animate-fade-in animate-duration-200"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Logo Header */}
        <div className="flex justify-center mb-6 mt-2 shrink-0">
          <img src="/logo.png" alt="BMT Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Title Block */}
        <div className="text-center mb-6 shrink-0">
          <h2 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
            {isForcedReset
              ? 'Update Password'
              : authMode === 'login'
              ? 'Welcome Back'
              : authMode === 'register'
              ? 'Join BMT'
              : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            {isForcedReset
              ? 'For security reasons, you must change your temporary default password before continuing.'
              : authMode === 'login'
              ? 'Log in to track your machine tool orders and access partner features.'
              : authMode === 'register'
              ? 'Register to place machine tool orders and track live status.'
              : 'Enter your email address to request a temporary default password.'}
          </p>
        </div>

        {/* Sliding Pill Tab Switcher */}
        {!isForcedReset && (authMode === 'login' || authMode === 'register') && (
          <div className="flex bg-slate-105 bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200/50 shrink-0">
            <button
              type="button"
              onClick={() => {
                setError('')
                setSuccessMsg('')
                setDevTempPassword('')
                setAuthMode('login')
              }}
              className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
                authMode === 'login'
                  ? 'bg-white text-[#122f87] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setError('')
                setSuccessMsg('')
                setDevTempPassword('')
                setAuthMode('register')
              }}
              className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${
                authMode === 'register'
                  ? 'bg-white text-[#122f87] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Form elements and scrolling alerts container */}
        <div className="flex-1 overflow-y-auto sm:overflow-visible">
          {/* Alert handlers */}
          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-2xl animate-fade-in">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-start gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {devTempPassword && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl animate-fade-in">
              <span className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-1">Temporary Password</span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 select-all">{devTempPassword}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(devTempPassword)
                    alert('Temporary password copied!')
                  }}
                  className="px-3 py-1.5 bg-amber-900 hover:bg-amber-950 text-white text-[9px] font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Login or Register Form */}
          {(authMode === 'login' || authMode === 'register') && (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setError('')
                        setSuccessMsg('')
                        setDevTempPassword('')
                        setAuthMode('forgot')
                      }}
                      className="text-[10px] text-blue-900 hover:text-red-500 hover:underline font-bold transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 py-3.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-blue-900/10 hover:shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting
                  ? 'Processing...'
                  : authMode === 'login'
                  ? 'Sign In to Account'
                  : 'Create Account'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* Forgot password mode */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 py-3.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-blue-900/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? 'Generating Password...' : 'Generate Temporary Password'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError('')
                  setSuccessMsg('')
                  setDevTempPassword('')
                  setAuthMode('login')
                }}
                className="w-full p-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-900 hover:underline block transition-colors cursor-pointer"
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* Change password mode (Forced Reset) */}
          {isForcedReset && (
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 py-3.5 bg-red-750 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-red-900/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? 'Updating Password...' : 'Update Password & Continue'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>

      </motion.div>
    </div>
  )
}
