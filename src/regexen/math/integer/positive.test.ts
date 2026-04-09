import { describe, expect, it } from 'vitest';
import { invalidPositiveInteger, validPositiveInteger } from '../../../fixtures/math/integer.ts';
import { positive } from './positive.ts';

describe('positive', () => {
  it.each(Object.entries(validPositiveInteger))('%s: %s', (_, value) => {
    expect(positive.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidPositiveInteger))('%s: %s', (_, value) => {
    expect(positive.test(value)).toBe(false);
  });
});
