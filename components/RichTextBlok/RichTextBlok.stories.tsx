import type { Meta, StoryObj } from '@storybook/react';

import RichTextBlok from './RichTextBlok';

const meta: Meta<typeof RichTextBlok> = {
	title: 'Blok Resolvers/RichTextBlok',
	component: RichTextBlok,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
	args: {
		blok: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'This is a paragraph',
						},
					],
				},
			],
		},
	},
};
