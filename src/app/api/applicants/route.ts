import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/applicants
// Public: Submits a new job application
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { jobId, name, email, phone, experience, resumeUrl } = body

    if (!jobId || !name || !email || !phone || !experience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify job exists and is active
    const associatedJob = await db.job.findUnique({
      where: { id: jobId }
    })
    if (!associatedJob || !associatedJob.isActive) {
      return NextResponse.json({ error: 'Job posting is no longer active' }, { status: 400 })
    }

    const applicant = await db.jobApplicant.create({
      data: {
        jobId,
        name,
        email,
        phone,
        experience,
        resumeUrl
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully!', 
      applicant 
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
