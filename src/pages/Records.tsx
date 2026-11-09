import { useState } from 'react'
import { Check } from 'lucide-react'
import { Badge, Button, Checkbox, Field, PageHeader, Select, Textarea, TextInput } from '../components'
import { todayVisits, visitTone } from '../data/mock'

const bodyItems = ['排泄介助', '食事介助', '入浴介助（部分浴）', '更衣介助', '体位変換', '服薬確認']
const lifeItems = ['掃除', '洗濯', '調理', '買い物']

export function RecordsPage() {
  const [selected, setSelected] = useState(1)
  const [checked, setChecked] = useState<Record<string, boolean>>({ 排泄介助: true, 更衣介助: true, 服薬確認: true })
  const v = todayVisits[selected]
  const toggle = (k: string) => (val: boolean) => setChecked((c) => ({ ...c, [k]: val }))

  return (
    <>
      <PageHeader title="サービス提供記録" />
      <div className="page" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', alignItems: 'start' }}>
        <section className="card" style={{ overflow: 'hidden' }}>
          <div className="card__header">
            <h2 className="card__title">本日の訪問</h2>
            <span className="muted">11/9（月）</span>
          </div>
          {todayVisits.map((t, i) => (
            <button
              key={t.time}
              onClick={() => setSelected(i)}
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-12) var(--space-20)',
                border: 0,
                borderTop: '1px solid var(--color-border-default)',
                borderLeft: `3px solid ${i === selected ? 'var(--color-border-brand)' : 'transparent'}`,
                background: i === selected ? 'var(--color-bg-brand-subtle)' : 'var(--color-bg-surface)',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <span>
                <div style={{ font: 'var(--text-body-m-bold)' }}>{t.client}</div>
                <div className="muted">
                  {t.time}・{t.service}
                </div>
              </span>
              <Badge tone={visitTone[t.status]}>{t.status}</Badge>
            </button>
          ))}
        </section>

        <section className="card">
          <div className="card__header" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
            <div className="row" style={{ gap: 'var(--space-12)' }}>
              <h2 className="card__title">{v.client} さま</h2>
              <Badge tone="brand">要介護2</Badge>
              <Badge tone={visitTone[v.status]}>{v.status}</Badge>
            </div>
            <span className="muted">記録者：{v.staff}</span>
          </div>
          <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)', paddingTop: 'var(--space-20)' }}>
            <Section title="訪問情報">
              <Grid cols={4}>
                <Field label="サービス提供日"><TextInput defaultValue="2026/11/09" /></Field>
                <Field label="開始時刻"><TextInput defaultValue={v.time.split('–')[0]} /></Field>
                <Field label="終了時刻"><TextInput defaultValue={v.time.split('–')[1]} /></Field>
                <Field label="サービス種別">
                  <Select defaultValue={v.service}>
                    <option>身体介護</option>
                    <option>生活援助</option>
                    <option>身体生活</option>
                  </Select>
                </Field>
              </Grid>
            </Section>

            <Section title="バイタル">
              <Grid cols={4}>
                <Field label="体温（℃）"><TextInput defaultValue="36.4" /></Field>
                <Field label="血圧（mmHg）"><TextInput defaultValue="128 / 76" /></Field>
                <Field label="脈拍（回/分）"><TextInput defaultValue="72" /></Field>
                <Field label="顔色・様子"><Select defaultValue="良好"><option>良好</option><option>普通</option><option>不良</option></Select></Field>
              </Grid>
            </Section>

            <Section title="実施内容">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)' }}>
                <CheckGroup title="身体介護" items={bodyItems} checked={checked} toggle={toggle} />
                <CheckGroup title="生活援助" items={lifeItems} checked={checked} toggle={toggle} />
              </div>
            </Section>

            <Section title="特記事項">
              <Textarea defaultValue="昼食は7割程度摂取。右膝の痛みの訴えあり、歩行時はふらつきなし。ご家族へ申し送り済み。" />
            </Section>

            <div className="row" style={{ justifyContent: 'flex-end', gap: 'var(--space-8)' }}>
              <Button>下書き保存</Button>
              <Button variant="primary" icon={Check}>
                記録を確定
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      <h3 style={{ font: 'var(--text-label-m)' }}>{title}</h3>
      {children}
    </div>
  )
}
function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--space-16)' }}>{children}</div>
}
function CheckGroup({ title, items, checked, toggle }: { title: string; items: string[]; checked: Record<string, boolean>; toggle: (k: string) => (v: boolean) => void }) {
  return (
    <div style={{ padding: 'var(--space-16)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      <span className="muted">{title}</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
        {items.map((k) => (
          <Checkbox key={k} label={k} checked={!!checked[k]} onChange={toggle(k)} />
        ))}
      </div>
    </div>
  )
}
