import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
    image: z.string(),
    draft: z.boolean().optional(),
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
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/posts/projects",
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    author: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blogs, snippets, projects };
