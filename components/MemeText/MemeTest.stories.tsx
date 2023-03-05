import type { Meta, StoryObj } from '@storybook/react';

import MemeText from './MemeText';

const meta: Meta<typeof MemeText> = {
	title: 'Components/MemeText',
	component: MemeText,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		textToMeme: 'Hello World',
	},
};
