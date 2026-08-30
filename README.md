# memctl-shop

Storefront for the **memctl Memory Pack** — curated starter memory (CLAUDE.md / AGENTS.md)
for coding agents, with on-chain USDC payment on Base.

## Files
- `site/index.html` — buy page. Sends $5 USDC → client-side verifier reads the public Base
  chain → unlock. No account, no checkout, no middleman.
- `pack/memctl-memory-pack-v1.zip` — the product (base templates, stack templates, cheat
  sheet, refund policy).
- `functions/unlock.js` — serverless version of the same verifier (kept for a future
  hosted/API route; the live page runs the identical logic in-browser).
- `test-unlock.test.js` — `node --test` checks for the on-chain amount decoder.

## Buy page
https://raw.githack.com/EltonCherrington/memctl-shop/main/site/index.html

Serves via githack CDN as `text/html` (browser-executable); jsDelivr serves HTML as
`text/plain`, so it is used only for the zip pack. Mirror: product repo
https://github.com/EltonCherrington/memctl

## Verification logic (works on any Base RPC with CORS `*`)
1. Poll `eth_getLogs` for USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`) `Transfer`
   events where `to` = wallet `0x648bAa08901f1bEAB002Af57f1375F80Ec4F4893`.
2. Sum amounts (6 decimals) across the last 5000 blocks (~2.8 hours).
3. ≥ 5.000000 USDC → reveal the zip URL. Anything else → prompt to retry.

Amount decoder covered by `node --test` (3 cases).