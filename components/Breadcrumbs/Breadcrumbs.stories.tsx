import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Components/Breadcrumbs',
	component: Breadcrumbs,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div className="not-prose">
				<Story />
			</div>
		),
	],
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	parameters: {
		nextjs: {
			navigation: {
				pathname: '/components/breadcrumbs',
			},
		},
	},
};
