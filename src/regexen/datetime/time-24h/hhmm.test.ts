import { describe, expect, it } from 'vitest';
import { invalidTime24hhmm, validTime24hhmm } from '../../../fixtures/datetime/time-24h.ts';
import { hhmm } from './hhmm.ts';

describe('hhmm', () => {
  it.each(Object.entries(validTime24hhmm))('%s: %s', (_, value) => {
    expect(hhmm.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime24hhmm))('%s: %s', (_, value) => {
    expect(hhmm.test(value)).toBe(false);
  });
});
