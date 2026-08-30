# The Memory Pack

Curated starter memory for coding agents. Drop the pieces you need into any repo where an
agent (Claude Code, Codex, Cursor, Gemini CLI) will work. Adapt, don't memorize.

## Contents

| Path | When to use |
|---|---|
| `base/CLAUDE.md` | Any repo. Project identity, quality bar, handoff format |
| `stacks/web-stack.md` | Web / API repositories |
| `stacks/data-stack.md` | Data / pipeline repositories |
| `cheat-sheet.md` | Keyword triggers that keep both the agent and you honest |
| `memctl init` | Suggested wiring so the memory stays versioned |

## Setup (60 seconds)

1. Copy the relevant files next to your existing `.gitignore` (repo root).
2. Delete the sections that don't apply to you — half the value is pruning.
3. If you use memctl: run `memctl init` in the repo and commit.

## Quality expectations

- These are *starters*, not doctrine. Badges and emoji are removed so diffs stay clean.
- Keep every rule to one line where possible — agents weight short, checkable rules higher.
- The `CHECK` blocks are called when a command fails: the agent is told to stop, read,
  and report. That is a habit, so it ships in the template.

## Updates

This pack is versioned on GitHub. Repo: see the LICENSE at the root of the zip; updates ship
with free lifetime access via the same download (checksums are posted on the site).