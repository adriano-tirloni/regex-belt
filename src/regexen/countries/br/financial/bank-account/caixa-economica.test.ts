import { describe, expect, it } from 'vitest';
import {
  invalidCaixaEconomica,
  validCaixaEconomica,
} from '../../../../../fixtures/countries/br/financial/bank-account/caixa-economica.ts';
import { caixaEconomica } from './caixa-economica.ts';

describe('caixaEconomica', () => {
  it.each(Object.entries(validCaixaEconomica))('%s: %s', (_, value) => {
    expect(caixaEconomica.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCaixaEconomica))('%s: %s', (_, value) => {
    expect(caixaEconomica.test(value)).toBe(false);
  });
});
