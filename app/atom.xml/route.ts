import { Feed } from 'feed';

import { getBlogPostsDetails } from '@zyzle-dev/lib/api';
import stripResolver from '@zyzle-dev/lib/stripResolver';
import { render } from 'storyblok-rich-text-react-renderer';

const BASE_PATH = 'https://zyzle.dev';

export async function GET() {
	const blogPosts = await getBlogPostsDetails();

	const feed = new Feed({
		title: 'Zyzle.dev',
		description: 'Blog feed for Zyzle.dev',
		id: BASE_PATH,
		link: BASE_PATH,
		favicon: `${BASE_PATH}/favicon.ico`,
		copyright: 'Zyzle.dev © 2023 by Colin McCulloch is licensed under CC BY-SA 4.0',
		feedLinks: {
			atom: `${BASE_PATH}/atom.xml`,
		},
		author: {
			name: 'Colin McCulloch',
			email: 'colin@zyzle.dev',
			link: `${BASE_PATH}/about`,
		},
	});

	blogPosts.forEach(post => {
		feed.addItem({
			title: post.content.heading,
			id: `${post.id}`,
			link: `${BASE_PATH}/${post.full_slug}`,
			date: new Date(post.first_published_at),
			description: (render(post.content.excerpt, stripResolver) as Array<[]>)[0].join(''),
		});
	});

	return new Response(feed.atom1());
}
