import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  try {
    const { type, message } = await req.json()
    const logPath = path.join(process.cwd(), "public", "browser-debug.log")
    const timestamp = new Date().toISOString()
    const logLine = `[${timestamp}] [${type}] ${message}\n`
    fs.appendFileSync(logPath, logLine, "utf8")
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
