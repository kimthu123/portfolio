import { useRef, useState, type FormEvent } from 'react'
import { Check, Copy, Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { site } from '../data/site'

/*
  The form opens the visitor's email app with the message filled in, so it works
  with no backend. To receive messages directly instead, swap handleSubmit for a
  POST to Formspree, Web3Forms or your own API.
*/
export function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'opened'>('idle')
  const emailRef = useRef<HTMLSpanElement>(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = emailRef.current
      if (!el) return
      const range = document.createRange()
      range.selectNodeContents(el)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const from = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}\n${from}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus('opened')
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 py-20 md:py-28">
      <div className="wrap">
        <motion.div
          aria-hidden
          className="h-px w-full origin-left bg-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <h2
          id="contact-title"
          className="mt-10 max-w-[16ch] font-display text-[clamp(2.4rem,6.2vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          style={{ fontVariationSettings: "'wdth' 86, 'opsz' 96" }}
        >
          Have an idea? Let's build something meaningful.
        </h2>

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted">
              I'm looking for cloud, DevOps, platform or application support roles in Melbourne, and I'm
              happy to chat about projects too. Email is the quickest way to reach me.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-2 pl-4">
              <span ref={emailRef} className="min-w-0 flex-1 select-all break-all font-medium">
                {site.email}
              </span>
              <button type="button" onClick={copyEmail} className="btn btn-secondary h-9 px-3">
                {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>

            <ul className="mt-6 flex flex-col gap-1">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 py-2 text-fg/85 hover:text-fg"
                >
                  <Github size={18} className="text-muted group-hover:text-accent" aria-hidden />
                  GitHub
                  <span className="text-muted">@{site.githubHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 py-2 text-fg/85 hover:text-fg"
                >
                  <Linkedin size={18} className="text-muted group-hover:text-accent" aria-hidden />
                  LinkedIn
                  <span className="text-muted">{site.linkedinHandle}</span>
                </a>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:col-span-6 md:col-start-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                  Your name
                </label>
                <input id="contact-name" name="name" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="A role, a project, or just a question"
                className="field resize-y"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn btn-primary">
                Send message
              </button>
              <p aria-live="polite" className="text-sm text-muted">
                {status === 'opened' &&
                  `Your email app should open with this message ready. If it didn't, copy my address and send it from there.`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
