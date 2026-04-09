<div align="center">

# regex-belt

**A collection of hundreds battle-tested regular expressions you'd otherwise copy-paste from Stack Overflow.**

Dates, documents, phone numbers, bank accounts, license plates — validated, tested, and ready to import.

[![npm version](https://img.shields.io/npm/v/regex-belt)](https://www.npmjs.com/package/regex-belt)
[![tests](https://img.shields.io/github/actions/workflow/status/adriano-tirloni/regex-belt/release.yml?branch=master&label=tests)](https://github.com/adriano-tirloni/regex-belt/actions/workflows/release.yml)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

</div>

---

## Why regex-belt?

- **No more regex roulette.** Every pattern is tested against real-world valid _and_ invalid inputs. No silent mismatches in production.
- **Zero dependencies.** Pure regex literals — no runtime overhead, no transitive surprises.
- **Tree-shakeable.** Import only what you need. Your bundler drops the rest.
- **Self-documenting.** This README is auto-generated from JSDoc in the source — the docs are always in sync with the code.


## Install

```bash
npm install regex-belt
# or
pnpm add regex-belt
# or
yarn add regex-belt
```

## Import
```js
import { datetime, countries } from 'regex-belt';
import { RegexBelt } from 'regex-belt';
import RegexBelt from 'regex-belt';
```

## Quick start

```ts
import { datetime, countries } from 'regex-belt';

// Validate a date
datetime.dashedDate.test('2022-12-31'); // true

// Validate a Brazilian CPF
countries.br.documents.cpf.test('123.456.789-09'); // true

// Validate a phone number
countries.br.contact.phone.test('+55 11 91234-5678'); // true
```

Every regex is a plain `RegExp` literal — use `.test()`, `.match()`, or `.exec()` as you normally would.

<details>
<summary><h2>Contributing</h2></summary>

### Adding a new regex

Each regex requires four things: the regex file, a test fixture, a test file, and barrel export wiring.

#### 1. Create the regex file

Add your file under `src/regexen/` following the existing directory structure (e.g. `src/regexen/countries/br/contact/cep.ts`).

Every exported regex **must** have a JSDoc block with a description, optional notes wrapped in triple underscores, and `@example` tags with match indicators:

```ts
/**
 * Matches a Brazilian CEP (postal code) in the format XXXXX-XXX
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '01001-000'
 * @example ❌ '01001000'
 */
export const cepFormatted = /^(?:0[1-9]|[1-9]\d)\d{3}-\d{3}$/;
```

The `@example` format is strictly validated — each line must be `@example ✅|❌ <value>`.

#### 2. Create test fixtures

Add a matching fixture file under `src/fixtures/` mirroring the regex path (e.g. `src/fixtures/countries/br/contact/cep.ts`).

Export objects with descriptive keys for valid and invalid cases:

```ts
export const validCepFormatted = {
  saoPauloCentro: '01001-000',
  standard: '12345-678',
};

export const invalidCepFormatted = {
  noDash: '01001000',
  tooShort: '0100-000',
};
```

#### 3. Create the test file

Add a `.test.ts` file next to the regex file. Tests use Vitest and iterate over fixture entries:

```ts
import { describe, expect, it } from 'vitest';
import { validCepFormatted, invalidCepFormatted } from '@src/fixtures/countries/br/contact/cep.ts';
import { cepFormatted } from './cep.ts';

describe('cepFormatted', () => {
  it.each(Object.entries(validCepFormatted))('%s: %s', (_, value) => {
    expect(cepFormatted.test(value)).toBe(true);
  });

  it.each(Object.entries(invalidCepFormatted))('%s: %s', (_, value) => {
    expect(cepFormatted.test(value)).toBe(false);
  });
});
```

#### 4. Wire up barrel exports

Add an `export * from './your-file.ts'` line to the `_index.ts` in the same directory. If the directory is new, create a `_index.ts` and export it from the parent `_index.ts`.

#### 5. Verify and generate

```bash
pnpm check-all   # Run all checks before it can be published
```

#### 6. Open a PR
That's it

</details>

## Available REGEXEN
<!-- GENERATED:START - Do not edit below this line -->

### Datetime

[**`dashedDateLoose`**](./src/regexen/datetime/dashed-date-loose.ts) — `✅ '2022-12-31'` — Matches a date in the format YYYY-MM-DD Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day *(Does not enforce beginning and end of string)*

```regex
/([0-9]{4}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1]))/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2022-12-31` | ✅ |
| `2022-12-31T23:59:59.999Z` | ✅ |
| `9992022-12-31` | ✅ |

</details>

<sub>Last updated: 2026-04-08</sub>

---

[**`dashedDate`**](./src/regexen/datetime/dashed-date.ts) — `✅ '2022-12-31'` — Matches a date in the format YYYY-MM-DD Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day. *(Enforces beginning and end of string)*

```regex
/^([0-9]{4}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1]))$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2022-12-31` | ✅ |
| `2022-12-31T23:59:59.999Z` | ❌ |
| `9992022-12-31` | ❌ |

</details>

<sub>Last updated: 2026-04-08</sub>

---

[**`isoUtc`**](./src/regexen/datetime/iso-utc.ts) — `✅ '2022-12-31T23:59:59.999Z'` — Regex that matches a UTC ISO String Date in format YYYY-MM-DDTHH:mm:ss.sssZ

```regex
/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2022-12-31T23:59:59.999Z` | ✅ |
| `2022-12-31T23:59:59Z` | ✅ |

</details>

<sub>Last updated: 2026-04-08</sub>

---

[**`iso8601Standard`**](./src/regexen/datetime/iso8601.ts) — `✅ '2022-12-31T23:59:59.999Z'` — Matches an ISO-8601 datetime with optional timezone Format: YYYY-MM-DDTHH:mm:ss[.mmm][Z|±HH:mm] *(Enforces beginning and end of string)*

```regex
/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2022-12-31T23:59:59.999Z` | ✅ |
| `2022-12-31T23:59:59+05:30` | ✅ |
| `2022-12-31T23:59:59` | ✅ |
| `2022-12-31` | ❌ |
| `not-a-date` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`iso8601DatetimeWithoutTz`**](./src/regexen/datetime/iso8601.ts) — `✅ '2022-12-31T23:59:59'` — Matches an ISO-8601 datetime without timezone Format: YYYY-MM-DDTHH:mm:ss[.mmm] *(Enforces beginning and end of string)*

```regex
/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2022-12-31T23:59:59` | ✅ |
| `2022-12-31T23:59:59.999` | ✅ |
| `2022-12-31T23:59:59Z` | ❌ |
| `2022-12-31T23:59:59+05:30` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`iso8601DatetimeWithTz`**](./src/regexen/datetime/iso8601.ts) — `✅ '2022-12-31T23:59:59Z'` — Matches an ISO-8601 datetime with required timezone Format: YYYY-MM-DDTHH:mm:ss[.mmm](Z|±HH:mm) *(Enforces beginning and end of string)*

```regex
/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2022-12-31T23:59:59Z` | ✅ |
| `2022-12-31T23:59:59.999+05:30` | ✅ |
| `2022-12-31T23:59:59-03:00` | ✅ |
| `2022-12-31T23:59:59` | ❌ |
| `2022-12-31` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`time12hhmmss`**](./src/regexen/datetime/time-12h.ts) — `✅ '12:59:59 PM'` — Matches a 12-hour time in HH:MM:SS AM/PM format *(Enforces beginning and end of string)*

```regex
/^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d\s?[AaPp][Mm]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12:59:59 PM` | ✅ |
| `01:00:00 AM` | ✅ |
| `00:00:00 AM` | ❌ |
| `13:00:00 PM` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`time12hhmm`**](./src/regexen/datetime/time-12h.ts) — `✅ '12:59 PM'` — Matches a 12-hour time in HH:MM AM/PM format *(Enforces beginning and end of string)*

