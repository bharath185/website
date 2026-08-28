import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'

export const dynamic = 'force-dynamic'

const SEED_JOBS = [
  {
    id: "job-1",
    title: "Senior Spindle Design Engineer (CAD/FEA)",
    department: "R&D & Engineering",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "3–6 Years",
    description: "Lead mechanical design, rotodynamic simulation, and thermal analysis of high-frequency motorized spindles (up to 45,000 RPM) and heavy milling spindles.",
    highlights: JSON.stringify([
      "FEA stress & harmonic vibration simulation (ANSYS)",
      "Hybrid ceramic angular contact bearing selection",
      "Sub-micron shaft & housing tolerance stackup"
    ]),
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
    highlights: JSON.stringify([
      "Precision Turcite-B application & scraping",
      "Master square & dial indicator geometric alignment",
      "DIN/ISO machine tool alignment certification"
    ]),
    requirements: "• 4+ years of hands-on experience in machine tool scraping & geometric alignment.\n• Expertise in master square, dial indicator, and precision level alignment.\n• Knowledge of Turcite-B application, scraping oil pockets, and DIN/ISO geometric tests."
  },
  {
    id: "job-3",
    title: "Precision Cylindrical Grinding Machinist (5m Bed)",
    department: "Machining & Production",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "3–7 Years",
    description: "Operate heavy precision cylindrical grinders (capacities up to Ø500 x 5000 mm) to grind long shafts, spindle journals, and defense outrigger pistons to < 0.002 mm tolerance.",
    highlights: JSON.stringify([
      "Heavy cylindrical grinding up to 5 meters",
      "Surface finish inspection (Ra < 0.2 µm)",
      "Sub-micron journal and taper grinding"
    ]),
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
    highlights: JSON.stringify([
      "Laser interferometry & runout verification",
      "ISO G0.4 dynamic balancing up to 45,000 RPM",
      "Traceable QA calibration & test report generation"
    ]),
    requirements: "• Diploma / B.E. in Mechanical / Production Engineering.\n• 2–5 years in QA inspection for precision machine tools or aerospace components.\n• Hands-on proficiency with dynamic balancing rigs, vibration analyzers, and laser interferometers."
  },
  {
    id: "job-5",
    title: "Technical Sales & Application Engineer",
    department: "Sales & Field Support",
    location: "Bangalore / Pan-India",
    type: "Full-Time",
    experienceLevel: "2–5 Years",
    description: "Interface with aerospace, defense, and machine tool OEM clients to understand custom requirements, prepare technical proposals, and supervise initial field commissioning.",
    highlights: JSON.stringify([
      "OEM client technical requirement mapping",
      "Proposal preparation for custom spindles & retrofits",
      "On-site technical consultation across India"
    ]),
    requirements: "• B.E. in Mechanical / Mechatronics Engineering.\n• 2–5 years in machine tool components, CNC retrofits, or industrial automation sales.\n• Strong communication skills and willingness to travel for client site consultations."
  },
  {
    id: "job-6",
    title: "5-Axis CNC Machining Center Programmer",
    department: "Machining & Production",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "3–6 Years",
    description: "Generate multi-axis CAM toolpaths (Mastercam/Siemens NX) for high-precision rotary table platters, spindle housings, and aerospace composite tooling fixtures.",
    highlights: JSON.stringify([
      "5-axis simultaneous CAM toolpath optimization",
      "Tool life monitoring & surface finish optimization",
      "In-process probe macro programming"
    ]),
    requirements: "• Diploma / Degree in Mechanical Engineering.\n• 3+ years in multi-axis CNC milling and CAM programming.\n• Strong knowledge of Fanuc, Siemens, and Heidenhain controllers."
  },
  {
    id: "job-7",
    title: "Hydrostatic Bearing & Lubrication Specialist",
    department: "R&D & Engineering",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "4+ Years",
    description: "Design and optimize high-pressure hydrostatic bearing fluid pockets, oil film compensation valves, and closed-loop hydraulic lubrication circuits for ultra-precision rotary tables.",
    highlights: JSON.stringify([
      "Hydrostatic oil pocket pressure calculations",
      "Capillary & flow restrictor hydraulic tuning",
      "Sub-micron stiffness and damping testing"
    ]),
    requirements: "• B.Tech/M.Tech in Mechanical / Fluid Dynamics.\n• Experience in hydraulic circuits, hydrostatic bearing design, or precision lubrication.\n• Knowledge of ISO viscosity grades and thermal stabilization units."
  },
  {
    id: "job-8",
    title: "Defense Linear Actuator Assembly Technician",
    department: "Defense & Special Projects",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "2–5 Years",
    description: "Assemble, pressure-test, and align heavy-duty telescopic leveling outriggers, ball screws, and hydraulic positioners engineered for military radar and launcher vehicles.",
    highlights: JSON.stringify([
      "Military-grade mechanical assembly & pressure testing",
      "Zero-backlash ball screw installation & preloading",
      "Environmental seal integrity testing"
    ]),
    requirements: "• ITI / Diploma in Mechanical or Automobile Engineering.\n• 2–5 years in hydraulic assembly, defense tooling, or heavy mechanical actuators.\n• Rigorous adherence to defense quality checklists."
  },
  {
    id: "job-9",
    title: "Machine Reconditioning & Slideway Retrofitter",
    department: "Assembly & Craftsmanship",
    location: "Bangalore / Field Service",
    type: "Full-Time",
    experienceLevel: "3–6 Years",
    description: "Perform comprehensive rebuilds of worn grinding machines, lathes, and milling centers, including guideway grinding, Turcite scraping, and spindle refurbishing.",
    highlights: JSON.stringify([
      "Complete mechanical teardown & overhaul",
      "Precision slideway scraping & alignment restoration",
      "On-site geometric laser calibration across India"
    ]),
    requirements: "• ITI / Diploma in Mechanical Engineering.\n• Experience in machine tool overhauls, slideway scraping, and mechanical retrofits.\n• Strong diagnostic and troubleshooting capabilities."
  },
  {
    id: "job-10",
    title: "Metrology Calibration & Laser Interferometry Specialist",
    department: "Quality & Testing",
    location: "Bangalore Works",
    type: "Full-Time",
    experienceLevel: "3–5 Years",
    description: "Operate Renishaw laser interferometers, autocollimators, and roundness testers to certify linear pitch accuracy, angular runout, and rotational concentricity.",
    highlights: JSON.stringify([
      "Renishaw laser interferometry pitch calibration",
      "Autocollimator straightness and squareness tests",
      "Traceable NABL/ISO 17025 certification reports"
    ]),
    requirements: "• Diploma / B.E. in Mechanical / Instrumentation Engineering.\n• 3+ years in precision metrology and laser calibration.\n• Expertise in ISO 230 machine tool testing standards."
  }
]

