// Usage: npm run add-post -- "Building a Piano-Style Coat Rack" [--project piano-coat-rack]
import { slugify, writeContent, parseArgs, today } from './_shared.mjs';

const { positional, flags } = parseArgs(process.argv.slice(2));
const title = positional[0];

if (!title) {
  console.error('Usage: npm run add-post -- "Post Title" [--project project-slug]');
  process.exit(1);
}

const date = today();
const slug = `${date}-${slugify(title)}`;

const body = `---
title: "${title}"
date: "${date}"
tags: []
${flags.project ? `project: "${flags.project}"` : ''}
summary: ""
draft: true
---

Write the post here. Set \`draft: false\` when it's ready to publish.
`;

writeContent('blog', `${slug}.md`, body);
