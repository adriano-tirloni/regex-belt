import { describe, expect, it } from 'vitest';
import {
  invalidNubank,
  validNubank,
} from '../../../../../fixtures/countries/br/financial/bank-account/nubank.ts';
import { nubank } from './nubank.ts';

describe('nubank', () => {
  it.each(Object.entries(validNubank))('%s: %s', (_, value) => {
    expect(nubank.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNubank))('%s: %s', (_, value) => {
    expect(nubank.test(value)).toBe(false);
  });
});
