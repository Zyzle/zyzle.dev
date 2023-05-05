'use client';

import Giscus from '@giscus/react';

export function Comments({ discussionId }: { discussionId: string }) {
	return (
		<>
			<Giscus
				id="comments"
				repo="Zyzle/zyzle.dev"
				repoId="R_kgDOI5nGbQ"
				mapping="number"
				term={discussionId}
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="transparent_dark"
				lang="en"
				loading="lazy"
			/>
		</>
	);
}
