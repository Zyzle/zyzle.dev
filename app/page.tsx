import HomeLink from '@zyzle-dev/components/HomeLink';
import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getHomepage } from '@zyzle-dev/lib/api';
import { HomeLinkType } from '@zyzle-dev/lib/types';

export default async function Home() {
	const homepage = await getData();
	const linkBlocks = homepage.blocks as unknown as HomeLinkType[];

	return (
		<>
			<section className="prose prose-invert prose-zyzle mx-auto mt-4 mb-6">
				<RichTextBlok blok={homepage.body} />
			</section>
			<nav className="flex flex-1 flex-col mb-6">
				{linkBlocks.map((linkBlock, index) => (
					<HomeLink key={index} homeLink={linkBlock} />
				))}
			</nav>
		</>
	);
}

async function getData() {
	const res = await getHomepage();
	return res;
}
