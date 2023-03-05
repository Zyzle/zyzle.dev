import { Metadata } from 'next';
import { render } from 'storyblok-rich-text-react-renderer';

import HomeLink from '@zyzle-dev/components/HomeLink';
import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import TagCloud from '@zyzle-dev/components/TagCloud';
import { getAllContentNodes, getPageBySlug } from '@zyzle-dev/lib/api';
import stripResolver from '@zyzle-dev/lib/stripResolver';
import { HomeLinkType } from '@zyzle-dev/lib/types';

export default async function Home() {
	const { page, tags } = await getData();
	const linkBlocks = page.blocks as unknown as HomeLinkType[];

	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">{page.heading}</h1>
			<section className="prose prose-invert prose-zyzle mx-auto mt-4 mb-6">
				<RichTextBlok blok={page.body} />
			</section>
			<nav className="flex flex-1 flex-col lg:flex-row gap-6 mb-6">
				<section className="flex-2">
					{linkBlocks.map((linkBlock, index) => (
						<HomeLink key={index} homeLink={linkBlock} />
					))}
				</section>
				<section className="flex-1">
					<h2 className="text-zgold text-xl font-bold">Site tags:</h2>
					<TagCloud tags={tags} />
				</section>
			</nav>
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('home/');
	const stripped = (render(page.body, stripResolver) as Array<string>).flat().join('');
	return {
		title: `${page.heading} | Zyzle.dev`,
		description: stripped,
		authors: [{ name: 'Colin McCulloch', url: 'https://zyzle.dev' }],
	};
}

async function getData() {
	const page = await getPageBySlug('home/');
	let allTags: { [key: string]: string } = {};
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
