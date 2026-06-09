// Prefix internal links with the configured base path so the site works
// both at a domain root and under a subpath like /sands/ on GitHub Pages.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return `${base}${path}`;
}
