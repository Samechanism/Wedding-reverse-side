# ARCHITECTURE.md

## 技術スタック

* Frontend: Next.js / React / TypeScript / Tailwind CSS
* Backend: Next.js
* Database: Supabase PostgreSQL
* Hosting: Vercel
* Validation: Zod
* Version Control: Git / GitHub

## システム構成

```text
Browser
  ↓ HTTPS
Next.js Application
  ├─ Static / UI Rendering
  └─ RSVP Form
       ↓ Supabase Client
Supabase
  └─ PostgreSQL
       └─ RSVP Data
```

Next.jsアプリケーションをVercelへデプロイし、ブラウザから公開URLへアクセスする。

イベント情報やRSVPフォームなどの画面はNext.js / Reactで構築する。

RSVPフォームから送信されたデータは、Supabase Clientを利用してSupabase PostgreSQLへ保存する。

SupabaseへのアクセスはRow Level Security（RLS）によって制御し、クライアントから利用する公開キーとサーバー専用の秘密情報を分離する。

## コンポーネントの責務

### Next.js / React

* Webサイト全体の画面を提供する
* イベント情報、開催日時、会場、アクセス情報等を表示する
* イベント写真を表示する
* RSVPフォームを表示する
* フォーム入力状態を管理する
* フォーム送信時の入力バリデーションを実行する
* SupabaseへRSVPデータを送信する
* RSVP送信中、成功、失敗等のUI状態を表示する
* スマートフォン、タブレット、PCに対応したレスポンシブUIを提供する

### Supabase

* RSVPデータをPostgreSQLへ保存する
* RSVPデータへのアクセスをRLSによって制御する
* 回答者の氏名、出欠、同伴者、メッセージ、回答日時等を管理する

### Vercel

* Next.jsアプリケーションをホスティングする
* 本番環境へのデプロイを提供する
* HTTPSによる公開アクセスを提供する
* GitHubリポジトリと連携してデプロイできる構成とする

## データフロー

### イベントサイト閲覧

1. ユーザーが公開URLへアクセスする。
2. Vercel上のNext.jsアプリケーションがページを返す。
3. ユーザーがイベント情報、開催日時、会場、アクセス情報、写真等を閲覧する。
4. ユーザーがRSVPセクションへ移動する。

### RSVP送信

1. ユーザーがRSVPフォームへ氏名を入力する。
2. ユーザーが出欠を選択する。
3. ユーザーが同伴者の有無を選択する。
4. 同伴者ありの場合、同伴者の氏名を入力する。
5. 必要に応じてメッセージを入力する。
6. ユーザーがRSVPを送信する。
7. Next.js / React側で入力値をバリデーションする。
8. バリデーションに成功した場合、Supabaseへデータを送信する。
9. SupabaseがRLSによるアクセス制御を適用する。
10. RSVPデータをPostgreSQLへ保存する。
11. 保存結果をNext.jsへ返す。
12. Next.jsが送信成功または送信失敗の状態を表示する。

### 主催者による回答確認

1. 主催者がSupabaseの管理画面へアクセスする。
2. RSVPテーブルに保存された回答データを確認する。
3. 出席・欠席、同伴者情報等を確認する。
4. 必要に応じて参加人数を集計する。

## 設計原則

* 一度限りのイベント利用を前提とし、必要最小限の構成とする
* Next.jsをWebサイトとUIの主要な実装基盤とする
* RSVPデータの永続化にはSupabase PostgreSQLを利用する
* RSVPデータへのアクセスはSupabaseのRLSによって制御する
* Supabaseのサービスロールキー等の秘密情報をクライアントへ公開しない
* クライアント側でも入力バリデーションを行い、不正な入力を防止する
* RSVPの保存処理とUI表示を分離し、送信中・成功・失敗の状態を明確に扱う
* スマートフォンを優先したレスポンシブ設計とする
* 過剰なバックエンドサーバーや管理画面を構築せず、今回の利用目的に必要な構成に限定する
* 将来の拡張を目的とした過剰な抽象化・複雑化を避ける

## データモデル

### rsvps

| Column | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | 主キー |
| name | text | Yes | 回答者氏名 |
| attendance | text | Yes | 出欠 |
| companion_name | text | No | 同伴者氏名 |
| message | text | No | 主催者へのメッセージ |
| created_at | timestamptz | Yes | 回答日時 |

`attendance` は以下の2値のみを使用する。

- `attending`
- `not_attending`
- 
### RLS

- RSVPの登録は公開サイトから許可する
- 公開サイトから既存のRSVPデータを取得できないようにする
- 公開サイトからRSVPデータを更新・削除できないようにする
- 主催者はSupabaseの管理画面から回答データを確認する