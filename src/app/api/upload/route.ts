import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || '.jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

    try {
      // Ensure uploads directory exists
      await fs.mkdir(uploadsDir, { recursive: true })
      
      const filePath = path.join(uploadsDir, filename)
      await fs.writeFile(filePath, buffer)
      
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/${filename}` 
      })
    } catch (fsError) {
      console.warn('Local filesystem write failed, using base64 fallback:', fsError)
      // Fallback for serverless or read-only filesystems - compress buffer to keep payload small
      let dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`
      try {
        const sharp = (await import('sharp')).default
        const compressedBuffer = await sharp(buffer)
          .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer()
        dataUrl = `data:image/webp;base64,${compressedBuffer.toString('base64')}`
      } catch (sharpErr) {
        console.warn('Sharp compression skipped or unavailable:', sharpErr)
      }
      
      return NextResponse.json({ 
        success: true, 
        url: dataUrl 
      })
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
