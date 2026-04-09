import { describe, expect, it } from 'vitest';
import { invalidTime12hhmmss, validTime12hhmmss } from '../../../fixtures/datetime/time-12h.ts';
import { hhmmss } from './hhmmss.ts';

describe('hhmmss', () => {
  it.each(Object.entries(validTime12hhmmss))('%s: %s', (_, value) => {
    expect(hhmmss.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime12hhmmss))('%s: %s', (_, value) => {
    expect(hhmmss.test(value)).toBe(false);
  });
});
