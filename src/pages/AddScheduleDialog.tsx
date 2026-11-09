import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Check, X } from 'lucide-react'
import { Button, Field, SearchInput, Segmented, Select, Textarea, type Service } from '../components'
import { clients, staffList, type Visit } from '../data/mock'

const TIME_OPTIONS = Array.from({ length: 21 }, (_, index) => {
  const minutes = 8 * 60 + index * 30
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
})

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

type AddScheduleDialogProps = {
  visits: Visit[]
  onClose: () => void
  onSubmit: (visit: Visit) => void
}

export function AddScheduleDialog({ visits, onClose, onSubmit }: AddScheduleDialogProps) {
  const [staff, setStaff] = useState(staffList[0].name)
  const [clientValue, setClientValue] = useState(`${clients[0].name}（${clients[0].kana}）・${clients[0].careLevel}`)
  const [service, setService] = useState<Service>('身体介護')
  const [start, setStart] = useState('16:00')
  const [end, setEnd] = useState('17:00')
  const [memo, setMemo] = useState('入浴後の保湿ケアを追加。ご家族在宅予定。')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const selectedStaff = staffList.find((member) => member.name === staff) ?? staffList[0]
  const selectedClient = clients.find((client) => clientValue.startsWith(client.name))
  const duration = toMinutes(end) - toMinutes(start)
  const hasConflict = useMemo(
    () =>
      visits.some(
        (visit) =>
          visit.staff === staff &&
          toMinutes(visit.start) < toMinutes(end) &&
          toMinutes(visit.end) > toMinutes(start),
      ),
    [end, staff, start, visits],
  )
  const isValid = Boolean(selectedClient) && duration > 0 && !hasConflict

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (toMinutes(end) > toMinutes(start)) return
    setEnd(TIME_OPTIONS.find((time) => toMinutes(time) === toMinutes(start) + 60) ?? '18:00')
  }, [end, start])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!selectedClient || !isValid) return
    onSubmit({ staff, start, end, client: selectedClient.name, service })
  }

  return (
    <div className="schedule-dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="schedule-dialog" role="dialog" aria-modal="true" aria-labelledby="add-schedule-title" onSubmit={handleSubmit}>
        <header className="schedule-dialog__header">
          <h2 id="add-schedule-title">予定を追加</h2>
          <button ref={closeButtonRef} type="button" className="schedule-dialog__close" aria-label="閉じる" onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>
        </header>

        <div className="schedule-dialog__content">
          <div className="schedule-dialog__two-columns">
            <Field label="日付">
              <Select defaultValue="2026-11-09">
                <option value="2026-11-09">2026/11/09（月）</option>
              </Select>
            </Field>
            <Field label="繰り返し">
              <Select defaultValue="none">
                <option value="none">なし</option>
                <option value="weekly">毎週</option>
              </Select>
            </Field>
          </div>

          <Field label="職員">
            <Select value={staff} onChange={(event) => setStaff(event.target.value)}>
              {staffList.map((member) => (
                <option key={member.name} value={member.name}>
                  {member.name}（{member.role}）
                </option>
              ))}
            </Select>
          </Field>

          <Field label="利用者">
            <SearchInput
              list="schedule-client-options"
              value={clientValue}
              onChange={(event) => setClientValue(event.target.value)}
              aria-label="利用者を検索"
            />
            <datalist id="schedule-client-options">
              {clients.map((client) => (
                <option key={client.id} value={`${client.name}（${client.kana}）・${client.careLevel}`} />
              ))}
            </datalist>
          </Field>

          <Field label="サービス種別">
            <Segmented
              value={service}
              onChange={setService}
              options={[
                { value: '身体介護', label: '身体介護' },
                { value: '生活援助', label: '生活援助' },
                { value: '身体生活', label: '身体生活' },
              ]}
            />
          </Field>

          <div className="schedule-dialog__time-row">
            <Field label="開始時刻">
              <Select value={start} onChange={(event) => setStart(event.target.value)}>
                {TIME_OPTIONS.slice(0, -1).map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </Select>
            </Field>
            <Field label="終了時刻">
              <Select value={end} onChange={(event) => setEnd(event.target.value)}>
                {TIME_OPTIONS.filter((time) => toMinutes(time) > toMinutes(start)).map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </Select>
            </Field>
            <div className="field">
              <span className="field__label">所要時間</span>
              <span className="schedule-dialog__duration">{duration > 0 ? `${duration}分` : '—'}</span>
            </div>
          </div>

          <div className={`schedule-dialog__availability ${hasConflict ? 'schedule-dialog__availability--conflict' : ''}`} role="status">
            <Check size={16} strokeWidth={2} />
            <span>
              {hasConflict
                ? `${selectedStaff.name}さんのこの時間帯には、ほかの予定があります`
                : `${selectedStaff.name}さんのこの時間帯に、ほかの予定はありません`}
            </span>
          </div>

          <Field label="メモ（任意）">
            <Textarea value={memo} onChange={(event) => setMemo(event.target.value)} />
          </Field>
        </div>

        <footer className="schedule-dialog__footer">
          <Button type="button" onClick={onClose}>キャンセル</Button>
          <Button type="submit" variant="primary" disabled={!isValid}>登録</Button>
        </footer>
      </form>
    </div>
  )
}
