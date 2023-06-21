import { Metadata } from 'next';
import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';

export default function metadataGenerator(
	title: string,
	description: string,
	type: OpenGraphType,
	url: string,
	img?: string
): Metadata {
	return {
		title,
		description,
		authors: [{ name: 'Colin McCulloch', url: 'https://zyzle.dev' }],
		openGraph: {
			title,
			description,
			type,
			url,
			images: [`/og?title=${encodeURIComponent(`${title} | Zyzle.dev`)}${img ? `&img=${encodeURIComponent(img)}` : ''}`],
		},
		twitter: {
			title,
			description,
			creator: '@ZyzleDotDev',
			card: 'summary_large_image',
			images: [`/og?title=${encodeURIComponent(`${title} | Zyzle.dev`)}${img ? `&img=${encodeURIComponent(img)}` : ''}`],
		},
	};
}
