# Hooks（自動化・自律実行）

> **Hooks** は Claude Code のライフサイクルの特定タイミングで自動実行されるコマンドです。
> CLAUDE.md の「提案」と違い、**確実に実行される決定的な制御**を提供します。

## Hooks が解決すること

| 課題 | Hooks での解決 |
|------|--------------|
| コード編集後にフォーマットを忘れる | PostToolUse で prettier を自動実行 |
| 危険なコマンドを誤実行する | PreToolUse でブロック |
| タスクが本当に完了したか不明 | Stop Hook で自動検証 |
| 外部サービスへの通知 | Stop/PostToolUse で Webhook 送信 |

## Hook の設定場所

| ファイル | スコープ | Git 共有 |
|---------|--------|--------|
| `~/.claude/settings.json` | 全プロジェクト | ローカルのみ |
| `.claude/settings.json` | このプロジェクト | 可能 |
| `.claude/settings.local.json` | このプロジェクト | git ignore 推奨 |

## Hook イベント一覧

| イベント | タイミング | マッチャー |
|---------|----------|---------|
| `SessionStart` | セッション開始・再開時 | `startup`, `resume`, `clear` |
| `UserPromptSubmit` | プロンプト送信時 | — |
| `PreToolUse` | ツール実行前（ブロック可能） | ツール名（正規表現） |
| `PostToolUse` | ツール成功後 | ツール名（正規表現） |
| `PostToolUseFailure` | ツール失敗後 | ツール名（正規表現） |
| `PermissionRequest` | 権限確認ダイアログ表示時 | ツール名 |
| `Stop` | Claude の応答完了時 | — |
| `SubagentStart` | Subagent 起動時 | エージェント名 |
| `SubagentStop` | Subagent 終了時 | エージェント名 |
| `TaskCompleted` | タスク完了時 | — |
| `WorktreeCreate` | Worktree 作成時 | — |
| `WorktreeRemove` | Worktree 削除時 | — |
| `PreCompact` | コンテキスト圧縮前 | `manual`, `auto` |
| `SessionEnd` | セッション終了時 | — |

## Hook タイプ

### 1. Command（最もよく使う）

シェルコマンドを実行。stdin で JSON を受け取り、exit code で応答。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

### 2. Prompt

Claude モデルに yes/no 判定を委譲。自律性の要。

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "model": "claude-haiku-4-5-20251001",
            "prompt": "Check if all requested tasks are complete. Respond with {\"ok\": true} or {\"ok\": false, \"reason\": \"what remains\"}"
          }
        ]
      }
    ]
  }
}
```

### 3. Agent

複雑な検証をサブエージェントに委譲。

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Run the test suite and verify all tests pass. If any fail, report which ones.",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

### 4. HTTP

外部サービスへの Webhook 通知。

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "http",
            "url": "https://hooks.slack.com/services/xxx",
            "headers": { "Content-Type": "application/json" }
          }
        ]
      }
    ]
  }
}
```

## Hook の入出力

### 入力（stdin で受け取る JSON）

```json
{
  "session_id": "abc123",
  "cwd": "/path/to/project",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "rm -rf /tmp/test"
  }
}
```

### 出力（exit code で制御）

| Exit Code | 意味 |
|-----------|------|
| `0` | 実行を許可 |
| `2` | ブロック（stderr の内容が Claude へのフィードバックになる） |
| その他 | 実行を許可（ログとして記録） |

```bash
#!/bin/bash
# ブロックの例
echo "Use 'npm run lint' instead of 'eslint' directly" >&2
exit 2
```

### JSON レスポンス（exit 0 で stdout に出力）

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Dangerous command detected"
  }
}
```

## 実践例

### 例1: 編集後に自動フォーマット

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
            "command": "FILE=$(echo $CLAUDE_TOOL_INPUT | jq -r '.file_path'); npx prettier --write \"$FILE\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

### 例2: 危険なコマンドをブロック

`.claude/hooks/safe-bash.sh`:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

DANGEROUS=("rm -rf /" "git push --force origin main" "DROP TABLE")

for pattern in "${DANGEROUS[@]}"; do
  if echo "$COMMAND" | grep -qF "$pattern"; then
    echo "Blocked: '$pattern' is not allowed" >&2
    exit 2
  fi
done

exit 0
```

`.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/safe-bash.sh"
          }
        ]
      }
    ]
  }
}
```

### 例3: Stop Hook で自律的に継続（自動化の核心）

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "model": "claude-haiku-4-5-20251001",
            "prompt": "Review the work done. Check: (1) Are all lint errors fixed? (2) Do all tests pass? (3) Were all originally requested features implemented? Respond with {\"ok\": true} if complete, or {\"ok\": false, \"reason\": \"what still needs to be done\"}"
          }
        ]
      }
    ]
  }
}
```

このパターンにより Claude は自分が本当に完了しているか毎回検証し、未完なら自動で作業を再開します。

### 例4: セッション開始時にコンテキストをロード

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Current branch: $(git branch --show-current)\\nLast commit: $(git log --oneline -1)\\nUnstaged: $(git status --short | wc -l) files\""
          }
        ]
      }
    ]
  }
}
```

## マッチャー（フィルタリング）

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",           // Bash のみ
        "hooks": [...]
      },
      {
        "matcher": "Edit|Write",     // Edit または Write
        "hooks": [...]
      },
      {
        "matcher": "mcp__github__.*", // GitHub MCP のツールすべて
        "hooks": [...]
      }
    ]
  }
}
```

## 注意点

- Hooks はデフォルトでサンドボックス外で実行される。信頼できるコマンドのみ登録すること
- `command` フィールドは Shell インジェクションに注意（外部入力をそのまま使わない）
- Stop Hook で `ok: false` を返し続けると無限ループになる可能性がある

## 参考リンク

- [Hooks Guide - 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [4 Hooks for Autonomous Operation (DEV Community)](https://dev.to/yurukusa/4-hooks-that-let-claude-code-run-autonomously-with-zero-babysitting-1748)
- [Claude Code Hooks ガイド (SIOS Tech Lab)](https://tech-lab.sios.jp/archives/50794)
- [Complete Guide to Hooks](https://www.ksred.com/claude-code-hooks-a-complete-guide-to-automating-your-ai-coding-workflow/)
