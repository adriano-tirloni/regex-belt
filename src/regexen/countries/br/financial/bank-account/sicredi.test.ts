import { describe, expect, it } from 'vitest';
import {
  invalidSicredi,
  validSicredi,
} from '../../../../../fixtures/countries/br/financial/bank-account/sicredi.ts';
import { sicredi } from './sicredi.ts';

describe('sicredi', () => {
  it.each(Object.entries(validSicredi))('%s: %s', (_, value) => {
    expect(sicredi.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidSicredi))('%s: %s', (_, value) => {
    expect(sicredi.test(value)).toBe(false);
  });
});
