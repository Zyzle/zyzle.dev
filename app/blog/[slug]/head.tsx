import DefaultTags from '@zyzle-dev/app/DefaultTags';

export default function BlogSlugHead({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return (
		<>
			<title>{`Blog | ${params.slug}`}</title>
			<DefaultTags />
		</>
	);
}
