export * as countries from './regexen/countries/_index.ts';
export * as datetime from './regexen/datetime/_index.ts';

import * as countries from './regexen/countries/_index.ts';
import * as datetime from './regexen/datetime/_index.ts';

const RegexBelt = { countries, datetime };

export { RegexBelt };
export default RegexBelt;
