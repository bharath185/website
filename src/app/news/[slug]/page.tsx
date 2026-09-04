import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { newsData } from "@/data/news"
import { Calendar, ArrowLeft, Clock } from "lucide-react"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(rawSlug: string) {
  const slug = decodeURIComponent(rawSlug).trim()

  // 1. Try PostgreSQL Database
  try {
    const item = await db.updatePost.findUnique({
      where: { slug }
    })
    if (item) return item
  } catch (err) {
    // ignore DB error
  }

  // 2. Try exact match from newsData
  const staticMatch = newsData.find(n => n.slug === slug || n.id === slug)
  if (staticMatch) {
    return {
      id: staticMatch.id,
      slug: staticMatch.slug,
      title: staticMatch.title,
      description: staticMatch.description,
      content: staticMatch.content,
      image: staticMatch.image,
      date: staticMatch.date,
      createdAt: new Date(staticMatch.date),
      updatedAt: new Date(staticMatch.date)
    }
  }

  // 3. Try prefix or partial match
  const prefixMatch = newsData.find(n => n.slug.startsWith(slug) || slug.startsWith(n.slug))
  if (prefixMatch) {
    return {
      id: prefixMatch.id,
      slug: prefixMatch.slug,
      title: prefixMatch.title,
      description: prefixMatch.description,
      content: prefixMatch.content,
      image: prefixMatch.image,
      date: prefixMatch.date,
      createdAt: new Date(prefixMatch.date),
      updatedAt: new Date(prefixMatch.date)
    }
  }

  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const item = await getArticle(resolvedParams.slug)
  if (!item) {
    return { title: "Article Not Found" }
  }
  return {
    title: `${item.title} | Bharat Machine Tools Journal`,
    description: item.description,
    alternates: {
      canonical: `https://bmtbharat.com/news/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} | Bharat Machine Tools`,
      description: item.description,
      url: `https://bmtbharat.com/news/${item.slug}`,
      type: "article",
      publishedTime: item.createdAt?.toISOString?.() || undefined,
      images: [{ url: item.image, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Bharat Machine Tools`,
      description: item.description,
      images: [item.image],
    },
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const item = await getArticle(resolvedParams.slug)
  
  if (!item) {
    notFound()
  }

  const articleUrl = `https://bmtbharat.com/news/${item.slug}`
  const imageUrl = item.image.startsWith("http") ? item.image : `https://bmtbharat.com${item.image.startsWith("/") ? "" : "/"}${item.image}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${articleUrl}#article`,
        "headline": item.title,
        "description": item.description,
        "image": imageUrl,
        "datePublished": item.createdAt,
        "dateModified": item.updatedAt || item.createdAt,
        "author": {
          "@type": "Organization",
          "name": "Bharat Machine Tools",
          "url": "https://bmtbharat.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Bharat Machine Tools",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bmtbharat.com/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bmtbharat.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Journal & Updates",
            "item": "https://bmtbharat.com/news"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": item.title,
            "item": articleUrl
          }
        ]
      }
    ]
  }

  // Format Date String helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Simple paragraph and header split to render body content
  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      const trimmed = block.trim()
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="text-base font-extrabold text-slate-900 uppercase mt-8 mb-4 tracking-tight font-display border-l-2 border-blue-600 pl-3">
            {trimmed.replace("###", "").trim()}
          </h3>
        )
      } else if (trimmed.startsWith("-")) {
        const listItems = trimmed.split("\n").map(li => li.replace("-", "").trim())
        return (
          <ul key={idx} className="list-disc list-inside space-y-2.5 my-4 text-xs font-light text-slate-600 pl-2">
            {listItems.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        )
      }
      return (
        <p key={idx} className="text-xs text-slate-600 leading-relaxed font-light mb-6">
          {trimmed}
        </p>
      )
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white text-slate-800 pt-28 pb-20 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[50rem] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal &amp; News
        </Link>

        {/* Article Meta Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md text-[8px] text-blue-600">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(item.date)}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md text-[8px] text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              3 min read
            </span>
            <span className="text-slate-400">| BY BMT ENGINEERING BOARD</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight uppercase font-display mb-6">
            {item.title}
          </h1>
        </header>

        {/* Feature Image Banner */}
        <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-200/80 shadow-md p-3 mb-10">
          <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100 relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Body Content */}
        <article className="prose prose-slate max-w-none">
          {renderContent(item.content)}
        </article>

        {/* Bottom CTA Card */}
        <div className="mt-16 p-8 bg-slate-50 border border-slate-200/70 rounded-[2rem] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight font-display mb-1">
              Have Technical Queries?
            </h4>
            <p className="text-[11px] font-light text-slate-500 max-w-md leading-normal">
              Ask our specialists about custom crossed roller bearings, spindles calibration, or request-for-quotations.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="px-5 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            Contact Engineering Cell
          </Link>
        </div>

      </div>
    </div>
    </>
  )
}
