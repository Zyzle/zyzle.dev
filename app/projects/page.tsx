import Link from 'next/link';

import { getProjects } from '@zyzle-dev/lib/api';
import RichTextBlok from '@zyzle-dev/components/RichTextBlok';

export default async function Projects() {
	const projects = await getData();

	return (
		<>
			<h1 className="text-zgold text-4xl font-bold my-4">Projects</h1>
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

async function getData() {
	const res = await getProjects();
	return res;
}
