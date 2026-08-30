'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { parseAmount } = require('./functions/unlock.js');

test('parseAmount reads trailing 32 bytes (6-decimal USDC)', () => {
  // 5.000000 USDC encoded with leading zeros stripped to standard 64-char data
  const data = '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c4b40';
  assert.equal(parseAmount(data), 5000000n);
});

test('parseAmount handles full-width data field', () => {
  const data = '0x' + '00'.repeat(32) + '0000000000000000000000000000000000000000000000000000000000000064';
  assert.equal(parseAmount(data), 100n);
});

test('parseAmount rejects malformed input', () => {
  assert.equal(parseAmount(undefined), 0n);
  assert.equal(parseAmount('0x12'), 0n);
  assert.equal(parseAmount('nope'), 0n);
});