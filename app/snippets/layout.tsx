import React from 'react';

export const metadata = {
	title: {
		default: 'Snippets',
		template: '%s | Snippets | Zyzle.dev',
	},
};

export default function SnippetLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
