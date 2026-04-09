/**
 * Matches a valid URL slug (lowercase alphanumeric with hyphens)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'my-page-title'
 * @example ✅ 'post123'
 * @example ✅ 'a'
 * @example ❌ 'My Page'
 * @example ❌ 'UPPERCASE'
 * @example ❌ 'has_underscore'
 */
export const slug = /^[a-z0-9-]+$/;
