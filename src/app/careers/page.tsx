"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  UploadCloud, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  Cpu, 
  Cog, 
  Layers, 
  ArrowRight, 
  Mail, 
  Send,
  Check,
  Building2,
  Users,
  Award,
  Flame
} from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  createdAt?: string
}

const FALLBACK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Spindle Design Engineer (CAD/FEA)",
    department: "R&D & Engineering",
    location: "Bangalore Works",
    type: "Full-Time",
    description: "Lead the mechanical design, rotodynamic simulation, and thermal analysis of high-frequency motorized spindles (up to 45,000 RPM) and heavy belt-driven milling spindles.",
    requirements: "• B.Tech/M.Tech in Mechanical Engineering.\n• 3–6 years in spindle, gearbox, or precision rotodynamic design.\n• Proficiency in SolidWorks/Inventor and ANSYS harmonic/FEA analysis.\n• In-depth understanding of hybrid ceramic angular contact bearings & lubrication."
  },
  {
    id: "job-2",
    title: "Master Hand-Scraping & Assembly Specialist",
    department: "Assembly & Manufacturing",
    location: "Bangalore Works",
    type: "Full-Time",
    description: "Perform precision hand-scraping, geometric alignment, and slideway matching for CNC rotary tables, machine beds, and sub-micron spindle headstocks.",
    requirements: "• 4+ years of hands-on experience in machine tool scraping & geometric alignment.\n• Expertise in master square, dial indicator, and precision level alignment.\n• Knowledge of Turcite-B application, scraping oil pockets, and DIN/ISO geometric tests."
  },
  {
    id: "job-3",
    title: "Precision Cylindrical Grinding Machinist",
    department: "Machining & Production",
    location: "Bangalore Works",
    type: "Full-Time",
    description: "Operate heavy precision cylindrical grinders (capacities up to Ø500 x 5000 mm) to grind long shafts, spindle journals, and defense outrigger pistons to < 0.002 mm tolerance.",
    requirements: "• ITI / Diploma in Mechanical Engineering.\n• 3–7 years operating cylindrical or universal grinding machines.\n• Experience with micrometers, bore gauges, and surface finish (Ra < 0.2 µm) inspection."
  },
  {
    id: "job-4",
    title: "Quality Assurance & Metrology Engineer",
    department: "Quality & Inspection",
    location: "Bangalore Works",
    type: "Full-Time",
    description: "Execute sub-micron runout inspections, laser interferometry positioning checks, and dynamic balancing (ISO G0.4) for all finished spindles and rotary tables before dispatch.",
    requirements: "• Diploma / B.E. in Mechanical / Production Engineering.\n• 2–5 years in QA inspection for precision machine tools or aerospace components.\n• Hands-on proficiency with dynamic balancing rigs, vibration analyzers, and laser interferometers."
  },
  {
    id: "job-5",
    title: "Technical Sales & Field Application Engineer",
    department: "Sales & Field Support",
    location: "Bangalore / Pan-India",
    type: "Full-Time",
    description: "Interface with aerospace, defense, and machine tool OEM clients to understand custom requirements, prepare technical proposals, and supervise initial field commissioning.",
    requirements: "• B.E. in Mechanical / Mechatronics Engineering.\n• 2–5 years in machine tool components, CNC retrofits, or industrial automation sales.\n• Strong communication skills and willingness to travel for client site consultations."
  }
]

