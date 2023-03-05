'use client';
import { useState } from 'react';
import { spongebob, curse } from '@zyzle/meme-text';
import { Tab } from '@headlessui/react';
import classNames from '@zyzle-dev/lib/classNames';

export default function MemeText() {
	const [memeText, setMemeText] = useState('');

	const tabs = [
		{
			tabName: 'Spongebob',
			output: <div className="py-4">{spongebob(memeText)}</div>,
		},
		{
			tabName: 'Curse',
			output: (
				<div className="py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
					{curse(memeText, 10)}
				</div>
			),
		},
	];

	return (
		<>
			<div className="flex flex-col gap-4">
				<Tab.Group>
					<Tab.List className="flex p-1 space-x-1 rouded-xl">
						{tabs.map(({ tabName }, i) => (
							<Tab
								key={i}
								className={({ selected }) =>
									classNames(
										'w-full py-2.5 text-md font-medium text-center rounded-lg',
										selected ? ' bg-zcaret text-zblock' : 'text-zcaret'
									)
								}>
								{tabName}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels>
						{tabs.map(({ output }, i) => (
							<Tab.Panel key={i}>
								<div className="flex flex-col space-y-2 gap-4">
									<input
										className="rounded-xl"
										type="text"
										placeholder="type here"
										value={memeText}
										onChange={e => setMemeText(e.target.value)}
									/>
									{output}
								</div>
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
}
