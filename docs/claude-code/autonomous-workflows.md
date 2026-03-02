# 自律開発ワークフロー パターン集

> Skills + Hooks + Git Worktree を組み合わせた実践パターンです。
> 「Claude に何度もフィードバックしなくてもタスクが完了する」状態を目指します。

## 自律性のレベル

| レベル | 説明 | 必要な設定 |
|-------|------|---------|
| **L0** | 毎回人間が確認・指示 | なし（デフォルト） |
| **L1** | 定型タスクをスキルで省力化 | Skills |
| **L2** | ツール実行後の副作用を自動化 | Hooks（PostToolUse） |
| **L3** | タスク完了を自動検証・再実行 | Hooks（Stop） |
| **L4** | 複数タスクを並列で完全自動 | Worktree + 複数セッション |

---

## パターン1: 自動フォーマット + Lint チェック（L2）

コード編集のたびに自動でフォーマット・Lint を実行します。

`.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=$(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path // .new_path // \"\"'); if [ -n \"$FILE\" ] && [ -f \"$FILE\" ]; then npx prettier --write \"$FILE\" 2>/dev/null; fi"
          }
        ]
      }
    ]
  }
}
```

**効果**: Claude がファイルを編集するたびに prettier が走るため、「フォーマットして」と言う必要がなくなります。

---

## パターン2: Stop Hook で自動検証・継続（L3）

Claude が「完了した」と判断した後、本当に完了しているか自動で検証します。

`.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "model": "claude-haiku-4-5-20251001",
            "prompt": "You are a QA reviewer. Check if the following conditions are all met:\n1. All originally requested features are implemented\n2. No lint errors (if a lint command is available)\n3. No TypeScript errors\n4. Tests pass (if tests exist)\n\nRespond ONLY with JSON: {\"ok\": true} if all complete, or {\"ok\": false, \"reason\": \"specific description of what's missing\"}"
          }
        ]
      }
    ]
  }
}
```

**効果**: 「実装できました」→ 検証 → 「テストがない」→ 自動でテスト作成 → 再検証、というループが自動で動きます。

---

## パターン3: Issue 修正の完全自動化（L3）

GitHub Issue を渡すだけで修正・テスト・PR まで自動化するスキル。

`.claude/skills/fix-issue/SKILL.md`:

```yaml
---
name: fix-issue
description: Fix a GitHub issue end-to-end including tests and PR
argument-hint: "[issue-number]"
---

Fix GitHub Issue #$ARGUMENTS completely:

Issue details:
!`gh issue view $ARGUMENTS`

Steps:
1. Read the issue carefully
2. Find relevant files using search
3. Implement the fix
4. Write or update tests
5. Run `npm run lint` and fix any errors
6. Run `npm test` and ensure all pass
7. Commit with a descriptive message referencing #$ARGUMENTS
8. Create a PR: `gh pr create --title "Fix #$ARGUMENTS: [brief description]" --body "Closes #$ARGUMENTS"`
```

**使い方**: `/fix-issue 42` と入力するだけで Issue 42 の修正から PR 作成まで自動実行。

---

## パターン4: 並列レビュー（L4）

実装と同時に独立したレビューを走らせます。

**ターミナル A（実装）**:

```bash
git worktree add .claude/worktrees/feat-payment -b feature/payment
cd .claude/worktrees/feat-payment
npm install
claude
# > 決済フローを実装してください
```

**ターミナル B（レビュー・同時進行）**:

```bash
git worktree add .claude/worktrees/review-payment -b review/payment
cd .claude/worktrees/review-payment
claude
# > feature/payment ブランチの実装をリアルタイムでレビューして問題点を報告してください
```

---

## パターン5: 複数機能の並列開発（L4）

大きな機能を独立した部分に分割して同時に実装します。

