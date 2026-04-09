import { describe, expect, it } from 'vitest';
import {
  invalidUnicred,
  validUnicred,
} from '../../../../../fixtures/countries/br/financial/bank-account/unicred.ts';
import { unicred } from './unicred.ts';

describe('unicred', () => {
  it.each(Object.entries(validUnicred))('%s: %s', (_, value) => {
    expect(unicred.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidUnicred))('%s: %s', (_, value) => {
    expect(unicred.test(value)).toBe(false);
  });
});
