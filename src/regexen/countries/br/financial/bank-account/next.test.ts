import { describe, expect, it } from 'vitest';
import {
  invalidNext,
  validNext,
} from '../../../../../fixtures/countries/br/financial/bank-account/next.ts';
import { next } from './next.ts';

describe('next', () => {
  it.each(Object.entries(validNext))('%s: %s', (_, value) => {
    expect(next.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNext))('%s: %s', (_, value) => {
    expect(next.test(value)).toBe(false);
  });
});
