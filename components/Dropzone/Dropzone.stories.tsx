import type { Meta, StoryObj } from '@storybook/react';

import Dropzone from './Dropzone';

const meta: Meta<typeof Dropzone> = {
	title: 'Components/Dropzone',
	component: Dropzone,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		droppedFile: () => {},
	},
};
