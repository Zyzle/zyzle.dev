import type { Meta, StoryObj } from '@storybook/react';

import FigureBlok from './FigureBlok';

const meta: Meta<typeof FigureBlok> = {
	title: 'Blok Resolvers/FigureBlok',
	component: FigureBlok,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		alt: 'A picture of a red panda',
		caption: 'This is a picture of a red panda',
		image: {
			alt: 'A picture of a red panda',
			filename: 'https://a.storyblok.com/f/194345/2703x1800/c227fb9192/redpanda.jpeg',
			title: 'Red Panda',
			copyright: 'Zyzle',
		},
		credit: 'Zyzle',
	},
};
