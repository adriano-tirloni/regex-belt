import { describe, expect, it } from 'vitest';
import { invalidFull, validFull } from '../../../fixtures/network/url/full.ts';
import { full } from './full.ts';

describe('full', () => {
  it.each(Object.entries(validFull))('%s: %s', (_, value) => {
    expect(full.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidFull))('%s: %s', (_, value) => {
    expect(full.test(value)).toBe(false);
  });
});
