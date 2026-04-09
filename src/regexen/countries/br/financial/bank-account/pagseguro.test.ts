import { describe, expect, it } from 'vitest';
import {
  invalidPagseguro,
  validPagseguro,
} from '../../../../../fixtures/countries/br/financial/bank-account/pagseguro.ts';
import { pagseguro } from './pagseguro.ts';

describe('pagseguro', () => {
  it.each(Object.entries(validPagseguro))('%s: %s', (_, value) => {
    expect(pagseguro.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidPagseguro))('%s: %s', (_, value) => {
    expect(pagseguro.test(value)).toBe(false);
  });
});
