// Sketch of the housing dashboard: a recorded trend, a model's predicted
// continuation with an uncertainty band, and feature importance on the side.
// Shapes are illustrative, not real figures.

const recorded: [number, number][] = [
  [0, 150], [45, 141], [90, 146], [135, 126], [180, 118], [225, 123], [270, 101], [300, 94],
]
const predicted: [number, number][] = [[300, 94], [335, 82], [370, 74], [400, 62]]
const spread = [0, 10, 18, 26]

const toPath = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')
const band =
  predicted.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y - spread[i]}`).join(' ') +
  ' ' +
  [...predicted].reverse().map(([x, y], i) => `L${x},${y + spread[spread.length - 1 - i]}`).join(' ') +
  ' Z'
const area = `${toPath(recorded)} L300,180 L0,180 Z`

const factors = [
  { name: 'Land size', v: 0.82 },
  { name: 'Distance to CBD', v: 0.64 },
  { name: 'Bedrooms', v: 0.47 },
  { name: 'Year built', v: 0.28 },
]

export function HousingMockup() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-4 text-[10px] sm:gap-4 sm:p-6 sm:text-xs">
      <div className="col-span-2 flex min-w-0 flex-col rounded-lg border border-line bg-bg/70 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="h-2 w-1/3 rounded-full bg-fg/30" />
          <div className="flex gap-3 text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-fg/70" />
              Recorded
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-accent" />
              Predicted
            </span>
          </div>
        </div>
        <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="mt-3 h-full w-full flex-1" aria-hidden>
          {[36, 72, 108, 144].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} className="stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} className="fill-fg/5" />
          <path d={band} className="fill-accent/15" />
          <path d={toPath(recorded)} fill="none" className="stroke-fg/70" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d={toPath(predicted)} fill="none" className="stroke-accent" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="flex min-w-0 flex-col gap-2.5 rounded-lg border border-line bg-bg/70 p-3">
        <span className="text-muted">Feature weight</span>
        {factors.map((f) => (
          <div key={f.name}>
            <span className="block truncate text-fg/80">{f.name}</span>
            <div className="mt-1 h-1.5 rounded-full bg-line">
              <div className="h-full rounded-full bg-accent/80" style={{ width: `${f.v * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
