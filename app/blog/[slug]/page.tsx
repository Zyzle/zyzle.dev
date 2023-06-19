import { Metadata } from 'next';
import Link from 'next/link';
import { render } from 'storyblok-rich-text-react-renderer';

import { Comments } from '@zyzle-dev/components/Comments';
import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getBlogPostBySlug, getBlogPostsDetails } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
	const blogPost = await getData(params.slug);
	const firstPublished = formatRelativeDateString(blogPost.first_published_at);

	return (
		<>
			<article className="prose prose-invert prose-zyzle mx-auto mb-6">
				<h1 className="text-zlime">{blogPost.content.heading}</h1>
				<div className=" text-zcyan">{firstPublished}</div>
				<div className="text-zgold flex flex-wrap">
					{blogPost.tag_list.map(tag => (
						<span className="not-prose" key={tag}>
							<Link href={`/tags/${tag}`}>
								<span className="  bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
							</Link>
						</span>
					))}
				</div>
				<RichTextBlok blok={blogPost.content.body} />
			</article>
			<section className="prose prose-invert prose-zyzle mx-auto mb-6">
				<hr className="mb-3" />
				<h3>Comments</h3>
				<Comments discussionId={blogPost.content.ghDisc} />
			</section>
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const res = await getBlogPostBySlug(params.slug);
	const stripped = (render(res.content.body, stripResolver) as Array<[]>)[0].join('').slice(0, 150) + '...';
	const title = `${res.content.heading} | Blog`;
	return {
		title,
		description: stripped,
		authors: [{ name: 'Colin McCulloch', url: 'https://zyzle.dev' }],
		openGraph: {
			title,
			description: stripped,
			images: [
				`/og?title=${encodeURIComponent(`${title} | Zyzle.dev`)}&img=${encodeURIComponent(res.content.mainImage.filename)}`,
			],
			url: `https://zyzle.dev/blog/${params.slug}`,
		},
		twitter: {
			creator: '@ZyzleDotDev',
			card: 'summary',
			description: stripped,
			title,
			images: [
				`/og?title=${encodeURIComponent(`${title} | Zyzle.dev`)}&img=${encodeURIComponent(res.content.mainImage.filename)}`,
			],
		},
	};
}
