'use client';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
		};

		window.addEventListener('scroll', updateProgress);
		return () => window.removeEventListener('scroll', updateProgress);
	}, []);

	return <div className=" h-2 rounded-r-full bg-zcaret fixed z-50 xl:top-[76px]" style={{ width: `${progress}%` }} />;
}
