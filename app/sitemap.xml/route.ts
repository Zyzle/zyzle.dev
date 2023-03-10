import { getSitemapNodes } from '@zyzle-dev/lib/api';

const BASE_PATH = 'https://zyzle.dev';

export async function GET() {
	const sitemapNodes = await getSitemapNodes();
	const nodesString = sitemapNodes
		.map(node => {
			return `
<url>
	<loc>${BASE_PATH}/${node.full_slug === 'home' ? '' : node.full_slug.replace(/\/$/, '')}</loc>
	<lastmod>${node.published_at}</lastmod>
	<changefreq>weekly</changefreq>
</url>
		`;
		})
		.join('');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${nodesString}
</urlset>`);
}
