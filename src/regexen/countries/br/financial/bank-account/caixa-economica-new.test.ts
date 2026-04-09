import { describe, expect, it } from 'vitest';
import {
  invalidCaixaEconomicaNew,
  validCaixaEconomicaNew,
} from '../../../../../fixtures/countries/br/financial/bank-account/caixa-economica-new.ts';
import { caixaEconomicaNew } from './caixa-economica-new.ts';

describe('caixaEconomicaNew', () => {
  it.each(Object.entries(validCaixaEconomicaNew))('%s: %s', (_, value) => {
    expect(caixaEconomicaNew.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCaixaEconomicaNew))('%s: %s', (_, value) => {
    expect(caixaEconomicaNew.test(value)).toBe(false);
  });
});
