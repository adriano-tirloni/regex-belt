import { describe, expect, it } from 'vitest';
import {
  invalidBancoOriginal,
  validBancoOriginal,
} from '../../../../../fixtures/countries/br/financial/bank-account/banco-original.ts';
import { bancoOriginal } from './banco-original.ts';

describe('bancoOriginal', () => {
  it.each(Object.entries(validBancoOriginal))('%s: %s', (_, value) => {
    expect(bancoOriginal.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBancoOriginal))('%s: %s', (_, value) => {
    expect(bancoOriginal.test(value)).toBe(false);
  });
});
