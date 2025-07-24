import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		title: z.string(),
		date: z.coerce.date(),
		author: z.string(),
		category: z.string(),
		tags: z.array(z.string()),
		cover: z.string(),
		excerpt: z.string(),
		featured: z.boolean(),
	}),
});

export const collections = { blog };