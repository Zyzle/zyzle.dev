import { render } from 'storyblok-rich-text-react-renderer';

import { getAllContentNodes } from './api';
import { stripResolver } from './stripResolver';

export async function searchIndex() {
	const nodes = await getAllContentNodes();

	return nodes.map(node => ({
		heading: node.content.heading,
		body: (render(node.content.body, stripResolver) as Array<string>).flat().join(' '),
	}));
}
