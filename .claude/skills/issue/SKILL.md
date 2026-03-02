---
name: issue
description: Plan, implement, verify, and create a PR for a GitHub issue end-to-end
argument-hint: "[issue-url or issue-number]"
context: fork
agent: general-purpose
---

GitHub Issue `$ARGUMENTS` を **計画 → Worktree 作成 → 実装 → 検証 → PR 作成** まで自律的に完遂してください。

---

## Issue の詳細

!`gh issue view "$ARGUMENTS" --json number,title,body,labels 2>/dev/null`

---

## プロジェクト情報

**利用可能なスクリプト:**
!`jq -r '.scripts // {} | to_entries[] | "  - \(.key): \(.value)"' package.json 2>/dev/null`

**デフォルトブランチ:**
!`gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "main"`

**作業ディレクトリ:**
!`pwd`

---

## 実行手順

各ステップを順番に実行してください。前のステップが完了してから次へ進むこと。

---

### Step 1: 調査・計画

コードを書く前に必ず実施してください。

1. Issue のタイトルと本文を読み、何を実現するか把握する
2. CLAUDE.md のプロジェクト規約を確認する
3. 関連ファイルをコードベースから探し、既存パターンを把握する
4. 実装方針（変更・新規作成するファイル一覧と理由）をまとめて提示する

---

### Step 2: Worktree の作成

Issue 専用の独立した作業ブランチを作成します。

```bash
ISSUE_NUM=$(gh issue view "$ARGUMENTS" --json number --jq '.number')
BASE=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || echo "main")
BRANCH="feature/issue-${ISSUE_NUM}"
WORKTREE_PATH=".claude/worktrees/issue-${ISSUE_NUM}"

git worktree add "$WORKTREE_PATH" -b "$BRANCH" "$BASE"
echo "✓ Worktree: $WORKTREE_PATH (branch: $BRANCH, base: $BASE)"
```

以降の実装・検証・コミット・push はすべてこの WORKTREE_PATH 内で行うこと。

---

### Step 3: 実装

Step 1 の計画に基づき、WORKTREE_PATH 内のファイルを変更・作成します。

- CLAUDE.md の規約に従う
- 論理的な単位で進める（一度に巨大な変更をしない）
- 実装が完了したら Step 4 へ

---

### Step 4: 検証

以下をすべて通過するまで修正を繰り返すこと。

```bash
cd "$WORKTREE_PATH"

# Lint
npm run lint 2>/dev/null \
  && echo "✓ lint OK" \
  || echo "✗ lint FAILED — fix errors and re-run"

# TypeScript（tsc が使える場合）
npx tsc --noEmit 2>/dev/null \
  && echo "✓ tsc OK" \
  || echo "✗ tsc FAILED — fix type errors and re-run"

# テスト（スクリプトが存在する場合のみ）
npm run test 2>/dev/null \
  && echo "✓ tests OK" \
  || echo "(no test script — skip)"
```

エラーが残っている場合は修正して再実行。すべて通過したら Step 5 へ。

---

### Step 5: コミット

```bash
cd "$WORKTREE_PATH"

ISSUE_NUM=$(gh issue view "$ARGUMENTS" --json number --jq '.number')
ISSUE_TITLE=$(gh issue view "$ARGUMENTS" --json title --jq '.title')

git add -A
git commit -m "feat: ${ISSUE_TITLE} (closes #${ISSUE_NUM})"
```

---

### Step 6: Push & PR 作成

```bash
cd "$WORKTREE_PATH"

ISSUE_NUM=$(gh issue view "$ARGUMENTS" --json number --jq '.number')
ISSUE_TITLE=$(gh issue view "$ARGUMENTS" --json title --jq '.title')
BASE=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || echo "main")
BRANCH="feature/issue-${ISSUE_NUM}"

git push -u origin "$BRANCH"

gh pr create \
  --base "$BASE" \
  --title "${ISSUE_TITLE}" \
  --body "$(cat <<EOF
## Summary

Closes #${ISSUE_NUM}

## Changes

$(git log --oneline "${BASE}..HEAD" 2>/dev/null)

## Test plan

- [ ] \`npm run lint\` passes
- [ ] \`npx tsc --noEmit\` passes

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

PR の URL を最後に報告してください。
