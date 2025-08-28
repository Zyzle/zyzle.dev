import fs from "node:fs";
import path from "node:path";

export function constructOgHtml(title: string, imageBuffer?: Buffer) {
  const image =
    imageBuffer ?? fs.readFileSync(path.resolve("src/assets/z.png"));

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#252539",
        color: "#abb2bf",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flex: 1,
                    margin: 20,
                    borderRadius: "5%",
                    overflow: "hidden",
                  },
                  children: [
                    {
                      type: "img",
                      props: {
                        alt: "TEST TITLE IMAGE",
                        src: image.buffer,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    flex: 2,
                    fontSize: 70,
                    letterSpacing: -1,
                    fontWeight: 800,
                    fontFamily: "Nunito",
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: 20,
              marginTop: 20,
            },
            children: [
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#c678dd" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#e06c75" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#d19a66" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#e5c07b" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#98c379" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#56b6c2" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#61afef" } },
              },
              {
                type: "div",
                props: { style: { flex: 1, backgroundColor: "#528bff" } },
              },
            ],
          },
        },
      ],
    },
  };
}
