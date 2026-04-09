import { describe, expect, it } from 'vitest';
import {
  invalidBanrisul,
  validBanrisul,
} from '../../../../../fixtures/countries/br/financial/bank-account/banrisul.ts';
import { banrisul } from './banrisul.ts';

describe('banrisul', () => {
  it.each(Object.entries(validBanrisul))('%s: %s', (_, value) => {
    expect(banrisul.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBanrisul))('%s: %s', (_, value) => {
    expect(banrisul.test(value)).toBe(false);
  });
});
