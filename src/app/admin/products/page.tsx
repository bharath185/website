'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Search,
  RefreshCw,
  X,
  CheckCircle2,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Star,
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react'
import { Product } from '@/types'
import { products as fallbackProducts } from '@/data/products'
import {
  getClientStoredProducts,
  saveClientStoredProducts,
  addClientProduct,
  updateClientProduct,
  deleteClientProduct,
  getClientDeletedIds
} from '@/lib/products-client'

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Form State
  const [formName, setFormName] = useState('')
  const [formCategory, setFormCategory] = useState('Machinery')
  const [formPrice, setFormPrice] = useState('0')
  const [formShortDesc, setFormShortDesc] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formImages, setFormImages] = useState<string[]>([])
  const [customImageUrl, setCustomImageUrl] = useState('')
  const [formFeatures, setFormFeatures] = useState('')
  const [formTag, setFormTag] = useState('')

  const [uploadingImage, setUploadingImage] = useState(false)
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const [newCategoryValue, setNewCategoryValue] = useState('')

  const categoriesList = Array.from(new Set([
    'Machinery',
    'Bearings',
    'Spindles',
    'Accessories',
    ...products.map(p => p.category)
  ]))

  const handleCategoryChange = (val: string) => {
    if (val === 'ADD_NEW') {
      setShowNewCategoryInput(true)
      setNewCategoryValue('')
      setFormCategory('')
    } else {
      setShowNewCategoryInput(false)
      setFormCategory(val)
    }
  }

  // Highly efficient client-side image compressor (converts any huge image to <= 150KB crisp JPEG)
  const compressImageToDataUrl = (src: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        const MAX_DIM = 1000
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width)
            width = MAX_DIM
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height)
            height = MAX_DIM
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, width, height)
          ctx.drawImage(img, 0, 0, width, height)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75)
          resolve(compressedDataUrl)
        } else {
          resolve(src)
        }
      }
      img.onerror = () => resolve(src)
      img.src = src
    })
  }

  const compressFile = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const rawDataUrl = e.target?.result as string
        const compressedDataUrl = await compressImageToDataUrl(rawDataUrl)

        // Convert dataUrl back to a lightweight File for uploading
        fetch(compressedDataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const newName = file.name.replace(/\.[^.]+$/, '.jpg')
            const optimizedFile = new File([blob], newName, { type: 'image/jpeg' })
            resolve(optimizedFile)
          })
          .catch(() => resolve(file))
      }
      reader.onerror = () => resolve(file)
      reader.readAsDataURL(file)
    })
  }

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    setError('')
    setSuccessMsg('')

    try {
      const fileList = Array.from(files)
      const uploadedUrls: string[] = []

      for (const file of fileList) {
        try {
          const compressedFile = await compressFile(file)
          const formData = new FormData()
          formData.append('file', compressedFile)

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          const data = await res.json().catch(() => ({}))
          if (res.ok && data.url) {
            uploadedUrls.push(data.url)
          } else {
            // Fallback to lightweight client-side compressed Data URL
            const fallbackDataUrl = await compressImageToDataUrl(URL.createObjectURL(compressedFile))
            uploadedUrls.push(fallbackDataUrl)
          }
        } catch (uploadErr) {
          console.error('Error uploading file:', file.name, uploadErr)
        }
      }

      if (uploadedUrls.length > 0) {
        setFormImages((prev) => [...prev, ...uploadedUrls])
      } else {
        setError('Failed to upload selected image files.')
      }
    } catch {
      setError('Network error while uploading images')
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  const handleAddCustomUrl = async () => {
    const trimmed = customImageUrl.trim()
    if (!trimmed) return

    let finalUrl = trimmed
    // If it's a huge base64 data string, compress it before adding to state
    if (trimmed.startsWith('data:image/')) {
      finalUrl = await compressImageToDataUrl(trimmed)
    }

    if (!formImages.includes(finalUrl)) {
      setFormImages((prev) => [...prev, finalUrl])
    }
    setCustomImageUrl('')
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const handleSetPrimaryImage = (indexToPrimary: number) => {
    setFormImages((prev) => {
      const item = prev[indexToPrimary]
      const remaining = prev.filter((_, idx) => idx !== indexToPrimary)
      return [item, ...remaining]
    })
  }

  const fetchProducts = async () => {
    try {
      // 1. Immediately load persistent local products
      const local = getClientStoredProducts()
      if (local && local.length > 0) {
        setProducts(local)
      }

      // 2. Fetch from server API and merge safely
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        if (data.products && Array.isArray(data.products)) {
          const deletedIds = getClientDeletedIds()
          const validServerProducts: Product[] = data.products.filter(
            (p: Product) => !deletedIds.has(p.id) && !deletedIds.has(p.slug)
          )

          // Merge local custom products with server products
          const mergedMap = new Map<string, Product>()
          validServerProducts.forEach((p) => mergedMap.set(p.id, p))
          local.forEach((p) => {
            if (!deletedIds.has(p.id) && !deletedIds.has(p.slug)) {
              mergedMap.set(p.id, p)
            }
          })

          const finalMerged = Array.from(mergedMap.values())
          setProducts(finalMerged)
          saveClientStoredProducts(finalMerged)
        }
      }
    } catch {
      const local = getClientStoredProducts()
      setProducts(local)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-blue-900">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const handleOpenAdd = () => {
    setFormName('')
    setFormCategory('Machinery')
    setFormPrice('0')
    setFormShortDesc('')
    setFormDesc('')
    setFormImages(['https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg'])
    setCustomImageUrl('')
    setFormFeatures('Precision engineered, Superior durability, High efficiency')
    setFormTag('')
    setError('')
    setSuccessMsg('')
    setIsAddOpen(true)
    setShowNewCategoryInput(false)
    setNewCategoryValue('')
  }

  const handleOpenEdit = (p: Product) => {
    setEditProduct(p)
    setFormName(p.name)
    setFormCategory(p.category)
    setFormPrice((p.price || 0).toString())
    setFormShortDesc(p.shortDescription)
    setFormDesc(p.description)
    
    let initialImages: string[] = []
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      initialImages = [...p.images]
    } else if (p.image) {
      initialImages = [p.image]
    }
    setFormImages(initialImages)
    setCustomImageUrl('')
    setFormFeatures(p.features ? p.features.join(', ') : '')
    setFormTag(p.tag || '')
    setError('')
    setSuccessMsg('')
    setShowNewCategoryInput(false)
    setNewCategoryValue('')
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formImages.length === 0) {
      setError('Please upload or provide at least one product image.')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccessMsg('')

    try {
      const featuresArray = formFeatures.split(',').map((f) => f.trim()).filter(Boolean)
      const primaryImage = formImages[0]

      const payload = {
        name: formName,
        category: formCategory,
        price: parseFloat(formPrice) || 0,
        shortDescription: formShortDesc || formName,
        description: formDesc || formName,
        image: primaryImage,
        images: formImages,
        features: featuresArray,
        tag: formTag || null
      }

      // 1. Submit to Server Database
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product to database. Please check permissions.')
      }

      const createdProduct: Product = data.product || {
        id: `prod-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: formCategory,
        price: parseFloat(formPrice) || 0,
        shortDescription: formShortDesc || formName,
        description: formDesc || formName,
        image: primaryImage,
        images: formImages,
        features: featuresArray,
        tag: formTag || null,
        specifications: ["High Precision", "Bangalore Made"]
      }

      // 2. Only after DB save is verified, update client state & persistent storage
      const updatedList = addClientProduct(createdProduct)
      setProducts(updatedList)

      // 3. Show verified database success notification
      setSuccessMsg('Product saved successfully to database!')
      setTimeout(() => {
        setIsAddOpen(false)
        setSuccessMsg('')
        setShowNewCategoryInput(false)
        setNewCategoryValue('')
      }, 1000)
    } catch (err: any) {
      setError(err?.message || 'Error saving product to database')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editProduct) return
    if (formImages.length === 0) {
      setError('Please upload or provide at least one product image.')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccessMsg('')

    try {
      const featuresArray = formFeatures.split(',').map((f) => f.trim()).filter(Boolean)
      const primaryImage = formImages[0]

      const payload = {
        name: formName,
        category: formCategory,
        price: parseFloat(formPrice) || 0,
        shortDescription: formShortDesc,
        description: formDesc,
        image: primaryImage,
        images: formImages,
        features: featuresArray,
        tag: formTag || null
      }

      // 1. Submit to Server Database
      const res = await fetch(`/api/products/${encodeURIComponent(editProduct.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update product in database.')
      }

      const updatedItem: Product = data.product || {
        ...editProduct,
        ...payload
      }

      // 2. Only after DB save is verified, update client state & persistent storage
      const updatedList = updateClientProduct(editProduct.id, updatedItem)
      setProducts(updatedList)

      // 3. Show verified database success notification
      setSuccessMsg('Product updated successfully in database!')
      setTimeout(() => {
        setEditProduct(null)
        setSuccessMsg('')
        setShowNewCategoryInput(false)
        setNewCategoryValue('')
      }, 1000)
    } catch (err: any) {
      setError(err?.message || 'Error while updating product in database')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return

    try {
      const res = await fetch(`/api/products/${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || 'Failed to delete product from database.')
        return
      }

      // Only after DB delete succeeds, update client state and persistent store
      const updatedList = deleteClientProduct(id)
      setProducts(updatedList)
    } catch (err: any) {
      alert(err?.message || 'Network error while deleting product.')
    }
  }

  const categories = ['ALL', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory
    const q = searchQuery.toLowerCase().trim()
    const matchesQ =
      !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchesCat && matchesQ
  })

  // Shared Multi-Image Gallery Manager Component
  const renderImageGalleryManager = () => (
    <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Product Image Gallery ({formImages.length} {formImages.length === 1 ? 'image' : 'images'})
          </label>
          <span className="text-[10px] text-slate-500 font-light">
            Upload multiple photos. The first image will be used as the primary catalogue cover.
          </span>
        </div>
        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm">
          {uploadingImage ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>+ Upload Photos</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            disabled={uploadingImage}
            onChange={handleMultipleImagesUpload}
          />
        </label>
      </div>

      {/* Uploaded Thumbnails Grid */}
      {formImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {formImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`relative group rounded-xl overflow-hidden border bg-white shadow-sm flex flex-col justify-between ${
                idx === 0 ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200'
              }`}
            >
              <div className="aspect-square relative overflow-hidden bg-slate-100 flex items-center justify-center p-1">
                <img
                  src={imgUrl}
                  alt={`Product view ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-[#122f87] text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm">
                    PRIMARY COVER
                  </span>
                )}
              </div>

              {/* Action Toolbar on Image */}
              <div className="p-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1">
                {idx !== 0 ? (
                  <button
                    type="button"
                    onClick={() => handleSetPrimaryImage(idx)}
                    className="text-[9px] font-bold text-blue-700 hover:text-blue-900 px-1.5 py-0.5 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    Make Primary
                  </button>
                ) : (
                  <span className="text-[9px] font-bold text-emerald-700 px-1.5 py-0.5">
                    Cover Image
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-red-50 cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border border-dashed border-slate-300 rounded-xl bg-white">
          <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-1" />
          <p className="text-xs text-slate-500 font-medium">No images uploaded yet</p>
          <p className="text-[10px] text-slate-400">Click &quot;+ Upload Photos&quot; above to select multiple product pictures.</p>
        </div>
      )}

      {/* Or Paste Direct Image URL */}
      <div className="pt-2 flex items-center gap-2 border-t border-slate-200/60">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="url"
            value={customImageUrl}
            onChange={(e) => setCustomImageUrl(e.target.value)}
            placeholder="Or paste direct image URL (e.g. https://.../spindle.jpg)"
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>
        <button
          type="button"
          onClick={handleAddCustomUrl}
          disabled={!customImageUrl.trim()}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Add URL
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Page Header Actions */}
      <div className="flex items-center justify-end gap-3 border-b border-slate-200 pb-5">
        <button
          onClick={fetchProducts}
          className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-colors border border-slate-200 shadow-sm cursor-pointer"
          title="Refresh products"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Main Content */}
      <div>
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or description..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const imageCount = (product.images && product.images.length > 0) ? product.images.length : 1

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-44 bg-slate-100 border-b border-slate-100 flex items-center justify-center p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 text-blue-700 font-extrabold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      {product.category}
                    </span>
                    {imageCount > 1 && (
                      <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <ImageIcon className="w-3 h-3 text-blue-300" />
                        {imageCount} Photos
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900 truncate">{product.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.shortDescription || product.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-700">
                        ₹{(product.price || 0).toLocaleString('en-IN')}
                      </span>
                      {product.tag && (
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {product.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit product"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Add New Product</h3>
            <p className="text-xs text-slate-500 mb-6">Create and publish a precision machine component to the catalogue.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Bend Checking Fixture"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={showNewCategoryInput ? 'ADD_NEW' : formCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="ADD_NEW">+ Add New Category...</option>
                  </select>
                  {showNewCategoryInput && (
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        value={newCategoryValue}
                        onChange={(e) => {
                          setNewCategoryValue(e.target.value)
                          setFormCategory(e.target.value)
                        }}
                        placeholder="Enter new category name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Base Price (INR)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                  />
                </div>
              </div>

              {/* Multi-Image Gallery Manager */}
              {renderImageGalleryManager()}

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Showcase Tag</label>
                <select
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                >
                  <option value="">Standard Catalog Item (No Badge)</option>
                  <option value="NEW_ARRIVAL">New Arrival (Highlight tag on Catalog)</option>
                  <option value="FEATURED">Featured Product (Highlight badge on Card)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Brief 1-sentence product summary"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Detailed product specifications, usage, and manufacturing details"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  placeholder="High precision, Long service life, Custom sizes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Saving to Database...' : 'Publish Product to Catalog'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setEditProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Edit Product Details</h3>
            <p className="text-xs text-slate-500 mb-6">Updating &quot;{editProduct.name}&quot;</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={showNewCategoryInput ? 'ADD_NEW' : formCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="ADD_NEW">+ Add New Category...</option>
                  </select>
                  {showNewCategoryInput && (
                    <div className="mt-2">
                      <input
                        type="text"
                        required
                        value={newCategoryValue}
                        onChange={(e) => {
                          setNewCategoryValue(e.target.value)
                          setFormCategory(e.target.value)
                        }}
                        placeholder="Enter new category name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Base Price (INR)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                  />
                </div>
              </div>

              {/* Multi-Image Gallery Manager */}
              {renderImageGalleryManager()}

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Showcase Tag</label>
                <select
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                >
                  <option value="">Standard Catalog Item (No Badge)</option>
                  <option value="NEW_ARRIVAL">New Arrival (Highlight tag on Catalog)</option>
                  <option value="FEATURED">Featured Product (Highlight badge on Card)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Updating Database...' : 'Save & Update Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
