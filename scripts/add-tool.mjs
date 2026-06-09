// Usage: npm run add-tool -- "Dewalt DW735 Planer" --status owned --category "Power Tools"
import { slugify, writeContent, parseArgs } from './_shared.mjs';

const { positional, flags } = parseArgs(process.argv.slice(2));
const name = positional[0];

if (!name) {
  console.error('Usage: npm run add-tool -- "Tool Name" [--status owned|wanted|sold|retired] [--category "Power Tools"]');
  process.exit(1);
}

const status = flags.status ?? 'wanted';
const category = flags.category ?? 'Uncategorized';
const slug = slugify(name);

const body = `---
name: "${name}"
status: "${status}"
category: "${category}"
brand:
model:
${status === 'wanted' ? 'priority: 3\nestimatedPrice:' : 'pricePaid:\npurchaseDate:\nlocation:'}
tags: []
relatedProjects: []
---

Notes about this tool.
`;

writeContent('tools', `${slug}.md`, body);
