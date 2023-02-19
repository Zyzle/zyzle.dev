'use client';
import { ReactNode } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import classNames from '@zyzle-dev/lib/classNames';

import { theme } from './theme';

export interface CodeblockNodeProps {
	/**
	 * The children of the codeblock, usually its internal text
	 */
	children: ReactNode;
	class: string;
}

export default function CodeblockNode({ children, ...props }: CodeblockNodeProps) {
	let code = (children! as Array<string>).join('');
	let language = 'plain';

	if (props.class) {
		language = props.class.split('-')[1];
	}

	return (
		<Highlight {...defaultProps} code={code} language={language as Language} theme={theme}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={classNames(className, 'rounded-2xl overflow-auto border border-dashed border-zdefault')}
					style={style}>
					{tokens.map((line, i) => (
						// eslint-disable-next-line react/jsx-key
						<div {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								// eslint-disable-next-line react/jsx-key
								<span {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
		// <pre className="rounded-2xl overflow-auto border border-dashed">
		// 	<code className={classNames(`${props.class}`)}>{children}</code>
		// </pre>
	);
}
