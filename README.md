# Sweat & Sawdust

A personal woodworking shop log built with [Astro](https://astro.build):
blog posts, project pages, and a structured inventory of tools and supplies.

The repository is the database. The local helper scripts are the admin
interface. The static host is the publisher.

## Getting started

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project layout

```text
src/content/blog/       Blog posts (Markdown + frontmatter)
src/content/projects/   Project pages
src/content/tools/      One file per tool (owned, wanted, sold, retired)
src/content/supplies/   One file per supply (owned, wanted, low, out)
src/content.config.ts   Frontmatter schemas (validated at build time)
src/components/         Vue tables + Astro cards
src/layouts/            BaseLayout (masthead, nav, footer)
src/pages/              Routes
public/images/          Photos, organized by content type and slug
scripts/                Content-generation helpers
```

The filename of each content file is its slug and URL. For example,
`src/content/tools/dewalt-dw735-planer.md` becomes `/tools/dewalt-dw735-planer`.

## Adding content

Helper scripts generate correctly-shaped Markdown files:

```bash
npm run add-tool -- "Veritas Router Plane" --status wanted --category "Hand Tools"
npm run add-supply -- "120-Grit Sanding Discs" --status owned --category Abrasives
npm run add-post -- "Milling the Coat Rack Lumber" --project piano-coat-rack
```

New blog posts are created with `draft: true`; flip it to `false` to publish.
Frontmatter is validated against the schemas in `src/content.config.ts` at
build time, so malformed records fail the build instead of shipping.

## Publishing workflow

```bash
# edit content
npm run build        # optional local check
git add .
git commit -m "Update woodworking site"
git push
```

The static host rebuilds and publishes automatically on push.

## Deploying to GitHub Pages (current setup)

This repo is configured for GitHub Pages at
**https://toverbay.github.io/sands/**.

- `.github/workflows/deploy.yml` builds the site and publishes it on every
  push to `main`.
- `astro.config.mjs` sets `site: 'https://toverbay.github.io'` and
  `base: '/sands'`. All internal links go through `src/lib/url.ts` (or the
  `base` constant in the Vue components) so they work under the subpath.

One-time setup in the GitHub repo: **Settings → Pages → Build and
deployment → Source: GitHub Actions**.

### Moving to a custom domain or Cloudflare Pages later

Set `site` to the new URL and remove the `base` line in `astro.config.mjs`.
The `url()` helper automatically falls back to root-relative links, so no
other changes are needed. For Cloudflare Pages: connect the repo with the
Astro framework preset (build `npm run build`, output `dist`).

## Linking content together

- A blog post's `project` field links it to a project slug.
- A project's `toolsUsed` / `suppliesUsed` arrays link to tool and supply
  slugs; `relatedPosts` links back to blog post slugs.
- A tool or supply's `relatedProjects` array links to project slugs.

All links resolve at build time — a typo'd slug simply renders as plain
text on project pages, so check the page after adding links.

## Images

Put photos in `public/images/<type>/<slug>/`, e.g.
`public/images/tools/dewalt-dw735-planer/hero.jpg`, then reference them in
Markdown as `/images/tools/dewalt-dw735-planer/hero.jpg`.
