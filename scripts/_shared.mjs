// Shared helpers for the content-generation scripts.
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function writeContent(dir, filename, body) {
  const path = join('src', 'content', dir, filename);
  if (existsSync(path)) {
    console.error(`Refusing to overwrite existing file: ${path}`);
    process.exit(1);
  }
  writeFileSync(path, body);
  console.log(`Created ${path}`);
}

// Tiny flag parser: --key value pairs after positional args.
export function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      flags[argv[i].slice(2)] = argv[i + 1];
      i++;
    } else {
      positional.push(argv[i]);
    }
  }
  return { positional, flags };
}
