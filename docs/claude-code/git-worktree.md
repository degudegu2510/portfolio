# Git Worktree × Claude Code 並列開発

> **Git Worktree** は、同じリポジトリの複数ブランチをそれぞれ独立したディレクトリで
> 同時に操作できる Git の機能です。Claude Code と組み合わせると、
> **複数の Claude セッションを干渉なく並列実行**できます。

## なぜ Worktree が必要か

通常の開発では、ブランチを切り替えると**作業中のファイルが変わってしまう**問題があります。

```
問題: 1つのディレクトリで branch 切り替え
main/
├── 作業中のファイル... (feature-A を実装中)
→ git checkout feature-B
├── 別のファイル... (feature-A の途中が消える)
```

```
解決: Worktree で独立したディレクトリ
project/              ← main branch
project-feature-a/    ← feature-A branch（Claude セッション A）
project-feature-b/    ← feature-B branch（Claude セッション B）
```

## Claude Code での使い方

### 方法1: `EnterWorktree` ツール（Claude に依頼）

Claude Code セッション内で Claude に頼む：

```
「worktree を使って feature-auth ブランチで作業してください」
```

Claude が自動的に `.claude/worktrees/feature-auth/` に worktree を作成し、
そのディレクトリに切り替えます。

### 方法2: `--worktree` フラグで起動

```bash
# 名前付きで worktree を作成してセッション開始
claude --worktree feature-auth

# 自動名前付け
claude --worktree
```

### 方法3: Git コマンドで手動作成 → 別ターミナルで Claude 起動

```bash
# ターミナル A: feature-A の作業
git worktree add ../project-feature-a -b feature-a
cd ../project-feature-a
npm install  # 依存関係のインストール（worktree ごとに必要）
claude       # Claude Code 起動

# ターミナル B: feature-B の作業（同時進行）
git worktree add ../project-feature-b -b feature-b
cd ../project-feature-b
npm install
claude       # 別の Claude セッションを起動
```

## ディレクトリ構造

Claude Code が管理する場合（`.claude/worktrees/` 以下）：

```
project/
├── .git/
├── .claude/
│   └── worktrees/
│       ├── feature-auth/     ← Worktree 1（独立した作業ディレクトリ）
│       └── bugfix-123/       ← Worktree 2（独立した作業ディレクトリ）
├── src/
└── ...（main branch のファイル）
```

## 自動クリーンアップの挙動

Claude Code が管理する worktree は、セッション終了時に自動で整理されます：

| 状況 | 処理 |
|------|------|
| 変更なし | worktree と branch を**自動削除** |
| 変更あり（未コミット） | 保持するか確認 |
| コミット済みの変更あり | branch を保持するか確認 |

## 並列作業のパターン

### パターン1: タスク分割による並列実装

大きな機能を独立したタスクに分割して同時進行：

```
ターミナル A (Claude セッション 1)
  git worktree add ../project-api -b feature/api
  → API エンドポイントを実装してください

ターミナル B (Claude セッション 2)
  git worktree add ../project-ui -b feature/ui
  → UI コンポーネントを実装してください

ターミナル C (Claude セッション 3)
  git worktree add ../project-tests -b feature/tests
  → テストを実装してください
```

### パターン2: Writer + Reviewer

```
Writer セッション（ターミナル A）
  git worktree add ../project-impl -b feature/oauth
  > OAuth2 フローを実装してください

Reviewer セッション（ターミナル B）
  git worktree add ../project-review -b review/oauth
  > feature/oauth ブランチの実装をレビューして問題点を指摘してください
```

### パターン3: 実験的な実装を並列で試す

複数のアプローチを同時に試して比較：

```
Approach A (ターミナル A)
  git worktree add ../project-approach-a -b experiment/redux
  > Redux で状態管理を実装してください

Approach B (ターミナル B)
  git worktree add ../project-approach-b -b experiment/zustand
  > Zustand で状態管理を実装してください
```

## Worktree の手動管理

```bash
# 一覧を確認
git worktree list

# 作成
git worktree add <path> -b <branch-name>
git worktree add ../project-hotfix -b hotfix/critical-bug

# 既存ブランチで作成
git worktree add ../project-feature origin/feature/existing-branch

# 削除
git worktree remove ../project-feature-a
git worktree prune  # 壊れたエントリをクリーンアップ
```

## 注意点と対策

### node_modules の問題

Worktree はファイルを共有しないため、各 worktree で依存関係インストールが必要：

```bash
# worktree 作成後に必ず実行
git worktree add ../project-feat -b feature/xxx
cd ../project-feat
npm install  # または pnpm install / yarn install
```

### .gitignore への追加

`.claude/worktrees/` を `.gitignore` に追加（Claude 管理 worktree の場合）：

```gitignore
# .gitignore
.claude/worktrees/
```

### ポート番号の競合

複数の開発サーバーを同時起動する場合はポートを変える：

```bash
# Worktree A: デフォルトポート
npm run dev          # → localhost:5173

# Worktree B: 別ポートを指定
npm run dev -- --port 5174
```

## Subagent との統合

Skills の frontmatter で `isolation: worktree` を指定すると、
サブエージェントが自動で独立した worktree で実行されます：

```yaml
---
name: parallel-review
description: Review code in an isolated environment
context: fork
agent: Explore
isolation: worktree
---

Review the code for security, performance, and code quality.
Report findings with file paths and line numbers.
```

## ワークフロー全体像

```
1. メインブランチで Claude に指示
   「feature/xxx ブランチで認証機能を実装してください」

2. Claude が worktree を作成
   → .claude/worktrees/feature-xxx/ に自動作成

3. 独立した環境で実装
   → メインブランチのファイルに影響なし

4. 実装完了後
   → コミット → PR 作成
   → worktree は自動削除（or 手動削除）

5. 同時に別の worktree で別タスクも進行可能
   → 完全に独立した状態を保てる
```

## 参考リンク

- [Common Workflows (Worktrees) - 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Mastering Git Worktrees with Claude Code (Medium)](https://medium.com/@dtunai/mastering-git-worktrees-with-claude-code-for-parallel-development-workflow-41dc91e645fe)
- [Parallel AI Development with Git Worktrees (Medium)](https://medium.com/@ooi_yee_fei/parallel-ai-development-with-git-worktrees-f2524afc3e33)
- [Running Multiple Claude Code Sessions with git worktree (DEV Community)](https://dev.to/datadeer/part-2-running-multiple-claude-code-sessions-in-parallel-with-git-worktree-165i)
- [Parallel Vibe Coding with Git Worktrees (Dan Does Code)](https://www.dandoescode.com/blog/parallel-vibe-coding-with-git-worktrees)
