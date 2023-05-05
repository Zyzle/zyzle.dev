import type { Meta, StoryObj } from '@storybook/react';

import { ListicleGpt } from './ListicleGpt';

const meta: Meta<typeof ListicleGpt> = {
	title: 'Components/ListicleGtp',
	component: ListicleGpt,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
