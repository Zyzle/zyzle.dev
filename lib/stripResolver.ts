import {
	MARK_BOLD,
	MARK_CODE,
	MARK_ITALIC,
	MARK_LINK,
	MARK_STRIKE,
	MARK_STYLED,
	MARK_UNDERLINE,
	NODE_PARAGRAPH,
} from 'storyblok-rich-text-react-renderer';

/**
 * This resolver is used to strip all formatting from the text.
 */
const stripResolver = {
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
	},
};

export default stripResolver;
