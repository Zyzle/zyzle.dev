import { Metadata } from 'next';
import Link from 'next/link';

import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getAllContentNodes, getContentNodesByTag } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';
import metadataGenerator from '@zyzle-dev/lib/metadataGenerator';

export default async function TagsSlugPage({ params }: { params: { slug: string } }) {
	const data = await getData(params.slug);

	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">Tag: {params.slug}</h1>
			<div className="prose prose-invert prose-zyzle mx-auto mb-6">
				<p>Below is a list of pages tagged with {params.slug} </p>
			</div>
			{data.map(node => (
				<article key={node.id} className="flex flex-col mb-8">
					<Link href={`/${node.full_slug}`}>
						<h2 className="text-zlime text-2xl font-semibold hover:underline">{node.content.heading}</h2>
					</Link>
					<div className="flex flex-row mb-3">
						<span className="text-zcyan flex-1">{formatRelativeDateString(node.first_published_at)}</span>
						<span className="text-zgold flex-1 flex flex-wrap justify-end">
							{node.tag_list.map(tag => (
								<Link key={tag} href={`/tags/${tag}`}>
									<span className=" bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
								</Link>
							))}
						</span>
					</div>
					{node.content.excerpt && (
						<section className="prose prose-invert prose-zyzle mx-auto">
							<RichTextBlok blok={node.content.excerpt} />
							<Link href={`/${node.full_slug}`}>Continue reading...</Link>
						</section>
					)}
				</article>
			))}
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
	const title = `${params.slug} | Tags`;
	const description = `A list of pages tagged with: ${params.slug}`;
	const url = `https://zyzle.dev/tags/${params.slug}`;

	return metadataGenerator(title, description, 'website', url);
}
