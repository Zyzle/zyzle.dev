import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";

import { curse, spongebob } from "@zyzle/meme-text";

import { classNames } from "../utils/reactUtils";

export function MemeText() {
  const [memeText, setMemeText] = useState("");

  const tabs = [
    {
      tabName: "Spongebob",
      output: <div className="py-4">{spongebob(memeText)}</div>,
    },
    {
      tabName: "Curse",
      output: (
        <div className="py-4" style={{ fontFamily: "Arial, sans-serif" }}>
          {curse(memeText, 10)}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <TabGroup>
          <TabList className="flex p-1 space-x-1 rouded-xl">
            {tabs.map(({ tabName }, i) => (
              <Tab
                key={i}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-md font-medium text-center rounded-lg",
                    selected ? " bg-zcaret text-zblock" : "text-zcaret"
                  )
                }
              >
                {tabName}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map(({ output }, i) => (
              <TabPanel key={i}>
                <div className="flex flex-col space-y-2 gap-4">
                  <input
                    className="rounded-xl"
                    type="text"
                    placeholder="type here"
                    value={memeText}
                    onChange={(e) => setMemeText(e.target.value)}
                  />
                  <div className="text-2xl text-zblue">{output}</div>
                  <button
                    aria-label="Copy to clipboard"
                    className="rounded-md bg-zgold text-zblock px-2 hover:bg-zgold/80"
                    disabled={!memeText}
                    title="Copy to clipboard"
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(output.props.children);
                    }}
                  >
                    Copy text to clipboard
                  </button>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
}
