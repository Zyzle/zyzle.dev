import { Metadata } from 'next';
import Link from 'next/link';
import { render } from 'storyblok-rich-text-react-renderer';

import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getBlogPostsDetails, getPageBySlug } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';
import metadataGenerator from '@zyzle-dev/lib/metadataGenerator';

export default async function BlogList() {
	const { page, blogPosts } = await getData();
	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">{page.heading}</h1>
			<div className="prose prose-invert prose-zyzle mx-auto mb-6">
				<RichTextBlok blok={page.body} />
			</div>
			{blogPosts.map(blogPost => (
				<article key={blogPost.id} className="flex flex-col mb-8">
					<Link href={`/${blogPost.full_slug}`}>
						<h2 className="text-zlime text-2xl font-semibold hover:underline">{blogPost.content.heading}</h2>
					</Link>
					<div className="flex flex-row mb-3">
						<span className="text-zcyan flex-1">{formatRelativeDateString(blogPost.first_published_at)}</span>
						<span className="text-zgold flex-1 flex flex-wrap justify-end">
							{blogPost.tag_list.map(tag => (
								<Link key={tag} href={`/tags/${tag}`}>
									<span className=" bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
								</Link>
							))}
						</span>
					</div>
					<section className="prose prose-invert prose-zyzle mx-auto">
						<RichTextBlok blok={blogPost.content.excerpt} />
						<Link href={`/${blogPost.full_slug}`}>Continue reading...</Link>
					</section>
				</article>
			))}
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('blog/');
	const stripped = (render(page.body, stripResolver) as Array<string>).flat().join('').slice(0, 150) + '...';
	const title = `${page.heading}`;
	const url = 'https://zyzle.dev/blog';

	return metadataGenerator(title, stripped, 'website', url);
}

async function getData() {
	const page = await getPageBySlug('blog/');
	const blogPosts = await getBlogPostsDetails();
	return {
		page,
		blogPosts,
	};
}
