import { useState } from "react";

import { curse, spongebob } from "@zyzle/meme-text";

import { Segment } from "@skeletonlabs/skeleton-react";

export function MemeText() {
  const [memeText, setMemeText] = useState("");
  const [selectedTab, setSelectedTab] = useState<string | null>("spongebob");

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <Segment
            name="Meme Text"
            value={selectedTab}
            onValueChange={(e) => setSelectedTab(e.value)}
          >
            <Segment.Item value="spongebob">Spongebob Case</Segment.Item>
            <Segment.Item value="curse">Curse Case</Segment.Item>
          </Segment>
        </div>
        <label className="label">
          <span className="label-text">Text to transform</span>
          <input
            type="text"
            className="input"
            placeholder="Enter Text"
            value={memeText}
            onChange={(e) => setMemeText(e.target.value)}
          />
        </label>
        <div className="text-2xl text-zblue">
          {selectedTab === "spongebob"
            ? spongebob(memeText)
            : curse(memeText, 10)}
        </div>
      </div>
    </>
  );
}
