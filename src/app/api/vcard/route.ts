import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Khan;Abbas;;Mr.;',
    'FN:Mr. Abbas Khan',
    'ORG:Bharat Machine Tools',
    'TITLE:Founder & Managing Director',
    'TEL;TYPE=CELL,VOICE:+919880464557',
    'TEL;TYPE=WORK,VOICE:+918048031763',
    'TEL;TYPE=WORK,VOICE:+919530208882',
    'EMAIL;TYPE=WORK,INTERNET:bmt.abbas@gmail.com',
    'EMAIL;TYPE=WORK,INTERNET:bmt.sangeeta@gmail.com',
    'URL:https://bmt.prigenix.com',
    'ADR;TYPE=WORK:;;#312 Ground Floor, Sharadhamma Illam, GPT, 1st Main Nagappa Block, Near Abbigere HP Petrol Pump, Abbigere, Chikkabanavara;Bangalore;Karnataka;560090;India',
    'NOTE:Bharat Machine Tools - Precision Motorized Spindles, Hydrostatic Bearings, Ball Screws, Defense Actuators & Turnkey CNC Reconditioning. CMTI Panelist.',
    'END:VCARD'
  ].join('\r\n')

  return new NextResponse(vCardContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Abbas_Khan_BMT.vcf"'
    }
  })
}
