import { describe, expect, it } from 'vitest';
import { invalidNegativeDecimal, validNegativeDecimal } from '../../../fixtures/math/decimal.ts';
import { negative } from './negative.ts';

describe('negative', () => {
  it.each(Object.entries(validNegativeDecimal))('%s: %s', (_, value) => {
    expect(negative.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNegativeDecimal))('%s: %s', (_, value) => {
    expect(negative.test(value)).toBe(false);
  });
});
