import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const regexenDir = join(import.meta.dirname, '..', 'src', 'regexen');
const readmePath = join(import.meta.dirname, '..', 'README.md');

interface ExampleEntry {
  value: string;
  matches: boolean;
  note: string;
}

interface RegexEntry {
  name: string;
  description: string;
  notes: string[];
  pattern: string;
  examples: ExampleEntry[];
  category: string;
}

/**
 * Recursively collects all non-index, non-test .ts files from the regexen directory
 */
function collectRegexFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);

    if (statSync(fullPath).isDirectory()) {
      files.push(...collectRegexFiles(fullPath));
      continue;
    }

    // Skip index and test files
    if (entry.startsWith('_') || entry.includes('.test.')) continue;
    if (!entry.endsWith('.ts')) continue;

    files.push(fullPath);
  }

  return files;
}

/**
 * Parses a regex source file to extract the JSDoc metadata and the regex pattern
 */
function parseRegexFile(filePath: string): RegexEntry | null {
  const content = readFileSync(filePath, 'utf-8');

  // Extract JSDoc block
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) return null;

  const jsdocBlock = jsdocMatch[1];

  const cleanedLines = jsdocBlock
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean);

  // Extract description (lines before any @tag or ___ note)
  const descriptionLines = cleanedLines.filter(
    line => !line.startsWith('@') && !line.startsWith('___'),
  );
  const description = descriptionLines.join(' ');

  // Extract ___ notes (e.g. "___Enforces beginning and end of string___")
  const notes = cleanedLines
    .filter(line => line.startsWith('___'))
    .map(line => line.replace(/^_+|_+$/g, ''));

  // Extract @example tags and parse match status
  const examples: ExampleEntry[] = [];
  for (const match of jsdocBlock.matchAll(/@example\s+(.+)/g)) {
    const raw = match[1].trim();
    const parsed = raw.match(/^(['"]?)(.+?)\1\s*\((.+)\)$/);

    if (parsed) {
      const note = parsed[3];
      const isExplicitNoMatch = /does not match/i.test(note);
      examples.push({ value: parsed[2], matches: !isExplicitNoMatch, note });
    } else {
      examples.push({ value: raw, matches: true, note: '' });
    }
  }

  // Extract export const name = /pattern/
  const exportMatch = content.match(/export const (\w+)\s*=\s*(\/.*\/[gimsuy]*);/);
  if (!exportMatch) return null;

  // Build category from directory path relative to regexen/
  const category = relative(regexenDir, filePath).split('/').slice(0, -1).join(' / ');

  return {
    name: exportMatch[1],
    description,
    notes,
    pattern: exportMatch[2],
    examples,
    category,
  };
}

/**
 * Groups entries by their category path
 */
function groupByCategory(entries: RegexEntry[]): Map<string, RegexEntry[]> {
  const groups = new Map<string, RegexEntry[]>();

  for (const entry of entries) {
    const existing = groups.get(entry.category) ?? [];
    existing.push(entry);
    groups.set(entry.category, existing);
  }

  return groups;
}

/**
 * Formats a category title from path segments (e.g. "countries / br" -> "Countries / BR")
 */
function formatCategoryTitle(category: string): string {
  return category
    .split(' / ')
    .map(segment => {
      // Keep short segments (likely country codes) uppercase
      if (segment.length <= 3) return segment.toUpperCase();
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join(' / ');
}

// Collect and parse all regex files
const files = collectRegexFiles(regexenDir);
const entries = files.map(parseRegexFile).filter((entry): entry is RegexEntry => entry !== null);

const grouped = groupByCategory(entries);

/**
 * Builds a padded, aligned markdown table from rows of cell values
 */
function buildAlignedTable(headers: string[], rows: string[][]): string[] {
  // Calculate max width per column
  const widths = headers.map((header, col) =>
    Math.max(header.length, ...rows.map(row => row[col].length)),
  );

  const pad = (value: string, col: number) => value.padEnd(widths[col]);

  const headerLine = `| ${headers.map((h, i) => pad(h, i)).join(' | ')} |`;
  const separatorLine = `| ${widths.map(w => '-'.repeat(w)).join(' | ')} |`;
  const dataLines = rows.map(row => `| ${row.map((cell, i) => pad(cell, i)).join(' | ')} |`);

  return [headerLine, separatorLine, ...dataLines];
}

// Build the dynamic section
const dynamicLines: string[] = [];

for (const [category, categoryEntries] of grouped) {
  dynamicLines.push(`### ${formatCategoryTitle(category)}`);
  dynamicLines.push('');

  const headers = ['Name', 'Description', 'Pattern'];
  const rows = categoryEntries.map(entry => [
    `\`${entry.name}\``,
    entry.description,
    `\`${entry.pattern}\``,
  ]);

  dynamicLines.push(...buildAlignedTable(headers, rows));
  dynamicLines.push('');
}

// Static header
const staticContent = `# regex-belt

A collection of commonly used regular expressions, organized by category.

## Install

\`\`\`bash
npm install regex-belt
\`\`\`

## Usage

\`\`\`ts
import { datetime, countries } from 'regex-belt';

datetime.dashedDate.test('2022-12-31'); // true
countries.br.cpf.test('123.456.789-09'); // true
\`\`\`

<!-- GENERATED:START - Do not edit below this line -->
## Patterns

${dynamicLines.join('\n')}
<!-- GENERATED:END -->
`;

writeFileSync(readmePath, staticContent);
console.log(`README.md generated with ${entries.length} patterns.`);