async function ensureTableAndSeed(client: any) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS "Job" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "department" TEXT NOT NULL,
      "location" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "experienceLevel" TEXT DEFAULT '2+ Years',
      "description" TEXT NOT NULL,
      "highlights" TEXT,
      "requirements" TEXT NOT NULL,
      "isActive" BOOLEAN DEFAULT true,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `)

  // Add columns if they do not exist
  await client.query(`
    ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "experienceLevel" TEXT DEFAULT '2+ Years';
    ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "highlights" TEXT;
  `).catch(() => {})

  const countRes = await client.query('SELECT count(*) as count FROM "Job";')
  const count = parseInt(countRes.rows[0]?.count || '0', 10)

  if (count === 0) {
    for (const job of SEED_JOBS) {
      await client.query(`
        INSERT INTO "Job" ("id", "title", "department", "location", "type", "experienceLevel", "description", "highlights", "requirements", "isActive", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, NOW(), NOW())
        ON CONFLICT ("id") DO NOTHING;
      `, [job.id, job.title, job.department, job.location, job.type, job.experienceLevel, job.description, job.highlights, job.requirements])
    }
  }
}

// GET /api/jobs
// Public: Returns all active jobs (or all jobs if requested by authenticated Admin)
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    const isAdmin = user && user.role === 'ADMIN'

    const { searchParams } = new URL(req.url)
    const showAll = searchParams.get('all') === 'true'

    const client = await getPgClient()
    try {
      await ensureTableAndSeed(client)

      let query = 'SELECT * FROM "Job"'
      const params: any[] = []

      if (!isAdmin || !showAll) {
        query += ' WHERE "isActive" = true'
      }

      query += ' ORDER BY "createdAt" DESC;'

      const res = await client.query(query, params)
      return NextResponse.json(res.rows)
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: error?.message || 'Failed to fetch jobs' }, { status: 500 })
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
    const { title, department, location, type, experienceLevel, description, highlights, requirements } = body

    if (!title || !department || !location || !type || !description || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await getPgClient()
    try {
      await ensureTableAndSeed(client)

      const id = `job-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
      const rawHighlights = Array.isArray(highlights) ? JSON.stringify(highlights) : (highlights || null)

      const res = await client.query(`
        INSERT INTO "Job" ("id", "title", "department", "location", "type", "experienceLevel", "description", "highlights", "requirements", "isActive", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING *;
      `, [id, title.trim(), department.trim(), location.trim(), type.trim(), experienceLevel?.trim() || '2+ Years', description.trim(), rawHighlights, requirements.trim(), true])

      return NextResponse.json(res.rows[0], { status: 201 })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: error?.message || 'Failed to create job posting' }, { status: 500 })
  }
}
