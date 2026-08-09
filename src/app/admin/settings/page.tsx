'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Mail, ShieldAlert, CheckCircle2, RefreshCw, Package, Newspaper } from 'lucide-react'

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [host, setHost] = useState('')
  const [port, setPort] = useState('587')
  const [secure, setSecure] = useState(false)
  const [smtpUser, setSmtpUser] = useState('')
  const [pass, setPass] = useState('')
  const [fromEmail, setFromEmail] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const fetchConfig = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/mail-config')
      if (res.ok) {
        const data = await res.json()
        if (data.config) {
          setHost(data.config.host || '')
          setPort((data.config.port || 587).toString())
          setSecure(!!data.config.secure)
          setSmtpUser(data.config.user || '')
          setPass(data.config.pass || '')
          setFromEmail(data.config.fromEmail || '')
        }
      }
    } catch {
      setError('Failed to load SMTP settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/')
      } else {
        fetchConfig()
      }
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setSaving(true)

    try {
      const res = await fetch('/api/admin/mail-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host,
          port: parseInt(port) || 587,
          secure,
          user: smtpUser,
          pass,
          fromEmail
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save SMTP settings')
        return
      }

      setSuccessMsg('SMTP Mail settings saved successfully!')
      if (data.config) {
        setPass(data.config.pass || '')
      }
    } catch {
      setError('Network error saving settings')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 flex flex-col items-center justify-center text-blue-900 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Settings...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-20 lg:pt-24 pb-16">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-10 mb-8 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/orders"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#122f87] shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">Mail Configuration</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set up SMTP parameters to send reset links, default temporary passwords, and enquiry updates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/products"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                <Package className="w-4 h-4" />
                Products
              </Link>
              <Link
                href="/admin/updates"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                <Newspaper className="w-4 h-4" />
                News
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Mail className="w-5 h-5 text-[#122f87]" />
            SMTP Outgoing Server Settings
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-650 text-xs font-bold rounded-2xl flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-250 text-emerald-700 text-xs font-bold rounded-2xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">SMTP Host *</label>
                <input
                  type="text"
                  required
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="smtp.gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">SMTP Port *</label>
                <input
                  type="number"
                  required
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="587"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="secure"
                checked={secure}
                onChange={(e) => setSecure(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="secure" className="font-bold text-slate-700 uppercase tracking-wider select-none cursor-pointer">
                Use Secure Connection (SSL/TLS - Port 465)
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">SMTP Username *</label>
                <input
                  type="text"
                  required
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  placeholder="sender@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">SMTP Password *</label>
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Sender From Email *</label>
              <input
                type="email"
                required
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder="BMT Support <sender@domain.com>"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
              />
              <p className="text-[10px] text-slate-450 mt-1">
                This is displayed as the sender name/address in customer inboxes.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
