import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/jobs
// Public: Returns all active jobs (or all jobs if requested by authenticated Admin)
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    const isAdmin = user && user.role === 'ADMIN'

    const { searchParams } = new URL(req.url)
    const showAll = searchParams.get('all') === 'true'

    const jobs = await db.job.findMany({
      where: (isAdmin && showAll) ? {} : { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST /api/jobs
// Admin Only: Creates a new job posting
export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const body = await req.json()
    const { title, department, location, type, description, requirements } = body

    if (!title || !department || !location || !type || !description || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const job = await db.job.create({
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements,
        isActive: true
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Failed to create job posting' }, { status: 500 })
  }
}
