import { describe, expect, it } from 'vitest';
import {
  invalidTime12hhmmssAMPM,
  validTime12hhmmssAMPM,
} from '../../../fixtures/datetime/time-12h.ts';
import { hhmmssAMPM } from './hhmmssAMPM.ts';

describe('hhmmssAMPM', () => {
  it.each(Object.entries(validTime12hhmmssAMPM))('%s: %s', (_, value) => {
    expect(hhmmssAMPM.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidTime12hhmmssAMPM))('%s: %s', (_, value) => {
    expect(hhmmssAMPM.test(value)).toBe(false);
  });
});
