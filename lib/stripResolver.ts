import {
	MARK_BOLD,
	MARK_CODE,
	MARK_ITALIC,
	MARK_LINK,
	MARK_STRIKE,
	MARK_STYLED,
	MARK_UNDERLINE,
	NODE_BR,
	NODE_CODEBLOCK,
	NODE_HEADING,
	NODE_HR,
	NODE_IMAGE,
	NODE_LI,
	NODE_OL,
	NODE_PARAGRAPH,
	NODE_QUOTE,
	NODE_UL,
} from 'storyblok-rich-text-react-renderer';

/**
 * This resolver is used to strip all formatting from the text.
 */
export const stripResolver = {
	markResolvers: {
		[MARK_BOLD]: (children: any) => children,
		[MARK_ITALIC]: (children: any) => children,
		[MARK_STRIKE]: (children: any) => children,
		[MARK_UNDERLINE]: (children: any) => children,
		[MARK_CODE]: (children: any) => children,
		[MARK_STYLED]: (children: any, props: any) => children,
		[MARK_LINK]: (children: any, props: any) => children,
	},
	nodeResolvers: {
		[NODE_PARAGRAPH]: (children: any) => children,
		[NODE_HEADING]: (children: any) => children,
		[NODE_QUOTE]: (children: any) => children,
		[NODE_LI]: (children: any) => children,
		[NODE_OL]: (children: any) => children,
		[NODE_UL]: (children: any) => children,
		[NODE_CODEBLOCK]: (...props: any[]) => null,
		[NODE_BR]: () => null,
		[NODE_HR]: () => null,
		[NODE_IMAGE]: (...props: any[]) => null,
	},
};
