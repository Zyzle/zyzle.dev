export interface PageItem {
	heading: string;
	body: {};
	blocks: {};
}

export interface PostDetails {
	id: string;
	full_slug: string;
	slug: string;
	name: string;
	first_published_at: string;
	tag_list: string[];
	content: {
		author: string;
		excerpt: {};
		mainImage: {
			alt: string;
			name: string;
			title: string;
			filename: string;
		};
		title: string;
	};
}

export interface Post {
	first_published_at: string;
	tag_list: string[];
	content: {
		author: string;
		body: {};
		ghDisc: string;
		excerpt: {};
		mainImage: {
			alt: string;
			copyright: string;
			filename: string;
			name: string;
			title: string;
		};
		title: string;
	};
}

export interface FigureBlokType {
	alt: string;
	image: {
		id?: number;
		alt?: string;
		name?: string;
		focus?: string;
		title?: string;
		filename: string;
		copyright?: string;
		fieldtype?: string;
		is_external_url?: boolean;
	};
	credit: string;
	caption: string;
}

export interface HomeLinkType {
	name: string;
	image: string;
	extra_text: string;
	link: {
		cached_url: string;
	};
}
