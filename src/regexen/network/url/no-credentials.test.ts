import { describe, expect, it } from 'vitest';
import {
  invalidNoCredentials,
  validNoCredentials,
} from '../../../fixtures/network/url/no-credentials.ts';
import { noCredentials } from './no-credentials.ts';

describe('noCredentials', () => {
  it.each(Object.entries(validNoCredentials))('%s: %s', (_, value) => {
    expect(noCredentials.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNoCredentials))('%s: %s', (_, value) => {
    expect(noCredentials.test(value)).toBe(false);
  });
});
