import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const hasTitle = searchParams.has('title');
		const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Zyzle.dev';

		const hasImg = searchParams.has('img');
		const img = hasImg ? searchParams.get('img')! : 'https://a.storyblok.com/f/194345/512x512/003920f071/z.png/m/200x200';

		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						width: '100%',
						height: '100%',
						flexDirection: 'column',
						backgroundColor: '#fff',
					}}>
					<div
						style={{
							display: 'flex',
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}>
						<div
							style={{
								display: 'flex',
								flex: 1,
								margin: 20,
								borderRadius: '5%',
								overflow: 'hidden',
							}}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img alt={title} src={img} />
						</div>
						<div style={{ flex: 2, fontSize: 70, letterSpacing: -1, fontWeight: 800 }}>{title}</div>
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							height: 12,
							marginTop: 20,
						}}>
						<div style={{ flex: 1, backgroundColor: '#c678dd' }} />
						<div style={{ flex: 1, backgroundColor: '#e06c75' }} />
						<div style={{ flex: 1, backgroundColor: '#d19a66' }} />
						<div style={{ flex: 1, backgroundColor: '#e5c07b' }} />
						<div style={{ flex: 1, backgroundColor: '#98c379' }} />
						<div style={{ flex: 1, backgroundColor: '#56b6c2' }} />
						<div style={{ flex: 1, backgroundColor: '#61afef' }} />
						<div style={{ flex: 1, backgroundColor: '#528bff' }} />
					</div>
				</div>
			),
			{
				width: 1066,
				height: 600,
			}
		);
	} catch (e: any) {
		console.log(`${e.message}`);
		return new Response(`Failed to generate the image`, {
			status: 500,
		});
	}
}
