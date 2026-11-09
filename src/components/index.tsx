/**
 * つむぎケア UI コンポーネント
 * Figma「med-app-ds」のコンポーネントと 1:1 対応（名前・バリアント・プロパティ）。
 */
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Bell, Check, ChevronDown, Heart, Search, type LucideIcon } from 'lucide-react'

/* ---------- Button (Variant / Size / State, Label, Show Icon, Icon) ---------- */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'm' | 's'
  icon?: LucideIcon
}
export function Button({ variant = 'secondary', size = 'm', icon: Icon, children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={`btn btn--${variant} ${size === 's' ? 'btn--s' : ''} ${className}`} {...rest}>
      {Icon && <Icon size={size === 'm' ? 18 : 16} strokeWidth={2} />}
      {children}
    </button>
  )
}

/* ---------- Badge (Tone, Label) ---------- */
export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand'
export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

/* ---------- Input (Type = Text | Select | Search | Textarea) ---------- */
export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="input">
      <input {...props} />
    </div>
  )
}
export function SearchInput({ style, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="input" style={style}>
      <Search size={16} />
      <input type="search" {...props} />
    </div>
  )
}
export function Select({ children, style, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="input input--select" style={style}>
      <select {...props}>{children}</select>
      <ChevronDown size={16} />
    </div>
  )
}
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="input input--textarea">
      <textarea {...props} />
    </div>
  )
}
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  )
}

/* ---------- Checkbox (Checked, Label) ---------- */
export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="checkbox__box">{checked && <Check size={14} strokeWidth={3} />}</span>
      {label}
    </label>
  )
}

/* ---------- Segment Item (Selected, Label) ---------- */
export function Segmented<T extends string>({ options, value, onChange }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={o.value === value}
          className={`segmented__item ${o.value === value ? 'segmented__item--selected' : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ---------- Logo ---------- */
export function Logo() {
  return (
    <span className="logo">
      <span className="logo__mark">
        <Heart size={16} strokeWidth={2.25} />
      </span>
      つむぎケア
    </span>
  )
}

/* ---------- Page Header (Title) ---------- */
export function PageHeader({ title }: { title: string }) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <div className="page-header__actions">
        <span>2026年11月9日（月）</span>
        <button className="page-header__bell" aria-label="お知らせ">
          <Bell size={20} />
        </button>
      </div>
    </header>
  )
}

/* ---------- Avatar (Size, Initials) ---------- */
export function Avatar({ name, size = 'm' }: { name: string; size?: 'm' | 's' }) {
  return <span className={`avatar ${size === 's' ? 'avatar--s' : ''}`}>{name.slice(0, 2)}</span>
}

/* ---------- Stat Card (Label, Value, Unit, Note, Icon) ---------- */
export function StatCard({ icon: Icon, label, value, unit, note }: { icon: LucideIcon; label: string; value: string; unit?: string; note?: string }) {
  return (
    <div className="card stat-card">
      <div className="stat-card__top">
        <span className="stat-card__icon">
          <Icon size={18} />
        </span>
        {label}
      </div>
      <div className="stat-card__value">
        {value}
        {unit && <span className="stat-card__unit">{unit}</span>}
      </div>
      {note && <div className="stat-card__note">{note}</div>}
    </div>
  )
}

/* ---------- Table Cell (Type = Stacked) ---------- */
export function StackedCell({ main, sub }: { main: ReactNode; sub: ReactNode }) {
  return (
    <div>
      <div className="cell-stacked__main">{main}</div>
      <div className="cell-stacked__sub">{sub}</div>
    </div>
  )
}

/* ---------- Schedule Block (Service, Time, Client) ---------- */
export type Service = '身体介護' | '生活援助' | '身体生活'
const serviceClass: Record<Service, string> = { 身体介護: 'body', 生活援助: 'life', 身体生活: 'mixed' }
export function ScheduleBlock({ service, time, client, style }: { service: Service; time: string; client: string; style?: React.CSSProperties }) {
  return (
    <div className={`schedule-block schedule-block--${serviceClass[service]}`} style={style} title={`${time} ${client}（${service}）`}>
      <span className="schedule-block__time">{time}</span>
      <span className="schedule-block__client">{client}</span>
    </div>
  )
}
