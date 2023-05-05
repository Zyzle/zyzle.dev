import type { Meta, StoryObj } from '@storybook/react';

import { SnippetLink } from './SnippetLink';

const meta: Meta<typeof SnippetLink> = {
	title: 'Components/SnippetLink',
	component: SnippetLink,
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
	args: {
		fullSlug: '/snippet1',
		heading: 'Snippet 1',
		firstPublishedAt: '2021-01-01',
		tagList: ['tag1', 'tag2'],
		language: 'typescript',
	},
};
