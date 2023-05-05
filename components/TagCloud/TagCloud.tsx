import Link from 'next/link';

function weightedRandomBetween(min: number, max: number, fontMin: number, fontMax: number, count: number) {
	return Math.round(((count - min) * (fontMax - fontMin)) / (max - min) + fontMin);
}

const COLORS = ['#98c379', '#c678dd', '#e06c75', '#d19a66', '#e5c07b', '#528bff', '#61afef', '#56b6c2'];

export function TagCloud({ tags }: { tags: { value: string; count: number }[] }) {
	const max = Math.max(...tags.map(tag => tag.count));
	const min = Math.min(...tags.map(tag => tag.count));

	return (
		<div className="not-prose flex flex-wrap">
			{tags.map(tag => {
				return (
					<Link
						href={`/tags/${tag.value}`}
						key={tag.value}
						className="hover:underline"
						style={{
							margin: '0px 3px',
							alignSelf: ['start', 'center', 'end'][Math.floor(Math.random() * 3)],
							display: 'inline-block',
							color: `${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
							fontSize: `${weightedRandomBetween(min, max, 16, 40, tag.count)}px`,
						}}>
						{tag.value}
					</Link>
				);
			})}
		</div>
	);
}
