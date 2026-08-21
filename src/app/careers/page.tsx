"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Briefcase, MapPin, Clock, Calendar, CheckCircle2, AlertCircle, FileText, UploadCloud, ChevronRight, X } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  createdAt: string
}

export default function CareersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/")
    }
  }, [user, authLoading, router])
  
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
  const [activeDept, setActiveDept] = useState("All")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/jobs")
      if (res.ok) {
        const data = await res.json()
        setJobs(data)
      }
    } catch (err) {
      console.error("Error loading jobs:", err)
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

    if (!resumeUrl && !uploading) {
      setErrorMsg("Please upload your resume file.")
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
          resumeUrl,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSuccessMsg("Your application has been submitted successfully! Our HR team will review it.")
        // Reset fields
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

  // List unique departments for filter tab
  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department)))]

  // Filter jobs
  const filteredJobs = activeDept === "All" 
    ? jobs 
    : jobs.filter((job) => job.department === activeDept)

  if (user) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20 flex flex-col items-center justify-center text-slate-500 gap-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#122f87] animate-pulse">
          Redirecting...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-24 pb-20 font-sans">
      
      {/* Careers Hero Banner */}
      <section className="bg-white text-slate-900 py-16 border-b border-slate-200 shadow-sm relative overflow-hidden">
        {/* Subtle dynamic grid backgrounds */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/40 text-blue-600 font-extrabold text-[10px] uppercase tracking-widest shadow-sm">
            Join BMT Bharat
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Build the Future of Precision Engineering
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            At BMT Bharat, we shape high-speed rotational masterpieces. Explore our open roles, submit your credentials, and build an exceptional engineering career with us in Bangalore.
          </p>
        </div>
      </section>

      {/* Careers Main Jobs Board */}
      <main className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Jobs Filter & List */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeDept === dept
                    ? "bg-[#122f87] text-white shadow-md shadow-blue-900/10"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job listings list container */}
          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#122f87]" />
              <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Syncing Careers...</span>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">No Current Openings</h3>
              <p className="text-xs text-slate-500 mt-1">There are no positions open in this department right now. Please check back soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job)
                    setSuccessMsg("")
                    setErrorMsg("")
                  }}
                  className={`p-6 bg-white border rounded-3xl cursor-pointer hover:border-blue-300 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                    selectedJob?.id === job.id ? "border-[#122f87] ring-2 ring-[#122f87]/5" : "border-slate-200"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#122f87] transition-colors">
                      {job.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium font-mono">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-[#122f87] transition-all">
                    <span>View Role</span>
                    <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Side: Detailed View & Application Form */}
        <div className="lg:col-span-5">
          {selectedJob ? (
            <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6 space-y-6 relative">
              
              {/* Header Details */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/50 text-[9px] text-[#122f87] font-bold uppercase tracking-wider">
                    {selectedJob.department}
                  </span>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="text-slate-400 hover:text-slate-600 p-1 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 leading-snug">{selectedJob.title}</h2>
                
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 font-bold font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedJob.type}
                  </span>
                </div>
              </div>

              {/* Job Description & Requirements */}
              <div className="space-y-4 text-xs font-light text-slate-600 leading-relaxed border-b border-slate-100 pb-5">
                <div>
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider font-mono mb-2 text-[10px]">Role Overview</h4>
                  <p className="whitespace-pre-line">{selectedJob.description}</p>
                </div>
                {selectedJob.requirements && (
                  <div>
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider font-mono mb-2 text-[10px]">Key Requirements</h4>
                    <p className="whitespace-pre-line">{selectedJob.requirements}</p>
                  </div>
                )}
              </div>

              {/* Application Form */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                  Apply for this position
                </h3>

                {successMsg ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-2xl flex items-start gap-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {errorMsg && (
                      <div className="p-3.5 bg-red-50 border border-red-200 text-red-750 rounded-2xl flex items-start gap-2 shadow-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors"
                        required
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Email Address</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Phone Number</label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 9876543210" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Professional Summary */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Experience summary</label>
                      <textarea 
                        rows={3}
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Briefly tell us about your experience and background..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors resize-none leading-relaxed"
                        required
                      />
                    </div>

                    {/* Resume Upload Box */}
                    <div className="space-y-2">
                      <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px] block">Upload Resume File</label>
                      
                      <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center cursor-pointer transition-colors relative bg-slate-50/50">
                        <input 
                          type="file" 
                          accept=".pdf,.docx,.doc,.txt,.rtf"
                          onChange={handleResumeChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        
                        <div className="flex flex-col items-center gap-2">
                          {uploading ? (
                            <>
                              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500" />
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Uploading Resume...</span>
                            </>
                          ) : resumeUrl ? (
                            <>
                              <FileText className="w-7 h-7 text-emerald-500" />
                              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Resume Attached!</span>
                              <span className="text-[9px] text-slate-400 font-mono overflow-hidden max-w-[200px] text-ellipsis whitespace-nowrap block">
                                {resumeUrl.split("/").pop()}
                              </span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-7 h-7 text-slate-400" />
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Click or drag resume file</span>
                              <span className="text-[8px] text-slate-400 font-mono uppercase">PDF, DOCX, DOC, TXT (Max 5MB)</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={submitting || uploading}
                      className="w-full py-3 bg-[#122f87] hover:bg-[#1a3fa8] disabled:bg-slate-400 text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>

                  </form>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-400 shadow-sm border-dashed">
              <Briefcase className="w-12 h-12 text-slate-250 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Select a Position</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Click on any job posting on the left to read details, check qualification requirements, and apply directly via our secure candidate portal.
              </p>
            </div>
          )}
        </div>

      </main>

    </div>
  )
}
