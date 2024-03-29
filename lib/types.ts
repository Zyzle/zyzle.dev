export interface PageItem {
	heading: string;
	body: {};
	blocks: {};
}

export interface Snippet {
	id: number;
	full_slug: string;
	tag_list: string[];
	first_published_at: string;
	slug: string;
	name: string;
	content: {
		heading: string;
		body: {};
		language: string;
		mainImage: {
			filename: string;
		};
	};
}

export interface Project {
	id: number;
	full_slug: string;
	slug: string;
	tag_list: string[];
	content: {
		heading: string;
		body: {};
		excerpt: {};
		mainImage: {
			filename: string;
			alt: string;
		};
	};
}

export interface PostDetails {
	id: number;
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
		heading: string;
	};
}

export interface Post {
	id: number;
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
		heading: string;
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

export interface ContentNode {
	id: number;
	first_published_at: string;
	full_slug: string;
	tag_list: string[];
	content: {
		heading: string;
		body: {};
		excerpt?: {};
	};
}

export interface SitemapNode {
	full_slug: string;
	published_at: string;
	tag_list: string[];
}
