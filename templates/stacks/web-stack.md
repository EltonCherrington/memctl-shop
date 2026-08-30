# Web / API stack memory

Add to CLAUDE.md when the repo is a web service or API.

## Conventions
- HTTP status codes carry intent: 2xx success, 4xx caller error, 5xx our bug.
- Validate at the boundary: reject bad input with 400 + a message, never let it 500.
- Errors in responses are `{ "error": { "code": "...", "message": "..." } }` — machine-readable
  `code`, human `message`.
- IDs are opaque: don't parse them, don't infer order from them.

## Endpoints
- Document every route that ships. `docs/api.md` stays current or the PR doesn't merge.
- Pagination is required on any list endpoint: `?before=<id>&limit=100`, stable ordering.
- Lock release before response. No silent retries on non-idempotent verbs.

## Data
- Database writes go through one data layer per aggregate — no ad-hoc queries in handlers.
- Never trust a value from the wire: coerce types, clamp lengths, escape what you render.
- Secrets come from the environment only, and never appear in logs or responses.

## Performance
- Profile before optimizing. A measured win that keeps readability beats a clever one.
- N+1 is the default smell: batch, don't loop-fetch.

## CHECK block for HTTP work
> STOP. What status did the client actually get? Which code path produced it? Reproduce with the
> narrowest request, then trace the handler. Fix the smallest layer that owns the bug.