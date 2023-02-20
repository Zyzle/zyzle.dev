import React from 'react';

export const metadata = {
	title: {
		default: 'Blog',
		template: '%s | Blog | Zyzle.dev',
	},
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
