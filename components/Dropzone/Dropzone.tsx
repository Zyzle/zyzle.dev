'use client';
/* eslint-disable @next/next/no-img-element */
import { DragEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from '@zyzle-dev/lib/classNames';

export type DropzoneProps = {
	droppedFile: (ibm: ImageBitmap) => void;
};

export function Dropzone(props: DropzoneProps) {
	const { droppedFile } = props;
	const imgRef = useRef<HTMLImageElement>(null);
	const [file, setFile] = useState<File | null>(null);

	const handleDrop: DragEventHandler<HTMLDivElement> = useCallback(
		async event => {
			event.preventDefault();

			if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
				const file = event.dataTransfer.items[0].getAsFile();
				setFile(file as File);
				const ibm = await createImageBitmap(file as File);
				droppedFile(ibm);
			}
		},
		[droppedFile, setFile]
	);

	const handleDragover: DragEventHandler<HTMLDivElement> = useCallback(event => event.preventDefault(), []);

	useEffect(() => {
		if (file && imgRef.current) {
			imgRef.current.src = URL.createObjectURL(file);
		}
	}, [file, imgRef]);

	return (
		<div className="container overflow-hidden rounded-xl bg-zcomment shadow-md">
			<span className="not-prose">
				{file && <img ref={imgRef} id="image-display" src="" alt="dropped image" className="h-auto w-full" />}
			</span>

			<Disclosure defaultOpen>
				{({ open, close }) => (
					<>
						<Disclosure.Button
							className={classNames(
								'flex w-full justify-between rounded-lg',
								'px-4 py-2 text-left text-sm font-medium',
								'focus:outline-none focus-visible:ring',
								'focus-visible:ring-opacity-75'
							)}>
							<span>Dropzone</span>
							<ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`} />
						</Disclosure.Button>
						<Disclosure.Panel className="px-5 pt-4 pb-2 text-sm">
							<div
								id="drop-zone"
								onDrop={e => {
									handleDrop(e);
									close();
								}}
								onDragOver={handleDragover}
								className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed p-6 text-center">
								<h2 className="mt-4 text-xl font-medium tracking-wide">Drop File</h2>
								<p className="mt-2 tracking-wide">Drop an image into the box to analyze</p>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
