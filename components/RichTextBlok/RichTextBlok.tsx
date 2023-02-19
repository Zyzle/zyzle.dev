import { MARK_LINK, NODE_CODEBLOCK, render } from 'storyblok-rich-text-react-renderer';

import LinkMark from '@zyzle-dev/components/LinkMark';
import CodeblockNode from '@zyzle-dev/components/CodeblockNode';
import FigureBlok from '@zyzle-dev/components/FigureBlok';
import FormulaBlok from '@zyzle-dev/components/FormulaBlok';
import { FigureBlokType } from '@zyzle-dev/lib/types';

export default function RichTextBlok({ blok }: { blok: unknown }) {
	return (
		<>
			{render(blok, {
				markResolvers: {
					[MARK_LINK]: (children, props) => <LinkMark {...props}>{children}</LinkMark>,
				},
				nodeResolvers: {
					[NODE_CODEBLOCK]: (children, props) => <CodeblockNode {...props}>{children}</CodeblockNode>,
				},
				blokResolvers: {
					['figure']: props => <FigureBlok {...(props as unknown as FigureBlokType)}></FigureBlok>,
					['formula']: props => <FormulaBlok formula={props.formula as string} />,
				},
			})}
		</>
	);
}
