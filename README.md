# N-i-ke's Portfolio

個人ポートフォリオサイト。Web 制作実績、スキル、プロフィール、サービス内容を掲載しています。

🌐 **公開ページ**: https://n-i-ke.github.io/self-introduction/

## 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| ビルドツール | Vite 5 |
| UI ライブラリ | React 18 |
| 言語 | TypeScript 5 |
| スタイリング | styled-components 6 / 通常 CSS |
| アニメーション | framer-motion / OGL (WebGL) |
| アイコン | react-icons |
| ホスティング | GitHub Pages (Actions 経由デプロイ) |

## ローカル開発

### 必要環境
- Node.js 20 系
- Yarn 1 (Classic)

### セットアップ
```bash
yarn install
```

### 開発サーバー起動
```bash
yarn dev
```
→ http://localhost:3000/self-introduction/

### 型チェック
```bash
yarn typecheck
```

### 本番ビルド
```bash
yarn build
```
→ `docs/` に出力（`.gitignore` 済、CI でアーティファクトとしてアップロード）

### ビルド結果のプレビュー
```bash
yarn preview
```

## デプロイフロー

`main` への push をトリガーに、GitHub Actions (`.github/workflows/static.yml`) が自動で:

1. `yarn install --frozen-lockfile`
2. `yarn build` (`docs/` 生成)
3. `actions/upload-pages-artifact` で `docs/` をアップロード
4. `actions/deploy-pages` で GitHub Pages にデプロイ

ローカルからの手動デプロイは不要。

## ディレクトリ構成

```
.
├── index.html              # Vite エントリ HTML
├── vite.config.ts          # Vite 設定 (base: /self-introduction/, outDir: docs)
├── tsconfig.json           # TypeScript 設定 (Vite + react-jsx)
├── tsconfig.node.json      # vite.config.ts 用
├── .github/
│   └── workflows/
│       └── static.yml      # GitHub Pages デプロイ用 CI
├── public/                 # 静的アセット (favicon, manifest 等)
└── src/
    ├── App.tsx             # ルートコンポーネント、グローバルスタイル
    ├── index.tsx           # エントリポイント
    ├── components/         # UI コンポーネント (Header / TopFv / HomePage / Footer 等)
    ├── data/
    │   └── works.ts        # 作品一覧データ
    ├── hooks/
    │   └── useViewport.ts  # ビューポート判定用 hook
    ├── Image/              # 作品サムネイル画像
    ├── declarations.d.ts   # *.png のモジュール宣言
    └── ogl.d.ts            # ogl ライブラリの型補完
```

## 主なコンポーネント

| コンポーネント | 役割 |
|---|---|
| `Header` | ナビゲーション (GooeyNav / モバイル時はサイドメニュー) |
| `TopFv` | ファーストビュー (OGL の WebGL シェーダーで Aurora 背景、グリッチタイトル) |
| `HomePage` | Works / About / Skills / Service 各セクションのコンテナ |
| `WorkItem` | 作品 1 件のカード (data/works.ts からデータ駆動) |
| `Profile` | プロフィール情報 |
| `MySkills` | 保有スキルアイコン一覧 (react-icons) |
| `Service` | 提供サービス紹介 |
| `Contact` | Google フォームへの導線 |
| `Footer` | コピーライト |
