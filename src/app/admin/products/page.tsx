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
  Mail,
  Newspaper
} from 'lucide-react'
import { Product } from '@/types'
import { products as fallbackProducts } from '@/data/products'

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>(fallbackProducts)
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
  const [formImage, setFormImage] = useState('')
  const [formFeatures, setFormFeatures] = useState('')

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
      // Compress image on the client side to bypass size limits and database write sizes
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

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        if (data.products && data.products.length > 0) {
          setProducts(data.products)
        } else {
          setProducts(fallbackProducts)
        }
      } else {
        setProducts(fallbackProducts)
      }
    } catch {
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'ADMIN') {
        router.push('/')
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts()
      }
    }
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#fdfdfd] pt-28 pb-16 flex items-center justify-center text-blue-600">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  const handleOpenAdd = () => {
    setFormName('')
    setFormCategory('Machinery')
    setFormPrice('0')
    setFormShortDesc('')
    setFormDesc('')
    setFormImage('https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg')
    setFormFeatures('Precision engineered, Superior durability, High efficiency')
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
    setFormImage(p.image)
    setFormFeatures(p.features ? p.features.join(', ') : '')
    setError('')
    setSuccessMsg('')
    setShowNewCategoryInput(false)
    setNewCategoryValue('')
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccessMsg('')

    try {
      const featuresArray = formFeatures.split(',').map((f) => f.trim()).filter(Boolean)
      const newProdPayload = {
        id: `prod-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory,
        price: parseFloat(formPrice),
        shortDescription: formShortDesc || formName,
        description: formDesc || formName,
        image: formImage || 'https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg',
        features: featuresArray,
        specifications: ["High Precision", "Bangalore Made"]
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          category: formCategory,
          price: parseFloat(formPrice),
          shortDescription: formShortDesc,
          description: formDesc,
          image: formImage,
          features: featuresArray
        })
      })

      const data = await res.json()
      const addedProduct = data.product || newProdPayload

      setProducts((prev) => [addedProduct, ...prev])
      setSuccessMsg('Product added successfully!')
      setTimeout(() => {
        setIsAddOpen(false)
        setSuccessMsg('')
        setShowNewCategoryInput(false)
        setNewCategoryValue('')
      }, 1000)
    } catch {
      setError('Network error while saving product')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editProduct) return

    setSubmitting(true)
    setError('')
    setSuccessMsg('')

    try {
      const featuresArray = formFeatures.split(',').map((f) => f.trim()).filter(Boolean)
      const updatedItem: Product = {
        ...editProduct,
        name: formName,
        category: formCategory,
        price: parseFloat(formPrice),
        shortDescription: formShortDesc,
        description: formDesc,
        image: formImage,
        features: featuresArray
      }

      await fetch(`/api/products/${editProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          category: formCategory,
          price: parseFloat(formPrice),
          shortDescription: formShortDesc,
          description: formDesc,
          image: formImage,
          features: featuresArray
        })
      })

      setProducts((prev) => prev.map((p) => (p.id === editProduct.id ? updatedItem : p)))
      setSuccessMsg('Product updated successfully!')
      setTimeout(() => {
        setEditProduct(null)
        setSuccessMsg('')
        setShowNewCategoryInput(false)
        setNewCategoryValue('')
      }, 1000)
    } catch {
      setError('Network error while updating product')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      setProducts((prev) => prev.filter((p) => p.id !== id))
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
    } catch {
      console.warn('Delete request failed on server, removed locally')
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

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-20 lg:pt-24 pb-16">
      {/* Header Banner */}
      <section className="bg-[#fdfdfd] border-b border-slate-200 py-10 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/orders"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Admin Product Catalog Manager</h1>
                  <p className="text-xs text-slate-500">
                    Add new machine tools, update prices, change images, and edit descriptions across the entire site ({products.length} Products).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Mail Config
              </Link>
              <Link
                href="/admin/updates"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                <Newspaper className="w-4 h-4" />
                News
              </Link>
              <button
                onClick={fetchProducts}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                title="Refresh products"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-44 bg-slate-100 border-b border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 text-blue-700 font-extrabold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900 truncate">{product.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.shortDescription || product.description}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-lg transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Add New Machine Tool Product</h3>
            <p className="text-xs text-slate-500 mb-6">Enter product details to publish to the site catalog instantly.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMsg}
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
                  placeholder="e.g. CNC Spindle Unit"
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
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Image *</label>
                  <div className="relative border border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-2 transition-colors bg-slate-50 flex flex-col items-center justify-center min-h-[90px] h-[98px]">
                    {formImage ? (
                      <div className="relative w-full flex items-center justify-between gap-2 px-1">
                        <img 
                          src={formImage} 
                          alt="Product Preview" 
                          className="h-14 w-14 object-contain rounded border border-slate-200 bg-white" 
                        />
                        <div className="flex flex-col gap-1 items-end">
                          <label className="cursor-pointer text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-white px-2 py-1 rounded shadow-sm border border-slate-200 transition-all">
                            {uploadingImage ? 'Uploading...' : 'Change'}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingImage}
                              onChange={handleImageUpload}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormImage('')}
                            className="text-[10px] font-bold text-red-600 hover:text-red-700 bg-white px-2 py-1 rounded shadow-sm border border-slate-200 transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full py-1 text-center select-none">
                        {uploadingImage ? (
                          <>
                            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin mb-1" />
                            <span className="text-[10px] text-slate-500 font-medium">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="text-[11px] text-slate-700 font-bold">Upload Image File</span>
                            <span className="text-[9px] text-slate-400">Click to select image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
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
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-xs uppercase tracking-wider"
              >
                {submitting ? 'Publishing Product...' : 'Publish Product to Catalog'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setEditProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Edit Product Details</h3>
            <p className="text-xs text-slate-500 mb-6">Updating &quot;{editProduct.name}&quot;</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMsg}
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
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Image *</label>
                  <div className="relative border border-dashed border-slate-300 hover:border-blue-500 rounded-lg p-2 transition-colors bg-slate-50 flex flex-col items-center justify-center min-h-[90px] h-[98px]">
                    {formImage ? (
                      <div className="relative w-full flex items-center justify-between gap-2 px-1">
                        <img 
                          src={formImage} 
                          alt="Product Preview" 
                          className="h-14 w-14 object-contain rounded border border-slate-200 bg-white" 
                        />
                        <div className="flex flex-col gap-1 items-end">
                          <label className="cursor-pointer text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-white px-2 py-1 rounded shadow-sm border border-slate-200 transition-all">
                            {uploadingImage ? 'Uploading...' : 'Change'}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingImage}
                              onChange={handleImageUpload}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormImage('')}
                            className="text-[10px] font-bold text-red-600 hover:text-red-700 bg-white px-2 py-1 rounded shadow-sm border border-slate-200 transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full py-1 text-center select-none">
                        {uploadingImage ? (
                          <>
                            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin mb-1" />
                            <span className="text-[10px] text-slate-500 font-medium">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="text-[11px] text-slate-700 font-bold">Upload Image File</span>
                            <span className="text-[9px] text-slate-400">Click to select image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
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
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 text-xs uppercase tracking-wider"
              >
                {submitting ? 'Saving Changes...' : 'Save & Publish Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
