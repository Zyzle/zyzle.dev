import type { Meta, StoryObj } from '@storybook/react';

import { FormulaBlok } from './FormulaBlok';

const meta: Meta<typeof FormulaBlok> = {
	title: 'Blok Resolvers/FormulaBlok',
	component: FormulaBlok,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Formula: Story = {
	args: {
		formula: 'x^2',
	},
};
