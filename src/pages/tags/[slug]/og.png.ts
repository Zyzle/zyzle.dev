import { ImageResponse } from "@vercel/og";
import fs from "node:fs";
import path from "node:path";
import { constructOgHtml } from "../../../utils/ogUtils";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const blogPosts = await getCollection("blogs");
  const snippets = await getCollection("snippets");

  const uniqueTags = [
    ...new Set([
      ...blogPosts.flatMap((post) => post.data.tags),
      ...snippets.flatMap((snippet) => snippet.data.tags),
    ]),
  ];

  return uniqueTags.map((tag) => ({
    params: { slug: tag },
  }));
}

export async function GET({ params }: { params: { slug: string } }) {
  const title = `#${params.slug}`;
  const image = fs.readFileSync(path.resolve("src/assets/tag.png"));
  const nunito = fs.readFileSync(
    path.resolve("src/assets/font/Nunito-Regular.ttf")
  );

  const html = constructOgHtml(`${title} | Zyzle.dev`, image);

  // @ts-ignore
  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Nunito",
        data: nunito.buffer,
        style: "normal",
      },
    ],
  });
}
