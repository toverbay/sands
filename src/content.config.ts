import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["wood", "fiber"]),
    maker: z.enum(["Tim", "Melody", "Both"]).default("Both"),
    summary: z.string(),
    priceLabel: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    featured: z.boolean().default(false),
    available: z.boolean().default(true),
    customizable: z.boolean().default(false),
    sortOrder: z.number().int().default(0)
  })
})

export const collections = { products }
