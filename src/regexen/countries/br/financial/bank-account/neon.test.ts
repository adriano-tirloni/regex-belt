import { describe, expect, it } from 'vitest';
import {
  invalidNeon,
  validNeon,
} from '../../../../../fixtures/countries/br/financial/bank-account/neon.ts';
import { neon } from './neon.ts';

describe('neon', () => {
  it.each(Object.entries(validNeon))('%s: %s', (_, value) => {
    expect(neon.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNeon))('%s: %s', (_, value) => {
    expect(neon.test(value)).toBe(false);
  });
});
