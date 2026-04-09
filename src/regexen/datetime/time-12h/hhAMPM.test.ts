import { describe, expect, it } from 'vitest';
import { invalidTime12hhAMPM, validTime12hhAMPM } from '../../../fixtures/datetime/time-12h.ts';
import { hhAMPM } from './hhAMPM.ts';

describe('hhAMPM', () => {
  it.each(Object.entries(validTime12hhAMPM))('%s: %s', (_, value) => {
    expect(hhAMPM.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime12hhAMPM))('%s: %s', (_, value) => {
    expect(hhAMPM.test(value)).toBe(false);
  });
});
