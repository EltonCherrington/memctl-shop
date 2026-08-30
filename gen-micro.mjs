// gen-micro.mjs — derive the $1 Micro Pack page from the storefront (single source of truth).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(dir, '_site', 'index.html'), 'utf8');

let s = src;
s = s.replace('const PRICE = 5000000n', 'const PRICE = 1000000n');
s = s.replaceAll('memctl-memory-pack-v1.zip', 'memctl-micro-pack-v1.zip');
s = s.replaceAll('$5 USDC', '$1 USDC');
s = s.replaceAll('≥ $5', '≥ $1');
s = s.replace('The Memory Pack</h2>', 'The Micro Pack</h2>');
s = s.replace('<span class="strike">$9</span>', '<span class="strike">$2</span>');
s = s.replace(
  'Curated, tested starter memory for your coding agent — drop-in, adapt in minutes.',
  'The distilled starter: one cheat sheet + one minimal CLAUDE.md, ready in two minutes.'
);
s = s.replace(
  '<li><code>base/CLAUDE.md</code> — project-identity, quality bar, handoff format</li>',
  '<li><code>cheat-sheet.md</code> — the conventions every agent should already know</li>'
);
s = s.replace(
  '<li><code>stacks/</code> — web, data, and API templates</li>',
  '<li><code>base/CLAUDE.md</code> — minimal, sane, drop-in memory starter</li>'
);
s = s.replace(
  '<li><code>memctl init</code> wiring + cheat sheet</li>',
  '<li>Works with Claude Code, Codex, Cursor — any <code>CLAUDE.md</code> reader</li>'
);
s = s.replace(
  '<p class="sub">',
  '<p class="sub" style="margin-bottom:4px">'
);
writeFileSync(join(dir, '_site', 'micro.html'), s, 'utf8');
console.log('micro.html written, len=' + s.length);