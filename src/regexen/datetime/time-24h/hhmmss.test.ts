import { describe, expect, it } from 'vitest';
import { invalidTime24hhmmss, validTime24hhmmss } from '../../../fixtures/datetime/time-24h.ts';
import { hhmmss } from './hhmmss.ts';

describe('hhmmss', () => {
  it.each(Object.entries(validTime24hhmmss))('%s: %s', (_, value) => {
    expect(hhmmss.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime24hhmmss))('%s: %s', (_, value) => {
    expect(hhmmss.test(value)).toBe(false);
  });
});
