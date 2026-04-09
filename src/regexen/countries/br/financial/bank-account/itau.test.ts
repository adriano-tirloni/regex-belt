import { describe, expect, it } from 'vitest';
import {
  invalidItau,
  validItau,
} from '../../../../../fixtures/countries/br/financial/bank-account/itau.ts';
import { itau } from './itau.ts';

describe('itau', () => {
  it.each(Object.entries(validItau))('%s: %s', (_, value) => {
    expect(itau.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidItau))('%s: %s', (_, value) => {
    expect(itau.test(value)).toBe(false);
  });
});
