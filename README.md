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

| Name  | Description                                                 | Pattern                         |
| ----- | ----------------------------------------------------------- | ------------------------------- |
| `cpf` | Matches a Brazilian CPF number in the format XXX.XXX.XXX-XX | `/^\d{3}\.\d{3}\.\d{3}-\d{2}$/` |

### Datetime

| Name              | Description                                                                                                              | Pattern                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `dashedDateLoose` | Matches a date in the format YYYY-MM-DD Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day  | `/([0-9]{4}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1]))/`   |
| `dashedDate`      | Matches a date in the format YYYY-MM-DD Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day. | `/^([0-9]{4}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1]))$/` |
| `isoUtc`          | Regex that matches a UTC ISO String Date in format YYYY-MM-DDTHH:mm:ss.sssZ                                              | `/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/`              |

<!-- GENERATED:END -->
