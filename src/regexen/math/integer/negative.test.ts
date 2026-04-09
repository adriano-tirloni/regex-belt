import { describe, expect, it } from 'vitest';
import { invalidNegativeInteger, validNegativeInteger } from '../../../fixtures/math/integer.ts';
import { negative } from './negative.ts';

describe('negative', () => {
  it.each(Object.entries(validNegativeInteger))('%s: %s', (_, value) => {
    expect(negative.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNegativeInteger))('%s: %s', (_, value) => {
    expect(negative.test(value)).toBe(false);
  });
});
