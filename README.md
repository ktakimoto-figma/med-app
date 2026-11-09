# med-app

url figma app
https://www.figma.com/design/jnMx3tApKWjgkwWCK7VNUG/med-app?node-id=0-1&p=f&t=Emd2F2Zpeso2D2ow-0


url figma ds
https://www.figma.com/design/4k9ejNOTYa59WGInHrcP7Z/med-app-ds?node-id=0-1&p=f&t=znWvRjPLqrBkXLVP-0

## 概要

架空の訪問介護事業所向け業務アプリ「つむぎケア」のサンプル（Figma デモ用）。
ブラウザで動く 5 画面の React アプリと、Figma 上のデザインシステム／画面デザインがセットになっています。

| 画面 | ルート | 内容 |
| --- | --- | --- |
| ホーム | `#/` | KPI カード、本日の訪問予定、お知らせ |
| スケジュール | `#/schedule` | 職員別タイムライン（8:00–18:00） |
| 利用者 | `#/clients` | 検索・絞り込み付きの利用者一覧 |
| サービス提供記録 | `#/records` | 訪問ごとのバイタル・実施内容・特記事項の入力 |
| 国保連請求 | `#/billing` | 請求年月ごとの明細書・伝送状況 |

## 起動

```sh
npm install
npm run dev
```

## デザインシステムとの対応

- `src/styles/tokens.css` … Figma Variables（Primitives / Color / Spacing / Radius）と同名の CSS 変数。各 Variable の Code syntax（WEB）と一致しています。
- `src/components/` … Figma コンポーネント（Button, Badge, Input, Checkbox, Segment Item, Nav Item, Sidebar, Page Header, Avatar, Table Cell, Stat Card, Schedule Block）と 1:1 で対応。
- アイコンは Lucide（Figma 側の `icon/*` も Lucide の SVG から作成）。
- フォントは Noto Sans JP。
