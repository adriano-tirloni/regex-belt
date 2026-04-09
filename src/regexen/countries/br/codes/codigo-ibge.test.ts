import { describe, expect, it } from 'vitest';
import {
  invalidCodigoIbge,
  validCodigoIbge,
} from '../../../../fixtures/countries/br/codes/codigo-ibge.ts';
import { codigoIbge } from './codigo-ibge.ts';

describe('codigoIbge', () => {
  it.each(Object.entries(validCodigoIbge))('%s: %s', (_, value) => {
    expect(codigoIbge.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCodigoIbge))('%s: %s', (_, value) => {
    expect(codigoIbge.test(value)).toBe(false);
  });
});
