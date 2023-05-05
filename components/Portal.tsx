'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = {
	children: React.ReactNode;
};

export function Portal(props: PortalProps) {
	let { children } = props;
	let [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;
	return createPortal(children, document.body);
}
