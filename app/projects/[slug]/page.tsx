import { Metadata } from 'next';
import Link from 'next/link';
import { render } from 'storyblok-rich-text-react-renderer';

import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getProjectBySlug, getProjects } from '@zyzle-dev/lib/api';
import stripResolver from '@zyzle-dev/lib/stripResolver';
import MemeText from '@zyzle-dev/components/MemeText';
import ListicleGpt from '@zyzle-dev/components/ListicleGpt';
import ImageKmeans from '@zyzle-dev/components/ImageKmeans';

const arbitratyBlokResolvers = {
	['arbitrary_blok']: (props: unknown) => {
		const { blok_component } = props as { blok_component: string };
		switch (blok_component) {
			case 'meme-text':
				return <MemeText />;
			case 'listicle-gpt':
				return <ListicleGpt />;
			case 'image-kmeans':
				return <ImageKmeans />;
			default:
				return null;
		}
	},
};

export default async function ProjectSlugPage({ params }: { params: { slug: string } }) {
	const project = await getData(params.slug);

	return (
		<>
			<article className="prose prose-invert prose-zyzle mx-auto mb-6">
				<h1 className="text-zlime">{project.content.heading}</h1>
				<div className="text-zgold flex flex-wrap">
					{project.tag_list.map(tag => (
						<span className="not-prose" key={tag}>
							<Link href={`/tags/${tag}`}>
								<span className="  bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
							</Link>
						</span>
					))}
				</div>
				<RichTextBlok blok={project.content.body} blokResolvers={arbitratyBlokResolvers} />
			</article>
		</>
	);
}

async function getData(slug: string) {
	const res = await getProjectBySlug(slug);
	return res;
}

export async function generateStaticParams() {
	const projects = await getProjects();
	const params = projects.map(project => ({
		slug: project.slug,
	}));

	return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const res = await getProjectBySlug(params.slug);
	const stripped = (render(res.content.body, stripResolver) as Array<[]>)[0].join('').slice(0, 150) + '...';

	return {
		title: `${res.content.heading}`,
		description: stripped,
	};
}
