'use strict';

const WALLET = '0x648baa08901f1beab002af57f1375f80ec4f4893';
const USDC_BASE = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
const TOPIC_TRANSFER = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const TOPIC_TO = '0x000000000000000000000000' + WALLET.slice(2);
const PRICE_UNITS = BigInt('5000000'); // $5, 6 decimals
const LOOKBACK_BLOCKS = 400;           // ~1.5h at 2s base blocks
// ponytail: unlisted-path gating, not DRM. Path secrecy is the industry-standard
// "unlisted release" level; fine until weekly paid volume proves otherwise.
const DL_PATH = '/d/9c4f1a2b0e8d34c5a6b7f8e90123d45e67890abc/memctl-memory-pack-v1.zip';
const RPCS = [
  'https://mainnet.base.org',
  'https://base-rpc.publicnode.com',
  'https://1rpc.io/base',
  'https://base.drpc.org',
];

function parseAmount(dataHex) {
  if (typeof dataHex !== 'string' || !/^0x/.test(dataHex) || dataHex.length < 66) return 0n;
  return BigInt('0x' + dataHex.slice(-64));
}

async function rpcPost(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await res.json();
  if (!res.ok || j.error) throw new Error('rpc ' + url + ' : ' + JSON.stringify(j.error || res.status));
  return j.result;
}

async function lastBlock() {
  for (const u of RPCS) {
    try { return Number(await rpcPost(u, { jsonrpc: '2.0', id: 1, method: 'eth_blockNumber' })); }
    catch (e) { /* try next */ }
  }
  throw new Error('all RPCs unreachable');
}

function paidAmount(blocks) {
  return blocks.reduce((acc, b) => acc + (b ? parseAmount(b) : 0n), 0n);
}

async function checkPaid() {
  let latest;
  try { latest = await lastBlock(); } catch (e) { return { paid: false, error: e.message }; }
  const from = '0x' + (latest - LOOKBACK_BLOCKS).toString(16);
  let logs = [];
  for (const u of RPCS) {
    try {
      let result = await rpcPost(u, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getLogs',
        params: [{
          address: USDC_BASE,
          topics: [TOPIC_TRANSFER, null, TOPIC_TO],
          fromBlock: from,
          toBlock: 'latest',
        }],
      });
      if (!result) result = [];
      logs = result;
      break;
    } catch (e) { /* try next */ }
  }
  // decode: block with zero data should not count as payment; we filter logs lacking data
  const transfers = logs.filter(l => l && l.data && l.data.length >= 66);
  const total = paidAmount(transfers);
  return { paid: total >= PRICE_UNITS, total: total.toString(), paidEach: transfers.length > 0 };
}

exports.handler = async (event) => {
  const headers = {
    'content-type': 'application/json',
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
  };
  const state = await checkPaid();
  if (state.paid) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ paid: true, downloadUrl: DL_PATH }),
    };
  }
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      paid: false,
      neededUsdc: 5,
      wallet: WALLET,
      usdcContract: USDC_BASE,
      error: state.error || null,
    }),
  };
};

exports.parseAmount = parseAmount;
exports._checkPaid = checkPaid;