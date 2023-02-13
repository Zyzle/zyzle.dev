import type { Meta, StoryObj } from '@storybook/react';

import CodeblockNode from './CodeblockNode';

const meta: Meta<typeof CodeblockNode> = {
	title: 'Blok Resolvers/CodeblockNode',
	component: CodeblockNode,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children:
			"(() => {\n    const bar = document.querySelector('#progress-bar');\n    const post = document.querySelector('#docmain');\n    const html = document.documentElement;\n    const height = post.scrollHeight;\n\n    window.addEventListener('scroll', () => {\n        bar.style.width = \n            (html.scrollTop / (height - html.clientHeight))\n            * 100 + '%';\n    });\n})();",
		class: 'language-javascript',
	},
};
