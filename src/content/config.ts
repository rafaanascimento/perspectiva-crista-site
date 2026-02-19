import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string().default('Sem título'),
    description: z.string().default(''),
    date: z.coerce.date().default(new Date()),
    author: z.string().default('autor'),
    category: z.string().default('Geral'),
    tags: z.array(z.string()).default([]),
    cover: z.string().default('/images/og-default.png'),
    slug: z.string().optional(),
    series: z.string().optional()
  })
});

export const collections = { posts };
