// Logs coming in on the left, each classified by the LLM. On the right, the
// past tickets RAG found for the selected log. Illustrative values only.
const logs = [
  { t: '14:02:11', level: 'error', label: 'Database', w: '78%', active: true },
  { t: '14:02:09', level: 'warn', label: 'Auth', w: '62%' },
  { t: '14:01:57', level: 'error', label: 'Network', w: '70%' },
  { t: '14:01:40', level: 'info', label: 'Deploy', w: '54%' },
  { t: '14:01:22', level: 'warn', label: 'Database', w: '66%' },
]
const tickets = [
  { id: '#1042', score: 0.92, w: '80%' },
  { id: '#0987', score: 0.86, w: '64%' },
  { id: '#0911', score: 0.71, w: '72%' },
]

const levelStyle: Record<string, string> = {
  error: 'bg-red-500/15 text-red-500',
  warn: 'bg-amber-500/15 text-amber-500',
  info: 'bg-fg/10 text-muted',
}

export function AiOpsMockup() {
  return (
    <div className="grid h-full grid-cols-5 gap-3 p-4 text-[10px] sm:gap-4 sm:p-6 sm:text-xs">
      <div className="col-span-3 flex min-w-0 flex-col rounded-lg border border-line bg-bg/70">
        <div className="border-b border-line px-3 py-2 text-muted">Incoming logs</div>
        <ul className="flex flex-1 flex-col">
          {logs.map((l) => (
            <li
              key={l.t}
              className={`flex flex-1 items-center gap-2 border-b border-line/60 px-3 last:border-0 ${
                l.active ? 'bg-accent/10' : ''
              }`}
            >
              <span className="hidden shrink-0 tabular-nums text-muted sm:inline">{l.t}</span>
              <span className={`shrink-0 rounded px-1.5 py-0.5 ${levelStyle[l.level]}`}>{l.level}</span>
              <span className="h-1.5 min-w-0 flex-1 rounded-full bg-fg/15" style={{ maxWidth: l.w }} />
              <span className="shrink-0 text-accent">{l.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 flex min-w-0 flex-col gap-2 rounded-lg border border-line bg-bg/70 p-3">
        <span className="text-muted">Similar tickets</span>
        {tickets.map((t) => (
          <div key={t.id} className="flex-1 rounded-md border border-line bg-surface px-2.5 py-2">
            <div className="flex justify-between">
              <span className="text-fg/85">{t.id}</span>
              <span className="tabular-nums text-muted">{t.score.toFixed(2)}</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-fg/15" style={{ width: t.w }} />
            <div className="mt-1 h-1 w-1/2 rounded-full bg-fg/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
