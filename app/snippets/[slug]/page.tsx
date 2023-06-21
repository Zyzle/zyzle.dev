import { Metadata } from 'next';
import Link from 'next/link';
import { render } from 'storyblok-rich-text-react-renderer';

import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getSnippetBySlug, getSnippets } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';
import metadataGenerator from '@zyzle-dev/lib/metadataGenerator';

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
	const stripped = (render(res.content.body, stripResolver) as Array<[]>)[0].join('').slice(0, 150) + '...';
	const title = `${res.content.heading} | Snippets`;
	const url = `https://zyzle.dev/snippets/${params.slug}`;

	return metadataGenerator(title, stripped, 'article', url, res.content.mainImage.filename);
}
