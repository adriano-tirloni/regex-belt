import { describe, expect, it } from 'vitest';
import { invalidHttp, validHttp } from '../../../fixtures/network/url/http.ts';
import { http } from './http.ts';

describe('http', () => {
  it.each(Object.entries(validHttp))('%s: %s', (_, value) => {
    expect(http.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidHttp))('%s: %s', (_, value) => {
    expect(http.test(value)).toBe(false);
  });
});
