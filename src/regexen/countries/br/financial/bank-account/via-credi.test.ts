import { describe, expect, it } from 'vitest';
import {
  invalidViaCredi,
  validViaCredi,
} from '../../../../../fixtures/countries/br/financial/bank-account/via-credi.ts';
import { viaCredi } from './via-credi.ts';

describe('viaCredi', () => {
  it.each(Object.entries(validViaCredi))('%s: %s', (_, value) => {
    expect(viaCredi.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidViaCredi))('%s: %s', (_, value) => {
    expect(viaCredi.test(value)).toBe(false);
  });
});
