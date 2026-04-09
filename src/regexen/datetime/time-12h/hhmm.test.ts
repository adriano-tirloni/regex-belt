import { describe, expect, it } from 'vitest';
import { invalidTime12hhmm, validTime12hhmm } from '../../../fixtures/datetime/time-12h.ts';
import { hhmm } from './hhmm.ts';

describe('hhmm', () => {
  it.each(Object.entries(validTime12hhmm))('%s: %s', (_, value) => {
    expect(hhmm.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime12hhmm))('%s: %s', (_, value) => {
    expect(hhmm.test(value)).toBe(false);
  });
});
