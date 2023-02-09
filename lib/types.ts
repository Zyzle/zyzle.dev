export interface PageItem {
	heading: string;
}

export interface PostDetails {
	id: string;
	full_slug: string;
	slug: string;
	name: string;
	first_published_at: string;
	content: {
		author: string;
		excerpt: string;
		mainImage: {
			alt: string;
			name: string;
			title: string;
			filename: string;
		};
		tags: string;
		title: string;
	};
}

export interface Post {
	fist_published_at: string;
	content: {
		author: string;
		body: {};
		ghDisc: string;
		excerpt: string;
		mainImage: {
			alt: string;
			copyright: string;
			filename: string;
			name: string;
			title: string;
		};
		tags: string;
		title: string;
	};
}
