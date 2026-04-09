import { describe, expect, it } from 'vitest';
import {
  invalidRegistroProfissional,
  validRegistroProfissional,
} from '../../../../fixtures/countries/br/codes/registro-profissional.ts';
import { registroProfissional } from './registro-profissional.ts';

describe('registroProfissional', () => {
  it.each(Object.entries(validRegistroProfissional))('%s: %s', (_, value) => {
    expect(registroProfissional.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidRegistroProfissional))('%s: %s', (_, value) => {
    expect(registroProfissional.test(value)).toBe(false);
  });
});
