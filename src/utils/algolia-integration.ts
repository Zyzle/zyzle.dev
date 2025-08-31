import { type AstroIntegration } from "astro";
import { glob } from "glob";
import fs from "node:fs/promises";
import * as cheerio from "cheerio";
import stopword from "stopword";
import { algoliasearch } from "algoliasearch";

function extractSections($: cheerio.CheerioAPI, pageTitle: string) {
  const sections = [];
  let currentSection = { title: pageTitle, content: "" };
  function walk(node: any) {
    if (node.type === "tag" && node.tagName === "h2") {
      if (currentSection.content.trim()) sections.push({ ...currentSection });
      currentSection = {
        title: $(node).text().replace(/\s+/g, " ").trim(),
        content: "",
      };
    } else if (node.type === "tag" || node.type === "root") {
      for (const child of node.children || []) {
        walk(child);
      }
    } else if (node.type === "text") {
      currentSection.content += node.data + " ";
    }
  }

  walk($("body")[0]);
  if (currentSection.content.trim()) sections.push({ ...currentSection });
  return sections;
}

export default function pageFind({
  appId,
  apiKey,
  indexName,
  baseUrl,
  isProduction,
}: {
  appId: string;
  apiKey: string;
  indexName: string;
  baseUrl: string;
  isProduction: boolean;
}): AstroIntegration {
  return {
    name: "algolia",
    hooks: {
      "astro:build:done": async ({ logger, dir, pages }) => {
        if (isProduction) {
          const search = algoliasearch(appId, apiKey);

          const pathToRead = dir.pathname;
          const globResult = await glob(`${pathToRead}/**/*.html`, {
            ignore: [`${pathToRead}/tags/**`, `${pathToRead}/404.html`],
          });

          for (const file of globResult) {
            const fileContent = await fs.readFile(file, "utf-8");
            const $ = cheerio.load(fileContent);
            const pageTitle = $("h1")
              .first()
              .text()
              .replace(/\s+/g, " ")
              .trim();
            const metaDescription =
              $("meta[name='description']").attr("content") || "";

            $("script, style, footer, header, pre, code").remove();

            const objectID = file
              .replace(pathToRead, "")
              .replace(/index\.html$/, "");

            if (objectID === "") {
              continue;
            }

            const sections = extractSections($, pageTitle);

            for (const section of sections) {
              let words = section.content
                .replace(/\s+/g, " ")
                .trim()
                .split(/\s+/);
              words = stopword.removeStopwords(words);
              const content = words.join(" ");
              const sectionSlug = section.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
              const sectionObjectID = `${objectID}#${sectionSlug}`;

              try {
                // console.log(`Indexing ${sectionObjectID}`, {
                //   createIfNotExists: true,
                //   objectID: sectionObjectID,
                //   attributesToUpdate: {
                //     content,
                //     // separate section and page title
                //     title: pageTitle,
                //     sectionTitle: section.title,
                //     permalink: `${baseUrl}${objectID}#${sectionSlug}`,
                //     metaDescription,
                //     image: $("meta[property='og:image']").attr("content") || "",
                //   },
                //   indexName: indexName,
                // });
                await search.partialUpdateObject({
                  createIfNotExists: true,
                  objectID: sectionObjectID,
                  attributesToUpdate: {
                    content,
                    title: section.title,
                    permalink: `${baseUrl}${objectID}#${sectionSlug}`,
                    metaDescription,
                    image: $("meta[property='og:image']").attr("content") || "",
                  },
                  indexName: indexName,
                });
              } catch (e) {
                logger.error(
                  `Algolia indexing error for ${sectionObjectID}: ${
                    (e as Error).message
                  }`
                );
              }
            }
          }
        }
      },
    },
  };
}
