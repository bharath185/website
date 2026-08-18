"use client"

import React, { useState, useEffect } from "react"
import { Eye, Trash2, Loader2, Users, FileText, AlertCircle, Calendar } from "lucide-react"

interface Applicant {
  id: string
  name: string
  email: string
  phone: string
  experience: string
  resumeUrl: string | null
  appliedAt: string
  job: {
    title: string
    department: string
  }
}

export default function AdminApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)

  useEffect(() => {
    fetchApplicants()
  }, [])

  const fetchApplicants = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/applicants")
      if (res.ok) {
        const data = await res.json()
        setApplicants(data)
      }
    } catch (err) {
      console.error("Error loading applicants:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteApplicant = async (id: string) => {
    if (!confirm("Are you sure you want to delete this applicant record? This action cannot be undone.")) return

    try {
      const res = await fetch(`/api/admin/applicants?id=${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        if (selectedApplicant?.id === id) {
          setSelectedApplicant(null)
        }
        fetchApplicants()
      }
    } catch (err) {
      console.error("Failed to delete applicant:", err)
    }
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Detail HUD banner card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Candidate Track Board</h2>
        <p className="text-xs text-slate-500 mt-1">Review candidate applications, view professional summaries, and download applicant resumes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Applicants Table List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center flex flex-col items-center gap-3">
              <Loader2 className="animate-spin h-7 w-7 text-blue-600" />
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Syncing candidates...</span>
            </div>
          ) : applicants.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">No Candidates Found</h3>
              <p className="text-xs text-slate-500 mt-1">Candidates applying for active jobs on the careers page will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Applied Position</th>
                    <th className="px-6 py-4">Date Applied</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-850">
                  {applicants.map((app) => (
                    <tr 
                      key={app.id} 
                      onClick={() => setSelectedApplicant(app)}
                      className={`cursor-pointer hover:bg-slate-50/50 transition-colors ${
                        selectedApplicant?.id === app.id ? "bg-blue-50/20 border-l-2 border-l-[#122f87]" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 block">{app.name}</span>
                        <span className="text-[10px] text-slate-500 font-light block mt-0.5">{app.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 block">{app.job?.title || "Unknown Position"}</span>
                        <span className="text-[9px] text-slate-450 uppercase block font-mono mt-0.5">{app.job?.department || "General"}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono">
                        {new Date(app.appliedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedApplicant(app)}
                            className="p-2 text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all cursor-pointer"
                            title="Review Candidate"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteApplicant(app.id)}
                            className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all cursor-pointer"
                            title="Delete Record"
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

        {/* Right: Selected Candidate Details */}
        <div className="lg:col-span-4">
          {selectedApplicant ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 relative">
              
              {/* Header Info */}
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/50 text-[9px] text-[#122f87] font-bold uppercase tracking-wider">
                  Candidate Info
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{selectedApplicant.name}</h3>
                
                <div className="text-[11px] text-slate-500 space-y-1 font-mono">
                  <p>Email: <span className="text-slate-800 font-bold">{selectedApplicant.email}</span></p>
                  <p>Phone: <span className="text-slate-800 font-bold">{selectedApplicant.phone}</span></p>
                </div>
              </div>

              {/* Position details */}
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Target Position</span>
                <p className="text-xs font-bold text-slate-950">{selectedApplicant.job?.title || "Unknown Position"}</p>
                <p className="text-[10px] text-slate-500 font-medium font-mono uppercase">{selectedApplicant.job?.department || "General"}</p>
              </div>

              {/* Experience Summary */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Experience summary / Bio</span>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-light">
                  {selectedApplicant.experience}
                </p>
              </div>

              {/* Resume attachment */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono block">Resume Document</span>
                {selectedApplicant.resumeUrl ? (
                  <a
                    href={selectedApplicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200/60 rounded-2xl hover:bg-emerald-100/60 transition-colors shadow-sm text-emerald-800 group"
                  >
                    <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider block leading-none">Open Candidate Resume</span>
                      <span className="text-[9px] text-emerald-600 font-mono text-ellipsis overflow-hidden whitespace-nowrap block mt-1">
                        {selectedApplicant.resumeUrl.startsWith("data:") ? "base64_attachment.pdf" : selectedApplicant.resumeUrl.split("/").pop()}
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-450 text-[10px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                    <span>No resume file was attached.</span>
                  </div>
                )}
              </div>

              {/* Applied Date details */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono pt-3 border-t border-slate-100">
                <Calendar className="w-3.5 h-3.5" />
                <span>Applied: {new Date(selectedApplicant.appliedAt).toLocaleString("en-IN")}</span>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center text-slate-400 shadow-sm border-dashed">
              <Users className="w-12 h-12 text-slate-250 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Select a Candidate</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Click on any candidate application in the list to review their details, check professional summaries, and download their resume file.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}
