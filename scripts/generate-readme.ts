import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const projectRoot = join(import.meta.dirname, '..');
const regexenDir = join(projectRoot, 'src', 'regexen');
const readmePath = join(projectRoot, 'README.md');

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
  filePath: string;
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

  // Extract and validate @example tags — expected format: @example ✅|❌ value
  const examples: ExampleEntry[] = [];
  for (const match of jsdocBlock.matchAll(/@example\s+(.+)/g)) {
    const raw = match[1].trim();
    const parsed = raw.match(/^([✅❌])\s+['"]?(.+?)['"]?$/);

    if (!parsed) {
      throw new Error(
        `Invalid @example format in ${filePath}:\n  @example ${raw}\n  Expected: @example ✅|❌ <value>`,
      );
    }

    examples.push({
      value: parsed[2],
      matches: parsed[1] === '✅',
      note: '',
    });
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
    filePath: relative(projectRoot, filePath),
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
 * Builds a markdown block for a single regex entry
 */
function buildEntryBlock(entry: RegexEntry): string[] {
  const lines: string[] = [];

  // Line 1: bold linked name => first matching example + description
  const firstMatch = entry.examples.find(e => e.matches);
  const quickRef = firstMatch ? ` \`✅ '${firstMatch.value}'\` —` : '';
  const notesSuffix = entry.notes.length > 0 ? ` *(${entry.notes.join(', ')})*` : '';
  lines.push(
    `[**\`${entry.name}\`**](./${entry.filePath}) —${quickRef} ${entry.description}${notesSuffix}`,
  );
  lines.push('');

  // Line 2: regex pattern
  lines.push('```regex');
  lines.push(entry.pattern);
  lines.push('```');
  lines.push('');

  // Line 3: examples accordion
  if (entry.examples.length > 0) {
    lines.push('<details><summary>Examples</summary>');
    lines.push('');
    lines.push('| Input | Match |');
    lines.push('|:------|:-----:|');
    for (const example of entry.examples) {
      const icon = example.matches ? '✅' : '❌';
      lines.push(`| \`${example.value}\` | ${icon} |`);
    }
    lines.push('');
    lines.push('</details>');
  }

  return lines;
}

// Build the dynamic section
const dynamicLines: string[] = [];

const sortedGroups = [...grouped.entries()].sort((a, b) => {
  const aIsCountry = a[0].startsWith('countries');
  const bIsCountry = b[0].startsWith('countries');
  if (aIsCountry !== bIsCountry) return aIsCountry ? 1 : -1;
  return a[0].localeCompare(b[0]);
});

for (const [category, categoryEntries] of sortedGroups) {
  dynamicLines.push(`### ${formatCategoryTitle(category)}`);
  dynamicLines.push('');

  for (let i = 0; i < categoryEntries.length; i++) {
    dynamicLines.push(...buildEntryBlock(categoryEntries[i]));
    dynamicLines.push('');
    if (i < categoryEntries.length - 1) {
      dynamicLines.push('---');
      dynamicLines.push('');
    }
  }
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
countries.br.documents.cpf.test('123.456.789-09'); // true
\`\`\`

<!-- GENERATED:START - Do not edit below this line -->

${dynamicLines.join('\n')}
<!-- GENERATED:END -->
`;

writeFileSync(readmePath, staticContent);
console.log(`README.md generated with ${entries.length} patterns.`);