```regex
/^(?:0?[1-9]|1[0-2]):[0-5]\d\s?[AaPp][Mm]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12:59 PM` | ✅ |
| `01:00 AM` | ✅ |
| `00:00 AM` | ❌ |
| `13:00 PM` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`time12hh`**](./src/regexen/datetime/time-12h.ts) — `✅ '12 PM'` — Matches a 12-hour hour in HH AM/PM format *(Enforces beginning and end of string)*

```regex
/^(?:0?[1-9]|1[0-2])\s?[AaPp][Mm]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12 PM` | ✅ |
| `1 AM` | ✅ |
| `0 AM` | ❌ |
| `13 PM` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`time24hhmmss`**](./src/regexen/datetime/time-24h.ts) — `✅ '23:59:59'` — Matches a 24-hour time in HH:MM:SS format *(Enforces beginning and end of string)*

```regex
/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `23:59:59` | ✅ |
| `00:00:00` | ✅ |
| `24:00:00` | ❌ |
| `23:59` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`time24hhmm`**](./src/regexen/datetime/time-24h.ts) — `✅ '23:59'` — Matches a 24-hour time in HH:MM format *(Enforces beginning and end of string)*

```regex
/^(?:[01]\d|2[0-3]):[0-5]\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `23:59` | ✅ |
| `00:00` | ✅ |
| `24:00` | ❌ |
| `23:59:59` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`time24hh`**](./src/regexen/datetime/time-24h.ts) — `✅ '23'` — Matches a 24-hour hour in HH format *(Enforces beginning and end of string)*

```regex
/^(?:[01]\d|2[0-3])$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `23` | ✅ |
| `00` | ✅ |
| `24` | ❌ |
| `5` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Math

[**`positiveDecimal`**](./src/regexen/math/decimal.ts) — `✅ '1.5'` — Matches a positive decimal number (no leading zeros except before the dot) *(Enforces beginning and end of string)*

```regex
/^(?:0|[1-9]\d*)\.\d+$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1.5` | ✅ |
| `0.123` | ✅ |
| `123.456` | ✅ |
| `-1.5` | ❌ |
| `1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`negativeDecimal`**](./src/regexen/math/decimal.ts) — `✅ '-1.5'` — Matches a negative decimal number (no leading zeros except before the dot) *(Enforces beginning and end of string)*

```regex
/^-(?:0|[1-9]\d*)\.\d+$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `-1.5` | ✅ |
| `-0.123` | ✅ |
| `1.5` | ❌ |
| `-1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`decimal`**](./src/regexen/math/decimal.ts) — `✅ '1.5'` — Matches any decimal number including negative (no leading zeros except before the dot) *(Enforces beginning and end of string)*

```regex
/^-?(?:0|[1-9]\d*)\.\d+$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1.5` | ✅ |
| `-0.123` | ✅ |
| `0.0` | ✅ |
| `1` | ❌ |
| `-1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`positiveInteger`**](./src/regexen/math/integer.ts) — `✅ '1'` — Matches a positive integer (greater than zero, no leading zeros) *(Enforces beginning and end of string)*

```regex
/^[1-9]\d*$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1` | ✅ |
| `123` | ✅ |
| `0` | ❌ |
| `-1` | ❌ |
| `01` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`negativeInteger`**](./src/regexen/math/integer.ts) — `✅ '-1'` — Matches a negative integer (less than zero, no leading zeros) *(Enforces beginning and end of string)*

```regex
/^-[1-9]\d*$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `-1` | ✅ |
| `-123` | ✅ |
| `0` | ❌ |
| `1` | ❌ |
| `-01` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`integer`**](./src/regexen/math/integer.ts) — `✅ '0'` — Matches any integer including zero (no leading zeros except for zero itself) *(Enforces beginning and end of string)*

```regex
/^(?:0|-?[1-9]\d*)$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `0` | ✅ |
| `123` | ✅ |
| `-456` | ✅ |
| `01` | ❌ |
| `1.5` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Network / Routing

[**`ipv4`**](./src/regexen/network/routing/ipv4.ts) — `✅ '192.168.1.1'` — Matches a valid IPv4 address (four octets 0-255 separated by dots) *(Enforces beginning and end of string)*

```regex
/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `192.168.1.1` | ✅ |
| `0.0.0.0` | ✅ |
| `255.255.255.255` | ✅ |
| `256.0.0.1` | ❌ |
| `192.168.1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`ipv6`**](./src/regexen/network/routing/ipv6.ts) — `✅ '2001:0db8:85a3:0000:0000:8a2e:0370:7334'` — Matches a valid IPv6 address including compressed and mixed notation Supports full addresses, :: compression, and embedded IPv4 *(Enforces beginning and end of string)*

```regex
/^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|::(?:ffff(?::0{1,4})?:)?(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `2001:0db8:85a3:0000:0000:8a2e:0370:7334` | ✅ |
| `::1` | ✅ |
| `fe80::1` | ✅ |
| `::ffff:192.168.1.1` | ✅ |
| `2001:db8::85a3::7334` | ❌ |
| `192.168.1.1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Network / URL

[**`urlCommonPublicDomainOnly`**](./src/regexen/network/url/common-public-domain-only.ts) — `✅ 'https://example.com'` — Matches a public HTTP/HTTPS URL with only the domain Format: scheme://host *(Enforces beginning and end of string)*

```regex
/^https?:\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://example.com` | ✅ |
| `http://sub.example.com` | ✅ |
| `https://example.com/path` | ❌ |
| `https://example.com:8080` | ❌ |
| `ftp://files.example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlCommonPublic`**](./src/regexen/network/url/common-public.ts) — `✅ 'https://example.com/path?q=1'` — Matches a common public HTTP/HTTPS URL without credentials Format: scheme://host[:port][/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^https?:\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://example.com/path?q=1` | ✅ |
| `http://example.com:3000` | ✅ |
| `https://user:pass@example.com` | ❌ |
| `ftp://files.example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlFtp`**](./src/regexen/network/url/ftp.ts) — `✅ 'ftp://files.example.com'` — Matches an FTP URL with all optional components Format: ftp://[credentials@]host[:port][/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^ftp:\/\/(?:(?:[a-zA-Z0-9._~!{{GENERATED_CONTENT}}'()*+,;=:%-]+@))?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `ftp://files.example.com` | ✅ |
| `ftp://user:pass@ftp.example.com:21/pub` | ✅ |
| `https://example.com` | ❌ |
| `http://example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlFull`**](./src/regexen/network/url/full.ts) — `✅ 'https://user:pass@example.com:8080/path?q=1#frag'` — Matches a full URL with all optional components Format: scheme://[credentials@]host[:port][/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^(?:https?|ftp):\/\/(?:(?:[a-zA-Z0-9._~!{{GENERATED_CONTENT}}'()*+,;=:%-]+@))?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://user:pass@example.com:8080/path?q=1#frag` | ✅ |
| `http://example.com` | ✅ |
| `ftp://files.example.com/pub` | ✅ |
| `example.com` | ❌ |
| `//example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlHttp`**](./src/regexen/network/url/http.ts) — `✅ 'http://example.com'` — Matches an HTTP URL with all optional components Format: http://[credentials@]host[:port][/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^http:\/\/(?:(?:[a-zA-Z0-9._~!{{GENERATED_CONTENT}}'()*+,;=:%-]+@))?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `http://example.com` | ✅ |
| `http://user:pass@example.com:8080/path` | ✅ |
| `https://example.com` | ❌ |
| `ftp://files.example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlHttpsDomainOnly`**](./src/regexen/network/url/https-domain-only.ts) — `✅ 'https://example.com'` — Matches an HTTPS URL with only the domain Format: https://host *(Enforces beginning and end of string)*

