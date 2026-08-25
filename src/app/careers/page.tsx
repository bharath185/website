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
  Cog, 
  Award, 
  Mail, 
  Send,
  Building2,
  Search,
  Check,
  ArrowRight,
  UserCheck,
  Cpu,
  Layers,
  Flame,
  Zap
} from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  experienceLevel: string
  description: string
  highlights: string[]
  requirements: string
}

const CAREER_OPPORTUNITIES: Job[] = [
  {
    id: "job-1",
    title: "Senior Spindle Design Engineer",
    department: "R&D & Engineering",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "3–6 Years",
    description: "Lead mechanical design, rotodynamic simulation, and thermal analysis of high-frequency motorized spindles (up to 45,000 RPM) and heavy milling spindles.",
    highlights: [
      "FEA stress & harmonic vibration simulation (ANSYS)",
      "Hybrid ceramic angular contact bearing selection",
      "Sub-micron shaft & housing tolerance stackup"
    ],
    requirements: "• B.Tech/M.Tech in Mechanical Engineering.\n• 3–6 years in spindle, gearbox, or precision rotodynamic design.\n• Proficiency in SolidWorks/Inventor and ANSYS harmonic/FEA analysis.\n• In-depth understanding of hybrid ceramic angular contact bearings & lubrication."
  },
  {
    id: "job-2",
    title: "Master Hand-Scraping Specialist",
    department: "Assembly & Craftsmanship",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "4+ Years",
    description: "Perform master hand-scraping, geometric laser alignment, and slideway matching for CNC rotary tables, machine beds, and sub-micron spindle headstocks.",
    highlights: [
      "Precision Turcite-B application & scraping",
      "Master square & dial indicator geometric alignment",
      "DIN/ISO machine tool alignment certification"
    ],
    requirements: "• 4+ years of hands-on experience in machine tool scraping & geometric alignment.\n• Expertise in master square, dial indicator, and precision level alignment.\n• Knowledge of Turcite-B application, scraping oil pockets, and DIN/ISO geometric tests."
  },
  {
    id: "job-3",
    title: "Precision Cylindrical Grinding Machinist",
    department: "Machining & Production",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "3–7 Years",
    description: "Operate heavy precision cylindrical grinders (capacities up to Ø500 x 5000 mm) to grind long shafts, spindle journals, and defense outrigger pistons to < 0.002 mm tolerance.",
    highlights: [
      "Heavy cylindrical grinding up to 5 meters",
      "Surface finish inspection (Ra < 0.2 µm)",
      "Sub-micron journal and taper grinding"
    ],
    requirements: "• ITI / Diploma in Mechanical Engineering.\n• 3–7 years operating cylindrical or universal grinding machines.\n• Experience with micrometers, bore gauges, and surface finish (Ra < 0.2 µm) inspection."
  },
  {
    id: "job-4",
    title: "Quality Assurance & Metrology Engineer",
    department: "Quality & Testing",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "2–5 Years",
    description: "Execute sub-micron runout inspections, laser interferometry positioning checks, and dynamic balancing (ISO G0.4) for all finished spindles and rotary tables before dispatch.",
    highlights: [
      "Laser interferometry & runout verification",
      "ISO G0.4 dynamic balancing up to 45,000 RPM",
      "Traceable QA calibration & test report generation"
    ],
    requirements: "• Diploma / B.E. in Mechanical / Production Engineering.\n• 2–5 years in QA inspection for precision machine tools or aerospace components.\n• Hands-on proficiency with dynamic balancing rigs, vibration analyzers, and laser interferometers."
  },
  {
    id: "job-5",
    title: "Technical Sales & Application Engineer",
    department: "Sales & Field Engineering",
    location: "Bangalore / Pan-India",
    type: "Full-Time",
    experienceLevel: "2–5 Years",
    description: "Interface with aerospace, defense, and machine tool OEM clients to understand custom requirements, prepare technical proposals, and supervise initial field commissioning.",
    highlights: [
      "OEM client technical requirement mapping",
      "Proposal preparation for custom spindles & retrofits",
      "On-site technical consultation across India"
    ],
    requirements: "• B.E. in Mechanical / Mechatronics Engineering.\n• 2–5 years in machine tool components, CNC retrofits, or industrial automation sales.\n• Strong communication skills and willingness to travel for client site consultations."
  }
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>(CAREER_OPPORTUNITIES)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [activeDept, setActiveDept] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

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

  // Fetch db jobs if available
  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            department: d.department || "Engineering",
            location: d.location || "Bangalore Works",
            type: d.type || "Full-Time",
            experienceLevel: "2–5 Years",
            description: d.description,
            highlights: ["Precision machine tool operations", "Sub-micron tolerance standards", "ISO 9001:2015 workflow"],
            requirements: d.requirements
          }))
          setJobs(merged)
        }
      })
      .catch(() => {})
  }, [])

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
  
  const filteredJobs = jobs.filter((job) => {
    const matchesDept = activeDept === "All" || job.department === activeDept
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 pt-20 sm:pt-24 pb-20 font-sans relative overflow-hidden">
      
      {/* Precision Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,47,135,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,47,135,0.018)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Radial Ambient Flares */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* ========================================================================= */}
        {/* STUNNING & COMPACT HERO BAR                                               */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#122f87]" />
              <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
                CAREERS &bull; BHARAT MACHINE TOOLS
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase font-display">
              Open Engineering Roles
            </h1>

            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Join Bangalore&apos;s leading machine tool manufacturer crafting sub-micron motorized spindles and CNC rotary tables.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search positions or skills..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] transition-all placeholder-slate-400 font-medium shadow-2xs"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DEPARTMENT FILTER PILLS                                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">
            FILTER:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setActiveDept(dept)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeDept === dept
                  ? "bg-[#122f87] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* STUNNING JOB CARDS GRID                                                   */}
        {/* ========================================================================= */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-2">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">No Openings Match Your Query</h3>
            <p className="text-xs text-slate-500">Please clear search filter or email your CV directly to HR.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredJobs.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                {/* Card Top Details */}
                <div className="space-y-3">
                  
                  {/* Category & Badge Strip */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[10px] font-mono text-[#122f87] font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      {job.experienceLevel} &bull; {job.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#122f87] transition-colors leading-snug font-display">
                    {job.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {job.description}
                  </p>

                  {/* Key Highlights */}
                  {job.highlights && (
                    <div className="space-y-1.5 pt-1 border-t border-slate-100">
                      {job.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-600">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom CTA Strip */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#122f87]" />
                    <span>{job.location}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJob(job)
                      setSuccessMsg("")
                      setErrorMsg("")
                    }}
                    className="px-4 py-2 bg-[#122f87] hover:bg-[#0e256b] text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer group-hover:shadow-md"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPACT & SLEEK GENERAL APPLICATION BANNER                                */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0b1b4f] via-[#122f87] to-[#1a3fa8] text-white shadow-xl shadow-blue-950/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[9px] font-mono font-bold text-blue-200 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full inline-block">
              DIRECT CV DESK
            </span>
            <h3 className="text-sm sm:text-base font-bold uppercase font-display text-white">
              Don&apos;t see your exact profile listed?
            </h3>
            <p className="text-xs text-blue-100/80 font-light">
              We welcome exceptional machine tool machinists, scraping specialists, and mechanical designers. Email your resume directly.
            </p>
          </div>

          <a
            href="mailto:bmt.abbas@gmail.com?subject=Spontaneous%20Job%20Application%20-%20BMT%20Careers"
            className="px-5 py-2.5 bg-white text-[#122f87] hover:bg-blue-50 font-bold rounded-xl text-xs font-mono uppercase tracking-wider transition-colors shadow-sm shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#122f87]" />
            <span>Email CV to HR</span>
          </a>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PROFESSIONAL APPLICATION MODAL                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 relative my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-slate-100 pb-3 space-y-1 pr-8">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[10px] font-mono text-[#122f87] font-bold uppercase tracking-wider">
                    {selectedJob.department}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {selectedJob.location} &bull; {selectedJob.type}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 uppercase font-display leading-snug">
                  {selectedJob.title}
                </h2>
              </div>

              {/* Description & Requirements */}
              <div className="space-y-3 text-xs text-slate-600 font-light leading-relaxed border-b border-slate-100 pb-4">
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
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Apply for this position
                </h3>

                {successMsg ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-2xl flex items-start gap-2.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    {errorMsg && (
                      <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-2 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                          Experience *
                        </label>
                        <input 
                          type="text" 
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="e.g. 4 Years in Machine Assembly" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-all text-xs font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wide text-[10px] mb-1">
                        Resume / CV File (Optional)
                      </label>
                      <div className="border border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-2.5 text-center cursor-pointer transition-colors relative bg-slate-50">
                        <input 
                          type="file" 
                          accept=".pdf,.docx,.doc,.txt,.rtf"
                          onChange={handleResumeChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        
                        <div className="flex items-center justify-center gap-2">
                          {uploading ? (
                            <>
                              <div className="animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-b-2 border-blue-500" />
                              <span className="text-[10px] text-slate-500 font-bold">Uploading Resume...</span>
                            </>
                          ) : resumeUrl ? (
                            <>
                              <FileText className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[10px] text-emerald-600 font-bold">Resume Attached</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[10px] text-slate-600 font-medium">Click or drag PDF/Word CV (Max 5MB)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={submitting || uploading}
                      className="w-full py-2.5 bg-[#122f87] hover:bg-[#0e256b] disabled:bg-slate-400 text-white rounded-xl font-bold uppercase font-mono tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-1"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-b-2 border-white" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
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