```bash
# セットアップスクリプト例
#!/bin/bash
FEATURES=("auth" "dashboard" "settings")

for feature in "${FEATURES[@]}"; do
  path=".claude/worktrees/feature-$feature"
  git worktree add "$path" -b "feature/$feature"
  (cd "$path" && npm install)
  echo "Worktree ready: $path (branch: feature/$feature)"
done

echo "---"
echo "Next: Open separate terminals and run:"
for feature in "${FEATURES[@]}"; do
  echo "  cd .claude/worktrees/feature-$feature && claude"
done
```

---

## パターン6: CI 的な非インタラクティブ実行（L3-L4）

人間の介入なしにバックグラウンドでタスクを実行します。

```bash
# Lint エラーをすべて自動修正
claude -p "Fix all TypeScript and ESLint errors. Run lint after each fix to verify." \
  --allowedTools "Edit,Bash(npm run lint),Bash(npx tsc --noEmit)" \
  --output-format json

# テスト失敗を修正して PR 作成
claude -p "Fix the failing tests in the CI. Create a PR when done." \
  --allowedTools "Edit,Bash(npm test),Bash(gh pr create)" \
  --dangerously-skip-permissions
```

> **注意**: `--dangerously-skip-permissions` はすべての確認をスキップします。
> 信頼できるコマンドのみ `--allowedTools` で明示的に許可して使用してください。

---

## このプロジェクト向けの設定例

このポートフォリオサイト（React + TypeScript + Vite + Tailwind CSS 4）向けの設定：

### `.claude/settings.json` の推奨設定

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=$(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path // \"\"'); if echo \"$FILE\" | grep -qE '\\.(ts|tsx)$' && [ -f \"$FILE\" ]; then npx prettier --write \"$FILE\" 2>/dev/null || true; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "model": "claude-haiku-4-5-20251001",
            "prompt": "Check: (1) All features requested are implemented, (2) No TypeScript errors (run tsc if needed), (3) Storybook stories exist for new components. Respond {\"ok\": true} or {\"ok\": false, \"reason\": \"...\"}."
          }
        ]
      }
    ]
  }
}
```

### `.claude/skills/new-component/SKILL.md`

```yaml
---
name: new-component
description: Create a new React component with Storybook stories following Atomic Design
argument-hint: "[ComponentName] [atoms|molecules|organisms]"
---

Create a new component "$ARGUMENTS[0]" in the $ARGUMENTS[1] layer:

1. Create `src/component/$ARGUMENTS[1]/$ARGUMENTS[0]/$ARGUMENTS[0].tsx`
   - Follow existing component patterns in that layer
   - Use Tailwind CSS 4 utilities (body-1, heading-1 etc. from theme.css)
   - Export as named export

2. Create `src/component/$ARGUMENTS[1]/$ARGUMENTS[0]/$ARGUMENTS[0].stories.tsx`
   - Import from `@storybook/react-vite`
   - title: "$ARGUMENTS[1]/$ARGUMENTS[0]"
   - Add `tags: ["autodocs"]`
   - Add at least 2 story variants

3. Run `npm run lint` to verify no errors

Current component examples:
!`ls src/component/$ARGUMENTS[1]/`
```

---

## Tips: 自律性を高めるための CLAUDE.md の書き方

```markdown
## Autonomous Workflow

When implementing features:
1. Always write tests alongside implementation
2. Run `npm run lint` before considering a task done
3. Run `npx tsc --noEmit` to check TypeScript errors
4. New components require Storybook stories

## Prefer
- Edit existing files over creating new ones
- Atomic Design layer conventions
- Named exports over default exports

## Never
- Skip lint or type checking
- Create components without Storybook stories
- Push directly to main branch
```

---

## 参考リンク

- [Best Practices - 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/best-practices)
- [Common Workflows - 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [claude-code-harness (GitHub)](https://github.com/Chachamaru127/claude-code-harness) — 自律化実装例
- [claude-code-best-practices (GitHub)](https://github.com/awattar/claude-code-best-practices)
- [Parallel Vibe Coding (Dan Does Code)](https://www.dandoescode.com/blog/parallel-vibe-coding-with-git-worktrees)
