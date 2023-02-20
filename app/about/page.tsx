import Link from 'next/link';

import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getPageBySlug } from '@zyzle-dev/lib/api';

export const metadata = {
	title: 'About',
};

export default async function About() {
	const aboutPage = await getData();

	return (
		<>
			<nav className="text-zpurple my-4">
				<Link href="/">« back to home</Link>
			</nav>
			<article className="prose prose-invert prose-zyzle mx-auto mb-6">
				<h1 className="text-zgold">{aboutPage.heading}</h1>
				<RichTextBlok blok={aboutPage.body} />
			</article>
		</>
	);
}

async function getData() {
	const res = await getPageBySlug('about/');
	return res;
}
