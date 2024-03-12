"use client";

import React, { useMemo, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const WaveFormAudio = () => {
  const waveFormRef = useRef(null);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: waveFormRef,
    height: 100,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    dragToSeek: true,
    url: "/audio.mp3",
    plugins: useMemo(() => [Timeline.create()], []),
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <Card className="p-4 mt-4">
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex items-center gap-4">
          <div>
            {/* <PauseIcon/> */}
            <Button size="icon" variant="ghost">
              <PlayIcon className="size-8" />
            </Button>
          </div>
          <div className="grow" ref={waveFormRef} />
        </div>

        <div className="flex justify-between">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn("w-28")}
            //   {...props}
          />
          <div>3:22</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveFormAudio;
