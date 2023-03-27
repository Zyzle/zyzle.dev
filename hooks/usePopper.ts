import { RefCallback, useCallback, useMemo, useRef } from 'react';
import { createPopper, Options } from '@popperjs/core';

export function usePopper(
	options?: Partial<Options>
): [RefCallback<HTMLElement | null>, RefCallback<HTMLElement | null>] {
	let reference = useRef<HTMLElement | null>(null);
	let popper = useRef<HTMLElement | null>(null);
	let cleanupCallback = useRef<() => void>(() => {});

	let instantiatePopper = useCallback(() => {
		if (cleanupCallback.current) {
			cleanupCallback.current();
		}
		if (reference.current && popper.current) {
			cleanupCallback.current = createPopper(reference.current, popper.current, options).destroy;
		}
	}, [reference, popper, cleanupCallback, options]);

	return useMemo(
		() => [
			referenceDomNode => {
				reference.current = referenceDomNode;
				instantiatePopper();
			},
			popperDomNode => {
				popper.current = popperDomNode;
				instantiatePopper();
			},
		],
		[reference, popper, instantiatePopper]
	);
}
