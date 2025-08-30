import { ImageResponse } from "@vercel/og";
import fs from "node:fs";
import path from "node:path";
import { constructOgHtml } from "../../../utils/ogUtils";
import { getCollection, type CollectionEntry } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects");

  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

export async function GET({
  params,
  props,
}: {
  params: { slug: string };
  props: { project: CollectionEntry<"projects"> };
}) {
  const image = fs.readFileSync(path.resolve("src/assets/projects.png"));
  const nunito = fs.readFileSync(
    path.resolve("src/assets/font/Nunito-Regular.ttf")
  );

  const html = constructOgHtml(
    `${props.project.data.title} | Zyzle.dev`,
    image
  );

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
