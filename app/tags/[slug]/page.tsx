import { Metadata } from 'next';
import Link from 'next/link';

import { getAllContentNodes, getContentNodesByTag } from '@zyzle-dev/lib/api';

export default async function TagsSlugPage({ params }: { params: { slug: string } }) {
	const data = await getData(params.slug);

	return (
		<>
			<nav className="text-zpurple my-4">
				<Link href="/tags">« back to tags</Link>
			</nav>
			<article className="prose prose-invert prose-zyzle mx-auto mb-6">
				<h1 className="text-zlime">Tag: {params.slug}</h1>
				<p>Below is a list of pages tagged with {params.slug} </p>
				{data.map(node => (
					<Link key={node.full_slug} href={`/${node.full_slug}`}>
						<h2>{node.content.heading}</h2>
					</Link>
				))}
			</article>
		</>
	);
}

async function getData(slug: string) {
	const res = await getContentNodesByTag(slug);
	return res;
}

export async function generateStaticParams() {
	const taggedPages = await getAllContentNodes();
	const params = taggedPages.flatMap(page => page.tag_list.map(tag => ({ slug: tag })));
	return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	return {
		title: `${params.slug}`,
	};
}
