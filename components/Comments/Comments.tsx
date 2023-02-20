'use client';

import Script from 'next/script';

export default function Comments({ discussionId }: { discussionId: string }) {
	return (
		<>
			<div className="giscus not-prose"></div>
			<Script
				strategy="lazyOnload"
				src="https://giscus.app/client.js"
				data-repo="Zyzle/zyzle.github.io"
				data-repo-id="MDEwOlJlcG9zaXRvcnk0NzA2NjYzNw=="
				data-mapping="number"
				data-term={discussionId}
				data-reactions-enabled="1"
				data-emit-metadata="0"
				data-input-position="bottom"
				data-theme="transparent_dark"
				data-lang="en"
			/>
		</>
	);
}
