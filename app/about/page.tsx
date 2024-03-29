import { Metadata } from 'next';
import { render } from 'storyblok-rich-text-react-renderer';

import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getPageBySlug } from '@zyzle-dev/lib/api';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';
import metadataGenerator from '@zyzle-dev/lib/metadataGenerator';

export default async function About() {
	const aboutPage = await getData();

	return (
		<article className="prose prose-invert prose-zyzle mx-auto mb-6">
			<h1 className="text-zgold">{aboutPage.heading}</h1>
			<RichTextBlok blok={aboutPage.body} />
		</article>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('about/');
	const stripped = (render(page.body, stripResolver) as Array<[]>)[0].join('');
	const title = `${page.heading}`;
	const url = 'https://zyzle.dev/about';

	return metadataGenerator(title, stripped, 'profile', url);
}

async function getData() {
	const res = await getPageBySlug('about/');
	return res;
}
