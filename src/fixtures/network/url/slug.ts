/** Valid URL slugs */
export const validSlug = {
  /** Simple words */
  simpleWords: 'my-page-title',
  /** Numeric */
  numeric: 'post123',
  /** Single character */
  singleChar: 'a',
  /** With numbers */
  withNumbers: 'article-2024-01-15',
  /** All lowercase */
  allLowercase: 'hello',
};

/** Invalid URL slugs */
export const invalidSlug = {
  /** Has spaces */
  hasSpaces: 'my page',
  /** Uppercase */
  uppercase: 'UPPERCASE',
  /** Has underscore */
  hasUnderscore: 'has_underscore',
  /** Has dot */
  hasDot: 'file.html',
  /** Empty */
  empty: '',
  /** Has slash */
  hasSlash: 'path/to',
};
