import { Plus } from 'lucide-react'

// A phone running a RecyclerView list, next to the MVVM layers behind it.
const layers = ['View (RecyclerView)', 'ViewModel', 'Repository', 'Room database']

export function MobileMockup() {
  return (
    <div className="flex h-full items-center justify-center gap-6 p-4 text-[10px] sm:gap-12 sm:text-xs">
      <div className="relative aspect-[9/19] h-[88%] rounded-[1.4rem] border border-line bg-bg p-1.5">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.05rem] bg-surface">
          <div className="flex items-center justify-between px-3 pb-1 pt-2">
            <div className="h-1 w-4 rounded-full bg-fg/40" />
            <div className="h-1 w-6 rounded-full bg-fg/25" />
          </div>
          <div className="px-3 py-2">
            <div className="h-2 w-1/2 rounded-full bg-fg/45" />
          </div>
          <ul className="flex-1">
            {[0.7, 0.55, 0.8, 0.5, 0.65, 0.45].map((w, i) => (
              <li key={i} className="flex items-center gap-2 border-t border-line px-3 py-[7px]">
                <span className="h-4 w-4 shrink-0 rounded-full bg-accent/25" />
                <span className="flex-1 space-y-1">
                  <span className="block h-1 rounded-full bg-fg/30" style={{ width: `${w * 100}%` }} />
                  <span className="block h-1 w-2/5 rounded-full bg-fg/10" />
                </span>
              </li>
            ))}
          </ul>
          <span className="absolute bottom-4 right-4 grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-ink">
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </div>

      <ol className="hidden flex-col items-start sm:flex">
        {layers.map((l, i) => (
          <li key={l} className="flex flex-col items-start">
            {i > 0 && <span className="ml-4 h-4 w-px bg-line" />}
            <span
              className={`rounded-md border px-3 py-1.5 ${
                i === layers.length - 1 ? 'border-accent/50 text-accent' : 'border-line bg-bg text-fg/80'
              }`}
            >
              {l}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
