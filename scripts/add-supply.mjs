// Usage: npm run add-supply -- "Titebond III" --status owned --category Glue
import { slugify, writeContent, parseArgs } from './_shared.mjs';

const { positional, flags } = parseArgs(process.argv.slice(2));
const name = positional[0];

if (!name) {
  console.error('Usage: npm run add-supply -- "Supply Name" [--status owned|wanted|low|out] [--category Glue]');
  process.exit(1);
}

const status = flags.status ?? 'owned';
const category = flags.category ?? 'Uncategorized';
const slug = slugify(name);

const body = `---
name: "${name}"
status: "${status}"
category: "${category}"
brand:
quantity:
location:
tags: []
relatedProjects: []
---

Notes about this supply.
`;

writeContent('supplies', `${slug}.md`, body);
