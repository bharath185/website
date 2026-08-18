'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Mail, ShieldAlert, CheckCircle2, RefreshCw, Package, Newspaper, User, Upload, ShoppingCart, Calendar, ShieldCheck, Award, Quote, MessageSquare, UserCircle } from 'lucide-react'

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const renderBullets = (text: string) => {
    if (!text) return null
    let lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length <= 1) {
      lines = text.split(';').map(l => l.trim()).filter(Boolean)
    }
    if (lines.length <= 1) {
      lines = text.split('*').map(l => l.trim()).filter(Boolean)
    }

    if (lines.length <= 1) {
      return <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-snug">{text}</p>
    }

    return (
      <ul className="space-y-1 mt-1 text-[9.5px] text-slate-500 font-light leading-relaxed">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    )
  }

  const [activeTab, setActiveTab] = useState<'mail' | 'md' | 'social'>('mail')

  // SMTP States
  const [host, setHost] = useState('')
  const [port, setPort] = useState('587')
  const [secure, setSecure] = useState(false)
  const [smtpUser, setSmtpUser] = useState('')
  const [pass, setPass] = useState('')
  const [fromEmail, setFromEmail] = useState('')

  // MD Info States
  const [mdName, setMdName] = useState('')
  const [mdRole, setMdRole] = useState('')
  const [mdImage, setMdImage] = useState('')
  const [bio1, setBio1] = useState('')
  const [bio2, setBio2] = useState('')
  const [quote, setQuote] = useState('')
  const [quoteAuthor, setQuoteAuthor] = useState('')
  const [expTitle, setExpTitle] = useState('')
  const [expDesc, setExpDesc] = useState('')
  const [stdTitle, setStdTitle] = useState('')
  const [stdDesc, setStdDesc] = useState('')
  const [affTitle, setAffTitle] = useState('')
  const [affDesc, setAffDesc] = useState('')
  const [badgeTitle, setBadgeTitle] = useState('')
  const [badgeText, setBadgeText] = useState('')

  // Social Settings States
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [youtube, setYoutube] = useState('')
  const [twitter, setTwitter] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [socialSaving, setSocialSaving] = useState(false)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mdSaving, setMdSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [testRecipient, setTestRecipient] = useState('')
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    if (user?.email && !testRecipient) {
      setTestRecipient(user.email)
    }
  }, [user])

  const fetchConfig = async () => {
    try {
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
    }
  }

  const fetchMdConfig = async () => {
    try {
      const res = await fetch('/api/md-info')
      if (res.ok) {
        const data = await res.json()
        if (data.mdInfo) {
          setMdName(data.mdInfo.name || '')
          setMdRole(data.mdInfo.role || '')
          setMdImage(data.mdInfo.image || '')
          setBio1(data.mdInfo.bioParagraph1 || '')
          setBio2(data.mdInfo.bioParagraph2 || '')
          setQuote(data.mdInfo.quote || '')
          setQuoteAuthor(data.mdInfo.quoteAuthor || '')
          setExpTitle(data.mdInfo.expTitle || '')
          setExpDesc(data.mdInfo.expDescription || '')
          setStdTitle(data.mdInfo.stdTitle || '')
          setStdDesc(data.mdInfo.stdDescription || '')
          setAffTitle(data.mdInfo.affTitle || '')
          setAffDesc(data.mdInfo.affDescription || '')
          setBadgeTitle(data.mdInfo.badgeTitle || '')
          setBadgeText(data.mdInfo.badgeText || '')
        }
      }
    } catch {
      setError('Failed to load MD profile settings')
    }
  }

  const fetchSocialConfig = async () => {
    try {
      const res = await fetch('/api/social-settings')
      if (res.ok) {
        const data = await res.json()
        if (data.settings) {
          setFacebook(data.settings.facebook || '')
          setInstagram(data.settings.instagram || '')
          setLinkedin(data.settings.linkedin || '')
          setYoutube(data.settings.youtube || '')
          setTwitter(data.settings.twitter || '')
          setWhatsapp(data.settings.whatsapp || '')
        }
      }
    } catch {
      setError('Failed to load social settings')
    }
  }

  const loadAllConfig = async () => {
    setLoading(true)
    await Promise.all([fetchConfig(), fetchMdConfig(), fetchSocialConfig()])
    setLoading(false)
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/')
      } else {
        loadAllConfig()
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

  const handleTestConnection = async () => {
    setError('')
    setSuccessMsg('')
    setTesting(true)

    if (!host || !port || !smtpUser || !pass || !testRecipient) {
      setError('SMTP Host, Port, Username, Password, and Recipient Email are all required to run connection test.')
      setTesting(false)
      return
    }

    try {
      const res = await fetch('/api/admin/mail-config/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host,
          port: parseInt(port),
          secure,
          user: smtpUser,
          pass,
          fromEmail,
          testRecipient
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'SMTP Connection Test Failed.')
        return
      }

      setSuccessMsg(data.message || 'SMTP Connection Successful! Test email sent.')
    } catch {
      setError('Network error occurred during connection check.')
    } finally {
      setTesting(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')
    setSuccessMsg('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to upload image')
        return
      }

      setMdImage(data.url)
      setSuccessMsg('Portrait image uploaded and preview updated!')
    } catch {
      setError('Network error uploading image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleMdSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setMdSaving(true)

    try {
      const res = await fetch('/api/md-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: mdName,
          role: mdRole,
          image: mdImage,
          bioParagraph1: bio1,
          bioParagraph2: bio2,
          quote,
          quoteAuthor,
          expTitle,
          expDescription: expDesc,
          stdTitle,
          stdDescription: stdDesc,
          affTitle,
          affDescription: affDesc,
          badgeTitle,
          badgeText
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save MD Profile settings')
        return
      }

      setSuccessMsg('MD Profile settings saved successfully!')
    } catch {
      setError('Network error saving settings')
    } finally {
      setMdSaving(false)
    }
  }

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setSocialSaving(true)

    try {
      const res = await fetch('/api/social-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facebook,
          instagram,
          linkedin,
          youtube,
          twitter,
          whatsapp
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to save social settings')
        return
      }

      setSuccessMsg('Social media links saved successfully!')
    } catch {
      setError('Network error saving settings')
    } finally {
      setSocialSaving(false)
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
    <div className="space-y-6" style={{ colorScheme: 'light' }}>
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-slate-900">Application Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure mail server specifications and MD profile content directly.
        </p>
      </div>

      <div className="max-w-7xl">
        <div className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8" style={{ colorScheme: 'light' }}>
          
          {/* Tab Selector */}
          <div className="flex border-b border-slate-100 mb-8 gap-6 text-xs font-bold uppercase tracking-wider font-sans">
            <button
              onClick={() => { setActiveTab('mail'); setError(''); setSuccessMsg(''); }}
              className={`pb-3.5 transition-all relative flex items-center gap-2 font-bold cursor-pointer ${
                activeTab === 'mail'
                  ? 'text-[#122f87] border-b-2 border-[#122f87]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              Mail Settings
            </button>
            <button
              onClick={() => { setActiveTab('social'); setError(''); setSuccessMsg(''); }}
              className={`pb-3.5 transition-all relative flex items-center gap-2 font-bold cursor-pointer ${
                activeTab === 'social'
                  ? 'text-[#122f87] border-b-2 border-[#122f87]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Social Media Settings
            </button>
            <button
              onClick={() => { setActiveTab('md'); setError(''); setSuccessMsg(''); }}
              className={`pb-3.5 transition-all relative flex items-center gap-2 font-bold cursor-pointer ${
                activeTab === 'md'
                  ? 'text-[#122f87] border-b-2 border-[#122f87]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              MD Profile
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl flex items-start gap-2 animate-fadeIn">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: MAIL SETTINGS */}
          {activeTab === 'mail' && (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <h2 className="text-sm font-extrabold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
                SMTP Outgoing Server Settings
              </h2>

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
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
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
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
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
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
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
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
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
                  style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  This is displayed as the sender name/address in customer inboxes.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 text-xs">
                <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw className={`w-4 h-4 text-blue-900 ${testing ? 'animate-spin' : ''}`} />
                  Test Mail Connection
                </h3>
                <div className="flex flex-col sm:flex-row items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex-1 w-full">
                    <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1">Test Recipient Email</label>
                    <input
                      type="email"
                      value={testRecipient}
                      onChange={(e) => setTestRecipient(e.target.value)}
                      placeholder="e.g. receiver@domain.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                      style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={testing || saving}
                    onClick={handleTestConnection}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 inline-flex items-center gap-2 h-[41px] shrink-0 font-sans"
                  >
                    {testing ? 'Testing...' : 'Send Test Mail'}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 disabled:opacity-50 font-sans"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          )}

          {/* TAB: SOCIAL MEDIA SETTINGS */}
          {activeTab === 'social' && (
            <form onSubmit={handleSocialSubmit} className="space-y-5 text-xs">
              <h2 className="text-sm font-extrabold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
                Social Media Links
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Facebook URL</label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Instagram URL</label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">YouTube URL</label>
                  <input
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Twitter / X URL</label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://x.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">WhatsApp URL</label>
                  <input
                    type="url"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="https://wa.me/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                    style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#f8fafc' }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={socialSaving}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 disabled:opacity-50 font-sans"
                >
                  <Save className="w-4 h-4" />
                  {socialSaving ? 'Saving...' : 'Save Social Links'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: MD PROFILE SETTINGS */}
          {activeTab === 'md' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Settings (7 cols) */}
              <form onSubmit={handleMdSubmit} className="lg:col-span-7 space-y-6 text-xs">
                <h2 className="text-sm font-extrabold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
                  MD Biography & Leadership Section Settings
                </h2>

                {/* Identity & Portrait */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-4">
                  <h3 className="font-extrabold text-[#122f87] uppercase tracking-wider text-[10px]">1. Core Identity & Portrait</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Portrait preview and upload */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative group">
                      <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-200 bg-slate-100 mb-3 shadow-inner relative">
                        {mdImage ? (
                          <img src={mdImage} alt="MD Portrait Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                        )}
                        
                        {uploadingImage && (
                          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-white">
                            <RefreshCw className="w-6 h-6 animate-spin" />
                          </div>
                        )}
                      </div>
                      
                      <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-bold uppercase tracking-wider text-[9px] transition-all inline-flex items-center gap-1 font-sans">
                        <Upload className="w-3.5 h-3.5" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    {/* Name and Title */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">MD Full Name *</label>
                        <input
                          type="text"
                          required
                          value={mdName}
                          onChange={(e) => setMdName(e.target.value)}
                          placeholder="e.g. Mr. Abbas Khan"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                          style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Corporate Role / Designation *</label>
                        <input
                          type="text"
                          required
                          value={mdRole}
                          onChange={(e) => setMdRole(e.target.value)}
                          placeholder="e.g. Founder & Managing Director"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                          style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Copy */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-4">
                  <h3 className="font-extrabold text-[#122f87] uppercase tracking-wider text-[10px]">2. Leadership Statement Copy</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Biography Paragraph 1 *</label>
                      <textarea
                        required
                        rows={3}
                        value={bio1}
                        onChange={(e) => setBio1(e.target.value)}
                        placeholder="Enter the first paragraph welcoming users..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-normal leading-relaxed text-xs"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Biography Paragraph 2 *</label>
                      <textarea
                        required
                        rows={3}
                        value={bio2}
                        onChange={(e) => setBio2(e.target.value)}
                        placeholder="Enter the second paragraph highlighting values..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-normal leading-relaxed text-xs"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Signed Quote Block */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-4">
                  <h3 className="font-extrabold text-[#122f87] uppercase tracking-wider text-[10px]">3. Featured Pledge / Quote</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Quote Text *</label>
                      <textarea
                        required
                        rows={2}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="Enter quote message..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-medium italic text-xs"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Quote Author / Signature *</label>
                      <input
                        type="text"
                        required
                        value={quoteAuthor}
                        onChange={(e) => setQuoteAuthor(e.target.value)}
                        placeholder="e.g. Abbas Khan"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Highlights Cards and Credentials */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-4">
                  <h3 className="font-extrabold text-[#122f87] uppercase tracking-wider text-[10px]">4. Highlights Cards & Credentials (use newlines or semicolons for bullets)</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Floating badge */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Badge Title</label>
                      <input
                        type="text"
                        value={badgeTitle}
                        onChange={(e) => setBadgeTitle(e.target.value)}
                        placeholder="e.g. MD Credentials"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Badge Text / Credentials</label>
                      <input
                        type="text"
                        value={badgeText}
                        onChange={(e) => setBadgeText(e.target.value)}
                        placeholder="e.g. CMTI Panelist"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60">
                    {/* Card 1 */}
                    <div className="space-y-2 border-r border-slate-200/60 pr-2 last:border-none">
                      <span className="block font-bold text-[9px] text-[#122f87] uppercase tracking-wider">Card 1 (Experience)</span>
                      <input
                        type="text"
                        value={expTitle}
                        onChange={(e) => setExpTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold text-[10px]"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                      <textarea
                        rows={3}
                        value={expDesc}
                        onChange={(e) => setExpDesc(e.target.value)}
                        placeholder="Description (use newlines or semicolons for bullets)"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-600 text-[10px]"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>

                    {/* Card 2 */}
                    <div className="space-y-2 border-r border-slate-200/60 pr-2 last:border-none">
                      <span className="block font-bold text-[9px] text-[#122f87] uppercase tracking-wider">Card 2 (Standards)</span>
                      <input
                        type="text"
                        value={stdTitle}
                        onChange={(e) => setStdTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold text-[10px]"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                      <textarea
                        rows={3}
                        value={stdDesc}
                        onChange={(e) => setStdDesc(e.target.value)}
                        placeholder="Description (use newlines or semicolons for bullets)"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-600 text-[10px]"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>

                    {/* Card 3 */}
                    <div className="space-y-2">
                      <span className="block font-bold text-[9px] text-[#122f87] uppercase tracking-wider">Card 3 (Affiliations)</span>
                      <input
                        type="text"
                        value={affTitle}
                        onChange={(e) => setAffTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold text-[10px]"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                      <textarea
                        rows={3}
                        value={affDesc}
                        onChange={(e) => setAffDesc(e.target.value)}
                        placeholder="Description (use newlines or semicolons for bullets)"
                        className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-600 text-[10px]"
                        style={{ colorScheme: 'light', color: '#0f172a', backgroundColor: '#ffffff' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={mdSaving || uploadingImage}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 disabled:opacity-50 font-sans"
                  >
                    <Save className="w-4 h-4" />
                    {mdSaving ? 'Saving...' : 'Save MD Profile Settings'}
                  </button>
                </div>
              </form>

              {/* Right Column: Live Preview Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28 bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Profile Preview
                  </h3>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">Device Render</span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Miniature MD profile mock card matching V2MDProfile */}
                  <div className="p-5 space-y-5">
                    
                    {/* Header profile info */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        {mdImage ? (
                          <img src={mdImage} alt="Portrait" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-350 text-[9px] font-mono">No Image</div>
                        )}
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-blue-600 uppercase tracking-widest block font-bold">
                          {badgeTitle || "MD Credentials"} : {badgeText || "CMTI Panelist"}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 uppercase mt-0.5 leading-tight">{mdName || "Mr. Abbas Khan"}</h4>
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">{mdRole || "Founder & Managing Director"}</p>
                      </div>
                    </div>

                    {/* Bio paragraph paragraphs */}
                    <div className="text-[10px] text-slate-500 leading-relaxed font-light space-y-2">
                      <p className="line-clamp-3">{bio1 || "Welcome paragraph copy..."}</p>
                      <p className="line-clamp-3">{bio2 || "Secondary values copy..."}</p>
                    </div>

                    {/* Quote Pledge Card */}
                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl relative">
                      <Quote className="absolute top-2 right-2 w-6 h-6 text-slate-250 pointer-events-none" />
                      <p className="text-slate-800 text-[9.5px] italic leading-normal pr-6">
                        “{quote || "Precision is our corporate culture."}”
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-[8px] font-mono text-slate-450 uppercase font-bold">
                        <span>— BMT LEADERSHIP PLEDGE</span>
                        <span className="text-slate-600 font-bold">{quoteAuthor || "Mr. Abbas Khan"}</span>
                      </div>
                    </div>

                    {/* Mini credentials grid with dot bullet lists */}
                    <div className="space-y-3 pt-2">
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <h5 className="text-[9px] font-bold text-slate-900 uppercase tracking-wider font-mono">{expTitle || "Experience"}</h5>
                        </div>
                        {renderBullets(expDesc)}
                      </div>

                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <h5 className="text-[9px] font-bold text-slate-900 uppercase tracking-wider font-mono">{stdTitle || "Standards"}</h5>
                        </div>
                        {renderBullets(stdDesc)}
                      </div>

                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <h5 className="text-[9px] font-bold text-slate-900 uppercase tracking-wider font-mono">{affTitle || "Affiliations"}</h5>
                        </div>
                        {renderBullets(affDesc)}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
