import { describe, expect, it } from 'vitest';
import {
  invalidPjbank,
  validPjbank,
} from '../../../../../fixtures/countries/br/financial/bank-account/pjbank.ts';
import { pjbank } from './pjbank.ts';

describe('pjbank', () => {
  it.each(Object.entries(validPjbank))('%s: %s', (_, value) => {
    expect(pjbank.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidPjbank))('%s: %s', (_, value) => {
    expect(pjbank.test(value)).toBe(false);
  });
});
