import { describe, expect, it } from 'vitest';
import { invalidDecimal, validDecimal } from '../../../fixtures/math/decimal.ts';
import { any } from './any.ts';

describe('any', () => {
  it.each(Object.entries(validDecimal))('%s: %s', (_, value) => {
    expect(any.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidDecimal))('%s: %s', (_, value) => {
    expect(any.test(value)).toBe(false);
  });
});
