import { NavLink } from 'react-router-dom'
import { CalendarDays, ChevronDown, ClipboardCheck, CircleHelp, House, JapaneseYen, Menu, User, Users } from 'lucide-react'
import { Logo } from '.'

const items = [
  { to: '/', label: 'ホーム', icon: House },
  { to: '/schedule', label: 'スケジュール', icon: CalendarDays },
  { to: '/clients', label: '利用者', icon: Users },
  { to: '/records', label: 'サービス提供記録', icon: ClipboardCheck },
  { to: '/billing', label: '国保連請求', icon: JapaneseYen },
]

/** Figma: Sidebar（Nav Item を内包） */
export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <Logo />
        <Menu size={20} />
      </div>
      <div className="sidebar__office">
        <div>
          <div className="sidebar__office-label">事業所</div>
          <div className="sidebar__office-name">つむぎ訪問介護 中央</div>
        </div>
        <ChevronDown size={16} />
      </div>
      <nav className="sidebar__nav">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}>
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__footer">
        <a className="nav-item" href="#help">
          <CircleHelp size={20} />
          ヘルプ
        </a>
        <div className="sidebar__user">
          <User size={20} />
          <span>佐藤 美咲（管理者）</span>
        </div>
      </div>
    </aside>
  )
}
