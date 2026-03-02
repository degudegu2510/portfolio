# Claude Code 自律開発ドキュメント

Claude Code を活用した自律開発・並列開発のリファレンス集です。

## ドキュメント一覧

| ファイル | 内容 |
|---------|------|
| [skills.md](./skills.md) | Skills（カスタムスラッシュコマンド）の作り方・使い方 |
| [hooks.md](./hooks.md) | Hooks による自動化・自律実行の仕組み |
| [git-worktree.md](./git-worktree.md) | Git Worktree を使った並列開発ワークフロー |
| [autonomous-workflows.md](./autonomous-workflows.md) | 自律開発の実践パターン集 |

## 概要

### なぜ自律開発なのか

Claude Code を「対話型アシスタント」としてではなく「自律エージェント」として活用するには、以下の3つが鍵になります：

1. **Skills** — 繰り返しタスクをスラッシュコマンド化。Claude が自動トリガーも可能
2. **Hooks** — ツール実行の前後・セッション終了時に確実に動くシェルコマンド
3. **Git Worktree** — 複数の Claude セッションをブランチごとに並列実行

### 各機能の関係

```
ユーザー or Claude
    │
    ▼
Skills (/deploy, /review など)
    │ タスクの定義・コンテキスト注入
    ▼
Claude の実行
    │
    ├─ PreToolUse Hook  ← 実行前に検証・ブロック
    ├─ ツール実行（Edit, Bash, ...）
    ├─ PostToolUse Hook ← 実行後にフォーマット・検証
    └─ Stop Hook        ← 完了確認・継続判断

並列化する場合：
    Git Worktree で Branch を分離
    → 複数ターミナルで別セッション起動
```

## 参考リソース

### 公式ドキュメント（英語）

- [Skills Reference](https://docs.anthropic.com/en/docs/claude-code/skills) — スキルシステム詳細
- [Hooks Guide](https://docs.anthropic.com/en/docs/claude-code/hooks) — Hooks 入門
- [Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows) — Worktrees ワークフロー
- [Best Practices](https://docs.anthropic.com/en/docs/claude-code/best-practices) — CLAUDE.md と自動化

### コミュニティ（英語）

- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — スキル・フック・プラグイン集
- [Parallel Vibe Coding with Git Worktrees](https://www.dandoescode.com/blog/parallel-vibe-coding-with-git-worktrees) — 並列開発ブログ
- [4 Hooks for Autonomous Operation](https://dev.to/yurukusa/4-hooks-that-let-claude-code-run-autonomously-with-zero-babysitting-1748) — 自律化フック実践

### コミュニティ（日本語）

- [Claude Code Hooks ガイド (SIOS Tech Lab)](https://tech-lab.sios.jp/archives/50794)
- [Claude Code Hooks 活用術 (APIDOG)](https://apidog.com/jp/blog/claude-code-hooks-jp/)
