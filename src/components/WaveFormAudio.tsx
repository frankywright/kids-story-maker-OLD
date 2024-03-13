"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

const WaveFormAudio = () => {
  const waveFormRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlay] = useState(false);
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

  useEffect(() => {
    wavesurfer?.on("ready", () => {
      if (wavesurfer) {
        wavesurfer.setVolume(volume);
        setVolume(volume);
      }
    });

    return () => wavesurfer?.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handlePlayPause = () => {
  //   setPlay(!playing);
  //   wavesurfer?.playPause();
  // };

  const onVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    wavesurfer?.setVolume(value[0]);
  };

  console.log(wavesurfer?.getDuration());

  return (
    <Card className="p-4 mt-4">
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex items-center gap-4">
          <div>
            {/* <PauseIcon/> */}
            <Button onClick={onPlayPause} size="icon" variant="ghost">
              {isPlaying ? (
                <PauseIcon className="size-8" />
              ) : (
                <PlayIcon className="size-8" />
              )}
            </Button>
          </div>
          <div className="grow" ref={waveFormRef} />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {volume === 0 ? (
              <SpeakerOffIcon className="size-5" />
            ) : (
              <SpeakerLoudIcon className="size-5" />
            )}
            <Slider
              value={[volume]}
              onValueChange={onVolumeChange}
              defaultValue={[0.5]}
              max={1}
              step={0.1}
              className={cn("w-24")}
              //   {...props}
            />
            <span>{volume}</span>
          </div>

          <div>
            {formatTime(currentTime)} /{" "}
            {formatTime(wavesurfer?.getDuration() || 0)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveFormAudio;