```regex
/^https:\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://example.com` | ✅ |
| `https://sub.example.com` | ✅ |
| `https://example.com/path` | ❌ |
| `http://example.com` | ❌ |
| `https://example.com:443` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlHttps`**](./src/regexen/network/url/https.ts) — `✅ 'https://example.com'` — Matches an HTTPS URL with all optional components Format: https://[credentials@]host[:port][/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^https:\/\/(?:(?:[a-zA-Z0-9._~!{{GENERATED_CONTENT}}'()*+,;=:%-]+@))?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://example.com` | ✅ |
| `https://user:pass@example.com:443/path?q=1#frag` | ✅ |
| `http://example.com` | ❌ |
| `ftp://files.example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlNoCredentials`**](./src/regexen/network/url/no-credentials.ts) — `✅ 'https://example.com:8080/path?q=1'` — Matches a URL without credentials Format: scheme://host[:port][/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^(?:https?|ftp):\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://example.com:8080/path?q=1` | ✅ |
| `http://example.com` | ✅ |
| `https://user:pass@example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlNoPathAndQuery`**](./src/regexen/network/url/no-path-and-query.ts) — `✅ 'https://example.com'` — Matches a URL without path, query, or fragment components Format: scheme://[credentials@]host[:port] *(Enforces beginning and end of string)*

```regex
/^(?:https?|ftp):\/\/(?:(?:[a-zA-Z0-9._~!{{GENERATED_CONTENT}}'()*+,;=:%-]+@))?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d{1,5})?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://example.com` | ✅ |
| `https://user:pass@example.com:8080` | ✅ |
| `https://example.com/path` | ❌ |
| `https://example.com?q=1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlNoPort`**](./src/regexen/network/url/no-port.ts) — `✅ 'https://user:pass@example.com/path'` — Matches a URL without a port component Format: scheme://[credentials@]host[/path][?query][#fragment] *(Enforces beginning and end of string)*

```regex
/^(?:https?|ftp):\/\/(?:(?:[a-zA-Z0-9._~!{{GENERATED_CONTENT}}'()*+,;=:%-]+@))?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://user:pass@example.com/path` | ✅ |
| `http://example.com` | ✅ |
| `https://example.com:8080` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`urlSlug`**](./src/regexen/network/url/slug.ts) — `✅ 'my-page-title'` — Matches a valid URL slug (lowercase alphanumeric with hyphens) *(Enforces beginning and end of string)*

```regex
/^[a-z0-9-]+$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `my-page-title` | ✅ |
| `post123` | ✅ |
| `a` | ✅ |
| `My Page` | ❌ |
| `UPPERCASE` | ❌ |
| `has_underscore` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Vendors / Youtube

[**`youtubeChannelId`**](./src/regexen/vendors/youtube/channel-id.ts) — `✅ 'https://www.youtube.com/channel/UC1234567890abcdefghijkl'` — Matches a YouTube channel URL and captures the 22-character channel ID Channel URLs use the /channel/UC prefix followed by a 22-character ID *(Does not enforce beginning and end of string)*

```regex
/https?:\/\/(?:www\.)?youtube\.com\/channel\/UC[-_a-zA-Z0-9]{22}/i
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://www.youtube.com/channel/UC1234567890abcdefghijkl` | ✅ |
| `http://youtube.com/channel/UC1234567890abcdefghijkl` | ✅ |
| `https://youtube.com/user/somename` | ❌ |
| `https://example.com` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`youtubeVideoId`**](./src/regexen/vendors/youtube/video-id.ts) — `✅ 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'` — Matches a YouTube video URL and captures the 11-character video ID Supports youtu.be short links and youtube.com/watch URLs with localized subdomains *(Does not enforce beginning and end of string (matches within longer text))*

```regex
/https?:\/\/(?:youtu\.be\/|(?:[a-z]{2,3}\.)?youtube\.com\/watch(?:\?|#!)v=)([\w-]{11})/i
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `https://www.youtube.com/watch?v=dQw4w9WgXcQ` | ✅ |
| `https://youtu.be/dQw4w9WgXcQ` | ✅ |
| `http://de.youtube.com/watch?v=dQw4w9WgXcQ` | ✅ |
| `https://example.com` | ❌ |
| `https://youtube.com/channel/UCxxxxxx` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### WEB / Misc

[**`email`**](./src/regexen/web/misc/email.ts) — `✅ 'user@example.com'` — Matches a basic email address (local part @ domain) Verifies the presence of @ with non-empty local and domain parts. For strict RFC 5322 validation, use a dedicated email validation library. *(Enforces beginning and end of string)*

```regex
/^.+@.+\..+$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `user@example.com` | ✅ |
| `name+tag@sub.domain.org` | ✅ |
| `@example.com` | ❌ |
| `user@` | ❌ |
| `plaintext` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### WEB / Styles

[**`hexColor`**](./src/regexen/web/styles/hex-color.ts) — `✅ '#ff0000'` — Matches an RGB hex color value with optional # prefix Supports both 3-digit and 6-digit hex notation *(Enforces beginning and end of string)*

```regex
/^#?(?:[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `#ff0000` | ✅ |
| `#FFF` | ✅ |
| `aabbcc` | ✅ |
| `#ff00` | ❌ |
| `#gggggg` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Codes

[**`cnes`**](./src/regexen/countries/br/codes/cnes.ts) — `✅ '1234567'` — Matches a Brazilian CNES (Cadastro Nacional de Estabelecimentos de Saude) code as 7 digits *(Enforces beginning and end of string)*

```regex
/^\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567` | ✅ |
| `123456` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`ean13`**](./src/regexen/countries/br/codes/ean13.ts) — `✅ '7891234567890'` — Matches an EAN-13 barcode as 13 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{13}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `7891234567890` | ✅ |
| `789123456789` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`enem`**](./src/regexen/countries/br/codes/enem.ts) — `✅ '123456789012'` — Matches a Brazilian ENEM registration number as 12 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{12}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456789012` | ✅ |
| `12345678901` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`ibgeCode`**](./src/regexen/countries/br/codes/ibge-code.ts) — `✅ '3550308'` — Matches a Brazilian IBGE municipality code as 7 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `3550308` | ✅ |
| `355030` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`isbn13`**](./src/regexen/countries/br/codes/isbn.ts) — `✅ '9780306406157'` — Matches an ISBN-13: prefix 978 or 979 followed by 10 digits *(Enforces beginning and end of string)*

```regex
/^(?:978|979)\d{10}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `9780306406157` | ✅ |
| `9770306406157` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`isbn10`**](./src/regexen/countries/br/codes/isbn.ts) — `✅ '0306406152'` — Matches an ISBN-10: 9 digits followed by a check character (digit or uppercase X) *(Enforces beginning and end of string)*

