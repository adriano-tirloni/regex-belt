import { describe, expect, it } from 'vitest';
import {
  invalidBradesco,
  validBradesco,
} from '../../../../../fixtures/countries/br/financial/bank-account/bradesco.ts';
import { bradesco } from './bradesco.ts';

describe('bradesco', () => {
  it.each(Object.entries(validBradesco))('%s: %s', (_, value) => {
    expect(bradesco.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidBradesco))('%s: %s', (_, value) => {
    expect(bradesco.test(value)).toBe(false);
  });
});
