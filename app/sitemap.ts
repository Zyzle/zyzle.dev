import { MetadataRoute } from 'next';

import { getSitemapNodes } from '@zyzle-dev/lib/api';

const BASE_PATH = 'https://zyzle.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapNodes = await getSitemapNodes();
	const tags: string[] = [];

	const nodes = sitemapNodes.map(node => {
		if (node.tag_list) {
			tags.push(...node.tag_list);
		}
		return {
			url: `${BASE_PATH}/${node.full_slug === 'home' ? '' : node.full_slug.replace(/\/$/, '')}`,
			lastModified: node.published_at,
		};
	});

	const siteTags = Array.from(new Set(tags)).map(tag => ({
		url: `${BASE_PATH}/tags/${tag}`,
		lastModified: new Date().toISOString(),
	}));

	return [...nodes, ...siteTags];
}