```regex
/^\d{9}[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `0306406152` | ✅ |
| `123456789x` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`nfeKey`**](./src/regexen/countries/br/codes/nfe-key.ts) — `✅ '35210612345678000195550010001234561123456784'` — Matches a Brazilian NFe (Nota Fiscal Eletronica) access key as 44 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{44}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `35210612345678000195550010001234561123456784` | ✅ |
| `3521061234567800019555001000123456112345678` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`professionalRegistration`**](./src/regexen/countries/br/codes/professional-registration.ts) — `✅ 'CREA123456SP'` — Matches a Brazilian professional registration number (CREA, CRO, CRC, COREN, etc.) Format: CR + 1-3 uppercase letters + optional space + 4-10 digits + optional slash or dash + 2 uppercase state letters *(Enforces beginning and end of string)*

```regex
/^CR[A-Z]{1,3}\s?\d{4,10}[/-]?[A-Z]{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `CREA123456SP` | ✅ |
| `crea123456sp` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Contact

[**`cepFormatted`**](./src/regexen/countries/br/contact/cep.ts) — `✅ '01001-000'` — Matches a Brazilian CEP (postal code) in the format XXXXX-XXX Rejects the `00` prefix as no postal region `00` exists (lowest CEP is `01001-000`) *(Enforces beginning and end of string)*

```regex
/^(?:0[1-9]|[1-9]\d)\d{3}-\d{3}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `01001-000` | ✅ |
| `01001000` | ❌ |
| `00000-000` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cepStripped`**](./src/regexen/countries/br/contact/cep.ts) — `✅ '01001000'` — Matches a Brazilian CEP (postal code) as 8 consecutive digits Rejects the `00` prefix as no postal region `00` exists (lowest CEP is `01001000`) *(Enforces beginning and end of string)*

```regex
/^(?:0[1-9]|[1-9]\d)\d{6}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `01001000` | ✅ |
| `01001-000` | ❌ |
| `00000000` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`correiosTracking`**](./src/regexen/countries/br/contact/correios-tracking.ts) — `✅ 'SS987654321BR'` — Matches a Brazilian Correios tracking code with 2 letters + 9 digits + 2 letters *(Enforces beginning and end of string)*

```regex
/^[A-Z]{2}\d{9}[A-Z]{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `SS987654321BR` | ✅ |
| `ss987654321br` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`phoneFormatted`**](./src/regexen/countries/br/contact/phone.ts) — `✅ '(11) 91234-5678'` — Matches a Brazilian phone number with formatting Supports optional +55 country code, area code in parentheses, mobile (9-digit, starts with 9) or landline (8-digit), with dash separator *(Enforces beginning and end of string)*

```regex
/^(?:\+55\s)?(?:\(\d{2}\)\s)(?:9\d{4}|\d{4})-\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `(11) 91234-5678` | ✅ |
| `+55 11 91234-5678` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`phoneStripped`**](./src/regexen/countries/br/contact/phone.ts) — `✅ '11912345678'` — Matches a Brazilian phone number as 10 or 11 consecutive digits 2-digit area code followed by 8-digit landline or 9-digit mobile (starts with 9) *(Enforces beginning and end of string)*

```regex
/^\d{2}(?:9\d{8}|\d{8})$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `11912345678` | ✅ |
| `+55 (11) 91234-5678` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`phoneInternational`**](./src/regexen/countries/br/contact/phone.ts) — `✅ '+5519998665522'` — Matches a Brazilian phone number in international dialing formats (digits only) Supports +55 country code, domestic trunk prefix (0), or bare area code, followed by 2-digit area code and 8-digit landline or 9-digit mobile (starts with 9) *(Enforces beginning and end of string)*

```regex
/^(?:\+55|0)?\d{2}(?:9\d{8}|\d{8})$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `+5519998665522` | ✅ |
| `+5419998665522` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Documents

[**`birthMarriageCertificate`**](./src/regexen/countries/br/documents/birth-marriage-certificate.ts) — `✅ '104753 01 55 2013 1 00025 003 1234567-89'` — Matches a Brazilian birth or marriage certificate number in the national unified format XXXXXX XX XX XXXX X XXXXX XXX XXXXXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{6}\s\d{2}\s\d{2}\s\d{4}\s\d\s\d{5}\s\d{3}\s\d{7}-\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `104753 01 55 2013 1 00025 003 1234567-89` | ✅ |
| `1047530155201310002500312345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnh`**](./src/regexen/countries/br/documents/cnh.ts) — `✅ '12345678901'` — Matches a Brazilian CNH (driver's license) number as 11 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{11}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678901` | ✅ |
| `1234567890` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnpjAlphanumericFormatted`**](./src/regexen/countries/br/documents/cnpj-alphanumeric.ts) — `✅ 'A1.B2C.D3E/F4G5-67'` — Matches a Brazilian alphanumeric CNPJ in the format XX.XXX.XXX/XXXX-XX where X is a letter or digit, and the last 2 characters are digits *(Enforces beginning and end of string)*

```regex
/^[A-Za-z0-9]{2}\.[A-Za-z0-9]{3}\.[A-Za-z0-9]{3}\/[A-Za-z0-9]{4}-\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `A1.B2C.D3E/F4G5-67` | ✅ |
| `A1B2CD3EF4G567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnpjAlphanumericStripped`**](./src/regexen/countries/br/documents/cnpj-alphanumeric.ts) — `✅ 'A1B2CD3EF4G567'` — Matches a Brazilian alphanumeric CNPJ as 12 alphanumeric characters followed by 2 digits *(Enforces beginning and end of string)*

```regex
/^[A-Za-z0-9]{12}\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `A1B2CD3EF4G567` | ✅ |
| `A1.B2C.D3E/F4G5-67` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnpjFormatted`**](./src/regexen/countries/br/documents/cnpj.ts) — `✅ '12.345.678/0001-95'` — Matches a Brazilian CNPJ number in the format XX.XXX.XXX/XXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.678/0001-95` | ✅ |
| `12345678000195` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnpjStripped`**](./src/regexen/countries/br/documents/cnpj.ts) — `✅ '12345678000195'` — Matches a Brazilian CNPJ number as 14 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{14}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678000195` | ✅ |
| `12.345.678/0001-95` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cns`**](./src/regexen/countries/br/documents/cns.ts) — `✅ '198765432100010'` — Matches a Brazilian CNS (national health card) number starting with 1-2 or 7-9 followed by 14 digits *(Enforces beginning and end of string)*

