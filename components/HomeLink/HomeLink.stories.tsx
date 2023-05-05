import type { Meta, StoryObj } from '@storybook/react';

import { HomeLink } from './HomeLink';

const meta: Meta<typeof HomeLink> = {
	title: 'Components/HomeLink',
	component: HomeLink,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div className="not-prose">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		homeLink: {
			name: 'Blog',
			image: 'blog',
			link: {
				cached_url: '/blog',
			},
			extra_text: 'My thoughts on the web',
		},
	},
};
