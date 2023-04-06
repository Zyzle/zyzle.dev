'use client';
import { useCallback, useState } from 'react';

import { Color, ImageKmeans, RunResult } from '@zyzle/image-kmeans';

import Dropzone from '../Dropzone';
import { Tab } from '@headlessui/react';
import classNames from '@zyzle-dev/lib/classNames';

export default function ImageKmeansComponent() {
	const [wasmInstance, setWasmInstance] = useState<ImageKmeans | null>(null);
	const [fixedKResults, setFixedKResults] = useState<RunResult | null>(null);
	const [derivedKResults, setDerivedKResults] = useState<RunResult | null>(null);

	const handleDroppedFile = useCallback(
		async (ibm: ImageBitmap) => {
			const canvas = new OffscreenCanvas(ibm.width, ibm.height);
			const ctx = canvas.getContext('2d')! as unknown as CanvasRenderingContext2D;
			ctx.canvas.height = ibm.height;
			ctx.canvas.width = ibm.width;
			ctx.drawImage(ibm, 0, 0);
			// not sure why the below is necessary, seems to be a nextjs specific issue
			// with wasm-pack created wasm modules
			const ikm = await (await import('@zyzle/image-kmeans')).ImageKmeans;
			const wasmInstance = new ikm(ctx, ibm.width, ibm.height);
			setWasmInstance(wasmInstance);
		},
		[setWasmInstance]
	);

	const doFixedRun = useCallback(() => {
		const doAsyncRun = async () => {
			if (wasmInstance) {
				const fixedKResults = await wasmInstance.with_fixed_k_number(8);
				setFixedKResults(fixedKResults);
			}
		};
		doAsyncRun();
	}, [wasmInstance, setFixedKResults]);

	const doDerivedRun = useCallback(() => {
		const doAsyncRun = async () => {
			if (wasmInstance) {
				const derivedKResults = await wasmInstance.with_derived_k_number();
				setDerivedKResults(derivedKResults);
			}
		};
		doAsyncRun();
	}, [wasmInstance, setDerivedKResults]);

	const colorToHex = (color: Color): string => {
		return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b
			.toString(16)
			.padStart(2, '0')}`;
	};

	const tabs = [
		{
			runType: 'Fixed Ks',
			panel: (
				<Tab.Panel>
					<div className="flex flex-col space-y-2 gap-4 items-center">
						<button onClick={doFixedRun} className="rounded-full bg-zgold text-zblock px-2">
							Run with fixed K number
						</button>
						<div className="flex flex-wrap gap-4">
							{fixedKResults?.clusters.map((color, i) => {
								const c = colorToHex(color);
								return (
									<div key={i} className="py-2 px-4 rounded-md" style={{ backgroundColor: c }}>
										{c}
									</div>
								);
							})}
						</div>
					</div>
				</Tab.Panel>
			),
		},
		{
			runType: 'Derived Ks',
			panel: (
				<Tab.Panel>
					<div className="flex flex-col space-y-2 gap-4 items-center">
						<button onClick={doDerivedRun} className="rounded-full bg-zgold text-zblock px-2">
							Run with derived K number
						</button>
						<div className="flex flex-wrap gap-4">
							{derivedKResults?.clusters.map((color, i) => {
								const c = colorToHex(color);
								return (
									<div key={i} className="py-2 px-4 rounded-md" style={{ backgroundColor: c }}>
										{c}
									</div>
								);
							})}
						</div>
					</div>
				</Tab.Panel>
			),
		},
	];

	return (
		<div className="flex flex-col gap-4">
			<Dropzone droppedFile={handleDroppedFile} />
			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl p-1 bg-zblock">
					{tabs.map(({ runType }, i) => (
						<Tab
							key={i}
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-md font-medium leading-5 ',
									'ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
									selected ? 'shadow bg-zcaret text-zblock' : ' '
								)
							}>
							{runType}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels>
					{tabs.map(({ panel }, i) => (
						<span key={i}>{panel}</span>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