```regex
/^(?:[12]\d{10}00[01]\d|[789]\d{14})$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `198765432100010` | ✅ |
| `398765432100010` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cpfFormatted`**](./src/regexen/countries/br/documents/cpf.ts) — `✅ '123.456.789-09'` — Matches a Brazilian CPF number in the format XXX.XXX.XXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{3}\.\d{3}\.\d{3}-\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.456.789-09` | ✅ |
| `12345678909` | ❌ |

</details>

<sub>Last updated: 2026-04-08</sub>

---

[**`cpfStripped`**](./src/regexen/countries/br/documents/cpf.ts) — `✅ '12345678909'` — Matches a Brazilian CPF number as 11 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{11}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678909` | ✅ |
| `123.456.789-09` | ❌ |

</details>

<sub>Last updated: 2026-04-08</sub>

---

[**`crm`**](./src/regexen/countries/br/documents/crm.ts) — `✅ '12345SP'` — Matches a Brazilian CRM (medical license) number as 5-6 digits followed by a 2-letter uppercase state code *(Enforces beginning and end of string)*

```regex
/^\d{5,6}[A-Z]{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345SP` | ✅ |
| `12345sp` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`ctps`**](./src/regexen/countries/br/documents/ctps.ts) — `✅ '1234567'` — Matches a Brazilian CTPS (work card) number as 7 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567` | ✅ |
| `123456` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`nis`**](./src/regexen/countries/br/documents/nis.ts) — `✅ '123.45678.90-1'` — Matches a Brazilian NIS number in the format XXX.XXXXX.XX-X *(Enforces beginning and end of string)*

```regex
/^\d{3}\.\d{5}\.\d{2}-\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.45678.90-1` | ✅ |
| `12345678901` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`passport`**](./src/regexen/countries/br/documents/passport.ts) — `✅ 'AB123456'` — Matches a Brazilian passport number as 2 uppercase letters followed by 6 digits *(Enforces beginning and end of string)*

```regex
/^[A-Z]{2}\d{6}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `AB123456` | ✅ |
| `ab123456` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`pisPasepFormatted`**](./src/regexen/countries/br/documents/pis-pasep.ts) — `✅ '123.45678.90-1'` — Matches a Brazilian PIS/PASEP number in the format XXX.XXXXX.XX-X *(Enforces beginning and end of string)*

```regex
/^\d{3}\.\d{5}\.\d{2}-\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.45678.90-1` | ✅ |
| `12345678901` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`pisPasepStripped`**](./src/regexen/countries/br/documents/pis-pasep.ts) — `✅ '12345678901'` — Matches a Brazilian PIS/PASEP number as 11 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{11}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678901` | ✅ |
| `123.45678.90-1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`rgFormatted`**](./src/regexen/countries/br/documents/rg.ts) — `✅ '12.345.678-9'` — Matches a Brazilian RG number in the format X.XXX.XXX-X or XX.XXX.XXX-X where the last character can be a digit or X *(Enforces beginning and end of string)*

```regex
/^\d{1,2}\.\d{3}\.\d{3}-[\dXx]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.678-9` | ✅ |
| `123456789` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`rgStripped`**](./src/regexen/countries/br/documents/rg.ts) — `✅ '123456789'` — Matches a Brazilian RG number as 8 or 9 characters (7-8 digits followed by a digit or X) *(Enforces beginning and end of string)*

```regex
/^\d{7,8}[\dXx]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456789` | ✅ |
| `12.345.678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`rne`**](./src/regexen/countries/br/documents/rne.ts) — `✅ 'G1234567'` — Matches a Brazilian RNE (foreign national registry) number as a letter or digit followed by 6 digits and a letter or digit *(Enforces beginning and end of string)*

```regex
/^[A-Z\d]\d{6}[A-Z\d]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `G1234567` | ✅ |
| `g1234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`susCardFormatted`**](./src/regexen/countries/br/documents/sus-card.ts) — `✅ '123 4567 8901 2345'` — Matches a Brazilian SUS card number in the format XXX XXXX XXXX XXXX *(Enforces beginning and end of string)*

```regex
/^\d{3}\s\d{4}\s\d{4}\s\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123 4567 8901 2345` | ✅ |
| `123456789012345` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`susCardStripped`**](./src/regexen/countries/br/documents/sus-card.ts) — `✅ '123456789012345'` — Matches a Brazilian SUS card number as 15 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{15}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456789012345` | ✅ |
| `123 4567 8901 2345` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`voterRegistrationFormatted`**](./src/regexen/countries/br/documents/voter-registration.ts) — `✅ '1234 5678 9012'` — Matches a Brazilian voter registration number in the format XXXX XXXX XXXX *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{4}\s\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 5678 9012` | ✅ |
| `123456789012` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`voterRegistrationStripped`**](./src/regexen/countries/br/documents/voter-registration.ts) — `✅ '123456789012'` — Matches a Brazilian voter registration number as 12 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{12}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456789012` | ✅ |
| `1234 5678 9012` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Financial

[**`boletoFormatted`**](./src/regexen/countries/br/financial/boleto.ts) — `✅ '23793.38128 60000.000003 00000.000408 1 84340000019900'` — Matches a Brazilian boleto payment line in the formatted pattern XXXXX.XXXXX XXXXX.XXXXXX XXXXX.XXXXXX X XXXXXXXXXXXXXX *(Enforces beginning and end of string)*

