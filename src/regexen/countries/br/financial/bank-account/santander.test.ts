import { describe, expect, it } from 'vitest';
import {
  invalidSantander,
  validSantander,
} from '../../../../../fixtures/countries/br/financial/bank-account/santander.ts';
import { santander } from './santander.ts';

describe('santander', () => {
  it.each(Object.entries(validSantander))('%s: %s', (_, value) => {
    expect(santander.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidSantander))('%s: %s', (_, value) => {
    expect(santander.test(value)).toBe(false);
  });
});
