import { Metadata } from 'next';
import { render } from 'storyblok-rich-text-react-renderer';

import { SnippetLink } from '@zyzle-dev/components/SnippetLink';
import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getPageBySlug, getSnippets } from '@zyzle-dev/lib/api';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';

export default async function Snippets() {
	const { page, snippets } = await getData();

	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">{page.heading}</h1>
			<div className="prose prose-invert prose-zyzle mx-auto mb-6">
				<RichTextBlok blok={page.body} />
			</div>
			<div className="flex flex-col gap-4 mb-6">
				{snippets.map(snippet => (
					<SnippetLink
						key={snippet.full_slug}
						fullSlug={snippet.full_slug!}
						heading={snippet.content?.heading!}
						firstPublishedAt={snippet.first_published_at!}
						tagList={snippet.tag_list!}
						language={snippet.content?.language!}
					/>
				))}
			</div>
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('snippets/');
	const stripped = (render(page.body, stripResolver) as Array<string>).flat().join('');
	return {
		title: `${page.heading}`,
		description: stripped,
	};
}

async function getData() {
	const page = await getPageBySlug('snippets/');
	const snippets = await getSnippets();
	return {
		page,
		snippets,
	};
}
