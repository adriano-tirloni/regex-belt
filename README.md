# regex-belt

A collection of commonly used regular expressions, organized by category.

## Install

```bash
npm install regex-belt
```

## Usage

```ts
import { datetime, countries } from 'regex-belt';

datetime.dashedDate.test('2022-12-31'); // true
countries.br.cpf.test('123.456.789-09'); // true
```

<!-- GENERATED:START - Do not edit below this line -->
## Patterns

### Countries / BR

[**`cpf`**](./src/regexen/countries/br/cpf.ts) — `✅ '123.456.789-09'` — Matches a Brazilian CPF number in the format XXX.XXX.XXX-XX

```regex
/^\d{3}\.\d{3}\.\d{3}-\d{2}$/
```

<details><summary>Examples</summary>

| Input | Match |
|:------|:-----:|
| `123.456.789-09` | ✅ |
| `12345678909` | ❌ |

</details>

### Datetime

[**`dashedDateLoose`**](./src/regexen/datetime/dashed-date-loose.ts) — `✅ '2022-12-31'` — Matches a date in the format YYYY-MM-DD Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day

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

---

[**`dashedDate`**](./src/regexen/datetime/dashed-date.ts) — `✅ '2022-12-31'` — Matches a date in the format YYYY-MM-DD Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day.

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

<!-- GENERATED:END -->
