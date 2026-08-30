# Agent cheat sheet

Keyword triggers that keep sessions tight. Paste into your agent's instructions or your
CLAUDE.md's working-with-me section.

- `> check`: re-state the last command's actual output before changing anything.
- `> plan`: give me steps + files before editing; wait for my go.
- `> done`: one line per change + what was verified; then stop.
- `> assume`: tell me the assumption you're about to bet on.
- `> debt`: list the shortcuts you took this session; each gets a `ponytail:` note in code.
- `> revert`: show the diff of the last commit before undoing it.

## Guardrails (non-negotiable, no triggers needed)
- Never auto-teleport money, tokens, or credentials without an explicit instruction.
- Never commit secrets; if one leaks, rotate it and say so out loud.
- Security holes get fixed or surfaced — never silently "left for later".

## Session shape
1. State goal + success test in one line each.
2. Do the smallest change that passes the test.
3. Verify with the real command, not by eyeballing.
4. Report result, then stop. No extra credit unless asked.