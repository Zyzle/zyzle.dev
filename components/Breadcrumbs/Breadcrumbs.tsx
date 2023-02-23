'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumbs() {
	const pathname = usePathname();
	const paths = pathname?.split('/').filter(path => path !== '') || [];

	return (
		<nav className="text-zpurple my-4" aria-label="breadcrumbs">
			<span className="mr-2 hover:underline">
				<Link href="/">home</Link>
			</span>
			{!!paths.length && <span>»</span>}
			{paths.map((path, index) => {
				const href = `/${paths.slice(0, index + 1).join('/')}`;
				const isLast = index === paths.length - 1;

				return isLast ? (
					<span key={path} className="mx-2">
						{path}
					</span>
				) : (
					<span key={path}>
						<span className="mx-2 hover:underline">
							<Link href={href}>{path}</Link>
						</span>
						<span>»</span>
					</span>
				);
			})}
		</nav>
	);
}
