import { describe, expect, it } from 'vitest';
import { invalidTime24hh, validTime24hh } from '../../../fixtures/datetime/time-24h.ts';
import { hh } from './hh.ts';

describe('hh', () => {
  it.each(Object.entries(validTime24hh))('%s: %s', (_, value) => {
    expect(hh.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime24hh))('%s: %s', (_, value) => {
    expect(hh.test(value)).toBe(false);
  });
});
