import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches an FTP URL with all optional components
 *
 * Format: ftp://[credentials@]host[:port][/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'ftp://files.example.com'
 * @example ✅ 'ftp://user:pass@ftp.example.com:21/pub'
 * @example ❌ 'https://example.com'
 * @example ❌ 'http://example.com'
 */
export const ftp = _$_buildUrlRegex({
  scheme: _$_scheme.ftp,
  credentials: true,
  port: true,
  path: true,
  query: true,
  fragment: true,
});
