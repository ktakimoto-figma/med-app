# つむぎケア Design System

Figma「med-app-ds」で管理しているデザインシステムのルールをまとめます。
コード側（`src/styles/tokens.css`、`src/components/`）とは名前・値を 1 対 1 でそろえています。

- Figma（DS）: https://www.figma.com/design/4k9ejNOTYa59WGInHrcP7Z/med-app-ds
- Figma（画面）: https://www.figma.com/design/jnMx3tApKWjgkwWCK7VNUG/med-app

---

## 1. 基本方針

1. **値を直接書かない。** 色・余白・角丸は必ず Variables（コードでは CSS 変数）を使います。Figma では Variables に紐付け（バインド）、コードでは `var(--...)` で参照します。
2. **Primitives を直接使わない。** 画面やコンポーネントで使うのは用途別の色（Color コレクション）だけです。Primitives は Color の参照元としてだけ使います。
3. **Figma とコードで名前をそろえる。** Variable の Code syntax（WEB）がそのまま CSS 変数名です。例: `color/bg/brand` → `var(--color-bg-brand)`
4. **コンポーネントを先に探す。** 画面を作るときは、DS にあるコンポーネントのインスタンスを使います。DS にないものだけを、トークンを使って組みます。
5. **ブランドカラー（オレンジ）は控えめに使う。** 主要な操作（Primary ボタン）、選択中の状態、ロゴにだけ使います。

---

## 2. Variables（トークン）

### 2.1 コレクション構成

| コレクション | モード | 内容 | 画面での利用 |
| --- | --- | --- | --- |
| Primitives | Value | 色の元の値（gray / orange / blue / green / yellow / red / purple） | **使わない**（スコープ非公開） |
| Color | Light | 用途別の色。すべて Primitives を参照 | 使う |
| Spacing | Value | `space/2`〜`space/40` | 使う |
| Radius | Value | `radius/sm`〜`radius/full` | 使う |

### 2.2 Color（用途別の色）

| グループ | トークン | 参照先 | 用途 |
| --- | --- | --- | --- |
| bg | `bg/canvas` | gray/50 | 画面全体の背景、テーブルの見出し行 |
| | `bg/surface` | white | カード、サイドバー、入力欄 |
| | `bg/subtle` | gray/100 | セグメントコントロールの背景 |
| | `bg/hover` | gray/50 | 行・メニューのホバー |
| | `bg/brand` | orange/500 | Primary ボタン、チェック済みボックス |
| | `bg/brand-hover` | orange/600 | Primary ボタンのホバー |
| | `bg/brand-subtle` | orange/50 | 選択中のナビ・リスト行、アイコンの背景 |
| | `bg/brand-disabled` | orange/300 | 無効な Primary ボタン |
| | `bg/inverse` | gray/900 | トースト（完了通知） |
| | `bg/overlay` | gray/900-alpha-40（gray/900 の 40%） | ダイアログ表示中の背景 |
| text | `text/primary` | gray/900 | 本文・見出し |
| | `text/secondary` | gray/600 | 補足・ラベル・テーブル見出し |
| | `text/tertiary` | gray/500 | プレースホルダー・注記 |
| | `text/on-brand` | white | ブランド色の上の文字 |
| | `text/brand` | orange/700 | 選択中のナビ文字、Brand バッジ |
| | `text/link` | blue/600 | リンク、Ghost ボタン |
| icon | `icon/default` / `icon/strong` / `icon/brand` / `icon/on-brand` | gray/600 / gray/900 / orange/500 / white | アイコンの線の色 |
| border | `border/default` | gray/200 | カード・テーブルの区切り線 |
| | `border/strong` | gray/300 | 入力欄、Secondary ボタン |
| | `border/brand` | orange/500 | フォーカス、選択中を示すバー |
| status | `status/{neutral,info,success,warning,danger}-{bg,text}` | 各色の 50 / 600（warning は 50 / 700） | Badge、注意バナー |
| service | `service/{body,life,mixed}-{bg,accent}` | blue / green / purple の 100 と 500 | Schedule Block、凡例 |

**スコープ**: 背景用は Fill、文字用は Text、線用は Stroke に限定しています。違う用途のプロパティには候補として出てきません。

### 2.3 Spacing / Radius

