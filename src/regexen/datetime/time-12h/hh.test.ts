import { describe, expect, it } from 'vitest';
import { invalidTime12hh, validTime12hh } from '../../../fixtures/datetime/time-12h.ts';
import { hh } from './hh.ts';

describe('hh', () => {
  it.each(Object.entries(validTime12hh))('%s: %s', (_, value) => {
    expect(hh.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime12hh))('%s: %s', (_, value) => {
    expect(hh.test(value)).toBe(false);
  });
});
