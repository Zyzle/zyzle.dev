import { Metadata } from 'next';
import { render } from 'storyblok-rich-text-react-renderer';

import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { TagCloud } from '@zyzle-dev/components/TagCloud';
import { getAllContentNodes, getPageBySlug } from '@zyzle-dev/lib/api';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';

export default async function TagList() {
	const { tags, page } = await getData();

	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">{page.heading}</h1>
			<div className="prose prose-invert prose-zyzle mx-auto mb-6">
				<RichTextBlok blok={page.body} />
			</div>
			<TagCloud tags={tags} />
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('tags/');
	const stripped = (render(page.body, stripResolver) as Array<string>).flat().join('');
	return {
		title: `${page.heading}`,
		description: stripped,
	};
}

async function getData() {
	const page = await getPageBySlug('tags/');
	let allTags: { [key: string]: number } = {};
	const res = await getAllContentNodes();

	res.forEach(node => {
		allTags = node.tag_list.reduce((acc, tag) => {
			const currCount = acc[tag] ?? 0;
			return {
				...acc,
				[tag]: currCount + 1,
			};
		}, allTags);
	});

	const tags = Object.keys(allTags).map(tag => ({
		value: tag,
		count: allTags[tag],
	}));

	return { page, tags };
}
