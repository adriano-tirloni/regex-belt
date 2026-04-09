import { describe, expect, it } from 'vitest';
import { invalidSlug, validSlug } from '../../../fixtures/network/url/slug.ts';
import { slug } from './slug.ts';

describe('slug', () => {
  it.each(Object.entries(validSlug))('%s: %s', (_, value) => {
    expect(slug.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidSlug))('%s: %s', (_, value) => {
    expect(slug.test(value)).toBe(false);
  });
});
