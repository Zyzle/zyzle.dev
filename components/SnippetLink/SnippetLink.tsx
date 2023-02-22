import Link from 'next/link';

import Icon from '@zyzle-dev/components/Icon';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';

export type SnippetLinkProps = {
	fullSlug: string;
	heading: string;
	firstPublishedAt: string;
	tagList: string[];
	language: string;
};

export default function SnippetLink({ fullSlug, language, heading, firstPublishedAt, tagList }: SnippetLinkProps) {
	return (
		<Link href={`/${fullSlug}`} className="rounded-lg border-dashed border border-zdefault flex flex-row gap-6 group p-3">
			<Icon type={language} alt={`${language} icon`} />
			<div>
				<h2 className="text-zgold text-xl font-bold group-hover:underline">{heading}</h2>
				<span className=" text-zcyan flex-1">{formatRelativeDateString(firstPublishedAt)}</span>
				<span className="text-zlime flex-1 flex flex-wrap">
					{tagList?.map(tag => (
						<Link key={tag} href={`/tags/${tag}`}>
							<span className=" bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
						</Link>
					))}
				</span>
			</div>
		</Link>
	);
}
