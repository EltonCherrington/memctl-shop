# Data stack memory

Add to CLAUDE.md when the repo moves or transforms data.

## Conventions
- Every pipeline step is idempotent: re-running yields the same result. Upserts, not overwrites.
- Watermarks/timestamps on sources are sacred: never process "all rows", process `since <mark>`.
- Schemas change additive-first; destructive column changes need a backfill plan in the same PR.
- Row counts + checksums on both sides after any big migration. If they mismatch, stop.

## Quality
- Tests run against a small fixture dataset AND a sample of prod-shaped data.
- Ratios beat absolutes for anomalies — pegged values (zeros, saturates) are the failure mode.
- Null means unknown, empty means none, zero means measured-zero. Enforce the distinction.

## Performance
- Vectorise: fewer, bigger operations beat row loops for pipelines.
- Cache the result of any query you can prove is deterministic; prove it, don't assume.

## CHECK block for data work
> STOP. Which row was expected vs produced? Re-run the last three steps with one row. The mismatch
> is either in a transform or a join — say which before you edit any code.