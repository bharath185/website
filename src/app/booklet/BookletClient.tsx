'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Share2, 
  Download, 
  RotateCcw, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Grid, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Copy, 
  Check, 
  FileText, 
  Sparkles,
  ExternalLink,
  Info,
  X
} from 'lucide-react'
import jsPDF from 'jspdf'

interface BookletPage {
  id: number
  title: string
  subtitle: string
  src: string
  category: string
}

const BOOKLET_PAGES: BookletPage[] = [
  {
    id: 1,
    title: "Bharat Machine Tools Corporate Cover",
    subtitle: "Precision Spindles & Machine Tool Solutions Since 1999",
    src: "/images/company-profile/bmt_web_1.jpg",
    category: "Corporate Profile"
  },
  {
    id: 2,
    title: "Company Legacy & MD Leadership",
    subtitle: "Over 25 Years of Sub-Micron Precision Engineering",
    src: "/images/company-profile/bmt_web_2.jpg",
    category: "Introduction"
  },
  {
    id: 3,
    title: "Quality Creed & Precision Standards",
    subtitle: "Zero-Defect Philosophy & ISO 9001:2015 Traceability",
    src: "/images/company-profile/bmt_web_3.jpg",
    category: "Quality Assurance"
  },
  {
    id: 4,
    title: "Workshop Infrastructure & Machinery",
    subtitle: "State-of-the-Art Machining Bays in Bangalore",
    src: "/images/company-profile/bmt_web_4.jpg",
    category: "Facilities"
  },
  {
    id: 5,
    title: "Heavy Grinding & Large CNC Turning",
    subtitle: "Capabilities up to Ø 500 mm x 5000 mm Length",
    src: "/images/company-profile/bmt_web_5.jpg",
    category: "Machining Cell"
  },
  {
    id: 6,
    title: "Precision Internal & External Grinding",
    subtitle: "Sub-Micron Bore Grinding & Concentricity Control",
    src: "/images/company-profile/bmt_web_6.jpg",
    category: "Grinding Cell"
  },
  {
    id: 7,
    title: "Metrology, Dynamic Balancing & QA",
    subtitle: "Laser Interferometry & ISO G0.4 Balancing up to 45,000 RPM",
    src: "/images/company-profile/bmt_web_7.jpg",
    category: "Metrology"
  },
  {
    id: 8,
    title: "Spindle Manufacturing Lines",
    subtitle: "BT-30, BT-40, BT-50 & Turning Center Spindles",
    src: "/images/company-profile/bmt_web_8.jpg",
    category: "Spindles"
  },
  {
    id: 9,
    title: "Motorized & Belt-Driven Spindles",
    subtitle: "High Frequency Internal Grinding & Direct Drive Units",
    src: "/images/company-profile/bmt_web_9.jpg",
    category: "Spindles"
  },
  {
    id: 10,
    title: "CNC Rotary Tables & 4th/5th Axis",
    subtitle: "Tilting Rotary Tables & High-Torque Indexers",
    src: "/images/company-profile/bmt_web_10.jpg",
    category: "Rotary Tables"
  },
  {
    id: 11,
    title: "Precision Ball Screws & Lead Screws",
    subtitle: "Ground & Rolled Ball Screws up to Ø180 x 10 Meters",
    src: "/images/company-profile/bmt_web_11.jpg",
    category: "Ball Screws"
  },
  {
    id: 12,
    title: "Bearings, Locknuts & Transmissions",
    subtitle: "YRT Axial/Radial Bearings, Planetary Reducers & Worms",
    src: "/images/company-profile/bmt_web_12.jpg",
    category: "Power Transmission"
  },
  {
    id: 13,
    title: "Defense Actuators & Heavy Automation",
    subtitle: "9-Ton to 40-Ton Linear Actuators & Airport Frangible Masts",
    src: "/images/company-profile/bmt_web_13.jpg",
    category: "Defense OEM"
  },
  {
    id: 14,
    title: "Turnkey Machine Reconditioning",
    subtitle: "Complete Mechanical Overhaul, Scraping & Alignment",
    src: "/images/company-profile/bmt_web_14.jpg",
    category: "Reconditioning"
  },
  {
    id: 15,
    title: "Approvals, Clientele & Contact",
    subtitle: "Bangalore Production Hub & 24x7 Direct Engineering SLA",
    src: "/images/company-profile/bmt_web_15.jpg",
    category: "Back Cover"
  }
]

