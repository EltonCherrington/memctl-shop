# CLAUDE.md — repo memory for {PROJECT}

> Edit this file to reflect THIS repository. Delete what doesn't apply.

## 1. What this repo is
{One paragraph: what it does, who uses it, what "done" looks like.}

## 2. Commands that matter
- Build: `{command}`   (always runs from repo root)
- Test: `{command}`    (the ONLY gate for "done")
- Lint: `{command}`    (never skip before a commit)
- Run: `{command}`

## 3. Non-negotiables
- One concern per commit; message format `type: summary` (feat/fix/docs/refactor/chore/test).
- Never commit generated output, `.env`, or local secrets. Ignore rules beat force-adds.
- Tests must pass AND lint must be clean before any branch is pushed. No exceptions, no
  "just this once" — that's how memory stops being trustworthy.
- Public APIs are additive: renaming a function or removing a field ships with a migration.

## 4. How this codebase is organised
- `src/` — implementation; a file under src/ maps to one responsibility.
- `tests/` — one test file per src/ file, same relative path.
- `docs/` — decisions, not duplicates. If a README says why, code says how.

## 5. Working with me
- Short, current, cache-checked statements. When unsure, print the actual values — don't guess.
- When something fails: read the error, locate it (file:line), state a fix. If two attempts
  fail, stop and describe the assumption that looks wrong.
- When something ships: one summary line per change plus what was verified.
- I never wing a security or money path. Ask before touching either.

## 6. CHECK block (use verbatim when a command misbehaves)
> STOP. Read the full error. Name the file and line. Say what you expected vs what happened.
> Propose ONE fix and apply it. If it still fails twice, stop and report rather than stacking guesses.