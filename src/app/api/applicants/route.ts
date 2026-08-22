import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'

export const dynamic = 'force-dynamic'

// POST /api/applicants
// Public: Submits a new job application
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { jobId, name, email, phone, experience, resumeUrl } = body

    if (!jobId || !name || !email || !phone || !experience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await getPgClient()
    try {
      // Ensure JobApplicant table exists
      await client.query(`
        CREATE TABLE IF NOT EXISTS "JobApplicant" (
          "id" TEXT PRIMARY KEY,
          "jobId" TEXT NOT NULL REFERENCES "Job"("id") ON DELETE CASCADE,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "phone" TEXT NOT NULL,
          "experience" TEXT NOT NULL,
          "resumeUrl" TEXT,
          "appliedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      // Verify job exists and is active
      const jobRes = await client.query('SELECT * FROM "Job" WHERE "id" = $1 AND "isActive" = true LIMIT 1;', [jobId])
      if (jobRes.rows.length === 0) {
        return NextResponse.json({ error: 'Job posting is no longer active' }, { status: 400 })
      }

      const id = `app-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
      const res = await client.query(`
        INSERT INTO "JobApplicant" ("id", "jobId", "name", "email", "phone", "experience", "resumeUrl", "appliedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING *;
      `, [id, jobId, name.trim(), email.trim(), phone.trim(), experience.trim(), resumeUrl || null])

      return NextResponse.json({ 
        success: true, 
        message: 'Application submitted successfully!', 
        applicant: res.rows[0] 
      }, { status: 201 })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ error: error?.message || 'Failed to submit application' }, { status: 500 })
  }
}
