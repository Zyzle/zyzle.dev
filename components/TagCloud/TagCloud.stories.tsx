import type { Meta, StoryObj } from '@storybook/react';

import TagCloud from './TagCloud';

const meta: Meta<typeof TagCloud> = {
	title: 'Components/TagCloud',
	component: TagCloud,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const randomNum = () => Math.floor(Math.random() * 25) + 5;

export const Default: Story = {
	args: {
		tags: [
			// a set of tags based on programming languages with a count of random number between 5 and 30
			{ value: 'javascript', count: randomNum() },
			{ value: 'typescript', count: randomNum() },
			{ value: 'python', count: randomNum() },
			{ value: 'java', count: randomNum() },
			{ value: 'csharp', count: randomNum() },
			{ value: 'c++', count: randomNum() },
			{ value: 'c', count: randomNum() },
			{ value: 'go', count: randomNum() },
			{ value: 'php', count: randomNum() },
			{ value: 'ruby', count: randomNum() },
			{ value: 'swift', count: randomNum() },
			{ value: 'kotlin', count: randomNum() },
			{ value: 'rust', count: randomNum() },
			{ value: 'scala', count: randomNum() },
		],
	},
};
