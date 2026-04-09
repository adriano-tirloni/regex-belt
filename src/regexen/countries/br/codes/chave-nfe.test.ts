import { describe, expect, it } from 'vitest';
import {
  invalidChaveNfe,
  validChaveNfe,
} from '../../../../fixtures/countries/br/codes/chave-nfe.ts';
import { chaveNfe } from './chave-nfe.ts';

describe('chaveNfe', () => {
  it.each(Object.entries(validChaveNfe))('%s: %s', (_, value) => {
    expect(chaveNfe.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidChaveNfe))('%s: %s', (_, value) => {
    expect(chaveNfe.test(value)).toBe(false);
  });
});
