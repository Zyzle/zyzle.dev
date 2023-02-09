import { getBlogPostsDetails } from '@zyzle-dev/lib/api';
import { PostDetails } from '@zyzle-dev/lib/types';
import Link from 'next/link';

export default async function BlogList() {
	const blogPosts = await getData();

	return (
		<main>
			<h1>Blog page</h1>

			{blogPosts.map(blogPost => (
				<div key={blogPost.id}>
					<Link href={`/${blogPost.full_slug}`}>{blogPost.name}</Link>
					<br />
					{blogPost.first_published_at}
					<br />
					{blogPost.content.excerpt}
					<br />
					{blogPost.content.author}
				</div>
			))}
		</main>
	);
}

async function getData() {
	const res = await getBlogPostsDetails();
	return res;
}
