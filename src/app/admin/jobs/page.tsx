"use client"

import React, { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X, AlertCircle } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string
  isActive: boolean
  createdAt: string
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  
  // Form states
  const [title, setTitle] = useState("")
  const [department, setDepartment] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("Full-time")
  const [description, setDescription] = useState("")
  const [requirements, setRequirements] = useState("")
  const [isActive, setIsActive] = useState(true)

  // Status message states
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/jobs?all=true")
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

  // Open modal for creating a new job
  const handleOpenCreateModal = () => {
    setEditingJob(null)
    setTitle("")
    setDepartment("")
    setLocation("Bangalore, India")
    setType("Full-time")
    setDescription("")
    setRequirements("")
    setIsActive(true)
    setErrorMsg("")
    setSuccessMsg("")
    setIsModalOpen(true)
  }

  // Open modal for editing a job
  const handleOpenEditModal = (job: Job) => {
    setEditingJob(job)
    setTitle(job.title)
    setDepartment(job.department)
    setLocation(job.location)
    setType(job.type)
    setDescription(job.description)
    setRequirements(job.requirements)
    setIsActive(job.isActive)
    setErrorMsg("")
    setSuccessMsg("")
    setIsModalOpen(true)
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !department || !location || !description || !requirements) {
      setErrorMsg("Please fill in all fields.")
      return
    }

    setSubmitting(true)
    setErrorMsg("")
    setSuccessMsg("")

    const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs"
    const method = editingJob ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          department,
          location,
          type,
          description,
          requirements,
          isActive,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMsg(editingJob ? "Job updated successfully!" : "Job created successfully!")
        setTimeout(() => {
          setIsModalOpen(false)
          fetchJobs()
        }, 1000)
      } else {
        setErrorMsg(data.error || "Failed to save job posting.")
      }
    } catch (err) {
      setErrorMsg("Network error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Toggle Active Status directly
  const handleToggleActive = async (job: Job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !job.isActive }),
      })
      if (res.ok) {
        fetchJobs()
      }
    } catch (err) {
      console.error("Failed to toggle job status:", err)
    }
  }

  // Handle Job Deletion
  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job? This will delete all candidate applications associated with it!")) return

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchJobs()
      }
    } catch (err) {
      console.error("Failed to delete job posting:", err)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Action Header Card */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Recruitment Board</h2>
          <p className="text-xs text-slate-500 mt-1">Manage active vacancies, customize requirements, and track hiring pipelines.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-5 py-3 bg-[#122f87] hover:bg-[#1a3fa8] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Job Posting
        </button>
      </div>

      {/* Jobs table list card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <Loader2 className="animate-spin h-7 w-7 text-blue-600" />
            <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Syncing Database...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">No Job Postings Found</h3>
            <p className="text-xs text-slate-500 mt-1">Click the button above to post your first career requirement.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Job Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-850">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 block">{job.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {job.id.substring(0, 8)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[9px] uppercase text-slate-600 tracking-wider">
                        {job.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{job.location}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{job.type}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(job)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          job.isActive
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                            : "bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {job.isActive ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(job)}
                           className="p-2 text-[#122f87] hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all cursor-pointer"
                          title="Edit Position"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all cursor-pointer"
                          title="Delete Position"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                  {editingJob ? "Edit Job Posting" : "New Job Posting"}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Post career listings on the public careers portal.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-650 p-1 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-750 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}
              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Job Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Spindle Design Engineer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors"
                  required
                />
              </div>

              {/* Department and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering, Sales, Operations"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India (On-site)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Type and Active status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Job Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors font-medium"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4.5 w-4.5 text-[#122f87] border-slate-300 rounded focus:ring-[#122f87] cursor-pointer"
                  />
                  <label htmlFor="isActive" className="font-bold text-slate-700 uppercase tracking-wide text-[9px] cursor-pointer select-none">
                    Make Posting Active Immediately
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Job Description / Overview</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about the role's responsibilities..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors leading-relaxed"
                  required
                />
              </div>

              {/* Requirements */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px]">Key Requirements (One per line)</label>
                <textarea
                  rows={4}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g.&#10;5+ years experience in CAD design&#10;Degree in Mechanical Engineering&#10;Familiarity with sub-micron tolerances"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-[#122f87] focus:bg-white transition-colors leading-relaxed"
                  required
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin h-3.5 w-3.5" />
                      Saving...
                    </>
                  ) : (
                    <span>Save Position</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
