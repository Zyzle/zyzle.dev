'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icon } from '@zyzle-dev/components/Icon';
import { formatRelativeDateString } from '@zyzle-dev/lib/formatRelativeDate';

export type SnippetLinkProps = {
	fullSlug: string;
	heading: string;
	firstPublishedAt: string;
	tagList: string[];
	language: string;
};

export function SnippetLink({ fullSlug, language, heading, firstPublishedAt, tagList }: SnippetLinkProps) {
	const router = useRouter();

	const handleTagClick = (tag: string) => {
		router.push(`/tags/${tag}`);
	};

	return (
		<Link href={`/${fullSlug}`} className="rounded-lg border-dashed border border-zdefault flex flex-row gap-6 group p-3">
			<Icon type={language} alt={`${language} icon`} />
			<div>
				<h2 className="text-zgold text-xl font-bold group-hover:underline">{heading}</h2>
				<span className=" text-zcyan flex-1">{formatRelativeDateString(firstPublishedAt)}</span>
				<span className="text-zlime flex-1 flex flex-wrap">
					{tagList?.map(tag => (
						<span
							key={tag}
							onClick={e => {
								e.preventDefault();
								handleTagClick(tag);
							}}
							className=" bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">
							#{tag}
						</span>
					))}
				</span>
			</div>
		</Link>
	);
}
