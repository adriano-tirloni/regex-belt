import { describe, expect, it } from 'vitest';
import {
  invalidSicoob,
  validSicoob,
} from '../../../../../fixtures/countries/br/financial/bank-account/sicoob.ts';
import { sicoob } from './sicoob.ts';

describe('sicoob', () => {
  it.each(Object.entries(validSicoob))('%s: %s', (_, value) => {
    expect(sicoob.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidSicoob))('%s: %s', (_, value) => {
    expect(sicoob.test(value)).toBe(false);
  });
});
