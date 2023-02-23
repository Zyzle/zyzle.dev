import Link from 'next/link';

import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getSnippetBySlug, getSnippets } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';
import { Metadata } from 'next';

export default async function SnippetSlugPage({ params }: { params: { slug: string } }) {
	const snippet = await getData(params.slug);
	const firstPublished = formatRelativeDateString(snippet.first_published_at);

	return (
		<>
			<article className="prose prose-invert prose-zyzle mx-auto mb-6">
				<h1 className="text-zlime">{snippet.content.heading}</h1>
				<div className=" text-zcyan">{firstPublished}</div>
				<div className="text-zgold flex flex-wrap">
					{snippet.tag_list.map(tag => (
						<span className="not-prose" key={tag}>
							<Link href={`/tags/${tag}`}>
								<span className="  bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
							</Link>
						</span>
					))}
				</div>
				<RichTextBlok blok={snippet.content.body} />
			</article>
		</>
	);
}

async function getData(slug: string) {
	const res = await getSnippetBySlug(slug);
	return res;
}

export async function generateStaticParams() {
	const snippets = await getSnippets();
	const params = snippets.map(snippet => ({
		slug: snippet.slug,
	}));

	return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const res = await getSnippetBySlug(params.slug);

	return {
		title: `${res.content.heading}`,
	};
}
