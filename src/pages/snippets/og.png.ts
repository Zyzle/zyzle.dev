import { ImageResponse } from "@vercel/og";
import fs from "node:fs";
import path from "node:path";
import { constructOgHtml } from "../../utils/ogUtils";

export async function GET() {
  const image = fs.readFileSync(path.resolve("src/assets/snippets.png"));
  const nunito = fs.readFileSync(
    path.resolve("src/assets/font/Nunito-Regular.ttf")
  );

  const html = constructOgHtml("Snippets | Zyzle.dev", image);

  // @ts-ignore
  return new ImageResponse(html, {
    width: 1066,
    height: 600,
    fonts: [
      {
        name: "Nunito",
        data: nunito.buffer,
        style: "normal",
      },
    ],
  });
}
