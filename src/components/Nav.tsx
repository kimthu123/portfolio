import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { useTheme } from '../hooks/useTheme'

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const { theme, toggle } = useTheme()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  // Highlight the section currently in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-display text-[1.05rem] font-semibold tracking-tight">
          {site.name}
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="btn btn-primary hidden h-9 px-4 md:inline-flex">
            Get in touch
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-fg hover:bg-surface md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="wrap flex flex-col pb-6 pt-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-3.5 font-display text-2xl font-medium tracking-tight"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </header>
  )
}
