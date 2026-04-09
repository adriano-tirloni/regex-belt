import { describe, expect, it } from 'vitest';
import { invalidPositiveDecimal, validPositiveDecimal } from '../../../fixtures/math/decimal.ts';
import { positive } from './positive.ts';

describe('positive', () => {
  it.each(Object.entries(validPositiveDecimal))('%s: %s', (_, value) => {
    expect(positive.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidPositiveDecimal))('%s: %s', (_, value) => {
    expect(positive.test(value)).toBe(false);
  });
});
