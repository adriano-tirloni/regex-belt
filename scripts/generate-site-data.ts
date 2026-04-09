import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { collectAllEntries, projectRoot } from './parse-regex-entries.ts';

/**
 * Formats a category title from path segments (e.g. "countries / br" -> "Countries / BR")
 */
function formatCategoryTitle(category: string): string {
  return category
    .split(' / ')
    .map(segment => {
      if (segment.length <= 3) return segment.toUpperCase();
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    })
    .join(' / ');
}

const entries = await collectAllEntries();

const data = entries.map(entry => ({
  ...entry,
  categoryTitle: formatCategoryTitle(entry.category),
}));

const outputDir = join(projectRoot, '_site');
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'patterns.json'), JSON.stringify(data));

console.log(`patterns.json generated with ${data.length} patterns.`);
