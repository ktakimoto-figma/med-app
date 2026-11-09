import type { BadgeTone, Service } from '../components'

export type Client = {
  id: string
  name: string
  kana: string
  careLevel: string
  careManager: string
  staff: string
  address: string
  nextVisit: string
  status: '利用中' | '入院中' | '休止'
}

export const clients: Client[] = [
  { id: 'c1', name: '高橋 和子', kana: 'タカハシ カズコ', careLevel: '要介護2', careManager: 'みどり居宅 / 森田', staff: '田中 良子', address: '中央区本町 2-4-1', nextVisit: '11/9（月）09:00', status: '利用中' },
  { id: 'c2', name: '鈴木 一郎', kana: 'スズキ イチロウ', careLevel: '要介護1', careManager: 'みどり居宅 / 森田', staff: '鈴木 さくら', address: '中央区桜町 1-12-8', nextVisit: '11/9（月）11:00', status: '利用中' },
  { id: 'c3', name: '伊藤 正', kana: 'イトウ タダシ', careLevel: '要介護3', careManager: 'ひかりケアプラン / 小川', staff: '山本 健太', address: '東区若葉 3-2-15', nextVisit: '11/9（月）13:30', status: '利用中' },
  { id: 'c4', name: '渡辺 トメ', kana: 'ワタナベ トメ', careLevel: '要支援2', careManager: '中央地域包括支援センター', staff: '田中 良子', address: '中央区本町 5-1-3', nextVisit: '11/10（火）10:00', status: '利用中' },
  { id: 'c5', name: '小林 茂', kana: 'コバヤシ シゲル', careLevel: '要介護4', careManager: 'ひかりケアプラン / 小川', staff: '伊藤 大介', address: '東区緑町 6-8-2', nextVisit: '11/9（月）15:00', status: '利用中' },
  { id: 'c6', name: '加藤 久美子', kana: 'カトウ クミコ', careLevel: '要介護1', careManager: 'みどり居宅 / 森田', staff: '中村 真理', address: '西区港町 2-9-11', nextVisit: '—', status: '入院中' },
  { id: 'c7', name: '吉田 勝', kana: 'ヨシダ マサル', careLevel: '要介護2', careManager: 'あおば居宅 / 石井', staff: '鈴木 さくら', address: '中央区桜町 4-3-7', nextVisit: '11/9（月）16:30', status: '利用中' },
  { id: 'c8', name: '山口 春子', kana: 'ヤマグチ ハルコ', careLevel: '要介護5', careManager: 'あおば居宅 / 石井', staff: '山本 健太', address: '東区若葉 1-1-20', nextVisit: '11/11（水）09:30', status: '休止' },
]

export const statusTone: Record<Client['status'], BadgeTone> = { 利用中: 'success', 入院中: 'warning', 休止: 'neutral' }

export type Visit = { staff: string; start: string; end: string; client: string; service: Service }

export const staffList = [
  { name: '田中 良子', role: 'サービス提供責任者' },
  { name: '鈴木 さくら', role: '介護福祉士' },
  { name: '山本 健太', role: '介護福祉士' },
  { name: '伊藤 大介', role: '初任者研修' },
  { name: '中村 真理', role: '実務者研修' },
]

export const visits: Visit[] = [
  { staff: '田中 良子', start: '09:00', end: '10:00', client: '高橋 和子', service: '身体介護' },
  { staff: '田中 良子', start: '11:30', end: '12:30', client: '渡辺 トメ', service: '生活援助' },
  { staff: '田中 良子', start: '14:00', end: '15:30', client: '高橋 和子', service: '身体生活' },
  { staff: '鈴木 さくら', start: '08:30', end: '09:30', client: '吉田 勝', service: '身体介護' },
  { staff: '鈴木 さくら', start: '11:00', end: '12:00', client: '鈴木 一郎', service: '生活援助' },
  { staff: '鈴木 さくら', start: '16:30', end: '17:30', client: '吉田 勝', service: '身体介護' },
  { staff: '山本 健太', start: '10:00', end: '11:00', client: '山口 春子', service: '身体介護' },
  { staff: '山本 健太', start: '13:30', end: '14:30', client: '伊藤 正', service: '身体生活' },
  { staff: '伊藤 大介', start: '09:30', end: '10:30', client: '小林 茂', service: '身体介護' },
  { staff: '伊藤 大介', start: '15:00', end: '16:00', client: '小林 茂', service: '身体介護' },
  { staff: '中村 真理', start: '10:30', end: '12:00', client: '鈴木 一郎', service: '生活援助' },
  { staff: '中村 真理', start: '13:00', end: '14:00', client: '吉田 勝', service: '生活援助' },
]

export type TodayVisit = { time: string; client: string; service: Service; staff: string; status: '完了' | '訪問中' | '予定' | '未記録' }
export const todayVisits: TodayVisit[] = [
  { time: '08:30–09:30', client: '吉田 勝', service: '身体介護', staff: '鈴木 さくら', status: '完了' },
  { time: '09:00–10:00', client: '高橋 和子', service: '身体介護', staff: '田中 良子', status: '未記録' },
  { time: '09:30–10:30', client: '小林 茂', service: '身体介護', staff: '伊藤 大介', status: '完了' },
  { time: '10:30–12:00', client: '鈴木 一郎', service: '生活援助', staff: '中村 真理', status: '訪問中' },
  { time: '11:30–12:30', client: '渡辺 トメ', service: '生活援助', staff: '田中 良子', status: '予定' },
  { time: '13:30–14:30', client: '伊藤 正', service: '身体生活', staff: '山本 健太', status: '予定' },
]
export const visitTone: Record<TodayVisit['status'], BadgeTone> = { 完了: 'success', 訪問中: 'info', 予定: 'neutral', 未記録: 'warning' }

export const notices = [
  { tone: 'danger' as BadgeTone, tag: '要対応', title: '加藤 久美子さまが入院されました（11/7〜）', date: '11/8' },
  { tone: 'warning' as BadgeTone, tag: '期限', title: '10月分の国保連請求は 11/10 締切です', date: '11/6' },
  { tone: 'info' as BadgeTone, tag: 'お知らせ', title: '令和8年度 介護報酬改定の資料を掲載しました', date: '11/1' },
]
