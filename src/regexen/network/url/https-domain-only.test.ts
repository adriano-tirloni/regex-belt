import { describe, expect, it } from 'vitest';
import {
  invalidHttpsDomainOnly,
  validHttpsDomainOnly,
} from '../../../fixtures/network/url/https-domain-only.ts';
import { httpsDomainOnly } from './https-domain-only.ts';

describe('httpsDomainOnly', () => {
  it.each(Object.entries(validHttpsDomainOnly))('%s: %s', (_, value) => {
    expect(httpsDomainOnly.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidHttpsDomainOnly))('%s: %s', (_, value) => {
    expect(httpsDomainOnly.test(value)).toBe(false);
  });
});
