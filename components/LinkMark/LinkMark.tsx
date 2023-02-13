import Link from 'next/link';
import { ReactNode } from 'react';

export interface LinkMarkProps {
	/**
	 * The children of the link, usually its internal text
	 */
	children: ReactNode;
	linktype?: string;
	/**
	 * The href of the link can be inrer or external
	 */
	href?: string;
	/**
	 * The target of the link, if external
	 */
	target?: string;
	uuid?: string;
	anchor?: string;
}

export default function LinkMark({ children, ...props }: LinkMarkProps) {
	const { href = '', target, linktype } = props;
	if (linktype === 'email') {
		return <a href={`mailto:${href}`}>{children}</a>;
	}
	if (href.match(/^(https?:)?\/\//)) {
		return (
			<a href={href} target={target}>
				{children}
			</a>
		);
	}
	return <Link href={href}>{children}</Link>;
}
