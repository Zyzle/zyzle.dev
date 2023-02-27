import { Metadata } from 'next';
import Link from 'next/link';

import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getProjectBySlug, getProjects } from '@zyzle-dev/lib/api';
// import ImageKmeans from '@zyzle-dev/components/ImageKmeans';

const arbitratyBlokResolvers = {
	// ['arbitrary_blok']: (blok: any) => <ImageKmeans />,
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
