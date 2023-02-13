import RichTextBlok from '@zyzle-dev/components/RichTextBlok';
import { getHomepage } from '@zyzle-dev/lib/api';
import Link from 'next/link';

export default async function Home() {
	const homepage = await getData();

	return (
		<>
			<section className="prose prose-invert prose-zyzle mx-auto">
				<RichTextBlok blok={homepage.body} />
			</section>
		</>
	);
}

async function getData() {
	const res = await getHomepage();
	return res;
}