| トークン | 値 | 主な用途 |
| --- | --- | --- |
| `space/2` | 2 | セグメントの内側余白、2 行テキストの行間 |
| `space/4` | 4 | アイコンと文字の間（ボタン）、ラベルと入力欄の間 |
| `space/8` | 8 | 小さな要素の間 |
| `space/12` | 12 | 入力欄の左右余白、ナビ項目のアイコンと文字の間 |
| `space/16` | 16 | ボタンの左右余白、テーブルセルの左右余白、カード同士の間 |
| `space/20` | 20 | カード内の余白 |
| `space/24` | 24 | 画面の外周余白、セクション同士の間 |
| `space/32` / `space/40` | 32 / 40 | 予備 |

| トークン | 値 | 用途 |
| --- | --- | --- |
| `radius/sm` | 4 | Badge、Checkbox、Schedule Block |
| `radius/md` | 6 | Button、Input、Nav Item |
| `radius/lg` | 8 | カード、テーブルの外枠 |
| `radius/xl` | 12 | 予備 |
| `radius/full` | 999 | Avatar、丸ボタン |

---

## 3. テキストスタイル

フォントは **Noto Sans JP** です（Regular / Medium / Bold）。

| スタイル | サイズ / 太さ / 行の高さ | 用途 |
| --- | --- | --- |
| Display | 32 / Bold / 120% | KPI の数値 |
| Heading/XL | 24 / Bold / 140% | ドキュメントの見出し |
| Heading/L | 20 / Bold / 140% | 画面タイトル（Page Header） |
| Heading/M | 16 / Bold / 150% | カードの見出し、ロゴ |
| Body/M | 14 / Regular / 160% | 本文、テーブルのセル、入力値 |
| Body/M Bold | 14 / Bold / 160% | 強調（利用者名、選択中のナビ） |
| Body/S | 12 / Regular / 150% | 補足、日付、フリガナ |
| Label/M | 14 / Medium / 150% | ボタン（M）、フォームのセクション名 |
| Label/S | 12 / Medium / 150% | ボタン（S）、Badge、テーブル見出し、入力欄のラベル |
| Caption | 11 / Regular / 150% | Schedule Block の時間、凡例 |

コードでは `font: var(--text-body-m)` のように指定します。

## 4. エフェクトスタイル

| スタイル | 値 | 用途 |
| --- | --- | --- |
| Shadow/Card | 0 1 3 / rgba(28,33,40,.06) | カード、選択中のセグメント |
| Shadow/Popover | 0 8 24 / rgba(28,33,40,.12) | ポップオーバー（予備） |

---

## 5. アイコン

- Lucide のアイコンをもとに、20×20 のコンポーネント `icon/<名前>` として 24 個登録しています。コードでは `lucide-react` を使います。
- 線の色は `icon/default` に紐付けています。使う場所に合わせてインスタンス側で上書きします。
- アイコンの差し替えは、コンポーネントの **Icon（インスタンス切り替え）プロパティ**で行います。アイコンごとにバリアントは作りません。
- ⚠️ **Figma の注意点**: Icon プロパティで差し替えると、線の色の上書きが消えます。差し替えた後は、親コンポーネントに合わせて線の色を付け直してください（Primary → `icon/on-brand`、Ghost → `text/link`、それ以外 → `icon/default`）。

収録アイコン: home, calendar, users, clipboard, yen, bell, help, search, chevron-left, chevron-right, chevron-down, plus, download, clock, map-pin, user, menu, alert, check, send, filter, building, heart, file-text, x

---

## 6. コンポーネント

Figma のプロパティ名とコードの props の対応も載せています。

### Button

| プロパティ | 値 |
| --- | --- |
| Variant | Primary / Secondary / Ghost |
| Size | M（高さ 36）/ S（高さ 28） |
| State | Default / Disabled |
| Label | テキスト |
| Show Icon / Icon | アイコンの表示有無 / 差し替え |

コード: `<Button variant="primary" size="s" icon={Send}>伝送開始</Button>`

**ルール**
- **Primary は 1 つのエリア（カードやツールバー）に 1 つまで。** その場所でいちばん重要な操作（例: 予定を追加、記録を確定、伝送開始）に使います。
- Secondary は補助的な操作（CSV出力、下書き保存、様式出力）に使います。
- Ghost はリンクのような軽い操作（スケジュールを見る、伝送状況を取得）や、アイコンだけのボタンに使います。
- アイコンは左側に置きます。アイコンだけのボタンには、コードで `aria-label` を必ず付けます。
- 幅は文字の長さに合わせて伸びます（Hug）。固定幅にはしません。
- 並べるときは、右側に重要な操作を置きます（例: 「下書き保存」「記録を確定」の順）。

