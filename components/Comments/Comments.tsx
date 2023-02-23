'use client';

import Giscus from '@giscus/react';

export default function Comments({ discussionId }: { discussionId: string }) {
	return (
		<>
			<Giscus
				id="comments"
				repo="Zyzle/zyzle.github.io"
				repoId="MDEwOlJlcG9zaXRvcnk0NzA2NjYzNw=="
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
