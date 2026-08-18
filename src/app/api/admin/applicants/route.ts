import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/applicants
// Admin Only: Returns all applicants along with their associated job info
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const applicants = await db.jobApplicant.findMany({
      include: {
        job: {
          select: {
            title: true,
            department: true
          }
        }
      },
      orderBy: { appliedAt: 'desc' }
    })

    return NextResponse.json(applicants)
  } catch (error) {
    console.error('Error fetching applicants:', error)
    return NextResponse.json({ error: 'Failed to fetch applicants' }, { status: 500 })
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

    const existingApplicant = await db.jobApplicant.findUnique({
      where: { id }
    })

    if (!existingApplicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 444 })
    }

    await db.jobApplicant.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Applicant deleted successfully' })
  } catch (error) {
    console.error('Error deleting applicant:', error)
    return NextResponse.json({ error: 'Failed to delete applicant record' }, { status: 500 })
  }
}
