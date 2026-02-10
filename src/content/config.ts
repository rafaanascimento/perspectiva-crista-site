import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    authorId: z.string(),
    coverImage: z.string()
  })
});

export const collections = { posts };
