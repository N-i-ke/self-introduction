# UTM Tracking Guide

ポートフォリオサイトへの **流入元** を GA4 で正しく集計するための UTM パラメータ運用メモ。
発信先（Qiita / Zenn / GitHub プロフィール / SNS 等）に貼る URL は、原則このルールに沿った UTM 付きで貼ること。

- 関連 Issue: #87
- 関連 PR: #86 (`outbound_click` イベント) / 本 PR (UTM 付与)
- 本番ホスト想定: `https://n-i-ke.github.io/self-introduction/`
  - 環境により変わる場合は本ドキュメントを更新する

---

## 1. 命名規則

| パラメータ | 必須? | 例 | ポリシー |
| --- | --- | --- | --- |
| `utm_source` | 必須 | `qiita` / `zenn` / `github` / `x` / `note` / `businesscard` | 媒体・サービス名。**小文字スネークケース**で統一 |
| `utm_medium` | 必須 | `profile` / `article` / `social` / `offline` | 設置場所のカテゴリ |
| `utm_campaign` | 必須 | `portfolio_2026` / 記事スラッグ | 既定は年度単位 `portfolio_YYYY`。記事単位で分けたければ記事スラッグでも可 |
| `utm_content` | 任意 | `header_link` / `bio_link` | 同一キャンペーンで複数バナーがある時のみ |
| `utm_term` | 不要 | — | 検索キーワード用。発信側では基本使わない |

> `utm_*` の値は GA4 上では完全一致で集計されるため、表記ゆれ（`Qiita` / `qiita` 等）が混在しないよう **必ず小文字** で書く。

---

## 2. 発信先別の標準 URL（コピペ用）

ホスト URL が変わったら、この節をまとめて置換すること。

### Qiita プロフィール
```
https://n-i-ke.github.io/self-introduction/?utm_source=qiita&utm_medium=profile&utm_campaign=portfolio_2026
```

### Zenn プロフィール
```
https://n-i-ke.github.io/self-introduction/?utm_source=zenn&utm_medium=profile&utm_campaign=portfolio_2026
```

### GitHub プロフィール (README / Bio)
```
https://n-i-ke.github.io/self-introduction/?utm_source=github&utm_medium=profile&utm_campaign=portfolio_2026
```

### Qiita 記事末尾の自己紹介リンク
記事スラッグを `utm_campaign` にする（複数記事の流入を分けたい場合）。
```
https://n-i-ke.github.io/self-introduction/?utm_source=qiita&utm_medium=article&utm_campaign=<記事スラッグ>
```

### Zenn 記事末尾の自己紹介リンク
```
https://n-i-ke.github.io/self-introduction/?utm_source=zenn&utm_medium=article&utm_campaign=<記事スラッグ>
```

### SNS (X など)
```
https://n-i-ke.github.io/self-introduction/?utm_source=x&utm_medium=social&utm_campaign=portfolio_2026
```

### 名刺・QR コード（オフライン）
```
https://n-i-ke.github.io/self-introduction/?utm_source=businesscard&utm_medium=offline&utm_campaign=portfolio_2026
```

### ハッシュアンカーと併用する場合
クエリ（`?utm_*`）→ ハッシュ（`#anchor`）の順。
```
https://n-i-ke.github.io/self-introduction/?utm_source=qiita&utm_medium=article&utm_campaign=<slug>#articles
```

---

## 3. GA4 での見方

### 標準レポート
- GA4 → 集客 → **トラフィック獲得 (Traffic acquisition)** で `Session source / medium / campaign` を確認

### リアルタイム確認
- UTM 付き URL を踏んだ直後、GA4 → リアルタイム → ユーザー属性 → `セッション ソース` で `qiita` 等が出ているか確認できる

### `outbound_click` とのクロス集計
本 PR で、各 `outbound_click` イベントに **着地時の UTM** を以下のキーで自動付与している。

| イベントパラメータ | 値の例 |
| --- | --- |
| `session_utm_source` | `qiita` |
| `session_utm_medium` | `article` |
| `session_utm_campaign` | 記事スラッグ |
| `session_utm_term` | (任意) |
| `session_utm_content` | (任意) |

GA4 → 管理 → カスタム定義で `session_utm_source` / `session_utm_medium` / `session_utm_campaign` を **カスタムディメンション (イベント スコープ)** として登録すると、探索レポートで
「Qiita 経由で来た人がどの外部リンクへ抜けたか」のような分解が可能になる。

---

## 4. 実装メモ

- 着地時の UTM 捕捉: `src/lib/utm.ts` の `captureUtmFromLocation()` が `URLSearchParams` で `utm_*` を抽出し `sessionStorage` (`session_utm_params`) に保存
- 取り出し: `getCapturedUtm()` が保存値を読む。`sessionStorage` 不可環境では空オブジェクトを返す
- `outbound_click` への同梱: `src/lib/analytics.ts` の `trackOutboundClick` が、値があるキーだけ `session_utm_*` プレフィックスで送る
- 内部遷移でクエリが落ちても、同一セッション中は値が残る（タブを閉じるとリセット）

---

## 5. やらないこと（本 Issue のスコープ外）

- サイト → 外部リンク（Qiita / Zenn / GitHub）への **発信側 UTM 自動付与**
- UTM 別の **コンテンツパーソナライズ**（例: `utm_source=qiita` なら挨拶文を変える 等）

これらは必要になったら別 Issue を切る。
