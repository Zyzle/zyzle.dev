import type { Meta, StoryObj } from '@storybook/react';

import ImageKmeans from './ImageKmeans';

const meta: Meta<typeof ImageKmeans> = {
	title: 'Components/ImageKmeans',
	component: ImageKmeans,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