const CULTURE_PILLARS = [
  {
    icon: Cog,
    title: "Sub-Micron Precision",
    desc: "Work on advanced rotodynamic systems engineered to tolerances under 0.001 mm."
  },
  {
    icon: ShieldCheck,
    title: "Strategic Impact",
    desc: "Engineer mission-critical machine components for India's aerospace & defense sectors."
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    desc: "Preserve and advance the rare art of master hand-scraping & Swiss-grade geometric alignment."
  },
  {
    icon: Users,
    title: "Direct Mentorship",
    desc: "Learn directly from founder Mr. Abbas Khan and industry veterans with 25+ years experience."
  }
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [activeDept, setActiveDept] = useState("All")

  // Application form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [experience, setExperience] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  
  // UI states
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/jobs")
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data)
        } else {
          setJobs(FALLBACK_JOBS)
        }
      } else {
        setJobs(FALLBACK_JOBS)
      }
    } catch (err) {
      console.error("Error loading jobs:", err)
      setJobs(FALLBACK_JOBS)
    } finally {
      setLoading(false)
    }
  }

  // Handle Resume File Upload
  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setUploading(true)
    setErrorMsg("")
    setResumeUrl("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setResumeUrl(data.url)
      } else {
        setErrorMsg(data.error || "Failed to upload resume file")
      }
    } catch (err) {
      setErrorMsg("Network error occurred during upload.")
    } finally {
      setUploading(false)
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJob) return

    if (!name || !email || !phone || !experience) {
      setErrorMsg("Please fill in all required fields.")
      return
    }

    setSubmitting(true)
    setErrorMsg("")
    setSuccessMsg("")

    try {
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob.id,
          name,
          email,
          phone,
          experience,
          resumeUrl: resumeUrl || null,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSuccessMsg("Your application has been received! Our HR team will review your profile and contact you.")
        setName("")
        setEmail("")
        setPhone("")
        setExperience("")
        setResumeUrl("")
      } else {
        setErrorMsg(data.error || "Failed to submit application.")
      }
    } catch (err) {
      setErrorMsg("Network error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Filter department tabs
  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department)))]
  const filteredJobs = activeDept === "All" 
    ? jobs 
    : jobs.filter((job) => job.department === activeDept)

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 pt-24 sm:pt-32 pb-24 font-sans relative overflow-hidden">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,47,135,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,47,135,0.018)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Radial Ambient Flares */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-20">
        
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#122f87]" />
            <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
              CAREERS AT BHARAT MACHINE TOOLS &bull; BANGALORE
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase font-display leading-[1.12]"
          >
            Build The Future Of <br />
            <span className="text-[#122f87]">High-Precision</span> Engineering
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed"
          >
            Join Bangalore’s premier machine tool manufacturer. We craft high-speed motorized spindles, 5-axis rotary tables, and defense mechanical systems with sub-micron excellence.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-[10px] font-mono font-bold text-slate-600"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <Building2 className="w-3 h-3 text-[#122f87]" />
              <span>Bangalore Works &amp; Plant</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <Award className="w-3 h-3 text-[#122f87]" />
              <span>25+ Years Legacy</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-[#122f87]" />
              <span>ISO 9001:2015 QA</span>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* WHY WORK AT BMT (CULTURE & GROWTH PILLARS)                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CULTURE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122f87] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-display uppercase">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* ========================================================================= */}
        {/* OPEN POSITIONS BOARD                                                      */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                CURRENT OPPORTUNITIES
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase font-display mt-0.5">
                Open Positions in Bangalore
              </h2>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveDept(dept)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeDept === dept
                      ? "bg-[#122f87] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings Grid */}
          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#122f87]" />
              <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Loading Positions...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-2">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">No Current Openings In This Department</h3>
              <p className="text-xs text-slate-500">Please select &quot;All&quot; or check back shortly for upcoming openings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredJobs.map((job, idx) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => {
                    setSelectedJob(job)
                    setSuccessMsg("")
                    setErrorMsg("")
                  }}
                  className="group bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[10px] font-mono text-[#122f87] font-bold uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#122f87] transition-colors leading-snug font-display">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#122f87] group-hover:translate-x-1 transition-transform">
                      <span>View &amp; Apply</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* SPONTANEOUS / GENERAL CV SUBMISSION BANNER                                */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b1b4f] via-[#122f87] to-[#1a3fa8] text-white shadow-xl shadow-blue-950/15 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1.5 text-center sm:text-left relative z-10">
            <span className="text-[10px] font-mono font-bold text-blue-200 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
              OPEN INQUIRY
            </span>
            <h3 className="text-lg sm:text-xl font-bold uppercase font-display text-white">
              Don&apos;t see a role matching your skill set?
            </h3>
            <p className="text-xs text-blue-100/80 font-light max-w-xl">
              We are always looking for exceptional machinists, scraping specialists, and CAD engineers. Email your CV directly to our management.
            </p>
          </div>

          <a
            href="mailto:bmt.abbas@gmail.com?subject=Spontaneous%20Job%20Application%20-%20BMT%20Careers"
            className="px-6 py-3 bg-white text-[#122f87] hover:bg-blue-50 font-bold rounded-xl text-xs font-mono uppercase tracking-wider transition-colors shadow-md shrink-0 inline-flex items-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#122f87]" />
            <span>Email CV to HR</span>
          </a>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* JOB DETAILS & APPLICATION MODAL                                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-slate-100 pb-4 space-y-2 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[10px] font-mono text-[#122f87] font-bold uppercase tracking-wider">
                    {selectedJob.department}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {selectedJob.type} &bull; {selectedJob.location}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-display leading-snug">
                  {selectedJob.title}
                </h2>
              </div>

              {/* Description & Requirements */}
              <div className="space-y-4 text-xs text-slate-600 font-light leading-relaxed border-b border-slate-100 pb-5">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[10px] mb-1">
                    Role Description
                  </h4>
                  <p className="whitespace-pre-line">{selectedJob.description}</p>
                </div>
                {selectedJob.requirements && (
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider font-mono text-[10px] mb-1">
                      Qualifications &amp; Requirements
                    </h4>
                    <p className="whitespace-pre-line">{selectedJob.requirements}</p>
                  </div>
                )}
              </div>

              {/* Application Form */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Apply for this position
                </h3>

                {successMsg ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-2xl flex items-start gap-2.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wide text-[10px] mb-1">
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-all text-xs font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wide text-[10px] mb-1">
                          Email Address *
                        </label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-all text-xs font-medium"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wide text-[10px] mb-1">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-all text-xs font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wide text-[10px] mb-1">
                          Years of Experience *
                        </label>
                        <input 
                          type="text" 
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="e.g. 4 Years in CNC Grinding" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-all text-xs font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wide text-[10px] mb-1">
                        Resume / CV Attachment (Optional)
                      </label>
                      <div className="border border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-3 text-center cursor-pointer transition-colors relative bg-slate-50">
                        <input 
                          type="file" 
                          accept=".pdf,.docx,.doc,.txt,.rtf"
                          onChange={handleResumeChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        
                        <div className="flex items-center justify-center gap-2">
                          {uploading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500" />
                              <span className="text-[10px] text-slate-500 font-bold">Uploading Resume...</span>
                            </>
                          ) : resumeUrl ? (
                            <>
                              <FileText className="w-4 h-4 text-emerald-600" />
                              <span className="text-[10px] text-emerald-600 font-bold">Resume Attached</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-4 h-4 text-slate-400" />
                              <span className="text-[10px] text-slate-600 font-medium">Click or drag PDF/Word document (Max 5MB)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={submitting || uploading}
                      className="w-full py-3 bg-[#122f87] hover:bg-[#0e256b] disabled:bg-slate-400 text-white rounded-xl font-bold uppercase font-mono tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
