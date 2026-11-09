import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Send, TriangleAlert } from 'lucide-react'
import { Badge, Button, PageHeader, Select, StackedCell } from '../components'

type Row = { doc: string; code: string; items: { month: string; form: string; count: number }[] }
const rows: Row[] = [
  { doc: '介護給付費明細書', code: '1312345678', items: [{ month: '令和8年10月', form: '様式第二', count: 38 }, { month: '令和8年9月', form: '様式第二', count: 2 }] },
  { doc: '介護予防・日常生活支援総合事業費明細書', code: '1312345678', items: [{ month: '令和8年10月', form: '様式第二の二', count: 4 }] },
]

export function BillingPage() {
  const [sent, setSent] = useState(false)
  const status = sent ? <Badge tone="success">送信済</Badge> : <Badge tone="neutral">未送信</Badge>

  return (
    <>
      <PageHeader title="国保連請求" />
      <div className="page" style={{ maxWidth: 1080 }}>
        <div className="row" style={{ gap: 'var(--space-12)' }}>
          <span style={{ font: 'var(--text-heading-m)' }}>請求年月</span>
          <Button size="s" variant="ghost" icon={ChevronLeft} aria-label="前月" />
          <Select style={{ width: 160 }} defaultValue="r8-11">
            <option value="r8-11">令和8年11月</option>
            <option value="r8-10">令和8年10月</option>
          </Select>
          <Button size="s" variant="ghost" icon={ChevronRight} aria-label="翌月" disabled />
        </div>

        <div className="card row" style={{ padding: 'var(--space-12) var(--space-16)', background: 'var(--color-status-warning-bg)', borderColor: 'transparent', color: 'var(--color-status-warning-text)' }}>
          <TriangleAlert size={18} />
          <span>未確定のサービス提供記録が 3 件あります。伝送前に実績を確定してください。</span>
          <span style={{ flex: 1 }} />
          <Button size="s" variant="ghost">記録を確認</Button>
        </div>

        <section className="card">
          <div className="card__header">
            <h2 className="card__title">国保連請求</h2>
            <div className="row">
              <Button size="s">様式出力</Button>
              <Button size="s">伝送詳細を確認</Button>
              <Button size="s" variant="primary" icon={Send} disabled={sent} onClick={() => setSent(true)}>
                伝送開始
              </Button>
            </div>
          </div>
          <div className="card__body">
            <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>書類</th>
                    <th>サービス提供年月</th>
                    <th>様式</th>
                    <th style={{ textAlign: 'right' }}>件数</th>
                    <th style={{ width: 120 }}>伝送状況</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.flatMap((r) =>
                    r.items.map((it, i) => (
                      <tr key={r.doc + it.month}>
                        {i === 0 && (
                          <td rowSpan={r.items.length} style={{ borderRight: '1px solid var(--color-border-default)' }}>
                            <StackedCell main={r.doc} sub={r.code} />
                          </td>
                        )}
                        <td>{it.month}</td>
                        <td>{it.form}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="cell-link">{it.count}</button>
                        </td>
                        <td>{status}</td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 'var(--space-8)' }}>
              <Button size="s" variant="ghost">伝送状況を取得</Button>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card__header">
            <h2 className="card__title">地域包括支援センター提出分</h2>
            <Button variant="primary" size="s" icon={Download}>
              様式出力
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
