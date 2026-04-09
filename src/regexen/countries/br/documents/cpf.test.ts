import { describe, expect, it } from 'vitest';
import { invalidCpf, validCpf } from '../../../../fixtures/countries/br/documents/cpf.ts';
import { cpf } from './cpf.ts';

describe('cpf', () => {
  it.each(Object.entries(validCpf))('%s: %s', (_, value) => {
    expect(cpf.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCpf))('%s: %s', (_, value) => {
    expect(cpf.test(value)).toBe(false);
  });
});
