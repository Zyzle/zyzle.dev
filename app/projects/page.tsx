import { Metadata } from 'next';
import Link from 'next/link';
import { render } from 'storyblok-rich-text-react-renderer';

import { RichTextBlok } from '@zyzle-dev/components/RichTextBlok';
import { getPageBySlug, getProjects } from '@zyzle-dev/lib/api';
import { stripResolver } from '@zyzle-dev/lib/stripResolver';
import metadataGenerator from '@zyzle-dev/lib/metadataGenerator';

export default async function Projects() {
	const { page, projects } = await getData();

	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">{page.heading}</h1>
			<div className="prose prose-invert prose-zyzle mx-auto mb-6">
				<RichTextBlok blok={page.body} />
			</div>
			{projects.map((project, i) => (
				<article key={i} className="flex flex-col mb-8">
					<Link href={`/${project.full_slug}`}>
						<h2 className="text-zlime text-2xl font-semibold hover:underline">{project.content?.heading}</h2>
					</Link>
					<div className="flex flex-row mb-3">
						<span className="text-zgold flex-1 flex flex-wrap justify-end">
							{project.tag_list?.map(tag => (
								<Link key={tag} href={`/tags/${tag}`}>
									<span className=" bg-zblock rounded-full px-2 mb-1 whitespace-nowrap hover:underline">#{tag}</span>
								</Link>
							))}
						</span>
					</div>
					<section className="prose prose-invert prose-zyzle mx-auto">
						<RichTextBlok blok={project.content?.excerpt} />
						<Link href={`/${project.full_slug}`}>Find out more...</Link>
					</section>
				</article>
			))}
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPageBySlug('projects/');
	const stripped = (render(page.body, stripResolver) as Array<[]>)[0].join('');
	const title = `${page.heading}`;
	const url = 'https://zyzle.dev/projects';
	return metadataGenerator(title, stripped, 'website', url);
}

async function getData() {
	const page = await getPageBySlug('projects/');
	const projects = await getProjects();
	return {
		page,
		projects,
	};
}
