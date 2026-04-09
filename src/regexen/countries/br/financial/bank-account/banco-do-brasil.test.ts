import { describe, expect, it } from 'vitest';
import {
  invalidBancoDoBrasil,
  validBancoDoBrasil,
} from '../../../../../fixtures/countries/br/financial/bank-account/banco-do-brasil.ts';
import { bancoDoBrasil } from './banco-do-brasil.ts';

describe('bancoDoBrasil', () => {
  it.each(Object.entries(validBancoDoBrasil))('%s: %s', (_, value) => {
    expect(bancoDoBrasil.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBancoDoBrasil))('%s: %s', (_, value) => {
    expect(bancoDoBrasil.test(value)).toBe(false);
  });
});
