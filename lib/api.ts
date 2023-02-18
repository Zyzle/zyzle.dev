import { PageItem, Post, PostDetails, Snippet } from './types';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
	const res = await fetch(process.env.STORYBLOK_API!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Token: process.env.STORYBLOK_API_KEY!,
			Version: process.env.STORYBLOK_PREVIEW! ? 'draft' : 'published',
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const json = await res.json();
	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to fetch API');
	}

	return json.data;
}

export async function getHomepage() {
	const data = await fetchAPI(
		`
		query {
			PageItem(id: "home") {
				id
				content {
					heading
					body
					blocks
				}
			}
		}
	`
	);
	return data.PageItem.content as PageItem;
}

export async function getPageBySlug(slug: string) {
	const data = await fetchAPI(
		`
		query PageBySlug($slug: ID!) {
			PageItem(id: $slug) {
				id
				content {
					heading
					body
					blocks
				}
			}
		}
		`,
		{
			variables: {
				slug,
			},
		}
	);

	return data.PageItem.content as PageItem;
}

export async function getBlogPostsDetails() {
	const data = await fetchAPI(
		`
		query {
			PostItems(starts_with:"blog/") {
				items {
					id
					full_slug
					slug
					name
					first_published_at
					tag_list
					content {
						author
						excerpt
						mainImage {
							alt
							name
							title
							filename
						}
						title
					}
				}
			}
		}
	`
	);
	return data.PostItems.items as PostDetails[];
}

export async function getBlogPostBySlug(slug: string) {
	const data = await fetchAPI(
		`
		query PostBySlug($slug: ID!) {
			PostItem(id: $slug) {
				first_published_at
				tag_list
				content {
					author
					body
					ghDisc
					excerpt
					mainImage {
						alt
						copyright
						filename
						name
						title
					}
					title
				}
			}
		}
		`,
		{
			variables: {
				slug: `blog/${slug}`,
			},
		}
	);

	return data.PostItem as Post;
}

export async function getSnippets() {
	const data = await fetchAPI(
		`
		query {
			SnippetItems {
				items {
					id
					slug
					full_slug
					first_published_at
					tag_list
					name
					content {
						language
						heading
					}
				}
			}
		}
	`
	);
	return data.SnippetItems.items as Partial<Snippet>[];
}

export async function getSnippetBySlug(slug: string) {
	const data = await fetchAPI(
		`
		query SnippetBySlug($slug: ID!) {
			SnippetItem(id: $slug) {
				id
				name
		    tag_list
				slug
    		full_slug
		    first_published_at
				content {
					heading
					body
					language
				}
			}
		}
		`,
		{
			variables: {
				slug: `snippets/${slug}`,
			},
		}
	);

	return data.SnippetItem as Snippet;
}
