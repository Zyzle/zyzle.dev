export default function BlogSlugPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	return (
		<main>
			<h1>Blog slug page: {params.slug}</h1>
		</main>
	);
}
