import { Pacifico, Nunito, Fira_Code } from '@next/font/google';
import Link from 'next/link';

import Footer from '@zyzle-dev/components/Footer';
import classNames from '@zyzle-dev/lib/classNames';

import './global.css';

const pacifico = Pacifico({
	weight: '400',
	subsets: ['latin'],
});

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
});

const firaCode = Fira_Code({
	variable: '--font-fira-code',
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full dark">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body
				className={classNames(
					'w-full min-h-full flex flex-col bg-zbackground font-sans',
					`${nunito.variable} ${firaCode.variable}`
				)}>
				<header
					className={classNames(
						'relative backdrop-blur flex-none flex items-center',
						'xl:fixed xl:w-full xl:top-0 xl:left-0 xl:z-30',
						'px-4 py-5'
					)}>
					<Link href="/">
						<h1 className={classNames('text-zpink text-3xl', pacifico.className)}>Zyzle.dev</h1>
					</Link>
					<nav className="text-zdefault hidden">
						<Link href="/blog">Blog</Link>
						<Link href="/projects">Projects</Link>
						<Link href="/snippets">Snippets</Link>
						<Link href="/about">About</Link>
					</nav>
				</header>
				<main className="flex-1 relative xl:mt-20 ">
					<div className="container px-4 mx-auto">{children}</div>
				</main>
				<Footer />
			</body>
		</html>
	);
}
