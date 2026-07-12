'use client'

import { ArrowUp, ShieldCheck } from 'lucide-react'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

export function Footer() {
  const handleScrollToTop = () => {
    const el = document.getElementById('hero')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#08080A] px-6 py-12 md:px-12 md:py-20 select-none pointer-events-auto">
      
      {/* Background line grid decor */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <svg viewBox="0 0 100 100" className="h-5 w-5 fill-white">
                  <path d="M50 15 L85 35 L85 65 L50 85 L15 65 L15 35 Z" fill="none" stroke="currentColor" strokeWidth="6" />
                  <circle cx="50" cy="50" r="10" />
                </svg>
              </div>
              <span className="font-heading text-lg font-bold tracking-widest text-white">
                PRIGENIX
              </span>
            </div>
            
            <p className="max-w-sm font-mono text-xs leading-relaxed text-text-muted">
              Architecting state-of-the-art enterprise automation, responsive full-stack applications, and cognitive agent ecosystems. Engineered for operational resilience.
            </p>

            <div className="mt-2 flex gap-3">
              <a href="#" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-text-muted hover:border-white/20 hover:text-white transition-all">
                <LinkedinIcon className="h-3.5 w-3.5" />
              </a>
              <a href="#" aria-label="GitHub" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-text-muted hover:border-white/20 hover:text-white transition-all">
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
              <a href="#" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-text-muted hover:border-white/20 hover:text-white transition-all">
                <TwitterIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">Nexus Sectors</h4>
            <ul className="flex flex-col gap-2.5 font-sans text-sm text-text-muted">
              <li><a href="#services" className="hover:text-accent-cyan transition-colors">Capabilities</a></li>
              <li><a href="#about" className="hover:text-accent-cyan transition-colors">Studio Mission</a></li>
              <li><a href="#cases" className="hover:text-accent-cyan transition-colors">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-accent-cyan transition-colors">Consultations</a></li>
            </ul>
          </div>

          {/* Compliance & System details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">System Status</h4>
            <div className="flex flex-col gap-3 font-mono text-[10px] text-text-muted">
              <div className="flex items-center gap-1.5 text-[#10B981]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-accent-purple" />
                <span>WCAG & HIPAA COMPLIANT</span>
              </div>
              <div>VERSION: 2.1.0_NEXUS</div>
              <div>BUILD TIME: 2026_JULY</div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and Scroll-to-top */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 font-mono text-[10px] text-text-muted gap-4">
          <div>
            © 2026 PRIGENIX STUDIO. ALL RIGHTS RESERVED.
          </div>

          <button 
            onClick={handleScrollToTop}
            className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 hover:bg-white/10 text-white transition-all active:scale-95"
          >
            Scroll to Top <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  )
}
