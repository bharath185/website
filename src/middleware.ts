import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // 1. Handle Legacy Search Paths: /Products/search/:term/:page or /search/:term/:page
  const searchMatch = pathname.match(/^\/(?:Products|products|search)\/search\/([^\/]+)(?:\/.*)?$/i)
  if (searchMatch) {
    const term = searchMatch[1]
    url.pathname = '/products'
    if (term && term !== '1' && term.toLowerCase() !== 'all') {
      url.searchParams.set('search', decodeURIComponent(term))
    }
    return NextResponse.redirect(url, { status: 301 })
  }

  const directSearchMatch = pathname.match(/^\/search\/([^\/]+)(?:\/.*)?$/i)
  if (directSearchMatch) {
    const term = directSearchMatch[1]
    url.pathname = '/products'
    if (term && term !== '1' && term.toLowerCase() !== 'all') {
      url.searchParams.set('search', decodeURIComponent(term))
    }
    return NextResponse.redirect(url, { status: 301 })
  }

  // 2. Handle Legacy Updates / Articles: /latest-update/:slug/:id
  const articleMatch = pathname.match(/^\/(?:latest-update|latest-updates)\/([^\/]+)(?:\/.*)?$/i)
  if (articleMatch) {
    const slug = articleMatch[1]
    // If slug is purely a numeric page (e.g. /latest-updates/8)
    if (/^\d+$/.test(slug)) {
      url.pathname = '/news'
      return NextResponse.redirect(url, { status: 301 })
    }
    url.pathname = `/news/${slug}`
    return NextResponse.redirect(url, { status: 301 })
  }

  // 3. Handle Legacy Gallery & Media: /videos/*, /image-gallery/*
  if (/^\/(?:videos|image-gallery)(?:\/.*)?$/i.test(pathname)) {
    url.pathname = '/gallery'
    return NextResponse.redirect(url, { status: 301 })
  }

  // 4. Handle Legacy Mapview / Contact: /mapview/*, /contact-us, /contactus
  if (/^\/(?:mapview|contact-us|contactus)(?:\/.*)?$/i.test(pathname)) {
    url.pathname = '/contact'
    return NextResponse.redirect(url, { status: 301 })
  }

  // 5. Handle Legacy About / Company Profile: /about-us, /aboutus, /about, /custom-pages/*
  if (/^\/(?:about-us|aboutus|about|custom-pages)(?:\/.*)?$/i.test(pathname)) {
    url.pathname = '/company-profile'
    return NextResponse.redirect(url, { status: 301 })
  }

  // 6. Handle Uppercase /Products
  if (/^\/Products$/i.test(pathname)) {
    url.pathname = '/products'
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|images|.*\\..*).*)',
  ],
}
