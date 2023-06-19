import { MetadataRoute } from 'next';

import { getSitemapNodes } from '@zyzle-dev/lib/api';

const BASE_PATH = 'https://zyzle.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapNodes = await getSitemapNodes();
	return sitemapNodes.map(node => ({
		url: `${BASE_PATH}/${node.full_slug === 'home' ? '' : node.full_slug.replace(/\/$/, '')}`,
		lastModified: node.published_at,
	}));
}
