import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blogs = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/posts/blog",
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    ghDisc: z.number().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const snippets = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/posts/snippets",
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    language: z.string(),
    author: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blogs, snippets };
