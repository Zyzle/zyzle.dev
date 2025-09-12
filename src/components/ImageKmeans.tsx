import { useCallback, useEffect, useState } from "react";

import {
  type Color,
  ImageKmeans,
  type RunResult,
  default as init,
  InitMethod,
} from "@zyzle/image-kmeans";

import { Dropzone } from "./Dropzone";
import { Segment, Slider, Tabs } from "@skeletonlabs/skeleton-react";

export function ImageKmeansComponent() {
  const [wasmInstance, setWasmInstance] = useState<ImageKmeans | null>(null);
  const [fixedKResults, setFixedKResults] = useState<{
    result: RunResult;
    time: number;
  } | null>(null);
  const [derivedKResults, setDerivedKResults] = useState<{
    result: RunResult;
    time: number;
  } | null>(null);
  const [group, setGroup] = useState<"fixed" | "derived">("fixed");
  const [initMethod, setInitMethod] = useState<InitMethod>(InitMethod.Random);
  const [quantizeFactor, setQuantizeFactor] = useState<number>(8);
  const [topNum, setTopNum] = useState<number[]>([512]);

  useEffect(() => {
    init();
  }, []);

  const handleDroppedFile = useCallback(
    async (ibm: ImageBitmap) => {
      const canvas = new OffscreenCanvas(ibm.width, ibm.height);
      const ctx = canvas.getContext(
        "2d"
      )! as unknown as CanvasRenderingContext2D;
      ctx.canvas.height = ibm.height;
      ctx.canvas.width = ibm.width;
      ctx.drawImage(ibm, 0, 0);
      const wasmInstance = new ImageKmeans(ctx, ibm.width, ibm.height);
      setWasmInstance(wasmInstance);
    },
    [setWasmInstance]
  );

  const doFixedRun = useCallback(() => {
    const doAsyncRun = async () => {
      if (wasmInstance) {
        const start = performance.now();
        const fixedKResults = await wasmInstance.with_fixed_k_number(
          8,
          initMethod,
          {
            quantize_fact: quantizeFactor,
            top_num: topNum[0] > 0 ? topNum[0] : undefined,
          }
        );
        const end = performance.now();
        setFixedKResults({ result: fixedKResults, time: end - start });
      }
    };
    doAsyncRun();
  }, [wasmInstance, setFixedKResults, quantizeFactor, topNum, initMethod]);

  const doDerivedRun = useCallback(() => {
    const doAsyncRun = async () => {
      if (wasmInstance) {
        const start = performance.now();
        const derivedKResults = await wasmInstance.with_derived_k_number(
          initMethod,
          {
            quantize_fact: quantizeFactor,
            top_num: topNum[0] > 0 ? topNum[0] : undefined,
          }
        );
        const end = performance.now();
        setDerivedKResults({ result: derivedKResults, time: end - start });
      }
    };
    doAsyncRun();
  }, [wasmInstance, setDerivedKResults, quantizeFactor, topNum, initMethod]);

  const colorToHex = (color: Color): string => {
    return `#${color.r.toString(16).padStart(2, "0")}${color.g
      .toString(16)
      .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Dropzone droppedFile={handleDroppedFile} />
      <Segment
        name="initMethod"
        value={initMethod === InitMethod.Random ? "random" : "kmeans++"}
        onValueChange={(e) => {
          setInitMethod(
            e.value === "random" ? InitMethod.Random : InitMethod.KmeansPlusPlus
          );
        }}
      >
        <Segment.Item value="random">Random Init</Segment.Item>
        <Segment.Item value="kmeans++">Kmeans++ Init</Segment.Item>
      </Segment>
      <div className="input-group grid-cols-[auto_1fr]">
        <label htmlFor="quantize" className="ig-cell preset-tonal">
          Q Factor:
        </label>
        <select
          id="quantize"
          className="ig-select"
          value={quantizeFactor}
          onChange={(e) => {
            console.log(e.target.value);
            setQuantizeFactor(parseInt(e.target.value, 10));
          }}
        >
          <option value="1">1 (no quantization)</option>
          <option value="2">2 (low quantization)</option>
          <option value="4">4 (medium quantization)</option>
          <option value="8">8 (high quantization)</option>
          <option value="16">16 (very high quantization)</option>
        </select>
      </div>
      <label className="w-full mb-8">
        Top N:
        <Slider
          value={topNum}
          onValueChange={(e) => setTopNum(e.value)}
          min={0}
          max={4096}
          step={512}
          markers={[0, 512, 1024, 2048, 4096]}
        />
      </label>
      <button
        type="button"
        className="btn preset-outlined-primary-500"
        onClick={() => {
          doFixedRun();
          doDerivedRun();
        }}
        disabled={!wasmInstance}
      >
        Do run
      </button>
      <Tabs
        value={group}
        onValueChange={(e) => setGroup(e.value as "fixed" | "derived")}
        fluid
      >
        <Tabs.List>
          <Tabs.Control value="fixed">Fixed K Clusters</Tabs.Control>
          <Tabs.Control value="derived">Derived K Clusters</Tabs.Control>
        </Tabs.List>
        <Tabs.Content>
          <Tabs.Panel value="fixed">
            {fixedKResults && (
              <div className="card preset-filled-surface-500 divide-surface-200-800 divide-y flex flex-col p-4">
                <div className="flex flex-wrap gap-4">
                  {fixedKResults?.result.clusters.map(
                    (color: Color, i: number) => {
                      const c = colorToHex(color);
                      return (
                        <div
                          key={i}
                          className="py-2 px-4 rounded-md"
                          style={{ backgroundColor: c }}
                        >
                          {c}
                        </div>
                      );
                    }
                  )}
                </div>
                <footer className="flex items-center justify-between gap-4 p-4">
                  Time: {(fixedKResults?.time / 1000).toFixed(2)}s
                </footer>
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="derived">
            {derivedKResults && (
              <div className="card preset-filled-surface-500 divide-surface-200-800 divide-y flex flex-col p-4">
                <div className="flex flex-wrap gap-4">
                  {derivedKResults?.result.clusters.map(
                    (color: Color, i: number) => {
                      const c = colorToHex(color);
                      return (
                        <div
                          key={i}
                          className="py-2 px-4 rounded-md"
                          style={{ backgroundColor: c }}
                        >
                          {c}
                        </div>
                      );
                    }
                  )}
                </div>
                <footer className="flex items-center justify-between gap-4 p-4">
                  Time: {(derivedKResults?.time / 1000).toFixed(2)}s
                </footer>
              </div>
            )}
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
