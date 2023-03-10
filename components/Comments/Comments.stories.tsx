import type { Meta, StoryObj } from '@storybook/react';

import Comments from './Comments';

const meta: Meta<typeof Comments> = {
	title: 'Components/Comments',
	component: Comments,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		discussionId: '24',
	},
};
