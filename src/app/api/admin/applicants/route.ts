import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'

export const dynamic = 'force-dynamic'

// GET /api/admin/applicants
// Admin Only: Returns all applicants along with their associated job info
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const client = await getPgClient()
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS "Job" (
          "id" TEXT PRIMARY KEY,
          "title" TEXT NOT NULL,
          "department" TEXT NOT NULL,
          "location" TEXT NOT NULL,
          "type" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "requirements" TEXT NOT NULL,
          "isActive" BOOLEAN DEFAULT true,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

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

      const res = await client.query(`
        SELECT 
          a.*,
          j.title as "jobTitle",
          j.department as "jobDepartment"
        FROM "JobApplicant" a
        LEFT JOIN "Job" j ON a."jobId" = j.id
        ORDER BY a."appliedAt" DESC;
      `)

      const formatted = res.rows.map((row) => ({
        id: row.id,
        jobId: row.jobId,
        name: row.name,
        email: row.email,
        phone: row.phone,
        experience: row.experience,
        resumeUrl: row.resumeUrl,
        appliedAt: row.appliedAt,
        job: {
          title: row.jobTitle || 'General Position',
          department: row.jobDepartment || 'Operations'
        }
      }))

      return NextResponse.json(formatted)
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error fetching applicants:', error)
    return NextResponse.json({ error: error?.message || 'Failed to fetch applicants' }, { status: 500 })
  }
}

// DELETE /api/admin/applicants
// Admin Only: Deletes an applicant record
export async function DELETE(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Applicant ID is required' }, { status: 400 })
    }

    const client = await getPgClient()
    try {
      await client.query('DELETE FROM "JobApplicant" WHERE "id" = $1;', [id])
      return NextResponse.json({ success: true, message: 'Applicant deleted successfully' })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error deleting applicant:', error)
    return NextResponse.json({ error: error?.message || 'Failed to delete applicant record' }, { status: 500 })
  }
}
