import { describe, expect, it } from 'vitest';
import { invalidNoPort, validNoPort } from '../../../fixtures/network/url/no-port.ts';
import { noPort } from './no-port.ts';

describe('noPort', () => {
  it.each(Object.entries(validNoPort))('%s: %s', (_, value) => {
    expect(noPort.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidNoPort))('%s: %s', (_, value) => {
    expect(noPort.test(value)).toBe(false);
  });
});
