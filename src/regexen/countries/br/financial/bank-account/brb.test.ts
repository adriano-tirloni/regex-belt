import { describe, expect, it } from 'vitest';
import {
  invalidBrb,
  validBrb,
} from '../../../../../fixtures/countries/br/financial/bank-account/brb.ts';
import { brb } from './brb.ts';

describe('brb', () => {
  it.each(Object.entries(validBrb))('%s: %s', (_, value) => {
    expect(brb.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBrb))('%s: %s', (_, value) => {
    expect(brb.test(value)).toBe(false);
  });
});
