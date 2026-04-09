import { describe, expect, it } from 'vitest';
import {
  invalidCommonPublic,
  validCommonPublic,
} from '../../../fixtures/network/url/common-public.ts';
import { commonPublic } from './common-public.ts';

describe('commonPublic', () => {
  it.each(Object.entries(validCommonPublic))('%s: %s', (_, value) => {
    expect(commonPublic.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCommonPublic))('%s: %s', (_, value) => {
    expect(commonPublic.test(value)).toBe(false);
  });
});
