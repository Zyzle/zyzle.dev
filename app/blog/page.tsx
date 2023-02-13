import Link from 'next/link';

import { getBlogPostsDetails } from '@zyzle-dev/lib/api';
import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';

export default async function BlogList() {
	const blogPosts = await getData();

	return (
		<>
			<nav className="text-zpurple my-4">
				<Link href="/">« back to home</Link>
			</nav>
			<h1 className="text-zgold text-4xl font-bold my-4">Blog</h1>
			{blogPosts.map(blogPost => (
				<article key={blogPost.id} className="flex flex-col mb-6">
					<Link href={`/${blogPost.full_slug}`}>
						<h2 className="text-zlime text-2xl font-semibold">{blogPost.name}</h2>
					</Link>
					<div className="flex flex-row mb-3">
						<span className="text-zcyan flex-1">{formatRelativeDateString(blogPost.first_published_at)}</span>
						<span className="text-zgold flex-1 flex flex-wrap justify-end">
							{blogPost.tag_list.map(tag => (
								<span key={tag} className=" bg-zblock rounded-full px-2 mb-1 whitespace-nowrap">
									#{tag}
								</span>
							))}
						</span>
					</div>
					<section className="prose prose-invert prose-zyzle mx-auto">
						<RichTextBlok blok={blogPost.content.excerpt} />
					</section>
				</article>
			))}
		</>
	);
}

async function getData() {
	const res = await getBlogPostsDetails();
	return res;
}