export default function BookletClient() {
  const [currentPage, setCurrentPage] = useState(0) // 0-indexed: 0 is Cover
  const [isSpreadMode, setIsSpreadMode] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const flipAudioContextRef = useRef<AudioContext | null>(null)

  // Detect Mobile Viewport for Single-Page Mode
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setIsSpreadMode(!isMobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Web Audio Synthesized Page Turn Sound Effect
  const playPageTurnSound = useCallback(() => {
    if (!soundEnabled) return
    try {
      if (!flipAudioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        if (AudioCtx) {
          flipAudioContextRef.current = new AudioCtx()
        }
      }
      const ctx = flipAudioContextRef.current
      if (!ctx) return
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      // Generate soft paper rustle noise
      const bufferSize = ctx.sampleRate * 0.08
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4))
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 1200
      filter.Q.value = 1.2

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start()
    } catch {
      // Audio fallback silent
    }
  }, [soundEnabled])

  // Total flip steps calculation
  // In spread mode: Cover is standalone (step 0), then spreads (step 1 = p1+p2, step 2 = p3+p4, ...), Back cover is standalone
  const totalPages = BOOKLET_PAGES.length

  const getNextPage = useCallback(() => {
    if (isSpreadMode) {
      if (currentPage === 0) return 1 // From cover to spread 1 (pages 1 & 2)
      const next = currentPage + 2
      return next >= totalPages ? totalPages - 1 : next
    } else {
      return Math.min(currentPage + 1, totalPages - 1)
    }
  }, [isSpreadMode, currentPage, totalPages])

  const getPrevPage = useCallback(() => {
    if (isSpreadMode) {
      if (currentPage <= 1) return 0
      const prev = currentPage - 2
      return prev < 0 ? 0 : prev
    } else {
      return Math.max(currentPage - 1, 0)
    }
  }, [isSpreadMode, currentPage])

  const flipNext = useCallback(() => {
    if (currentPage >= totalPages - 1 && isSpreadMode && currentPage === totalPages - 1) return
    if (!isSpreadMode && currentPage >= totalPages - 1) return
    const target = getNextPage()
    if (target !== currentPage) {
      setCurrentPage(target)
      setZoomLevel(1)
      setPanOffset({ x: 0, y: 0 })
      playPageTurnSound()
    }
  }, [currentPage, totalPages, isSpreadMode, getNextPage, playPageTurnSound])

  const flipPrev = useCallback(() => {
    if (currentPage <= 0) return
    const target = getPrevPage()
    if (target !== currentPage) {
      setCurrentPage(target)
      setZoomLevel(1)
      setPanOffset({ x: 0, y: 0 })
      playPageTurnSound()
    }
  }, [currentPage, getPrevPage, playPageTurnSound])

  const jumpToPage = (index: number) => {
    if (isSpreadMode) {
      if (index === 0) {
        setCurrentPage(0)
      } else if (index === totalPages - 1) {
        setCurrentPage(totalPages - 1)
      } else {
        // Even index or odd index spread alignment
        const aligned = index % 2 === 1 ? index : index - 1
        setCurrentPage(aligned)
      }
    } else {
      setCurrentPage(index)
    }
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    setShowThumbnails(false)
    playPageTurnSound()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        flipNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        flipPrev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        jumpToPage(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        jumpToPage(totalPages - 1)
      } else if (e.key === 'Escape') {
        if (zoomLevel > 1) {
          setZoomLevel(1)
          setPanOffset({ x: 0, y: 0 })
        }
        setShowThumbnails(false)
        setShowShareModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flipNext, flipPrev, jumpToPage, zoomLevel, totalPages])

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      if (currentPage >= totalPages - 1) {
        setCurrentPage(0)
        playPageTurnSound()
      } else {
        flipNext()
      }
    }, 5500)
    return () => clearInterval(timer)
  }, [isAutoPlay, currentPage, totalPages, flipNext, playPageTurnSound])

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  // Zoom handling
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1)
      if (next === 1) setPanOffset({ x: 0, y: 0 })
      return next
    })
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return
    setIsPanning(true)
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoomLevel <= 1) return
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    })
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  // Copy shareable link
  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Native share or WhatsApp share
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out the official Bharat Machine Tools (BMT) Digital Technical Booklet & Machine Tool Portfolio:\n${window.location.origin}/booklet`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // Generate & Download high-resolution PDF
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true)
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const a4Width = 297
      const a4Height = 210

      for (let i = 0; i < BOOKLET_PAGES.length; i++) {
        if (i > 0) pdf.addPage('a4', 'landscape')
        const page = BOOKLET_PAGES[i]
        
        // Load image as data URL
        const img = new Image()
        img.crossOrigin = 'anonymous'
        await new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
          img.src = page.src
        })

        // Draw image onto canvas to get JPEG data for PDF
        const canvas = document.createElement('canvas')
        canvas.width = img.width || 1920
        canvas.height = img.height || 1080
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const imgData = canvas.toDataURL('image/jpeg', 0.9)
          pdf.addImage(imgData, 'JPEG', 0, 0, a4Width, a4Height)
        }
      }

      pdf.save('Bharat_Machine_Tools_Digital_Booklet.pdf')
    } catch (err) {
      console.error('PDF Generation Error:', err)
      alert('Unable to generate PDF directly. You can browse all pages in high-resolution directly on this viewer.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // Touch Swipe Gesture handler for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 50) {
      flipNext() // Swipe left -> next
    } else if (diff < -50) {
      flipPrev() // Swipe right -> prev
    }
    setTouchStart(null)
  }

  // Render Page Spread
  const renderSpreadView = () => {
    // Single page cover (page 0)
    if (currentPage === 0) {
      const page = BOOKLET_PAGES[0]
      return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto py-2">
          <motion.div
            key={page.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative aspect-[1.414/1] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white"
          >
            <img 
              src={page.src} 
              alt={page.title} 
              className="w-full h-full object-contain select-none pointer-events-none" 
            />
            {/* Glossy lighting reflection spine */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      )
    }

    // Last page back cover (page 14)
    if (currentPage === totalPages - 1) {
      const page = BOOKLET_PAGES[totalPages - 1]
      return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto py-2">
          <motion.div
            key={page.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative aspect-[1.414/1] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-white"
          >
            <img 
              src={page.src} 
              alt={page.title} 
              className="w-full h-full object-contain select-none pointer-events-none" 
            />
            {/* Glossy spine shadow */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      )
    }

    // Two-page open book spread (Left page: currentPage, Right page: currentPage + 1)
    const leftPage = BOOKLET_PAGES[currentPage]
    const rightPage = BOOKLET_PAGES[currentPage + 1] || null

    return (
      <div className="flex items-center justify-center w-full max-w-6xl mx-auto py-2 px-2">
        <motion.div
          key={`spread-${currentPage}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full grid grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-900"
        >
          {/* Left Page */}
          <div className="relative aspect-[1.414/1] bg-white overflow-hidden border-r border-slate-300/60">
            {leftPage && (
              <img 
                src={leftPage.src} 
                alt={leftPage.title} 
                className="w-full h-full object-contain select-none pointer-events-none" 
              />
            )}
            {/* Spine Center Crease & Book Fold Gradient (Right edge of left page) */}
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/25 via-black/5 to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
              Page {currentPage + 1}
            </div>
          </div>

          {/* Right Page */}
          <div className="relative aspect-[1.414/1] bg-white overflow-hidden">
            {rightPage && (
              <img 
                src={rightPage.src} 
                alt={rightPage.title} 
                className="w-full h-full object-contain select-none pointer-events-none" 
              />
            )}
            {/* Spine Center Crease & Book Fold Gradient (Left edge of right page) */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none" />
            {rightPage && (
              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                Page {currentPage + 2}
              </div>
            )}
          </div>

          {/* Center Spine Physical Seam */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-slate-400/40 shadow-inner z-20 pointer-events-none" />
        </motion.div>
      </div>
    )
  }

  // Render Single Page View (Mobile / Tablet Portrait)
  const renderSingleView = () => {
    const page = BOOKLET_PAGES[currentPage]
    return (
      <div className="flex items-center justify-center w-full max-w-2xl mx-auto py-1 px-1">
        <motion.div
          key={`single-${currentPage}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative aspect-[1.414/1] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white"
        >
          <img 
            src={page.src} 
            alt={page.title} 
            className="w-full h-full object-contain select-none pointer-events-none" 
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
            Page {currentPage + 1} / {totalPages}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-[#0f172a] text-white flex flex-col justify-between select-none relative overflow-hidden ${
        isFullscreen ? 'p-0' : 'pt-24 sm:pt-28 pb-6'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Ambient Background Studio Glow */}
      <div className="absolute inset-0 bg-radial from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* TOP HEADER CONTROLS BAR                                                   */}
      {/* ========================================================================= */}
      <header className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        
        {/* Left Side: Back & Booklet Info */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm cursor-pointer"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display">
                BMT Digital Technical Booklet
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2 py-0.5 rounded-md">
                <Sparkles className="w-2.5 h-2.5" /> 15 High-Res Pages
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
              {BOOKLET_PAGES[currentPage]?.title || "Official Corporate Brochure"}
            </span>
          </div>
        </div>

        {/* Right Side Tools (Zoom, Mode, PDF, Share, Fullscreen) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-800/90 border border-slate-700 rounded-xl p-0.5">
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/80 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/80 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={handleResetZoom}
                className="px-2 py-1 text-[10px] font-mono font-bold text-blue-400 hover:text-blue-300 hover:bg-slate-700/80 rounded-lg transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                Reset ({Math.round(zoomLevel * 100)}%)
              </button>
            )}
          </div>

          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title={soundEnabled ? "Mute Page Flip Sound" : "Enable Page Flip Sound"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Thumbnail Gallery Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showThumbnails 
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30' 
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
            }`}
            title="Page Thumbnails Overview"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* PDF Download Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-[11px] uppercase tracking-wider rounded-xl border border-slate-700 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            title="Download PDF Version"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          {/* Share Link Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Share Booklet Link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reading Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN INTERACTIVE FLIPBOOK STAGE                                           */}
      {/* ========================================================================= */}
      <main 
        className="flex-1 flex items-center justify-center relative z-10 w-full px-2 sm:px-6 my-auto overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Navigation Previous Button */}
        <button
          onClick={flipPrev}
          disabled={currentPage === 0}
          className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-blue-600 border border-slate-700 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          title="Previous Page (Left Arrow)"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Scalable & Zoomable Book Canvas */}
        <div 
          className="w-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default'
          }}
        >
          {isSpreadMode ? renderSpreadView() : renderSingleView()}
        </div>

        {/* Navigation Next Button */}
        <button
          onClick={flipNext}
          disabled={currentPage >= totalPages - 1}
          className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-slate-900/80 hover:bg-blue-600 border border-slate-700 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          title="Next Page (Right Arrow / Spacebar)"
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM READER CONTROLS TOOLBAR                                            */}
      {/* ========================================================================= */}
      <footer className="relative z-30 max-w-4xl mx-auto px-4 w-full flex flex-col items-center gap-3">
        
        {/* Scrubbing Slider & Page Numbers */}
        <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Auto-Play Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoPlay 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 animate-pulse' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoPlay ? 'Auto-Flip On' : 'Auto-Play'}</span>
            </button>

            {/* Display Mode Toggle */}
            <button
              onClick={() => setIsSpreadMode(!isSpreadMode)}
              className="hidden sm:inline-flex px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              {isSpreadMode ? '2-Page Spread' : '1-Page View'}
            </button>
          </div>

          {/* Page Range Slider */}
          <div className="flex-1 max-w-md w-full flex items-center gap-3 px-2">
            <span className="text-[10px] font-mono text-slate-400 font-bold">1</span>
            <input 
              type="range"
              min={0}
              max={totalPages - 1}
              value={currentPage}
              onChange={(e) => jumpToPage(parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none"
            />
            <span className="text-[10px] font-mono text-slate-400 font-bold">{totalPages}</span>
          </div>

          {/* Current Page Counter & Direct RFQ Link */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-blue-400 rounded-xl">
              {isSpreadMode && currentPage > 0 && currentPage < totalPages - 1
                ? `Pages ${currentPage + 1} - ${currentPage + 2} of ${totalPages}`
                : `Page ${currentPage + 1} of ${totalPages}`}
            </span>
            <a
              href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20am%20viewing%20the%20digital%20booklet%20and%20would%20like%20a%20technical%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span>Get Quote</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </footer>

      {/* ========================================================================= */}
      {/* THUMBNAILS DRAWER MODAL                                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 p-4 shadow-2xl max-h-[45vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Catalogue Pages Overview ({totalPages} Pages)
                  </span>
                </div>
                <button
                  onClick={() => setShowThumbnails(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3 pt-2">
                {BOOKLET_PAGES.map((page, idx) => {
                  const isActive = isSpreadMode
                    ? idx === currentPage || (idx === currentPage + 1 && currentPage > 0 && currentPage < totalPages - 1)
                    : idx === currentPage

                  return (
                    <button
                      key={page.id}
                      onClick={() => jumpToPage(idx)}
                      className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all text-left cursor-pointer ${
                        isActive 
                          ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105 shadow-lg' 
                          : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[1.414/1] bg-slate-950 relative overflow-hidden">
                        <img 
                          src={page.src} 
                          alt={page.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-1 bg-slate-900/90 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded">
                          P.{page.id}
                        </span>
                      </div>
                      <div className="p-1.5 bg-slate-900 text-[9px] font-bold text-slate-300 truncate">
                        {page.category}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SHARE MODAL                                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showShareModal && (
          <div 
            onClick={() => setShowShareModal(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Share Digital Booklet</h3>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Share this interactive digital technical catalogue directly with clients, purchasing managers, and engineering teams.
              </p>

              {/* Copy URL input */}
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                <input 
                  type="text" 
                  readOnly 
                  value={typeof window !== 'undefined' ? `${window.location.origin}/booklet` : 'https://bmt.prigenix.com/booklet'} 
                  className="flex-1 bg-transparent text-xs text-slate-300 px-2 font-mono outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono uppercase transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Share</span>
                </button>

                <a
                  href={`mailto:?subject=Bharat Machine Tools - Digital Technical Booklet&body=Please check out the official digital booklet and machine tool catalogue of Bharat Machine Tools:%0D%0Ahttps://bmt.prigenix.com/booklet`}
                  className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email Link</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
