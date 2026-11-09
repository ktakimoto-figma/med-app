import { useMemo, useState } from 'react'
import { Download, Plus } from 'lucide-react'
import { Avatar, Badge, Button, PageHeader, SearchInput, Select, StackedCell } from '../components'
import { clients, statusTone } from '../data/mock'

export function ClientsPage() {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState('all')
  const list = useMemo(
    () => clients.filter((c) => (c.name + c.kana).includes(q) && (level === 'all' || c.careLevel.startsWith(level))),
    [q, level],
  )

  return (
    <>
      <PageHeader title="利用者" />
      <div className="page">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row" style={{ gap: 'var(--space-12)' }}>
            <SearchInput style={{ width: 280 }} placeholder="氏名・フリガナで検索" value={q} onChange={(e) => setQ(e.target.value)} />
            <Select style={{ width: 180 }} value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="all">要介護度：すべて</option>
              <option value="要支援">要支援</option>
              <option value="要介護">要介護</option>
            </Select>
            <Select style={{ width: 180 }} defaultValue="all">
              <option value="all">担当職員：すべて</option>
            </Select>
          </div>
          <div className="row">
            <Button icon={Download}>CSV出力</Button>
            <Button variant="primary" icon={Plus}>
              利用者を追加
            </Button>
          </div>
        </div>

        <section className="card" style={{ overflow: 'hidden' }}>
          <div className="card__header">
            <h2 className="card__title">利用者一覧</h2>
            <span className="muted">全 {list.length} 件</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>利用者</th>
                <th>要介護度</th>
                <th>担当ケアマネ</th>
                <th>担当職員</th>
                <th>住所</th>
                <th>次回訪問</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="row" style={{ gap: 'var(--space-12)' }}>
                      <Avatar name={c.name} />
                      <StackedCell main={c.name} sub={c.kana} />
                    </span>
                  </td>
                  <td>
                    <Badge tone="brand">{c.careLevel}</Badge>
                  </td>
                  <td>{c.careManager}</td>
                  <td>{c.staff}</td>
                  <td>{c.address}</td>
                  <td>{c.nextVisit}</td>
                  <td>
                    <Badge tone={statusTone[c.status]}>{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}
