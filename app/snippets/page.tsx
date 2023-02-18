import Link from 'next/link';

import { getSnippets } from '@zyzle-dev/lib/api';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';
import SnippetLink from '@zyzle-dev/components/SnippetLink';

export default async function Snippets() {
	const snippets = await getData();

	return (
		<>
			<nav className="text-zpurple my-4">
				<Link href="/">« back to home</Link>
			</nav>
			<h1 className="text-zgold text-4xl font-bold my-4">Snippets</h1>
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

async function getData() {
	const res = await getSnippets();
	return res;
}
