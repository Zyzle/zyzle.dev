'use client';

import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export default function Analytics() {
	return (
		<>
			<VercelAnalytics />
			<Script
				data-host="https://microanalytics.io"
				data-dnt="false"
				src="https://microanalytics.io/js/script.js"
				id="ZwSg9rf6GA"
			/>
		</>
	);
}
