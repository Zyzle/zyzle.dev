'use client';
import { ReactNode } from 'react';
import { Highlight, Language, Prism } from 'prism-react-renderer';
// TODO: this works but feels wrong, should I try building a custom prism-react-renderer with just the langs I'll be using?
// @ts-ignore-next-line
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-ini');
require('prismjs/components/prism-java');
require('prismjs/components/prism-rust');

import classNames from '@zyzle-dev/lib/classNames';

import { theme } from './theme';

export type CodeblockNodeProps = {
	/**
	 * The children of the codeblock, usually its internal text
	 */
	children: ReactNode | string[];
	class: string;
};

export function CodeblockNode({ children, ...props }: CodeblockNodeProps) {
	let code = Array.isArray(children) ? (children! as string[]).join('') : children;
	let language = 'plain';

	if (props.class) {
		language = props.class.split('-')[1];
	}

	return (
		<Highlight prism={Prism} code={code as string} language={language as Language} theme={theme}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={classNames(
						className,
						'rounded-2xl overflow-auto border border-dashed border-zdefault',
						language === 'plaintext' ? '' : 'px-0 py-4'
					)}
					style={style}
					data-line-numbers
					data-lang={language}>
					{tokens.map((line, i) => {
						return (
							<div key={i} {...getLineProps({ line })} data-line-number={i + 1}>
								{line.map((token, j) => {
									return <span key={j} {...getTokenProps({ token })} />;
								})}
							</div>
						);
					})}
				</pre>
			)}
		</Highlight>
	);
}
