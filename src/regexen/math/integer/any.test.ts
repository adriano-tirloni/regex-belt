import { describe, expect, it } from 'vitest';
import { invalidInteger, validInteger } from '../../../fixtures/math/integer.ts';
import { any } from './any.ts';

describe('any', () => {
  it.each(Object.entries(validInteger))('%s: %s', (_, value) => {
    expect(any.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidInteger))('%s: %s', (_, value) => {
    expect(any.test(value)).toBe(false);
  });
});
