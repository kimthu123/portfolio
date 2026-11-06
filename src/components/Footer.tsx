import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
        <p>Built with React, TypeScript, Tailwind CSS and Framer Motion.</p>
        <a href="#top" className="hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  )
}
