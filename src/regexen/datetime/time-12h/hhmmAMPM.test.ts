import { describe, expect, it } from 'vitest';
import { invalidTime12hhmmAMPM, validTime12hhmmAMPM } from '../../../fixtures/datetime/time-12h.ts';
import { hhmmAMPM } from './hhmmAMPM.ts';

describe('hhmmAMPM', () => {
  it.each(Object.entries(validTime12hhmmAMPM))('%s: %s', (_, value) => {
    expect(hhmmAMPM.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime12hhmmAMPM))('%s: %s', (_, value) => {
    expect(hhmmAMPM.test(value)).toBe(false);
  });
});
