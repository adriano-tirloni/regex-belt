import { describe, expect, it } from 'vitest';
import {
  invalidNoPathAndQuery,
  validNoPathAndQuery,
} from '../../../fixtures/network/url/no-path-and-query.ts';
import { noPathAndQuery } from './no-path-and-query.ts';

describe('noPathAndQuery', () => {
  it.each(Object.entries(validNoPathAndQuery))('%s: %s', (_, value) => {
    expect(noPathAndQuery.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNoPathAndQuery))('%s: %s', (_, value) => {
    expect(noPathAndQuery.test(value)).toBe(false);
  });
});
