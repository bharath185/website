'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { X, Lock, Mail, User as UserIcon, Phone, KeyRound, ShieldAlert } from 'lucide-react'

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!isAuthModalOpen) return null

  const autofillAdmin = () => {
    setEmail('admin@bmtbharat.com')
    setPassword('Admin@123')
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-900 shadow-sm">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {authMode === 'login'
              ? 'Log in to track your machine tool orders and access admin tools'
              : 'Register to place machine tool orders and track live status'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-blue-900/20 disabled:opacity-50"
          >
            {submitting
              ? 'Processing...'
              : authMode === 'login'
              ? 'Log In'
              : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600 font-medium">
          {authMode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('')
                  setAuthMode('register')
                }}
                className="text-blue-900 hover:underline font-bold"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('')
                  setAuthMode('login')
                }}
                className="text-blue-900 hover:underline font-bold"
              >
                Log in
              </button>
            </>
          )}
        </div>

        {authMode === 'login' && (
          <button
            type="button"
            onClick={autofillAdmin}
            className="w-full mt-3 p-2.5 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Auto-fill Admin Credentials
              </span>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-900">Click to load</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 font-mono">
              Email: <span className="text-slate-900 font-bold">admin@bmtbharat.com</span> | Pass: <span className="text-slate-900 font-bold">Admin@123</span>
            </p>
          </button>
        )}
      </div>
    </div>
  )
}
