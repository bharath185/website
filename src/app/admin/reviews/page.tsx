"use client"

import React, { useState, useEffect } from "react"
import { Star, Trash2, CheckCircle, XCircle, Loader2, MessageSquare, AlertCircle } from "lucide-react"

interface Review {
  id: string
  productId: string
  name: string
  email: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
  product: {
    name: string
    slug: string
  }
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/reviews")
      if (res.ok) {
        const data = await res.json()
        setReviews(data)
      }
    } catch (err) {
      console.error("Error loading reviews:", err)
    } finally {
      setLoading(false)
    }
  }

  // Approve or Unapprove a review
  const handleToggleApprove = async (review: Review) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: review.id,
          isApproved: !review.isApproved
        })
      })

      if (res.ok) {
        // Optimistically update status local state
        setReviews(prev => prev.map(r => r.id === review.id ? { ...r, isApproved: !r.isApproved } : r))
      }
    } catch (err) {
      console.error("Failed to moderate review:", err)
    }
  }

  // Delete a review
  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer review permanently?")) return

    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== id))
      }
    } catch (err) {
      console.error("Failed to delete review:", err)
    }
  }

  // Star rendering helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3.5 h-3.5 ${
              s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Detail Header HUD */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Reviews Moderation Center</h2>
        <p className="text-xs text-slate-500 mt-1">Verify dynamic star ratings and testimonials submitted by customers before publishing them to product pages.</p>
      </div>

      {/* Main Reviews moderation block */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <Loader2 className="animate-spin h-7 w-7 text-blue-650" />
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Syncing reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">No Reviews Submitted</h3>
            <p className="text-xs text-slate-500 mt-1">Submitted product ratings from customer detail views will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Product Name */}
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 block truncate max-w-[160px]">{review.product?.name || "Unknown Product"}</span>
                      <a 
                        href={`/products/${review.product?.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#122f87] hover:underline font-mono"
                      >
                        View Details Page
                      </a>
                    </td>

                    {/* Customer details */}
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 block">{review.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{review.email}</span>
                      <span className="text-[9px] text-slate-400 font-mono block mt-1">
                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </td>

                    {/* Rating stars */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(review.rating)}
                      <span className="text-[10px] text-slate-500 font-bold font-mono mt-1 block">
                        ({review.rating} / 5)
                      </span>
                    </td>

                    {/* Comment */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-slate-650 leading-relaxed font-light whitespace-normal line-clamp-3">
                        {review.comment}
                      </p>
                    </td>

                    {/* Status approved/unapproved */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleApprove(review)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          review.isApproved
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                            : "bg-amber-50 border border-amber-250 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {review.isApproved ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approved
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Pending Approval
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}
