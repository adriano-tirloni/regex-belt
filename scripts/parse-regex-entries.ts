import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export const projectRoot = join(import.meta.dirname, '..');
export const regexenDir = join(projectRoot, 'src', 'regexen');

export interface ExampleEntry {
  value: string;
  matches: boolean;
  note: string;
}

export interface RegexEntry {
  name: string;
  description: string;
  notes: string[];
  pattern: string;
  examples: ExampleEntry[];
  category: string;
  filePath: string;
}

export interface RegexEntryWithDate extends RegexEntry {
  lastUpdated: string;
}

/**
 * Builds a map of file path → last commit date by parsing a single git log pass.
 * First occurrence of each file is its most recent change.
 */
export function buildLastUpdatedMap(): Map<string, string> {
  const map = new Map<string, string>();

  const output = execSync('git log --format=%aI --name-only', { encoding: 'utf-8' });

  let currentDate = '';
  for (const line of output.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // ISO date lines start with a digit (e.g. 2026-04-08T...)
    if (/^\d{4}-/.test(trimmed)) {
      currentDate = trimmed.slice(0, 10);
      continue;
    }

    // File path line — only keep the first (most recent) occurrence
    if (!map.has(trimmed)) {
      map.set(trimmed, currentDate);
    }
  }

  return map;
}

/**
 * Recursively collects all non-index, non-test .ts files from the regexen directory
 */
export function collectRegexFiles(directory: string): string[] {
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
 * Parses a single JSDoc block to extract description, notes, and examples
 */
export function parseJsdocBlock(jsdocBlock: string, filePath: string) {
  const cleanedLines = jsdocBlock
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean);

  const descriptionLines = cleanedLines.filter(
    line => !line.startsWith('@') && !line.startsWith('___'),
  );
  const description = descriptionLines.join(' ');

  const notes = cleanedLines
    .filter(line => line.startsWith('___'))
    .map(line => line.replace(/^_+|_+$/g, ''));

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

  return { description, notes, examples };
}

/**
 * Parses a regex source file to extract JSDoc metadata and regex patterns.
 * Supports files with one or more exported regexes, each preceded by a JSDoc block.
 * For dynamically-constructed regexes (e.g. via helper functions), the module is
 * imported at runtime to resolve the actual pattern.
 */
export async function parseRegexFile(filePath: string): Promise<RegexEntry[]> {
  const content = readFileSync(filePath, 'utf-8');
  const category = relative(regexenDir, filePath).split('/').slice(0, -1).join(' / ');
  const relPath = relative(projectRoot, filePath);

  //Try matching literal regex exports: export const name = /pattern/flags;
  const literalTuples = [
    ...content.matchAll(/\/\*\*([\s\S]*?)\*\/\s*export const (\w+)\s*=\s*(\/.*\/[gimsuy]*);/g),
  ];

  if (literalTuples.length > 0) {
    return literalTuples.map(match => {
      const { description, notes, examples } = parseJsdocBlock(match[1], filePath);

      return {
        name: match[2],
        description,
        notes,
        pattern: match[3],
        examples,
        category,
        filePath: relPath,
      };
    });
  }

  //Fallback: match JSDoc + export const with any value (dynamic construction)
  const dynamicTuples = [...content.matchAll(/\/\*\*([\s\S]*?)\*\/\s*export const (\w+)\b[^;]*;/g)];

  if (dynamicTuples.length === 0) {
    throw new Error(`No JSDoc + export tuples found in ${filePath}`);
  }

  //Dynamically import the module to resolve the actual regex patterns
  const mod = await import(filePath);

  return dynamicTuples.map(match => {
    const { description, notes, examples } = parseJsdocBlock(match[1], filePath);
    const name = match[2];
    const regex: RegExp = mod[name];
    const pattern = `/${regex.source}/${regex.flags}`;

    return { name, description, notes, pattern, examples, category, filePath: relPath };
  });
}

/**
 * Collects all regex entries with last-updated dates from git history.
 */
export async function collectAllEntries(): Promise<RegexEntryWithDate[]> {
  const lastUpdatedMap = buildLastUpdatedMap();
  const files = collectRegexFiles(regexenDir);
  const entries = (await Promise.all(files.map(parseRegexFile))).flat();

  return entries.map(entry => ({
    ...entry,
    lastUpdated: lastUpdatedMap.get(entry.filePath) ?? '',
  }));
}
