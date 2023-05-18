/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./.storybook/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				zdefault: '#abb2bf',
				zbackground: '#252539',
				zlime: '#98c379',
				zpurple: '#c678dd',
				zpink: '#e06c75',
				zbrown: '#d19a66',
				zgold: '#e5c07b',
				zcaret: '#528bff',
				zblue: '#61afef',
				zcyan: '#56b6c2',
				zcomment: '#5c6370',
				zblock: '#282c34',
			},
			fontFamily: {
				sans: ['var(--font-nunito)'],
				mono: ['var(--font-fira-code)'],
			},
			typography: theme => ({
				zyzle: {
					css: {
						'--tw-prose-invert-body': theme('colors.zdefault'),
						'--tw-prose-invert-headings': theme('colors.zblue'),
						'--tw-prose-invert-lead': theme('colors.red[400]'),
						'--tw-prose-invert-links': theme('colors.zpurple'),
						'--tw-prose-invert-bold': theme('colors.zdefault'),
						'--tw-prose-invert-counters': theme('colors.zgold'),
						'--tw-prose-invert-bullets': theme('colors.zgold'),
						'--tw-prose-invert-hr': theme('colors.zcaret'),
						'--tw-prose-invert-quotes': theme('colors.zdefault'),
						'--tw-prose-invert-quote-borders': theme('colors.zlime'),
						'--tw-prose-invert-captions': theme('colors.pink[400]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.zdefault'),
						'--tw-prose-invert-pre-bg': theme('colors.zblock'),
						'--tw-prose-invert-th-borders': theme('colors.pink[600]'),
						'--tw-prose-invert-td-borders': theme('colors.pink[700]'),
						'--tw-prose-captions': theme('colors.zdefault'),
					},
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		function ({ addBase, theme }) {
			function extractColorVars(colors) {
				return Object.entries(colors).reduce((acc, [key, value]) => {
					if (typeof value === 'string') {
						acc[`--color-${key}`] = value;
					} else {
						acc[`--color-${key}`] = value['DEFAULT'];
					}
					return acc;
				}, {});
			}

			addBase({
				':root': extractColorVars(theme('colors')),
			});
		},
	],
};
