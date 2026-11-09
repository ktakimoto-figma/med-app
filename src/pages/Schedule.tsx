import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Avatar, Badge, Button, PageHeader, ScheduleBlock, Segmented, Select } from '../components'
import { staffList, visits } from '../data/mock'

const START_HOUR = 8
const END_HOUR = 18
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function SchedulePage() {
  const [view, setView] = useState<'staff' | 'client'>('staff')
  const [range, setRange] = useState<'day' | 'week'>('day')
  const total = (END_HOUR - START_HOUR) * 60

  return (
    <>
      <PageHeader title="スケジュール" />
      <div className="page">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row" style={{ gap: 'var(--space-12)' }}>
            <Segmented value={view} onChange={setView} options={[{ value: 'staff', label: '職員' }, { value: 'client', label: '利用者' }]} />
            <Segmented value={range} onChange={setRange} options={[{ value: 'day', label: '日' }, { value: 'week', label: '週' }]} />
            <Select style={{ width: 200 }} defaultValue="all">
              <option value="all">グループ：全職員</option>
              <option value="a">グループ：中央チーム</option>
            </Select>
          </div>
          <div className="row">
            <Button size="m" icon={ChevronLeft} aria-label="前日" />
            <Button>今日</Button>
            <Button size="m" icon={ChevronRight} aria-label="翌日" />
            <span style={{ font: 'var(--text-heading-m)', margin: '0 var(--space-8)' }}>2026年11月9日（月）</span>
            <Button variant="primary" icon={Plus}>
              予定を追加
            </Button>
          </div>
        </div>

        <section className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
            <div className="table" style={{ display: 'contents' }}>
              <div style={{ height: 40, background: 'var(--color-bg-canvas)', borderBottom: '1px solid var(--color-border-default)', borderRight: '1px solid var(--color-border-default)', display: 'flex', alignItems: 'center', padding: '0 var(--space-16)', font: 'var(--text-label-s)', color: 'var(--color-text-secondary)' }}>
                職員名
              </div>
              <div style={{ display: 'flex', height: 40, background: 'var(--color-bg-canvas)', borderBottom: '1px solid var(--color-border-default)' }}>
                {HOURS.map((h) => (
                  <div key={h} style={{ flex: 1, borderLeft: '1px solid var(--color-border-default)', padding: '0 var(--space-8)', display: 'flex', alignItems: 'center', font: 'var(--text-label-s)', color: 'var(--color-text-secondary)' }}>
                    {h}:00
                  </div>
                ))}
              </div>
            </div>

            {staffList.map((s) => (
              <Row key={s.name} name={s.name} role={s.role}>
                {visits
                  .filter((v) => v.staff === s.name)
                  .map((v) => {
                    const left = ((toMin(v.start) - START_HOUR * 60) / total) * 100
                    const width = ((toMin(v.end) - toMin(v.start)) / total) * 100
                    return <ScheduleBlock key={v.start} service={v.service} time={`${v.start}–${v.end}`} client={v.client} style={{ left: `calc(${left}% + 2px)`, width: `calc(${width}% - 4px)` }} />
                  })}
              </Row>
            ))}
          </div>
        </section>

        <div className="row" style={{ gap: 'var(--space-16)' }}>
          <span className="muted">凡例</span>
          <span className="row"><Swatch c="body" />身体介護</span>
          <span className="row"><Swatch c="life" />生活援助</span>
          <span className="row"><Swatch c="mixed" />身体・生活</span>
          <Badge tone="warning">未割当 1 件</Badge>
        </div>
      </div>
    </>
  )

  function Row({ name, role, children }: { name: string; role: string; children: React.ReactNode }) {
    return (
      <>
        <div className="row" style={{ height: 64, padding: '0 var(--space-16)', borderBottom: '1px solid var(--color-border-default)', borderRight: '1px solid var(--color-border-default)', background: 'var(--color-bg-surface)' }}>
          <Avatar name={name} />
          <div>
            <div style={{ font: 'var(--text-label-m)' }}>{name}</div>
            <div className="muted">{role}</div>
          </div>
        </div>
        <div style={{ position: 'relative', height: 64, borderBottom: '1px solid var(--color-border-default)', background: `repeating-linear-gradient(to right, transparent 0, transparent calc(${100 / HOURS.length}% - 1px), var(--color-border-default) calc(${100 / HOURS.length}% - 1px), var(--color-border-default) ${100 / HOURS.length}%)` }}>
          {children}
        </div>
      </>
    )
  }
}

function Swatch({ c }: { c: 'body' | 'life' | 'mixed' }) {
  return <span style={{ width: 12, height: 12, borderRadius: 3, background: `var(--color-service-${c}-bg)`, borderLeft: `3px solid var(--color-service-${c}-accent)` }} />
}