```regex
/^\d{5}\.\d{5}\s\d{5}\.\d{6}\s\d{5}\.\d{6}\s\d\s\d{14}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `23793.38128 60000.000003 00000.000408 1 84340000019900` | ✅ |
| `23793381286000000000300000000408184340000019900` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`boletoStripped`**](./src/regexen/countries/br/financial/boleto.ts) — `✅ '23793381286000000000300000000408184340000019900'` — Matches a Brazilian boleto payment line as 47 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{47}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `23793381286000000000300000000408184340000019900` | ✅ |
| `23793.38128 60000.000003 00000.000408 1 84340000019900` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`pixKey`**](./src/regexen/countries/br/financial/pix-key.ts) — `✅ '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266141740006304A13B'` — Matches a Brazilian PIX EMV payload containing the BCB identifier (br.gov.bcb.pix) with numeric prefix and CRC suffix *(Enforces beginning and end of string)*

```regex
/^\d{14,20}[Bb][Rr]\.[Gg][Oo][Vv]\.[Bb][Cc][Bb]\.[Pp][Ii][Xx].+6304[\dA-Fa-f]{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266141740006304A13B` | ✅ |
| `00020126580014com.example.pix0136123e45676304A13B` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`pixRandomKey`**](./src/regexen/countries/br/financial/pix-random-key.ts) — `✅ '123e4567-e89b-12d3-a456-426614174000'` — Matches a Brazilian PIX random key in UUID v4 lowercase format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx *(Enforces beginning and end of string)*

```regex
/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123e4567-e89b-12d3-a456-426614174000` | ✅ |
| `123E4567-E89B-12D3-A456-426614174000` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Financial / Bank-account

[**`bankAccountBancoC6`**](./src/regexen/countries/br/financial/bank-account/banco-c6.ts) — `✅ '1234 1234567-8'` — Matches a Banco C6 account format: Agencia XXXX | Conta XXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{7}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567-8` | ✅ |
| `1234 12345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountBancoDoBrasil`**](./src/regexen/countries/br/financial/bank-account/banco-do-brasil.ts) — `✅ '1234-5 12345678-9'` — Matches a Banco do Brasil account format: Agencia XXXX-D | Conta XXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}-[\dX]\s\d{8}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234-5 12345678-9` | ✅ |
| `1234-5 1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountBancoOriginal`**](./src/regexen/countries/br/financial/bank-account/banco-original.ts) — `✅ '1234 1234567-8'` — Matches a Banco Original account format: Agencia XXXX | Conta XXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{7}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567-8` | ✅ |
| `1234 12345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountBanrisul`**](./src/regexen/countries/br/financial/bank-account/banrisul.ts) — `✅ '1234 123456789-0'` — Matches a Banrisul account format: Agencia XXXX | Conta XXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{9}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456789-0` | ✅ |
| `1234 12345678-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountBradesco`**](./src/regexen/countries/br/financial/bank-account/bradesco.ts) — `✅ '1234-5 1234567-8'` — Matches a Bradesco account format: Agencia XXXX-D | Conta XXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}-[\dX]\s\d{7}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234-5 1234567-8` | ✅ |
| `1234-5 12345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountBrb`**](./src/regexen/countries/br/financial/bank-account/brb.ts) — `✅ '1234 123456789-0'` — Matches a BRB account format: Agencia XXXX | Conta XXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{9}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456789-0` | ✅ |
| `1234 12345678-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountBs2`**](./src/regexen/countries/br/financial/bank-account/bs2.ts) — `✅ '1234 123456-7'` — Matches a BS2 account format: Agencia XXXX | Conta XXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{6}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456-7` | ✅ |
| `1234 1234567-8` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountCaixaEconomicaNew`**](./src/regexen/countries/br/financial/bank-account/caixa-economica-new.ts) — `✅ '1234 0013123456789-0'` — Matches a Caixa Economica new account format: Agencia XXXX | Conta XXXXXXXXXXXXXX-D (4-digit operation code + 9-digit account + check digit) *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{4}\d{9}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 0013123456789-0` | ✅ |
| `1234 001312345678-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountCaixaEconomica`**](./src/regexen/countries/br/financial/bank-account/caixa-economica.ts) — `✅ '1234 00112345678-9'` — Matches a Caixa Economica account format: Agencia XXXX | Conta XXXXXXXXXXX-D (3-digit operation code + 8-digit account + check digit) *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{3}\d{8}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 00112345678-9` | ✅ |
| `1234 0012345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountCora`**](./src/regexen/countries/br/financial/bank-account/cora.ts) — `✅ '1234 1234567-8'` — Matches a Cora account format: Agencia XXXX | Conta XXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{7}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567-8` | ✅ |
| `1234 12345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountInter`**](./src/regexen/countries/br/financial/bank-account/inter.ts) — `✅ '1234 123456789-0'` — Matches an Inter account format: Agencia XXXX | Conta XXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{9}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456789-0` | ✅ |
| `1234 12345678-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountItau`**](./src/regexen/countries/br/financial/bank-account/itau.ts) — `✅ '1234 12345-6'` — Matches an Itau account format: Agencia XXXX | Conta XXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{5}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 12345-6` | ✅ |
| `1234 123456-7` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountMercadoPago`**](./src/regexen/countries/br/financial/bank-account/mercado-pago.ts) — `✅ '1234 1234567890123-4'` — Matches a Mercado Pago account format: Agencia XXXX | Conta XXXXXXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{13}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567890123-4` | ✅ |
| `1234 123456789012-4` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountNeon`**](./src/regexen/countries/br/financial/bank-account/neon.ts) — `✅ '1234 123456789-0'` — Matches a Neon account format: Agencia XXXX | Conta XXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{9}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456789-0` | ✅ |
| `1234 12345678-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountNext`**](./src/regexen/countries/br/financial/bank-account/next.ts) — `✅ '1234 1234567-8'` — Matches a Next account format: Agencia XXXX | Conta XXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{7}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567-8` | ✅ |
| `1234 12345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountNubank`**](./src/regexen/countries/br/financial/bank-account/nubank.ts) — `✅ '1234 1234567890-1'` — Matches a Nubank account format: Agencia XXXX | Conta XXXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{10}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567890-1` | ✅ |
| `1234 123456789-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountPagseguro`**](./src/regexen/countries/br/financial/bank-account/pagseguro.ts) — `✅ '1234 12345678-9'` — Matches a PagSeguro account format: Agencia XXXX | Conta XXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{8}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 12345678-9` | ✅ |
| `1234 1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountPjbank`**](./src/regexen/countries/br/financial/bank-account/pjbank.ts) — `✅ '1234 1234567890-1'` — Matches a PJBank account format: Agencia XXXX | Conta XXXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{10}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567890-1` | ✅ |
| `1234 123456789-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountSafra`**](./src/regexen/countries/br/financial/bank-account/safra.ts) — `✅ '1234 12345678-9'` — Matches a Safra account format: Agencia XXXX | Conta XXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{8}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 12345678-9` | ✅ |
| `1234 1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountSantander`**](./src/regexen/countries/br/financial/bank-account/santander.ts) — `✅ '1234 12345678-9'` — Matches a Santander account format: Agencia XXXX | Conta XXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{8}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 12345678-9` | ✅ |
| `1234 1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountSicoob`**](./src/regexen/countries/br/financial/bank-account/sicoob.ts) — `✅ '1234 123456789-0'` — Matches a Sicoob account format: Agencia XXXX | Conta XXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{9}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456789-0` | ✅ |
| `1234 12345678-0` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountSicredi`**](./src/regexen/countries/br/financial/bank-account/sicredi.ts) — `✅ '1234 123456'` — Matches a Sicredi account format: Agencia XXXX | Conta XXXXXX (no check digit) *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{6}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 123456` | ✅ |
| `1234 1234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountStone`**](./src/regexen/countries/br/financial/bank-account/stone.ts) — `✅ '1234 1234567-8'` — Matches a Stone account format: Agencia XXXX | Conta XXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{7}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 1234567-8` | ✅ |
| `1234 12345678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountUnicred`**](./src/regexen/countries/br/financial/bank-account/unicred.ts) — `✅ '1234 12345678-9'` — Matches a Unicred account format: Agencia XXXX | Conta XXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{8}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 12345678-9` | ✅ |
| `1234 1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`bankAccountViaCredi`**](./src/regexen/countries/br/financial/bank-account/via-credi.ts) — `✅ '1234 12345678901-2'` — Matches a ViaCredi account format: Agencia XXXX | Conta XXXXXXXXXXX-D *(Enforces beginning and end of string)*

```regex
/^\d{4}\s\d{11}-[\dX]$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234 12345678901-2` | ✅ |
| `1234 1234567890-2` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Government

