import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches a public HTTP/HTTPS URL with only the domain
 *
 * Format: scheme://host
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://example.com'
 * @example ✅ 'http://sub.example.com'
 * @example ❌ 'https://example.com/path'
 * @example ❌ 'https://example.com:8080'
 * @example ❌ 'ftp://files.example.com'
 */
export const commonPublicDomainOnly = _$_buildUrlRegex({
  scheme: _$_scheme.httpOrHttps,
});
