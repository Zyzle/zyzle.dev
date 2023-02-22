import HomeLink from '@zyzle-dev/components/HomeLink';
import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import TagCloud from '@zyzle-dev/components/TagCloud';
import { getAllContentNodes, getHomepage } from '@zyzle-dev/lib/api';
import { HomeLinkType } from '@zyzle-dev/lib/types';

export const metadata = {
	description: `Personal site for Colin "Zyzle" McCulloch, a place to blog and gather random things I've worked on`,
	twitter: {
		card: 'summary',
		description: `Personal site for Colin "Zyzle" McCulloch, a place to blog and gather random things I've worked on`,
		creator: '@ZyzleDotDev',
		type: 'website',
	},
};

export default async function Home() {
	const homepage = await getData();
	const tags = await getTags();
	const linkBlocks = homepage.blocks as unknown as HomeLinkType[];

	return (
		<>
			<section className="prose prose-invert prose-zyzle mx-auto mt-4 mb-6">
				<RichTextBlok blok={homepage.body} />
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

async function getData() {
	const res = await getHomepage();
	return res;
}

async function getTags() {
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

	const cloudTags = Object.keys(allTags).map(tag => ({
		value: tag,
		count: allTags[tag],
	}));

	return cloudTags;
}
