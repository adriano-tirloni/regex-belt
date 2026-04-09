import { describe, expect, it } from 'vitest';
import {
  invalidIso8601DatetimeWithTz,
  validIso8601DatetimeWithTz,
} from '../../../fixtures/datetime/iso8601.ts';
import { datetimeWithTz } from './datetime-with-tz.ts';

describe('datetimeWithTz', () => {
  it.each(Object.entries(validIso8601DatetimeWithTz))('%s: %s', (_, value) => {
    expect(datetimeWithTz.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidIso8601DatetimeWithTz))('%s: %s', (_, value) => {
    expect(datetimeWithTz.test(value)).toBe(false);
  });
});
