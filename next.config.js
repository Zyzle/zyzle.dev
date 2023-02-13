/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'a.storyblok.com',
				port: '',
				pathname: '/f/**',
			},
		],
	},
};

module.exports = nextConfig;
