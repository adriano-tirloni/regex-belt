import { describe, expect, it } from 'vitest';
import { invalidFtp, validFtp } from '../../../fixtures/network/url/ftp.ts';
import { ftp } from './ftp.ts';

describe('ftp', () => {
  it.each(Object.entries(validFtp))('%s: %s', (_, value) => {
    expect(ftp.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidFtp))('%s: %s', (_, value) => {
    expect(ftp.test(value)).toBe(false);
  });
});
