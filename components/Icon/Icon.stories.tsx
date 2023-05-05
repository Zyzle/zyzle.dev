import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: {
				type: 'code',
			},
		},
	},
	argTypes: {
		type: {
			control: {
				type: 'select',
			},
			options: ['about', 'blog', 'by', 'cc', 'characters', 'money', 'projects', 'sa', 'search', 'snippets', 'tag'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SVGIcon: Story = {
	args: {
		type: 'blog',
		alt: 'Blog Icon',
	},
};