[**`cadasturFormatted`**](./src/regexen/countries/br/government/cadastur.ts) — `✅ '12.345.678/0001-90'` — Matches a Brazilian Cadastur number in the format XX.XXX.XXX/XXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.678/0001-90` | ✅ |
| `12345678000190` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cadasturStripped`**](./src/regexen/countries/br/government/cadastur.ts) — `✅ '12345678000190'` — Matches a Brazilian Cadastur number as 14 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{14}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678000190` | ✅ |
| `12.345.678/0001-90` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`caepf`**](./src/regexen/countries/br/government/caepf.ts) — `✅ '123.456.789-01/23'` — Matches a Brazilian CAEPF number in the format XXX.XXX.XXX-XX/XX *(Enforces beginning and end of string)*

```regex
/^\d{3}\.\d{3}\.\d{3}-\d{2}\/\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.456.789-01/23` | ✅ |
| `123456789-01/23` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`caged`**](./src/regexen/countries/br/government/caged.ts) — `✅ '1234567'` — Matches a Brazilian CAGED number as 7 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567` | ✅ |
| `123456` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnjProcessFormatted`**](./src/regexen/countries/br/government/cnj-process.ts) — `✅ '0002028-80.2020.8.26.0100'` — Matches a Brazilian CNJ process number in the format NNNNNNN-DD.AAAA.J.TR.OOOO *(Enforces beginning and end of string)*

```regex
/^\d{7}-\d{2}\.\d{4}\.[4-8]\.\d{2}\.\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `0002028-80.2020.8.26.0100` | ✅ |
| `00020288020208260100` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`cnjProcessStripped`**](./src/regexen/countries/br/government/cnj-process.ts) — `✅ '00020288020208260100'` — Matches a Brazilian CNJ process number as 20 consecutive digits where the 16th digit is 4-8 *(Enforces beginning and end of string)*

```regex
/^\d{15}[4-8]\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `00020288020208260100` | ✅ |
| `0002028-80.2020.8.26.0100` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`municipalRegistration`**](./src/regexen/countries/br/government/municipal-registration.ts) — `✅ '1234567890'` — Matches a Brazilian Municipal Registration number with 6 to 15 digits *(Enforces beginning and end of string)*

```regex
/^\d{6,15}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567890` | ✅ |
| `12345` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`suframa`**](./src/regexen/countries/br/government/suframa.ts) — `✅ '12.345.678/0001'` — Matches a Brazilian SUFRAMA registration number in the format XX.XXX.XXX/XXXX *(Enforces beginning and end of string)*

```regex
/^\d{2}\.\d{3}\.\d{3}\/\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.678/0001` | ✅ |
| `12345678/0001` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Government / Inscricao-estadual

[**`inscricaoEstadualAC`**](./src/regexen/countries/br/government/inscricao-estadual/ac.ts) — `✅ '01.234.567/890-12'` — Matches an Acre (AC) Inscricao Estadual starting with 01 in the format 01.XXX.XXX/XXX-XX *(Enforces beginning and end of string)*

```regex
/^01\.?\d{3}\.?\d{3}\/?\d{3}-?\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `01.234.567/890-12` | ✅ |
| `02.234.567/890-12` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualAL`**](./src/regexen/countries/br/government/inscricao-estadual/al.ts) — `✅ '240123456'` — Matches an Alagoas (AL) Inscricao Estadual starting with 24 followed by 0, 3, 5, 7, or 8 *(Enforces beginning and end of string)*

```regex
/^24[03578]\d{6}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `240123456` | ✅ |
| `241123456` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualAM`**](./src/regexen/countries/br/government/inscricao-estadual/am.ts) — `✅ '12.345.678-9'` — Matches an Amazonas (AM) Inscricao Estadual in the format XX.XXX.XXX-X *(Enforces beginning and end of string)*

```regex
/^\d{2}\.?\d{3}\.?\d{3}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.678-9` | ✅ |
| `12.345.678-90` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualAP`**](./src/regexen/countries/br/government/inscricao-estadual/ap.ts) — `✅ '031234567'` — Matches an Amapa (AP) Inscricao Estadual starting with 03 followed by 7 digits *(Enforces beginning and end of string)*

```regex
/^03\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `031234567` | ✅ |
| `041234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualBA9`**](./src/regexen/countries/br/government/inscricao-estadual/ba.ts) — `✅ '1234567-89'` — Matches a Bahia (BA) Inscricao Estadual with 9 digits in the format XXXXXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{7}-?\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567-89` | ✅ |
| `123456-89` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualBA8`**](./src/regexen/countries/br/government/inscricao-estadual/ba.ts) — `✅ '123456-78'` — Matches a Bahia (BA) Inscricao Estadual with 8 digits in the format XXXXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{6}-?\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456-78` | ✅ |
| `1234567-89` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualCE`**](./src/regexen/countries/br/government/inscricao-estadual/ce.ts) — `✅ '12345678-9'` — Matches a Ceara (CE) Inscricao Estadual in the format XXXXXXXX-X *(Enforces beginning and end of string)*

```regex
/^\d{8}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678-9` | ✅ |
| `1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualDF`**](./src/regexen/countries/br/government/inscricao-estadual/df.ts) — `✅ '12345678-90'` — Matches a Distrito Federal (DF) Inscricao Estadual in the format XXXXXXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{8}-?\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678-90` | ✅ |
| `1234567-90` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualES`**](./src/regexen/countries/br/government/inscricao-estadual/es.ts) — `✅ '123456789'` — Matches an Espirito Santo (ES) Inscricao Estadual as 9 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{9}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456789` | ✅ |
| `12345678` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualGO`**](./src/regexen/countries/br/government/inscricao-estadual/go.ts) — `✅ '12.345.678-9'` — Matches a Goias (GO) Inscricao Estadual in the format XX.XXX.XXX-X *(Enforces beginning and end of string)*

```regex
/^\d{2}\.?\d{3}\.?\d{3}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.678-9` | ✅ |
| `12.345.678-90` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualMA`**](./src/regexen/countries/br/government/inscricao-estadual/ma.ts) — `✅ '121234567'` — Matches a Maranhao (MA) Inscricao Estadual starting with 12 followed by 7 digits *(Enforces beginning and end of string)*

```regex
/^12\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `121234567` | ✅ |
| `131234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualMG`**](./src/regexen/countries/br/government/inscricao-estadual/mg.ts) — `✅ '123.456.789/0123'` — Matches a Minas Gerais (MG) Inscricao Estadual in the format XXX.XXX.XXX/XXXX *(Enforces beginning and end of string)*

```regex
/^\d{3}\.?\d{3}\.?\d{3}\/?\d{4}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.456.789/0123` | ✅ |
| `123.456.789/012` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualMS`**](./src/regexen/countries/br/government/inscricao-estadual/ms.ts) — `✅ '281234567'` — Matches a Mato Grosso do Sul (MS) Inscricao Estadual starting with 28 followed by 7 digits *(Enforces beginning and end of string)*

```regex
/^28\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `281234567` | ✅ |
| `291234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualMT`**](./src/regexen/countries/br/government/inscricao-estadual/mt.ts) — `✅ '1234567890-1'` — Matches a Mato Grosso (MT) Inscricao Estadual in the format XXXXXXXXXX-X *(Enforces beginning and end of string)*

```regex
/^\d{10}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567890-1` | ✅ |
| `123456789-1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualPA`**](./src/regexen/countries/br/government/inscricao-estadual/pa.ts) — `✅ '15123456-7'` — Matches a Para (PA) Inscricao Estadual starting with 15 in the format 15XXXXXX-X *(Enforces beginning and end of string)*

```regex
/^15\d{6}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `15123456-7` | ✅ |
| `16123456-7` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualPE`**](./src/regexen/countries/br/government/inscricao-estadual/pe.ts) — `✅ '1234567-89'` — Matches a Pernambuco (PE) Inscricao Estadual in the format XXXXXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{7}-?\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567-89` | ✅ |
| `123456-89` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualPI`**](./src/regexen/countries/br/government/inscricao-estadual/pi.ts) — `✅ '123456789'` — Matches a Piaui (PI) Inscricao Estadual as 9 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{9}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123456789` | ✅ |
| `12345678` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualPR`**](./src/regexen/countries/br/government/inscricao-estadual/pr.ts) — `✅ '123.45678-90'` — Matches a Parana (PR) Inscricao Estadual in the format XXX.XXXXX-XX *(Enforces beginning and end of string)*

```regex
/^\d{3}\.?\d{5}-?\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.45678-90` | ✅ |
| `123.4567-90` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualRJ`**](./src/regexen/countries/br/government/inscricao-estadual/rj.ts) — `✅ '12.345.67-8'` — Matches a Rio de Janeiro (RJ) Inscricao Estadual in the format XX.XXX.XX-X *(Enforces beginning and end of string)*

