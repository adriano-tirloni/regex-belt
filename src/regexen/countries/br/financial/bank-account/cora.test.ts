import { describe, expect, it } from 'vitest';
import {
  invalidCora,
  validCora,
} from '../../../../../fixtures/countries/br/financial/bank-account/cora.ts';
import { cora } from './cora.ts';

describe('cora', () => {
  it.each(Object.entries(validCora))('%s: %s', (_, value) => {
    expect(cora.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCora))('%s: %s', (_, value) => {
    expect(cora.test(value)).toBe(false);
  });
});
