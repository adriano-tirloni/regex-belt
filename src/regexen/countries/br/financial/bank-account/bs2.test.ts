import { describe, expect, it } from 'vitest';
import {
  invalidBs2,
  validBs2,
} from '../../../../../fixtures/countries/br/financial/bank-account/bs2.ts';
import { bs2 } from './bs2.ts';

describe('bs2', () => {
  it.each(Object.entries(validBs2))('%s: %s', (_, value) => {
    expect(bs2.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBs2))('%s: %s', (_, value) => {
    expect(bs2.test(value)).toBe(false);
  });
});