### Badge

| プロパティ | 値 |
| --- | --- |
| Tone | Neutral / Info / Success / Warning / Danger / Brand |
| Label | テキスト |

**Tone の使い分け**

| Tone | 意味 | 例 |
| --- | --- | --- |
| Neutral | 未着手・停止中 | 未送信、予定、休止 |
| Info | 進行中・お知らせ | 訪問中、お知らせ |
| Success | 完了・正常 | 完了、送信済、利用中 |
| Warning | 注意・対応待ち | 未記録、入院中、期限、未割当 |
| Danger | エラー・すぐ対応が必要 | 要対応 |
| Brand | 状態ではなく属性 | 要介護度（要介護2 など） |

- 状態を表すときは、色だけでなく必ず文字でも示します。
- ラベルは短く（2〜5 文字目安）します。

### Input

| プロパティ | 値 |
| --- | --- |
| Type | Text / Select / Search / Textarea |
| Value | テキスト |

- 高さは 36px（Textarea は 96px）。幅はインスタンス側で固定するか、親に合わせて伸ばします。
- ラベルは入力欄の上に `Label/S` + `text/secondary` で置きます（コードでは `<Field label="...">`）。
- プレースホルダー（Search、Textarea の初期表示）は `text/tertiary` で表示します。
- フォーカス時は、枠線を `border/brand` にして、外側に `bg/brand-subtle` のリングを付けます（コードのみ）。

### Checkbox

| プロパティ | 値 |
| --- | --- |
| Checked | True / False |
| Label | テキスト |

- チェック済みは `bg/brand` の背景に白のチェックアイコンを表示します。
- 項目が多い場合は 2 列で並べ、関連する項目は枠で囲んでグループにします（例: 身体介護 / 生活援助）。

### Segment Item

| プロパティ | 値 |
| --- | --- |
| Selected | True / False |
| Label | テキスト |

- `bg/subtle` の背景・角丸 `radius/md`・内側余白 `space/2` の入れ物に横並びで入れて、セグメントコントロールとして使います（コード: `<Segmented>`）。
- 選択肢は 2〜4 個にします。それより多い場合は Select を使います。

### Nav Item / Sidebar / Logo

| コンポーネント | プロパティ |
| --- | --- |
| Nav Item | State（Default / Active）、Label、Icon |
| Sidebar | なし（Nav Item 5 個 + ヘルプを内包） |
| Logo | なし |

- Sidebar は全画面で同じものを使います。**表示中の画面の Nav Item だけを `State=Active` にします。**
- Nav Item の並び順は「ホーム → スケジュール → 利用者 → サービス提供記録 → 国保連請求」で固定です。
- 画面の Sidebar 内にある Nav Item には、Figma のプロトタイプで対象画面への遷移を設定します。

### Page Header

| プロパティ | 値 |
| --- | --- |
| Title | 画面タイトル |

- 画面タイトルは、サイドバーの項目名と同じにします。
- 幅は親に合わせて伸ばします。

### Table Header Cell / Table Cell

| コンポーネント | プロパティ |
| --- | --- |
| Table Header Cell | Label |
| Table Cell | Type（Text / Stacked / Link）、Text、Subtext |

- 行の高さ: 1 行 = 48px、2 行（Stacked）= 60px。**同じ行のセルは高さをそろえます。**
- 列幅は固定幅を基本にし、いちばん内容が長い列だけを親に合わせて伸ばします。
- Stacked は「主な値 + 補足」（例: 明細書名 + 事業所番号）に使います。補足がない場合は Text を使います（Subtext を空にして Stacked を使わない）。
- Link は件数など、押すと詳細に進める値に使います。数値は右寄せにします。
- Badge・Avatar を入れるセルは、Table Cell と同じ余白・下線でセルを組んで、その中にインスタンスを置きます。

### Stat Card

| プロパティ | 値 |
| --- | --- |
| Label / Value / Unit / Note | テキスト |
| Icon | アイコンの差し替え |

- ダッシュボードの KPI 用です。4 枚を均等幅で横に並べます。
- Value は数値だけにし、単位は Unit に入れます（例: Value=1,284,300、Unit=円）。

### Avatar

