# CLAUDE.md

このファイルは、Claude Codeがこのリポジトリで作業する際のガイダンスを提供します。

## 言語

このプロジェクトでは、必ず日本語で回答してください。
技術用語に関しては、必要に応じて、英語そのまま利用してください。

## コマンド

```bash
npm run dev      # 開発サーバー起動 (Vite HMR)
npm run build    # TypeScript コンパイル + Vite ビルド
npm run lint     # ESLint チェック (ts,tsx ファイル)
npm run preview  # 本番ビルドのプレビュー
```

## アーキテクチャ

React 19 + TypeScript + Vite + Tailwind CSS 4 で構築されたポートフォリオサイトです。

### ルーティング

- React Router v7 の `createBrowserRouter` を使用
- ベースパス: `/portfolio`
- ルートは `src/utils/Routes.ts` でパスヘルパー関数として定義
- ルーター設定は `src/main.tsx`
- `Base` テンプレート (`src/component/Templates/Base/Base.tsx`) が全ページを Header/Footer でラップ

### コンポーネント構造 (Atomic Design)

```
src/component/
├── Atoms/          # SVG アイコン、ボタン、基本要素
├── Molecules/      # Atoms の組み合わせ（カード、リスト）
├── Organisms/      # ページセクション（FirstView, Header, Footer）
├── Pages/          # ルートコンポーネント
└── Templates/      # レイアウトラッパー（Base）
```

### スタイリング (Tailwind CSS 4)

- エントリ: `src/style/index.css` が全スタイルモジュールをインポート
- `src/style/theme.css`: `@theme` でデザイントークン定義（カラー、タイポグラフィ、ブレークポイント）
- `src/style/utility.css`: `@utility` でカスタムユーティリティ定義（例: `body-1`, `heading-1`）
- `light-dark()` で OS の設定に基づくダーク/ライトモード自動切り替え
- カスタムユーティリティはクラス名として使用: `className="body-2"`

### コンテンツ (Markdown ベース)

- プロダクトページ: `src/contents/Product/{slug}/{slug}.md`
- `import.meta.glob` で静的インポート
- remark/rehype パイプラインで処理（GFM、シンタックスハイライト、スラグ生成）
- Front matter: `title`, `thumbnail`, `keywords`, `description`

### Storybook

Storybook 10 (`@storybook/react-vite`) でコンポーネントカタログを管理しています。

```bash
npm run storybook        # 開発サーバー起動 (port 6006)
npm run build-storybook  # 静的ビルド
```

#### 設定ファイル

- `.storybook/main.ts`: stories のパス、アドオン (`addon-docs`, `addon-a11y`)、Vite 統合 (Tailwind CSS プラグイン含む)
- `.storybook/preview.tsx`: グローバル decorator（`MemoryRouter` ラップ、テーマ切り替え）、`src/style/index.css` のインポート
- `.storybook/preview-head.html`: Material Symbols フォント読み込み、Docs 用スタイル調整

#### Stories の規約

- ファイル配置: コンポーネントと同じディレクトリに `{ComponentName}.stories.tsx` として作成
- 型: `@storybook/react-vite` から `Meta`, `StoryObj` をインポート
- `tags: ["autodocs"]` で自動ドキュメント生成を有効化
- `title`: Atomic Design 階層に合わせる（例: `"Atoms/Dropdown"`, `"Molecules/ModeSelector"`）
- グローバル decorator で `MemoryRouter` が適用済みのため、個別 Story でのルーター設定は不要
- テーマ切り替え: ツールバーから Light / Dark / Auto を選択可能


### 主要な規約

- SVG アイコンは `Atoms/BrandIcon/` に React コンポーネントとして配置
- Material Symbolsは `Atoms/MaterialSymbols/` 経由で使用
- 新規ルート追加: `Routes.ts` にパスヘルパーを追加後、`main.tsx` に登録
- 新規デザイントークン追加: `theme.css` に追加後、`utility.css` で `@utility` にバインド

## GitHub 運用ルール
- **ツール:** GitHub操作（接続・起票・閲覧）には必ず `gh` コマンドを使用すること。