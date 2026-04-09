import { describe, expect, it } from 'vitest';
import {
  invalidIso8601Standard,
  validIso8601Standard,
} from '../../../fixtures/datetime/iso8601.ts';
import { standard } from './standard.ts';

describe('standard', () => {
  it.each(Object.entries(validIso8601Standard))('%s: %s', (_, value) => {
    expect(standard.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidIso8601Standard))('%s: %s', (_, value) => {
    expect(standard.test(value)).toBe(false);
  });
});
