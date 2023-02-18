import Link from 'next/link';

import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getBlogPostBySlug, getBlogPostsDetails } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
	const blogPost = await getData(params.slug);
	const firstPublished = formatRelativeDateString(blogPost.first_published_at);

	return (
		<>
			<nav className="text-zpurple my-4">
				<Link href="/blog">« back to blogs</Link>
			</nav>
			<article className="prose prose-invert prose-zyzle mx-auto mb-6">
				<h1 className="text-zlime">{blogPost.content.title}</h1>
				<div className=" text-zcyan">{firstPublished}</div>
				<div className="text-zgold flex flex-wrap">
					{blogPost.tag_list.map(tag => (
						<span key={tag} className=" bg-zblock rounded-full px-2 whitespace-nowrap">
							#{tag}
						</span>
					))}
				</div>
				<RichTextBlok blok={blogPost.content.body} />
			</article>
		</>
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
