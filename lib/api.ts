import { ContentNode, PageItem, Post, PostDetails, Project, SitemapNode, Snippet } from './types';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}, tags: string[] = []) {
	const res = await fetch(process.env.STORYBLOK_API!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Token: process.env.STORYBLOK_API_KEY!,
			Version: process.env.STORYBLOK_VERSION!,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
		// cache: 'force-cache',
		next: {
			revalidate: 86400,
			tags,
		},
	});

	const json = await res.json();
	if (json.errors) {
		console.error(json.errors);
		throw new Error('Failed to fetch API');
	}

	return json.data;
}

export const getPageBySlug = async (slug: string) => {
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
		},
		['page']
	);

	return data.PageItem.content as PageItem;
};

export const getBlogPostsDetails = async () => {
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
						heading
					}
				}
			}
		}
	`,
		{},
		['blog']
	);
	return data.PostItems.items as PostDetails[];
};

export const getBlogPostBySlug = async (slug: string) => {
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
					heading
				}
			}
		}
		`,
		{
			variables: {
				slug: `blog/${slug}`,
			},
		},
		['blog']
	);

	return data.PostItem as Post;
};

export const getSnippets = async () => {
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
	`,
		{},
		['snippets']
	);
	return data.SnippetItems.items as Partial<Snippet>[];
};

export const getProjects = async () => {
	const data = await fetchAPI(
		`
		query {
			ProjectItems {
				items {
					slug
					full_slug
					tag_list
					content {
						heading
						body
						excerpt
						mainImage {
							alt
							filename
						}
					}
				}
			}
		}
	`,
		{},
		['projects']
	);
	return data.ProjectItems.items as Partial<Project>[];
};

export const getSnippetBySlug = async (slug: string) => {
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
					mainImage {
						filename
					}
				}
			}
		}
		`,
		{
			variables: {
				slug: `snippets/${slug}`,
			},
		},
		['snippets']
	);

	return data.SnippetItem as Snippet;
};

export const getProjectBySlug = async (slug: string) => {
	const data = await fetchAPI(
		`
		query ProjectBySlug($slug: ID!) {
			ProjectItem(id: $slug) {
				id
				name
		    tag_list
				slug
    		full_slug
		    first_published_at
				content {
					heading
					body
				}
			}
		}
		`,
		{
			variables: {
				slug: `projects/${slug}`,
			},
		},
		['projects']
	);

	return data.ProjectItem as Project;
};

export const getAllContentNodes = async () => {
	const data = await fetchAPI(
		`
		query {
			ContentNodes {
				items {
					full_slug
					tag_list
				}
			}
		}
		`,
		{},
		['projects, snippets, blog']
	);

	return data.ContentNodes.items as ContentNode[];
};

export const getContentNodesByTag = async (tag: string) => {
	const data = await fetchAPI(
		`
		query ContentNodesByTag($tag: String!){
			ContentNodes(with_tag: $tag) {
				items {
					id
					first_published_at
					full_slug
					tag_list
					content
				}
			}
		}
		`,
		{
			variables: {
				tag,
			},
		},
		['projects, snippets, blog']
	);

	return data.ContentNodes.items as ContentNode[];
};

export const getSitemapNodes = async () => {
	const data = await fetchAPI(
		`
		query {
			ContentNodes {
				items {
					full_slug
					published_at
					tag_list
				}
			}
		}
		`,
		{},
		['projects, snippets, blog']
	);

	return data.ContentNodes.items as SitemapNode[];
};
