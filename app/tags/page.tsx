import Link from 'next/link';

import { getAllContentNodes } from '@zyzle-dev/lib/api';
import TagCloud from '@zyzle-dev/components/TagCloud';

export default async function TagList() {
	const tags = await getData();

	return (
		<>
			<nav className="text-zpurple my-4">
				<Link href="/">« back to home</Link>
			</nav>
			<h1 className="text-zgold text-4xl font-bold my-4">Tags</h1>
			<TagCloud tags={tags} />
		</>
	);
}

async function getData() {
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
