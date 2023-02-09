import { getHomepage } from '@zyzle-dev/lib/api';
import Link from 'next/link';

export default async function Home() {
	const homepage = await getData();

	return (
		<main>
			<h1>{homepage.heading}</h1>
			<nav>
				<Link href="/blog">Blog</Link>
				<Link href="/projects">Projects</Link>
				<Link href="/snippets">Snippets</Link>
				<Link href="/about">About</Link>
			</nav>
		</main>
	);
}

async function getData() {
	const res = await getHomepage();
	return res;
}
