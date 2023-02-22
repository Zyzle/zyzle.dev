'use client';
import Link from 'next/link';

import { TagCloud as TC } from 'react-tagcloud';

const COLORS = ['#98c379', '#c678dd', '#e06c75', '#d19a66', '#e5c07b', '#528bff', '#61afef', '#56b6c2'];

export default function TagCloud({ tags }: { tags: { value: string; count: string }[] }) {
	return (
		<div className="not-prose">
			<TC
				tags={tags}
				maxSize={40}
				minSize={16}
				colorOptions={{
					hue: '#c678dd',
					luminosity: 'light',
				}}
				renderer={(tag: any, size: string, color: string) => {
					return (
						<Link
							href={`/tags/${tag.value}`}
							key={tag.value}
							className="hover:underline"
							style={{
								margin: ' 0px 3px',
								verticalAlign: 'middle',
								display: 'inline-block',
								color: `${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
								fontSize: `${size}px`,
							}}>
							{tag.value}
						</Link>
					);
				}}
			/>
		</div>
	);
}
