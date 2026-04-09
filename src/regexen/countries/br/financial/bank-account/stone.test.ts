import { describe, expect, it } from 'vitest';
import {
  invalidStone,
  validStone,
} from '../../../../../fixtures/countries/br/financial/bank-account/stone.ts';
import { stone } from './stone.ts';

describe('stone', () => {
  it.each(Object.entries(validStone))('%s: %s', (_, value) => {
    expect(stone.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidStone))('%s: %s', (_, value) => {
    expect(stone.test(value)).toBe(false);
  });
});
