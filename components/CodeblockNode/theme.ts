import type { PrismTheme } from 'prism-react-renderer';

export const theme: PrismTheme = {
	plain: {
		color: undefined,
		backgroundColor: '#282c34',
		fontStyle: undefined,
		fontWeight: undefined,
		textDecorationLine: undefined,
		opacity: undefined,
	},
	styles: [
		{
			types: [],
			style: {
				color: '#abb2bf',
			},
		},
		{
			types: [],
			style: {
				color: '#252539',
			},
		},
		{
			types: ['function'],
			style: {
				color: '#98c379',
			},
		},
		{
			types: ['number'],
			style: {
				color: '#c678dd',
			},
		},
		{
			types: ['control-flow', 'operator'],
			style: {
				color: '#e06c75',
			},
		},
		{
			types: ['parameter'],
			style: {
				color: '#d19a66',
			},
		},
		{
			types: ['string'],
			style: {
				color: '#e5c07b',
			},
		},
		{
			types: [],
			style: {
				color: '#528bff',
			},
		},
		{
			types: ['console', 'known-class-name'],
			style: {
				color: '#61afef',
			},
		},
		{
			types: ['arrow', 'keyword', 'property-access'],
			style: {
				color: '#56b6c2',
			},
		},
		{
			types: ['comment', 'prolog', 'doctype', 'cdata'],
			style: {
				color: '#5c6370',
			},
		},
		{
			types: [],
			style: {
				color: '#282c34',
			},
		},
	],
};
