import { render } from 'storyblok-rich-text-react-renderer';

import { getBlogPostBySlug, getBlogPostsDetails } from '@zyzle-dev/lib/api';

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
	const blogPost = await getData(params.slug);

	return (
		<main>
			<h1>Blog slug page: {blogPost.content.title}</h1>
			{render(blogPost.content.body)}
		</main>
	);
}

async function getData(slug: string) {
	const res = await getBlogPostBySlug(slug);
	return res;
}

export async function generateStaticParams() {
	const blogPosts = await getBlogPostsDetails();
	const params = blogPosts.map(blogPost => ({
		slug: blogPost.slug,
	}));

	return params;
}
