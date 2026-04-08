import { describe, expect, it } from 'vitest';
import * as RegexBelt from './index.ts';

function assertAllRegExp(obj: Record<string, unknown>, path: string) {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = `${path}.${key}`;
    if (value instanceof RegExp) continue;
    if (typeof value === 'object' && value !== null) {
      assertAllRegExp(value as Record<string, unknown>, fullPath);
    } else {
      expect.unreachable(`${fullPath} is not a RegExp (got ${typeof value})`);
    }
  }
}

describe('RegexBelt structure', () => {
  it('all leaf exports are RegExp values', () => {
    assertAllRegExp(RegexBelt as unknown as Record<string, unknown>, 'RegexBelt');
  });
});
