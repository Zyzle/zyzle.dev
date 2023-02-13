import React from 'react';
import { Fira_Code, Nunito } from '@next/font/google';

import classNames from '../lib/classNames';

import '../app/global.css';

export const parameters = {
	backgrounds: {
		default: 'dark',
		values: [
			{
				name: 'dark',
				value: '#252539',
			},
		],
	},
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
});

const firaCode = Fira_Code({
	variable: '--font-fira-code',
	subsets: ['latin'],
});

export const decorators = [
	Story => (
		<div className="dark">
			<div className={classNames('prose prose-invert font-sans', `${nunito.variable} ${firaCode.variable}`)}>
				<Story />
			</div>
		</div>
	),
];
