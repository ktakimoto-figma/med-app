import { Link } from 'react-router-dom'
import { CalendarDays, ClipboardCheck, JapaneseYen, TriangleAlert } from 'lucide-react'
import { Avatar, Badge, Button, PageHeader, StatCard } from '../components'
import { notices, todayVisits, visitTone } from '../data/mock'

export function HomePage() {
  return (
    <>
      <PageHeader title="ホーム" />
      <div className="page">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-16)' }}>
          <StatCard icon={CalendarDays} label="本日の訪問" value="12" unit="件" note="完了 5 / 予定 7" />
          <StatCard icon={ClipboardCheck} label="記録の未入力" value="3" unit="件" note="昨日以前の未確定 1 件を含む" />
          <StatCard icon={JapaneseYen} label="10月分 請求予定額" value="1,284,300" unit="円" note="利用者 42 名 / 伝送期限 11/10" />
          <StatCard icon={TriangleAlert} label="要対応" value="2" unit="件" note="入院連絡・計画書更新" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
          <section className="card">
            <div className="card__header">
              <h2 className="card__title">本日の訪問予定</h2>
              <Link to="/schedule">
                <Button variant="ghost" size="s">
                  スケジュールを見る
                </Button>
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 130 }}>時間</th>
                  <th>利用者</th>
                  <th>サービス</th>
                  <th>担当</th>
                  <th style={{ width: 100 }}>状況</th>
                </tr>
              </thead>
              <tbody>
                {todayVisits.map((v) => (
                  <tr key={v.time + v.client}>
                    <td>{v.time}</td>
                    <td style={{ fontWeight: 700 }}>{v.client}</td>
                    <td>{v.service}</td>
                    <td>
                      <span className="row">
                        <Avatar name={v.staff} size="s" />
                        {v.staff}
                      </span>
                    </td>
                    <td>
                      <Badge tone={visitTone[v.status]}>{v.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <div className="card__header">
              <h2 className="card__title">お知らせ</h2>
            </div>
            <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
              {notices.map((n) => (
                <div key={n.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingBottom: 'var(--space-12)', borderBottom: '1px solid var(--color-border-default)' }}>
                  <div className="row">
                    <Badge tone={n.tone}>{n.tag}</Badge>
                    <span className="muted">{n.date}</span>
                  </div>
                  <p>{n.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
