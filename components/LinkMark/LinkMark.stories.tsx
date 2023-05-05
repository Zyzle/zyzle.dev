import type { Meta, StoryObj } from '@storybook/react';

import { LinkMark } from './LinkMark';

const meta: Meta<typeof LinkMark> = {
	title: 'Blok Resolvers/LinkMark',
	component: LinkMark,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExrernalLink: Story = {
	args: {
		children: 'External Link',
		linktype: 'external',
		href: 'https://www.google.com',
		target: '_blank',
	},
};

export const InternalLink: Story = {
	args: {
		children: 'Internal Link',
		linktype: 'internal',
		href: '/about',
	},
};

export const MailtoLink: Story = {
	args: {
		children: 'Mailto Link',
		linktype: 'email',
		href: 'colin@zyzle.dev',
	},
};
