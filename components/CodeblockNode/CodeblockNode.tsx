import { ReactNode } from 'react';

import classNames from '@zyzle-dev/lib/classNames';

export interface CodeblockNodeProps {
	/**
	 * The children of the codeblock, usually its internal text
	 */
	children: ReactNode;
	class: string;
}

export default function CodeblockNode({ children, ...props }: CodeblockNodeProps) {
	return (
		<pre className="rounded-2xl overflow-auto border border-dashed">
			<code className={classNames(`${props.class}`)}>{children}</code>
		</pre>
	);
}
