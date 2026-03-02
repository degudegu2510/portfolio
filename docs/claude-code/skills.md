# Skills（カスタムスラッシュコマンド）

> **Skills** は Claude Code の「スラッシュコマンド」を進化させた仕組みです。
> ユーザーが `/deploy` と打つだけで実行できる他、Claude が文脈から自動的に呼び出すことも可能です。

## 基本構造

```
~/.claude/skills/my-skill/      # グローバル（全プロジェクト）
.claude/skills/my-skill/        # プロジェクトローカル（Git 共有可）
├── SKILL.md                    # 必須：スキル定義
├── template.md                 # 任意：テンプレート
└── scripts/
    └── helper.sh               # 任意：補助スクリプト
```

## SKILL.md の書き方

```yaml
---
name: deploy
description: Deploy the application to production
argument-hint: "[environment]"
disable-model-invocation: false
user-invocable: true
allowed-tools:
  - Bash
  - Edit
context: fork
agent: general-purpose
---

# Deploy

Deploy to $ARGUMENTS[0] environment:

1. Run lint: `npm run lint`
2. Run tests: `npm test`
3. Build: `npm run build`
4. Deploy to $ARGUMENTS[0]
```

## Frontmatter フィールド一覧

| フィールド | 説明 | デフォルト |
|-----------|------|---------|
| `name` | スキル名（`/name` でトリガー） | ディレクトリ名 |
| `description` | 説明文（自動トリガーの判定に使用） | — |
| `argument-hint` | 引数のヒント表示（例: `[issue-number]`） | — |
| `disable-model-invocation` | `true` にすると手動呼び出しのみ | `false` |
| `user-invocable` | `false` にすると Claude のみが呼び出し可能 | `true` |
| `allowed-tools` | 使用可能なツールを制限 | すべて |
| `context` | `fork` でサブエージェントとして実行 | — |
| `agent` | サブエージェントのタイプ | — |
| `model` | 実行モデルを指定 | デフォルト |

## 引数の使い方

```markdown
# 引数全体
$ARGUMENTS

# 個別アクセス
$ARGUMENTS[0]   # 1番目
$ARGUMENTS[1]   # 2番目
$0              # $ARGUMENTS[0] の短縮形

# 動的コンテキスト（シェルコマンドを事前実行して挿入）
!`git log --oneline -5`
!`gh pr diff`
```

実行例:
```
/fix-issue 123
# → $ARGUMENTS が "123" に置換される
```

## スキルの種類

### 1. 参照スキル（Reference）

Claude が参照すべき規約・パターンを定義。

```yaml
---
name: api-conventions
description: API design patterns for this project
---

When writing API endpoints:
- Use RESTful naming conventions
- Always validate input with zod
- Return consistent error format: { error: string, code: string }
```

### 2. タスクスキル（Task）

ステップバイステップの作業手順を定義。

```yaml
---
name: new-component
description: Create a new React component following Atomic Design
argument-hint: "[ComponentName] [atoms|molecules|organisms]"
---

Create a new component named $ARGUMENTS[0] in the $ARGUMENTS[1] layer:

1. Create `src/component/$ARGUMENTS[1]/$ARGUMENTS[0]/$ARGUMENTS[0].tsx`
2. Create `src/component/$ARGUMENTS[1]/$ARGUMENTS[0]/$ARGUMENTS[0].stories.tsx`
3. Follow existing component patterns
4. Add to Storybook with `tags: ["autodocs"]`
```

### 3. リサーチスキル（Research）

`context: fork` で独立したエージェントが調査を実行。

```yaml
---
name: deep-research
description: Thoroughly research a topic in the codebase
context: fork
agent: Explore
---

Research "$ARGUMENTS" thoroughly:
- Search relevant files
- Analyze code patterns
- Summarize findings with file paths and line numbers
```

## スコープ別の配置

| 場所 | 適用範囲 | Git 共有 |
|------|--------|--------|
| `~/.claude/skills/` | すべてのプロジェクト | ローカルのみ |
| `.claude/skills/` | このプロジェクトのみ | 可能 |

## よくあるユースケース

### GitHub Issue の修正

```yaml
---
name: fix-issue
description: Fix a GitHub issue
argument-hint: "[issue-number]"
---

Fix GitHub Issue #$ARGUMENTS:

Issue details: !`gh issue view $ARGUMENTS`

1. Read the issue description above
2. Find relevant files
3. Implement the fix with tests
4. Verify with `npm run lint && npm test`
```

### PR のサマリー作成

```yaml
---
name: pr-summary
description: Generate a PR summary from current changes
context: fork
agent: Explore
---

PR diff:
!`git diff main...HEAD`

Summarize the changes above in Japanese for a PR description:
- What was changed and why
- How to test
- Breaking changes (if any)
```

## 参考リンク

- [Skills Reference - 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Custom Commands and Skills - SFEIR Institute](https://institute.sfeir.com/en/claude-code/claude-code-custom-commands-and-skills/)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
