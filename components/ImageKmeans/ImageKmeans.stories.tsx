import type { Meta, StoryObj } from '@storybook/react';

import { ImageKmeansComponent } from './ImageKmeans';

const meta: Meta<typeof ImageKmeansComponent> = {
	title: 'Components/ImageKmeans',
	component: ImageKmeansComponent,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
