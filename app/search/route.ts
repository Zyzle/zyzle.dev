import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';

import { searchIndex } from '@zyzle-dev/lib/searchIndex';

export async function GET(request: Request) {
	const options = {
		includeScore: true,
		keys: ['heading', 'body'],
	};

	const fuse = new Fuse(await searchIndex(), options);

	const { searchParams } = new URL(request.url);
	const query = searchParams.get('q') || '';

	const result = fuse.search(query);

	return NextResponse.json(result);
}
