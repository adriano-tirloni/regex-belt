import { describe, expect, it } from 'vitest';
import {
  invalidMercadoPago,
  validMercadoPago,
} from '../../../../../fixtures/countries/br/financial/bank-account/mercado-pago.ts';
import { mercadoPago } from './mercado-pago.ts';

describe('mercadoPago', () => {
  it.each(Object.entries(validMercadoPago))('%s: %s', (_, value) => {
    expect(mercadoPago.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidMercadoPago))('%s: %s', (_, value) => {
    expect(mercadoPago.test(value)).toBe(false);
  });
});
