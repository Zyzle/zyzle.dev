import Link from 'next/link';

import { Icon } from '@zyzle-dev/components/Icon';

export function Footer() {
	return (
		<footer className="w-full border-t border-zcaret">
			<div className="flex flex-row justify-between mt-5 prose prose-invert prose-zyzle mx-auto px-4">
				<nav className="not-prose">
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/blog">Blog</Link>
						</li>
						<li>
							<Link href="/projects">Projects</Link>
						</li>
						<li>
							<Link href="/snippets">Snippets</Link>
						</li>
						<li>
							<Link href="/about">About</Link>
						</li>
					</ul>
				</nav>
				<div className=" max-w-[200px] text-right">
					<div className="flex flex-row justify-end gap-2 not-prose">
						<Icon type="cc" alt="creative commons" width={30} height={30} />
						<Icon type="by" alt="attribution" width={30} height={30} />
						<Icon type="sa" alt="share alike" width={30} height={30} />
					</div>
					<p>
						Licensed under{' '}
						<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">
							Creative Commons Attribution-ShareAlike 4.0
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
