import { ImageResponse } from "@vercel/og";
import fs from "node:fs";
import path from "node:path";
import { constructOgHtml } from "../../../utils/ogUtils";
import { getCollection, type CollectionEntry } from "astro:content";

export async function getStaticPaths() {
  const snippets = await getCollection("snippets");

  return snippets.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export async function GET({
  params,
  props,
}: {
  params: { slug: string };
  props: { entry: CollectionEntry<"snippets"> };
}) {
  const title = props.entry.data.title;
  const image = fs.readFileSync(
    path.resolve(`src/assets/${props.entry.data.language}.png`)
  );
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
