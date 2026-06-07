---
title: Fivia
thumbnail: ./img/image-ogp.png
keywords: MCPサーバー Chrome拡張 個人開発 AIツール TypeScript Next.js Supabase degudegu2510
description: Fiviaは、AIに渡すビジュアルコンテキストを管理するツールです。Web上の画像をChrome拡張でアートボードに整理し、MCP（Model Context Protocol）経由でAIに渡すことで、言語化しにくいスタイルや雰囲気をAIに伝えやすくします。Chrome Web StoreへのChrome拡張の公開、OAuth 2.0 + PKCE対応のリモートMCPサーバー、Vercel上でのWebアプリ運用まで、個人でゼロから設計・実装したプロダクトです。

---

## 作品概要

**Fivia（フィビア）** は、 **「AIに渡すビジュアルコンテキストを管理する」** ツールです。

AI画像生成やデザイン指示において、「このスタイルで」という感覚をテキストだけで伝えることには限界があります。
Fiviaでは、Web上の画像をChrome拡張でアートボードに整理し、 **MCP（Model Context Protocol）経由でAIにビジュアルコンテキストを渡す** ことで、言語化しにくいスタイル・ムード・質感をAIに共有できます。

名前の由来は **`Figment`（想像・イメージの断片）** と **`via`（経由して渡す）** の造語で、ユーザーが集めたビジュアルの断片をAIに届けるというコンセプトを込めています。


### 補足情報

* 担当：個人開発（設計・実装・リリースまで一人）
* Web App：https://fivia.dev
* Chrome拡張：[Chrome Web Store](https://chromewebstore.google.com/detail/fivia/fnjmhopagijlipindphkadhpagbddpmj?hl=ja&utm_source=ext_sidebar)（バージョン 0.0.2）
* MCPサーバー：https://fivia.dev/api/mcp

## Fivia

![screenshot-artboards](./img/screenshot-artboards.png)

### 開発の経緯

個人で新しいプロダクトをゼロから作りたいというモチベーションと、AIを活用すれば一人でもフルスタックな開発ができるのではという仮説を試したかった。

設計・実装・リリースのすべてをAIと協働しながら進め、Chrome拡張・Webサービス・MCPサーバーという3つのコンポーネントを一人で完成させることができた。

### 解決する課題

AIを使ったデザイン生成や画像生成において、「このスタイルで作って」という曖昧な指示をテキストのみで伝えることは難しく、意図が伝わらないまま試行錯誤に時間がかかるという課題があります。

参考画像をAIに渡す方法はあるものの、その都度ファイルを用意してアップロードする手間が発生し、複数の画像を一括で整理・管理する仕組みがありません。

Fiviaはこの課題に対して、 **「Web上の画像を集めてアートボードとして整理し、MCPで自動的にAIに渡す」** というアプローチで解決します。

### 使い方の流れ


```mermaid
flowchart LR
  A["Web上の画像を<br/>右クリック"] -->|Chrome拡張| B[アートボードに保存]
  B --> C["Web Appで<br/>整理・管理"]
  C -->|MCP| D["AIがビジュアル<br/>コンテキストを参照"]
  D --> E["スタイル・ムードを<br/>理解したAI出力"]
```


### プロダクト構成

Fiviaは以下の3つのコンポーネントで構成されています。

#### Chrome拡張

Web上の画像を右クリックするだけでFiviaのアートボードに保存できます。コンテキストメニューから保存先のアートボードを選択でき、新規アートボードの作成もその場で行えます。

技術スタック: TypeScript / React 19 / esbuild / Chrome Manifest V3

#### Web App

アートボードの作成・管理・詳細閲覧を行うWebサービスです。Google OAuthによるログインに加え、Claude CodeなどのMCPクライアントがOAuth 2.0 + PKCEで接続できるリモートMCPエンドポイントを提供しています。

技術スタック: Next.js 16 / React 19 / Tailwind CSS v4 / Supabase / Vercel

#### MCPサーバー（リモートMCP）

Claude CodeなどのMCPクライアントからFiviaのアートボードを参照できるリモートMCPサーバーです。Next.jsの `/api/mcp` エンドポイントとしてStreamable HTTP transportで提供し、`list_artboards` でアートボード一覧を取得し、`get_artboard` で画像のメタ情報とbase64データをAIに渡します。

技術スタック: Next.js Route Handler / TypeScript / @modelcontextprotocol/sdk / Streamable HTTP

```json
{
  "mcpServers": {
    "fivia": {
      "type": "http",
      "url": "https://fivia.dev/api/mcp"
    }
  }
}
```

初回接続時にブラウザでFiviaへログインすると認証が完了し、以降はMCPクライアント側がリフレッシュトークンを使って再認証します。

### 技術設計の工夫

#### OAuth 2.0 + PKCEによるリモートMCP認証

MCPサーバーはローカルで起動するnpm package方式から、Web App上の `/api/mcp` で提供するリモートMCP方式へ移行しました。認証はPATの手動発行ではなく、OAuth 2.0 + PKCEを採用しています。Claude CodeなどのMCPクライアントがOAuth Discoveryで認可サーバー情報を取得し、ブラウザログイン後にSupabaseのaccess token / refresh tokenを受け取るため、ユーザーがトークンをコピーして設定する必要がありません。

認可コードやstateはAES-256-GCMで暗号化し、PKCEの `code_verifier` を検証してからトークンを発行する設計にしています。MCPエンドポイント側ではBearer tokenとして渡されたSupabase JWTを検証し、認証済みユーザーのアートボードだけを返します。

#### 画像のbase64配信

`get_artboard` では画像URLだけでなく、base64データも返します。AIサービスによっては画像入力にbase64が必須なケースがあるため、MCPサーバー側で画像を取得・変換してAIに渡せるよう設計しています。

#### Monorepo構成

Web App・Chrome拡張・MCPサーバーを1つのmonorepoで管理しています。Web APIや認証方式の仕様変更が複数コンポーネントに影響するため、同じPRで横断的に変更できる体制を整えています。共通の型定義やブランドアセットは `packages/shared` に集約しています。

### リリース状況

| コンポーネント | 状態 |
| --- | --- |
| Web App | Vercelで本番運用中（https://fivia.dev） |
| Chrome拡張 | Chrome Web Store公開済み（v0.0.2） |
| MCPサーバー | リモートMCPとして本番運用中（https://fivia.dev/api/mcp） |
