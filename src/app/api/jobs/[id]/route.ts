import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

// PUT /api/jobs/[id]
// Admin Only: Updates a job posting's details
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const { title, department, location, type, description, requirements, isActive } = body

    // Verify job exists
    const existingJob = await db.job.findUnique({
      where: { id }
    })
    if (!existingJob) {
      return NextResponse.json({ error: 'Job posting not found' }, { status: 444 })
    }

    const updatedJob = await db.job.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingJob.title,
        department: department !== undefined ? department : existingJob.department,
        location: location !== undefined ? location : existingJob.location,
        type: type !== undefined ? type : existingJob.type,
        description: description !== undefined ? description : existingJob.description,
        requirements: requirements !== undefined ? requirements : existingJob.requirements,
        isActive: isActive !== undefined ? isActive : existingJob.isActive
      }
    })

    return NextResponse.json(updatedJob)
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json({ error: 'Failed to update job posting' }, { status: 500 })
  }
}

// DELETE /api/jobs/[id]
// Admin Only: Deletes a job posting
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { id } = await params

    // Verify job exists
    const existingJob = await db.job.findUnique({
      where: { id }
    })
    if (!existingJob) {
      return NextResponse.json({ error: 'Job posting not found' }, { status: 444 })
    }

    await db.job.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Job posting deleted' })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ error: 'Failed to delete job posting' }, { status: 500 })
  }
}
