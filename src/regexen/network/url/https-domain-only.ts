import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches an HTTPS URL with only the domain
 *
 * Format: https://host
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://example.com'
 * @example ✅ 'https://sub.example.com'
 * @example ❌ 'https://example.com/path'
 * @example ❌ 'http://example.com'
 * @example ❌ 'https://example.com:443'
 */
export const httpsDomainOnly = _$_buildUrlRegex({
  scheme: _$_scheme.https,
});
