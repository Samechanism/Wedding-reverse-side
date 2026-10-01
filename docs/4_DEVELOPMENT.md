# DEVELOPMENT.md

> このプロジェクトをどう開発するか（環境・手順）

このドキュメントは、このプロジェクト固有の開発環境・起動方法・テスト方法・ディレクトリ構成を記録する。

AIエージェントによる開発フローについては、[loop-engineering/WORKFLOW.md](../loop-engineering/WORKFLOW.md)を参照する。

## 開発環境

* エディタ: Visual Studio Code
* Runtime: Node.js
* Package Manager: npm
* Frontend: Next.js / React / TypeScript
* CSS: Tailwind CSS
* Database: Supabase
* Hosting: Vercel
* Source Control: Git / GitHub

## 起動方法

```bash
npm install
npm run dev
```

ブラウザから `http://localhost:3000` にアクセスする。

## テスト

```bash
npm run build
```

加えて、RSVPフォームの入力・送信・Supabaseへの保存が正常に動作することをブラウザ上で確認する。

## ディレクトリ構成

```text
project-root/
├─ docs/
├─ loop-engineering/
├─ public/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ lib/
│  └─ types/
├─ .env.local
├─ .gitignore
├─ package.json
└─ README.md
```

## コーディングルール

* TypeScriptを使用する
* UIはReact / Tailwind CSSで実装する
* 入力値のバリデーションにはZodを使用する
* Supabaseへの接続処理は`src/lib/`に集約する
* 秘密情報をソースコードやGitHubへコミットしない
* スマートフォンを基準にレスポンシブ対応する
