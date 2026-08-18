import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file extension / mime type
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt', '.rtf', '.jpg', '.jpeg', '.png']
    const ext = path.extname(file.name).toLowerCase()
    
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: 'Invalid file format. Only PDF, Word Documents, TXT or Images are allowed.' }, { status: 400 })
    }

    // Limit file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'resumes')

    try {
      // Ensure resumes directory exists
      await fs.mkdir(uploadsDir, { recursive: true })
      
      const filePath = path.join(uploadsDir, filename)
      await fs.writeFile(filePath, buffer)
      
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/resumes/${filename}` 
      })
    } catch (fsError) {
      console.warn('Local filesystem write failed, using base64 fallback:', fsError)
      // Fallback in case of serverless file system restriction
      const base64Data = buffer.toString('base64')
      const dataUrl = `data:${file.type || 'application/octet-stream'};base64,${base64Data}`
      
      return NextResponse.json({ 
        success: true, 
        url: dataUrl 
      })
    }
  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json({ error: 'Failed to upload resume file' }, { status: 500 })
  }
}
