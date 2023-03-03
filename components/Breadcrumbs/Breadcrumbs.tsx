'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
	const pathname = usePathname();
	const paths = pathname?.split('/').filter(path => path !== '') || [];

	return (
		<nav className="text-zpurple my-4" aria-label="breadcrumbs">
			{!!paths.length && (
				<>
					<span className="mr-2 hover:underline">
						<Link href="/">home</Link>
					</span>
					<span>»</span>
				</>
			)}
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
