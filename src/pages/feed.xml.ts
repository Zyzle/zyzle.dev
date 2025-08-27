import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: any }) {
  const blogs = await getCollection("blogs");

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    title: "Zyzle.dev",
    description: "Blog feed for Zyzle.dev",
    site: context.site,
    customData: `
		<language>en</language>
		<atom:link href="${context.site}feed.xml" rel="self" type="application/rss+xml" />
		`,
    items: blogs.map((post) => ({
      link: `/blog/${post.id}`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      commentsUrl: `${context.site}blog/${post.id}#comments`,
      author: `${post.data.author.email} (${post.data.author.name})`,
    })),
  });
}
