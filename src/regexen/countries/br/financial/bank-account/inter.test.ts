import { describe, expect, it } from 'vitest';
import {
  invalidInter,
  validInter,
} from '../../../../../fixtures/countries/br/financial/bank-account/inter.ts';
import { inter } from './inter.ts';

describe('inter', () => {
  it.each(Object.entries(validInter))('%s: %s', (_, value) => {
    expect(inter.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidInter))('%s: %s', (_, value) => {
    expect(inter.test(value)).toBe(false);
  });
});
