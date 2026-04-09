import { describe, expect, it } from 'vitest';
import {
  invalidIso8601DatetimeWithoutTz,
  validIso8601DatetimeWithoutTz,
} from '../../../fixtures/datetime/iso8601.ts';
import { datetimeWithoutTz } from './datetime-without-tz.ts';

describe('datetimeWithoutTz', () => {
  it.each(Object.entries(validIso8601DatetimeWithoutTz))('%s: %s', (_, value) => {
    expect(datetimeWithoutTz.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidIso8601DatetimeWithoutTz))('%s: %s', (_, value) => {
    expect(datetimeWithoutTz.test(value)).toBe(false);
  });
});
