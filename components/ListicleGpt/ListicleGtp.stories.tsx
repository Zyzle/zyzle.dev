import type { Meta, StoryObj } from '@storybook/react';

import ListicleGtp from './ListicleGtp';

const meta: Meta<typeof ListicleGtp> = {
	title: 'Components/ListicleGtp',
	component: ListicleGtp,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
