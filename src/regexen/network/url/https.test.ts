import { describe, expect, it } from 'vitest';
import { invalidHttps, validHttps } from '../../../fixtures/network/url/https.ts';
import { https } from './https.ts';

describe('https', () => {
  it.each(Object.entries(validHttps))('%s: %s', (_, value) => {
    expect(https.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidHttps))('%s: %s', (_, value) => {
    expect(https.test(value)).toBe(false);
  });
});
