# N-i-ke's Portfolio

個人ポートフォリオサイト。Web 制作実績、スキル、プロフィール、サービス内容を掲載しています。
JA / EN の言語切替に対応し、サイト全体に演出系のアニメーションを敷き詰めた "サイバー/スペース" 系トーンが特徴です。

🌐 **公開ページ**: https://n-i-ke.github.io/self-introduction/

---

## 技術スタック

### Core

| カテゴリ | 採用技術 |
|---|---|
| ビルドツール | Vite 5 |
| UI ライブラリ | React 18 |
| 言語 | TypeScript 5 (strict) |
| スタイリング | styled-components 6 / 通常 CSS / CSS Modules 風命名 |
| アイコン | react-icons |
| ホスティング | GitHub Pages (Actions 経由デプロイ) |
| アクセス解析 | Google Analytics 4 (`G-8HD78GNJH4`, IP 匿名化済み) |

### アニメーション / 演出系ライブラリ

| ライブラリ | 用途 |
|---|---|
| [framer-motion](https://www.framer.com/motion/) | 宣言的アニメーション。SectionTitle のフェードイン、BlurText 等 |
| [gsap](https://gsap.com/) + ScrollTrigger | パララックス、TargetCursor のターゲット追従 |
| [lenis](https://github.com/darkroomengineering/lenis) | 慣性スクロール (smooth scroll)。アンカーリンクも捕捉 |
| [ogl](https://github.com/oframe/ogl) | 軽量 WebGL ラッパー。Aurora シェーダー / Particles に使用 |
| [three.js](https://threejs.org/) | About セクション背景の自転する地球 (axial tilt 23.5°) |
| reactbits.dev 由来コンポーネント | 後述 |

### reactbits.dev から取り込んだ演出コンポーネント

[reactbits.dev](https://reactbits.dev) のソースを `src/components/` 配下に取り込んで本サイトのトーンに合わせて調整しています。

| コンポーネント | 用途 |
|---|---|
| `DecryptedText` / `DecryptedLoader` | 起動時のローディング演出（文字列を復号アニメーションで表示） |
| `GlitchText` | TOP の "N-i-ke's Portfolio" タイトル |
| `GooeyNav` | デスクトップヘッダーの粘体ナビゲーション |
| `LogoLoop` | Skills セクションのアイコン横スクロール |
| `TargetCursor` | カーソルが対象要素にロックオンする演出（`.cursor-target` 付き要素対象） |
| `ElectricBorder` | Works カードを囲む電気ボーダー canvas 演出 |
| `BlurText` | SectionTitle 内のテキスト出現演出 |

### 自前実装の演出コンポーネント

| コンポーネント | 内容 |
|---|---|
| `SiteBackground` | 全ページ固定背景。GLSL フラグメントシェーダーで Aurora + ogl で Particles を重ねる |
| `Particles` | ogl ベースのカスタム粒子描画（マウス追従オプションあり） |
| `EarthBackground` | three.js (SphereGeometry + MeshStandardMaterial) で自転する地球。地軸 23.5° 傾斜、約 50 秒/周 |
| `SmoothScrollProvider` | Lenis を初期化し GSAP ScrollTrigger と同期。`<a href="#...">` を捕捉して `lenis.scrollTo` に置換 |

### グローバル状態

| 仕組み | 内容 |
|---|---|
| `LocaleContext` | サイト全体の JA/EN 言語切替。`localStorage` で永続化、`<html lang>` を同期 |

---

## アクセシビリティ & 配慮事項

- `prefers-reduced-motion: reduce` を尊重（ローダー / パララックス / 地球自転を停止）
- ヘッダー言語切替に `aria-pressed`、ドロワーに `aria-hidden` / `aria-expanded`
- タップ領域は原則 44×44 px 以上を確保
- TargetCursor / Lenis 等の PC 向け演出はタッチ端末で自動 no-op

---

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

---

## 環境変数 (`.env`)

| キー | 用途 | 備考 |
|---|---|---|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `.env.production` にコミット済み。GA 仕様上の公開識別子のため秘匿不要 |

個人開発端末でローカル上書きしたい場合は `.env.local` を作成（`.gitignore` 済）。

---

## デプロイフロー

`main` への push をトリガーに、GitHub Actions (`.github/workflows/static.yml`) が自動で:

1. `yarn install --frozen-lockfile`
2. `yarn build` (`docs/` 生成、Vite が `%VITE_GA_MEASUREMENT_ID%` を実値に置換)
3. `actions/upload-pages-artifact` で `docs/` をアップロード
4. `actions/deploy-pages` で GitHub Pages にデプロイ

ローカルからの手動デプロイは不要。

---

## ディレクトリ構成

```
.
├── index.html              # Vite エントリ HTML (gtag.js を埋め込み)
├── vite.config.ts          # Vite 設定 (base: /self-introduction/, outDir: docs)
├── tsconfig.json
├── tsconfig.node.json
├── .env.production         # 本番ビルド用 env (Measurement ID 等)
├── .env.example            # env テンプレート
├── .github/
│   └── workflows/
│       └── static.yml      # GitHub Pages デプロイ用 CI
├── public/
│   └── textures/
│       └── earth-daymap.jpg   # three.js Earth テクスチャ (NASA Blue Marble)
└── src/
    ├── App.tsx             # ルート: LocaleProvider / SmoothScrollProvider / SiteBackground / TargetCursor
    ├── index.tsx           # エントリポイント
    ├── components/         # UI / 演出コンポーネント (後述)
    ├── contexts/
    │   └── LocaleContext.tsx  # JA/EN 言語状態
    ├── data/
    │   └── works.ts        # 作品一覧データ
    ├── hooks/
    │   ├── useViewport.ts  # ビューポート判定 (PC/SP 切替)
    │   └── useParallax.ts  # GSAP ScrollTrigger ベースのパララックス hook
    ├── Image/              # 作品サムネイル画像
    ├── declarations.d.ts   # *.png のモジュール宣言
    └── ogl.d.ts            # ogl ライブラリの型補完
```

---

## 主なコンポーネント

| コンポーネント | 役割 |
|---|---|
| `Header` | 3 ペイン構成 (ブランド / GooeyNav / LangToggle)。SP は mobile bar + ドロワー、ガラスモーフィズム |
| `TopFv` | ファーストビュー。GlitchText タイトル + DecryptedLoader |
| `SiteBackground` | サイト全体の固定背景。Aurora シェーダー + Particles |
| `HomePage` | Works / About / Skills / Service の各セクションコンテナ。SectionTitle の subtitle を locale 別に管理 |
| `WorkItem` | 作品 1 件のカード。ElectricBorder で枠を装飾 |
| `Profile` | プロフィール本文 (JA/EN) + 自転する地球背景 (EarthBackground) |
| `MySkills` | 12 個の技術アイコンを LogoLoop で横スクロール |
| `Service` | 提供サービス紹介 (JA/EN) |
| `Contact` | Google フォームへの導線 (JA/EN) |
| `Footer` | コピーライト |

---

## ライセンスとクレジット

- アニメーションコンポーネントの一部は [reactbits.dev](https://reactbits.dev) のソースを取り込み・調整
- Earth テクスチャは [mrdoob/three.js](https://github.com/mrdoob/three.js/blob/dev/examples/textures/planets/earth_atmos_2048.jpg) (NASA Blue Marble, public domain)
- その他コードは本人 (N-i-ke) の自作物
