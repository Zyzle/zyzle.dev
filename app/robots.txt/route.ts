export async function GET() {
	return new Response(`User-agent: *
Allow: /
Sitemap: https://zyzle.dev/sitemap.xml`);
}