```regex
/^\d{2}\.?\d{3}\.?\d{2}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12.345.67-8` | ✅ |
| `12.345.678-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualRN9`**](./src/regexen/countries/br/government/inscricao-estadual/rn.ts) — `✅ '20.123.456-7'` — Matches a Rio Grande do Norte (RN) Inscricao Estadual with 9 digits starting with 20 *(Enforces beginning and end of string)*

```regex
/^20\.?\d{3}\.?\d{3}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `20.123.456-7` | ✅ |
| `21.123.456-7` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualRN10`**](./src/regexen/countries/br/government/inscricao-estadual/rn.ts) — `✅ '20.1.234.567-8'` — Matches a Rio Grande do Norte (RN) Inscricao Estadual with 10 digits starting with 20 *(Enforces beginning and end of string)*

```regex
/^20\.?\d\.?\d{3}\.?\d{3}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `20.1.234.567-8` | ✅ |
| `21.1.234.567-8` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualROOld`**](./src/regexen/countries/br/government/inscricao-estadual/ro.ts) — `✅ '123.45678-9'` — Matches a Rondonia (RO) Inscricao Estadual in the old format (before 01/08/2000) XXX.XXXXX-X *(Enforces beginning and end of string)*

```regex
/^\d{3}\.?\d{5}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.45678-9` | ✅ |
| `123.4567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualRONew`**](./src/regexen/countries/br/government/inscricao-estadual/ro.ts) — `✅ '1234567890123-4'` — Matches a Rondonia (RO) Inscricao Estadual in the new format (after 01/08/2000) XXXXXXXXXXXXX-X *(Enforces beginning and end of string)*

```regex
/^\d{13}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234567890123-4` | ✅ |
| `123456789012-4` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualRR`**](./src/regexen/countries/br/government/inscricao-estadual/rr.ts) — `✅ '24123456-7'` — Matches a Roraima (RR) Inscricao Estadual starting with 24 in the format 24XXXXXX-X *(Enforces beginning and end of string)*

```regex
/^24\d{6}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `24123456-7` | ✅ |
| `25123456-7` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualRS`**](./src/regexen/countries/br/government/inscricao-estadual/rs.ts) — `✅ '123/4567890'` — Matches a Rio Grande do Sul (RS) Inscricao Estadual in the format XXX/XXXXXXX *(Enforces beginning and end of string)*

```regex
/^\d{3}\/?\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123/4567890` | ✅ |
| `123/456789` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualSC`**](./src/regexen/countries/br/government/inscricao-estadual/sc.ts) — `✅ '123.456.789'` — Matches a Santa Catarina (SC) Inscricao Estadual in the format XXX.XXX.XXX *(Enforces beginning and end of string)*

```regex
/^\d{3}\.?\d{3}\.?\d{3}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.456.789` | ✅ |
| `123.456.78` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualSE`**](./src/regexen/countries/br/government/inscricao-estadual/se.ts) — `✅ '12345678-9'` — Matches a Sergipe (SE) Inscricao Estadual in the format XXXXXXXX-X *(Enforces beginning and end of string)*

```regex
/^\d{8}-?\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678-9` | ✅ |
| `1234567-9` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualSP`**](./src/regexen/countries/br/government/inscricao-estadual/sp.ts) — `✅ '123.456.789.012'` — Matches a Sao Paulo (SP) Inscricao Estadual in the format XXX.XXX.XXX.XXX *(Enforces beginning and end of string)*

```regex
/^\d{3}\.?\d{3}\.?\d{3}\.?\d{3}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.456.789.012` | ✅ |
| `123.456.789` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualSPRural`**](./src/regexen/countries/br/government/inscricao-estadual/sp.ts) — `✅ 'P-12345678.9/012'` — Matches a Sao Paulo (SP) rural Inscricao Estadual in the format P-XXXXXXXX.X/XXX *(Enforces beginning and end of string)*

```regex
/^P-?\d{8}\.?\d\/?\d{3}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `P-12345678.9/012` | ✅ |
| `12345678.9/012` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`inscricaoEstadualTO`**](./src/regexen/countries/br/government/inscricao-estadual/to.ts) — `✅ '29011234567'` — Matches a Tocantins (TO) Inscricao Estadual starting with 29 followed by 01, 02, 03, or 99 *(Enforces beginning and end of string)*

```regex
/^29(?:01|02|03|99)\d{7}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `29011234567` | ✅ |
| `29041234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

### Countries / BR / Vehicles

[**`antt`**](./src/regexen/countries/br/vehicles/antt.ts) — `✅ '12345678'` — Matches a Brazilian ANTT registration number as 8 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{8}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678` | ✅ |
| `1234567` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`licensePlate`**](./src/regexen/countries/br/vehicles/license-plate.ts) — `✅ 'ABC1234'` — Matches a Brazilian license plate in old or Mercosul format Old format: 3 uppercase letters + 4 digits (e.g. ABC1234) Mercosul format: 3 uppercase letters + 1 digit + 1 letter-or-digit + 2 digits (e.g. ABC1D23) *(Enforces beginning and end of string)*

```regex
/^[A-Z]{3}\d[0-9A-Z]\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `ABC1234` | ✅ |
| `abc1234` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`renavamFormatted`**](./src/regexen/countries/br/vehicles/renavam.ts) — `✅ '1234.567890-1'` — Matches a Brazilian RENAVAM number in the format XXXX.XXXXXX-X *(Enforces beginning and end of string)*

```regex
/^\d{4}\.\d{6}-\d$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1234.567890-1` | ✅ |
| `12345678901` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`renavamStripped`**](./src/regexen/countries/br/vehicles/renavam.ts) — `✅ '12345678901'` — Matches a Brazilian RENAVAM number as 11 consecutive digits *(Enforces beginning and end of string)*

```regex
/^\d{11}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `12345678901` | ✅ |
| `1234.567890-1` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

---

[**`vin`**](./src/regexen/countries/br/vehicles/vin.ts) — `✅ '1HGBH41JXMN109186'` — Matches a Vehicle Identification Number (VIN) with 17 alphanumeric characters Excludes letters I, O, and Q as per VIN standard *(Enforces beginning and end of string)*

```regex
/^[A-HJ-NPR-Z0-9]{17}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `1HGBH41JXMN109186` | ✅ |
| `1hgbh41jxmn109186` | ❌ |

</details>

<sub>Last updated: 2026-04-09</sub>

<!-- GENERATED:END -->
