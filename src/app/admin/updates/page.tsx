'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  X,
  CheckCircle2,
  RefreshCw,
  Newspaper,
  Save,
  Package,
  Mail,
  ShieldAlert,
  Upload
} from 'lucide-react'

interface UpdatePost {
  id: string
  title: string
  date: string
  image: string
  slug: string
}

export default function AdminUpdatesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [posts, setPosts] = useState<UpdatePost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editPost, setEditPost] = useState<UpdatePost | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [formTitle, setFormTitle] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formImage, setFormImage] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)

  const compressImage = (file: File): Promise<Blob | File> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(file)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          const MAX_WIDTH = 1000
          const MAX_HEIGHT = 1000

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  })
                  resolve(compressedFile)
                } else {
                  resolve(file)
                }
              },
              'image/jpeg',
              0.75
            )
          } else {
            resolve(file)
          }
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')
    setSuccessMsg('')

    try {
      const compressedFile = await compressImage(file)
      const formData = new FormData()
      formData.append('file', compressedFile)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (res.ok && data.url) {
        setFormImage(data.url)
      } else {
        setError(data.error || 'Failed to upload image')
      }
    } catch {
      setError('Network error while uploading image')
    } finally {
      setUploadingImage(false)
    }
  }

  const fetchUpdates = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/updates')
      if (res.ok) {
        const data = await res.json()
        setPosts(data.updates || [])
      }
    } catch {
      setError('Failed to fetch updates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/')
      } else {
        fetchUpdates()
      }
    }
  }, [user, authLoading, router])

  const handleOpenAdd = () => {
    setFormTitle('')
    setFormDate(new Date().toISOString().split('T')[0])
    setFormImage('https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg')
    setError('')
    setSuccessMsg('')
    setIsAddOpen(true)
  }

  const handleOpenEdit = (post: UpdatePost) => {
    setEditPost(post)
    setFormTitle(post.title)
    setFormDate(post.date)
    setFormImage(post.image)
    setError('')
    setSuccessMsg('')
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          date: formDate,
          image: formImage
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to add update')
        return
      }

      setPosts((prev) => [data.update, ...prev])
      setSuccessMsg('Update post created successfully!')
      setTimeout(() => {
        setIsAddOpen(false)
        setSuccessMsg('')
      }, 1000)
    } catch {
      setError('Network error saving post')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editPost) return

    setError('')
    setSuccessMsg('')
    setSubmitting(true)

    try {
      const res = await fetch(`/api/updates/${editPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          date: formDate,
          image: formImage
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to update post')
        return
      }

      setPosts((prev) => prev.map((p) => (p.id === editPost.id ? data.update : p)))
      setSuccessMsg('Update post updated successfully!')
      setTimeout(() => {
        setEditPost(null)
        setSuccessMsg('')
      }, 1000)
    } catch {
      setError('Network error saving post')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete update: "${title}"?`)) return

    try {
      setPosts((prev) => prev.filter((p) => p.id !== id))
      await fetch(`/api/updates/${id}`, { method: 'DELETE' })
    } catch {
      console.error('Delete request failed')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 flex flex-col items-center justify-center text-blue-900 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Updates Manager...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-20 lg:pt-24 pb-16">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-10 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/orders"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#122f87] shadow-sm">
                <Newspaper className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900">Engineering Updates Manager</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish technical insights and announcements directly to the homepage updates feed.
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
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Mail Setup
              </Link>
              <button
                onClick={fetchUpdates}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                title="Refresh Updates"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10"
              >
                <Plus className="w-4 h-4" />
                Add Update
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Updates Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
              Create your first news update or engineering article to show on the homepage.
            </p>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#122f87] text-white font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              <Plus className="w-4 h-4" /> Create Update
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-450 font-bold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {post.date}
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">{post.title}</h3>
                    <p className="text-[10px] font-mono text-slate-400 mt-2">Slug: {post.slug}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-2 bg-slate-200/60 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    title="Edit Update"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg transition-colors border border-red-100"
                    title="Delete Update"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Update Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#122f87]" /> Add New Engineering Update
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-650 text-xs font-bold rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Advancements in Bearing Materials"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Publish Date *</label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Cover Image *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold font-mono"
                  />
                  <label className="cursor-pointer shrink-0 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm text-center">
                    <Upload className="w-4 h-4 text-slate-500" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                {submitting ? 'Publishing...' : 'Publish Update'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Update Modal */}
      {editPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setEditPost(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#122f87]" /> Edit Engineering Update
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-205 text-red-650 text-xs font-bold rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Publish Date *</label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Cover Image *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold font-mono"
                  />
                  <label className="cursor-pointer shrink-0 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm text-center">
                    <Upload className="w-4 h-4 text-slate-500" />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                {submitting ? 'Saving Changes...' : 'Save & Update Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
