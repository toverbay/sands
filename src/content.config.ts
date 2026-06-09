import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional().nullable(),
    summary: z.string().optional().nullable(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['idea', 'planned', 'in-progress', 'complete', 'paused']),
    startedDate: z.coerce.date().optional().nullable(),
    completedDate: z.coerce.date().optional().nullable(),
    tags: z.array(z.string()).default([]),
    toolsUsed: z.array(z.string()).default([]),
    suppliesUsed: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
    summary: z.string().optional().nullable(),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['owned', 'wanted', 'sold', 'retired']),
    category: z.string(),
    brand: z.string().optional().nullable(),
    model: z.string().optional().nullable(),
    priority: z.number().int().min(1).max(5).optional().nullable(),
    pricePaid: z.number().optional().nullable(),
    estimatedPrice: z.number().optional().nullable(),
    purchaseDate: z.coerce.date().optional().nullable(),
    purchaseSource: z.string().optional().nullable(),
    condition: z.enum(['new', 'used', 'refurbished', 'needs-repair']).optional().nullable(),
    location: z.string().optional().nullable(),
    tags: z.array(z.string()).default([]),
    relatedProjects: z.array(z.string()).default([]),
  }),
});

const supplies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/supplies' }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['owned', 'wanted', 'low', 'out', 'discontinued']),
    category: z.string(),
    brand: z.string().optional().nullable(),
    quantity: z.string().optional().nullable(),
    unit: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    estimatedPrice: z.number().optional().nullable(),
    reorderUrl: z.string().url().optional().nullable(),
    tags: z.array(z.string()).default([]),
    relatedProjects: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects, tools, supplies };
