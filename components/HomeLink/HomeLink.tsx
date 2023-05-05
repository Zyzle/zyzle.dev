import Link from 'next/link';

import { Icon } from '@zyzle-dev/components/Icon';
import { HomeLinkType } from '@zyzle-dev/lib/types';

export type HomeLinkProps = {
	homeLink: HomeLinkType;
};

export function HomeLink({ homeLink }: HomeLinkProps) {
	return (
		<Link href={`/${homeLink.link.cached_url}`} className="flex flex-row items-center gap-4 mb-4 group">
			<Icon type={homeLink.image} alt={`${homeLink.image} icon`} />
			<div>
				<h2 className="text-zlime text-xl font-bold group-hover:underline">{homeLink.name}</h2>
				<span className="text-zdefault">{homeLink.extra_text}</span>
			</div>
		</Link>
	);
}
