'use client';
import { useEffect, useRef, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { Portal } from '@zyzle-dev/components/Portal';
import { usePopper } from '@zyzle-dev/hooks/usePopper';

const getTop5 = async (subject: string, suffix: number) => {
	const res = await fetch(process.env.NEXT_PUBLIC_LISTICLE_GPT_API!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			subject,
			suffix,
		}),
	});
	// handle error
	if (!res.ok) {
		throw new Error('Something went wrong');
	}

	const data = await res.json();
	return data;
};

export function ListicleGpt() {
	const [trigger, container] = usePopper({
		placement: 'bottom',
		strategy: 'fixed',
		modifiers: [{ name: 'offset', options: { offset: [0, 2] } }],
	});
	const [loading, setLoading] = useState(false);
	const [loadingMsg, setLoadingMsg] = useState('');
	const [data, setData] = useState<any>({});

	const suffix = [
		{ id: 0, text: `you're sure to love` },
		{ id: 1, text: `you wont believe` },
		{ id: 2, text: `they dont want you to know about` },
	];

	const [selectedSuffix, setSelectedSuffix] = useState(suffix[0]);
	const [subject, setsubject] = useState('');

	const handleClick = async () => {
		setLoading(true);
		const resp = await getTop5(subject, selectedSuffix.id);
		setData(resp as any);
		setLoading(false);
	};

	useEffect(() => {
		const loadingMsgs = ['loading...', 'reticulating splines...', 'watching brain movies...', 'sit and spin...'];
		if (loading) {
			let i = 0;
			setLoadingMsg(loadingMsgs[i]);
			const interval = setInterval(() => {
				setLoadingMsg(loadingMsgs[i++ % loadingMsgs.length]);
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [loading, setLoadingMsg]);

	return (
		<>
			<div className=" align-baseline text-base flex flex-col items-center">
				<h1 className=" inline-block mr-2 mb-2">Top 5</h1>
				<input
					placeholder="Things!"
					value={subject}
					onChange={e => setsubject(e.target.value)}
					className=" text-zgold inline-block border-b-2 bg-transparent text-3xl mb-2 text-center"
				/>

				<Listbox value={selectedSuffix} onChange={setSelectedSuffix}>
					<Listbox.Button
						ref={trigger}
						className="cursor-default rounded-lg border border-zcyan text-zdefault py-2 px-3 text-left shadow-md focus:outline-none flex flex-row items-center mb-3">
						<span className="block truncate">{selectedSuffix.text}</span>
						<span className="pointer-events-none ml-2">
							<ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Portal>
						<Listbox.Options
							ref={container}
							className="bg-zdefault rounded-lg overflow-auto prose prose-invert prose-zyzle font-sans">
							{suffix.map(s => (
								<Listbox.Option
									key={s.id}
									value={s}
									className={({ active }) =>
										`cursor-default select-none py-2 px-4 ${active ? 'bg-zblue text-zblock' : 'text-zblock'}`
									}>
									{s.text}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Portal>
				</Listbox>

				<button onClick={handleClick} disabled={loading} className="px-4 py-2 rounded-lg bg-zlime text-zbackground mb-6">
					Go!
				</button>
			</div>
			<div>
				{loading ? (
					<div className="flex flex-col items-center justify-center gap-4">
						{/* <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL --> */}
						<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
									<stop stopColor="#fff" stopOpacity="0" offset="0%" />
									<stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
									<stop stopColor="#fff" offset="100%" />
								</linearGradient>
							</defs>
							<g fill="none" fillRule="evenodd">
								<g transform="translate(1 1)">
									<path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
										<animateTransform
											attributeName="transform"
											type="rotate"
											from="0 18 18"
											to="360 18 18"
											dur="0.9s"
											repeatCount="indefinite"
										/>
									</path>
									<circle fill="#fff" cx="36" cy="18" r="1">
										<animateTransform
											attributeName="transform"
											type="rotate"
											from="0 18 18"
											to="360 18 18"
											dur="0.9s"
											repeatCount="indefinite"
										/>
									</circle>
								</g>
							</g>
						</svg>
						<div className=" text-center text-2xl text-zpink">{loadingMsg}</div>
					</div>
				) : data.choices ? (
					<div>
						{data.choices?.[0].message.content.split('\n').map((p: string, i: number) => (
							<p key={i}>{p}</p>
						))}
					</div>
				) : null}
			</div>
		</>
	);
}