| プロパティ | 値 |
| --- | --- |
| Size | M（32）/ S（24） |
| Initials | 名前の先頭 2 文字 |

- テーブル内の担当者には S、利用者一覧・スケジュールの職員欄には M を使います。

### Schedule Block

| プロパティ | 値 |
| --- | --- |
| Service | 身体介護 / 生活援助 / 身体生活 |
| Time / Client | テキスト |

- 色はサービス種別で決まります（身体介護 = `service/body-*`、生活援助 = `service/life-*`、身体生活 = `service/mixed-*`）。左に 3px のアクセント線を付けます。
- 幅は所要時間に合わせて計算し、前後に 2px ずつ余白を取ります（配置ルールは [画面遷移仕様書](./screen-flow.md#s02-スケジュール-schedule) を参照）。
- 文字がはみ出す場合は「…」で省略します。全文はツールチップで表示します。

### Dialog / Dialog Slot

| プロパティ | 値 |
| --- | --- |
| Title | ダイアログの見出し |
| Content | 中身の差し替え（初期値は Dialog Slot） |
| Show Footer | フッターの表示有無 |
| Secondary Button / Primary Button | 中のボタンのプロパティを直接変更できる（exposed instance） |

- 幅 560px、角丸 `radius/xl`、影は Shadow/Popover。ヘッダー・フッターは `border/default` の線で区切ります。
- 中身は画面ごとにローカルコンポーネントとして作り、Content で差し替えます（例: med-app の `Schedule Form / 予定追加`）。Dialog Slot は差し替え前の仮の中身です。
- フッターのボタンは「キャンセル（Secondary）→ 実行（Primary）」の順で右寄せにします。Primary のラベルは「登録」「保存」など、押した結果がわかる動詞にします。
- 背景は `bg/overlay` の全面フレームにして、中央に配置します。
- Figma のプロトタイプ: 開くボタン → オーバーレイで開く、× と キャンセル → 閉じる、実行 → 完了後の画面へ移動。

> コード側（`src/components/`）にはまだありません。

---

## 7. レイアウトのルール

| 項目 | 値 |
| --- | --- |
| 基準の画面サイズ | 1440 × 900 |
| サイドバーの幅 | 240 |
| Page Header の高さ | 64 |
| コンテンツの外周余白 | `space/24` |
| セクション同士の間 | `space/24` |
| カード同士の間（横並び） | `space/16` |
| カード | `bg/surface` + `border/default` 1px + `radius/lg` + Shadow/Card |
| カードの見出し | 余白 上下 16・左右 20、`Heading/M` |

- Figma では、まとまりのある要素は必ずオートレイアウトで組みます。絶対位置で置いてよいのは、タイムライン上の Schedule Block だけです。

---

## 8. 運用ルール

### コンポーネントを追加・変更するとき

1. 必要な Variables がない場合は、先に Color / Spacing / Radius に追加します（Primitives は Color の参照元としてだけ追加）。
2. 新しい Variable には、用途に合ったスコープと Code syntax（`var(--...)`）を必ず設定します。
3. 色・余白・角丸はすべて Variables に紐付けます。
4. コンポーネントの説明欄（Description）に、用途と使い分けを書きます。
5. med-app-ds を **Publish** し、med-app 側でライブラリの更新を受け入れます。
6. コード側の `tokens.css` / `components.css` / `src/components/` にも同じ変更を入れます。

### 名前の付け方

| 対象 | 形式 | 例 |
| --- | --- | --- |
| Variable | `グループ/用途`（小文字・ハイフン区切り） | `bg/brand-subtle`、`space/16` |
| CSS 変数 | `--color-` + Variable 名（`/` を `-` に） | `--color-bg-brand-subtle` |
| コンポーネント | 英語・先頭大文字・スペース区切り | `Stat Card`、`Table Cell` |
| バリアント | `プロパティ=値` | `Variant=Primary, Size=M, State=Default` |
| アイコン | `icon/<lucide の名前>` | `icon/chevron-down` |
| CSS クラス | BEM（`block__element--modifier`） | `.btn--primary`、`.stat-card__value` |

### Figma で作るときの注意

- オートレイアウトのコンポーネントに `resize()` で大きさを指定すると、Hug（内容に合わせる）が固定に戻ります。Button / Badge / Segment Item は Hug のままにしてください。
- Icon プロパティでアイコンを差し替えたときは、線の色を付け直してください（[5. アイコン](#5-アイコン)）。
