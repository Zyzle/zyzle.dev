import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: [
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
		'../components/**/*.mdx',
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
		'../app/**/*.mdx',
		'../app/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			/**
			 * Fix Storybook issue with PostCSS@8
			 * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
			 */
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;
