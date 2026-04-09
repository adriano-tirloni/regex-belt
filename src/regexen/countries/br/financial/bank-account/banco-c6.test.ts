import { describe, expect, it } from 'vitest';
import {
  invalidBancoC6,
  validBancoC6,
} from '../../../../../fixtures/countries/br/financial/bank-account/banco-c6.ts';
import { bancoC6 } from './banco-c6.ts';

describe('bancoC6', () => {
  it.each(Object.entries(validBancoC6))('%s: %s', (_, value) => {
    expect(bancoC6.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBancoC6))('%s: %s', (_, value) => {
    expect(bancoC6.test(value)).toBe(false);
  });
});
