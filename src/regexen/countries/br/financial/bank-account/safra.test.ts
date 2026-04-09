import { describe, expect, it } from 'vitest';
import {
  invalidSafra,
  validSafra,
} from '../../../../../fixtures/countries/br/financial/bank-account/safra.ts';
import { safra } from './safra.ts';

describe('safra', () => {
  it.each(Object.entries(validSafra))('%s: %s', (_, value) => {
    expect(safra.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidSafra))('%s: %s', (_, value) => {
    expect(safra.test(value)).toBe(false);
  });
});
