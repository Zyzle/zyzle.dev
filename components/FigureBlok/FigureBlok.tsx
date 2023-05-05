import { ReactNode } from 'react';
import Image from 'next/image';

import { FigureBlokType } from '@zyzle-dev/lib/types';

export function FigureBlok(props: FigureBlokType) {
	return (
		<figure className="rounded-2xl overflow-hidden bg-zblock flex flex-col border border-dashed">
			<Image
				src={`${props.image.filename}/m/500x0`}
				alt={props.alt ? props.alt : props.image.alt || ''}
				title={props.image.title}
				height={500}
				width={500}
				style={{
					width: '100%',
					height: 'auto',
				}}
			/>
			<figcaption className="px-4 py-1 mt-0">{props.caption}</figcaption>
		</figure>
	);
}
