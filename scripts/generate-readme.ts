import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RegexEntryWithDate } from './parse-regex-entries.ts';
import { collectAllEntries, projectRoot } from './parse-regex-entries.ts';

const readmePath = join(projectRoot, 'README.md');

/**
 * Groups entries by their category path
 */
function groupByCategory(entries: RegexEntryWithDate[]): Map<string, RegexEntryWithDate[]> {
  const groups = new Map<string, RegexEntryWithDate[]>();

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

/**
 * Builds a markdown block for a single regex entry
 */
function buildEntryBlock(entry: RegexEntryWithDate): string[] {
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

  // Last updated date from git history
  if (entry.lastUpdated) {
    lines.push('');
    lines.push(`<sub>Last updated: ${entry.lastUpdated}</sub>`);
  }

  return lines;
}

// Collect and parse all regex files
const entries = await collectAllEntries();
const grouped = groupByCategory(entries);

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

// Read template and inject generated content
const templatePath = join(import.meta.dirname, 'readme-template.md');
const template = readFileSync(templatePath, 'utf-8');
const finalContent = template.replace('{{GENERATED_CONTENT}}', dynamicLines.join('\n'));

writeFileSync(readmePath, finalContent);
console.log(`README.md generated with ${entries.length} patterns.`);
