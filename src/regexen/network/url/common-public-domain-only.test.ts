import { describe, expect, it } from 'vitest';
import {
  invalidCommonPublicDomainOnly,
  validCommonPublicDomainOnly,
} from '../../../fixtures/network/url/common-public-domain-only.ts';
import { commonPublicDomainOnly } from './common-public-domain-only.ts';

describe('commonPublicDomainOnly', () => {
  it.each(Object.entries(validCommonPublicDomainOnly))('%s: %s', (_, value) => {
    expect(commonPublicDomainOnly.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCommonPublicDomainOnly))('%s: %s', (_, value) => {
    expect(commonPublicDomainOnly.test(value)).toBe(false);
  });
});
