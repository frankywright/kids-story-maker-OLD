"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { secondsToHumanReadable } from "@/lib/utils";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function handleTogglePlayback(audio: HTMLAudioElement | null) {
  if (audio === null) {
    return;
  }

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

const AudioPlayer = forwardRef<HTMLAudioElement, { story: any }>(
  function AudioPlayer({ story }, forwardedRef) {
    const src = story.audio;
    const ref = useRef<HTMLAudioElement>(null);

    useImperativeHandle(forwardedRef, () => ref.current as HTMLAudioElement);

    const [duration, setDuration] = useState<number | undefined>(
      typeof ref.current?.duration === "number"
        ? ref.current.duration
        : undefined
    );
    const [currentTime, setCurrentTime] = useState<number>(0);

    const p = duration === undefined ? 0 : (currentTime / duration) * 100;

    useEffect(() => {
      if (typeof ref.current?.duration === "number") {
        setDuration(ref.current?.duration);
      }

      const handleTimeUpdate = () => {
        setCurrentTime(ref.current?.currentTime!);
      };

      const handleMetadata = () => {
        if (typeof ref.current?.duration === "number") {
          setDuration(ref.current?.duration);
        }
      };

      ref.current?.addEventListener("timeupdate", handleTimeUpdate);
      ref.current?.addEventListener("loadedmetadata", handleMetadata);

      const spaceHandler = (e: KeyboardEvent) => {
        if (ref.current) {
          if (e.key === " ") {
            handleTogglePlayback(ref.current);
          }

          if (e.key === "ArrowLeft") {
            ref.current.currentTime -= 10;
          }

          if (e.key === "ArrowRight") {
            ref.current.currentTime += 10;
          }
        }
      };

      window.addEventListener("keydown", spaceHandler);

      return () => {
        window.removeEventListener("keydown", spaceHandler);
        ref.current?.removeEventListener("timeupdate", handleTimeUpdate);
        ref.current?.removeEventListener("loadedmetadata", handleMetadata);
      };
    }, []);

    //   useEffect(() => {
    //     if (typeof duration !== 'number') {
    //       return;
    //     }

    //     // In an ideal world, we would parse the duration on the backend
    //     // and store this at creation time, b
    //     const roundedDuration = Math.round(duration);
    //     if (!isNaN(roundedDuration) && roundedDuration !== story.duration) {
    //       story.update({ duration: roundedDuration });
    //     }
    //   }, [duration]);

    if (src === null) {
      return null;
    }

    return (
      <div>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleTogglePlayback(ref.current)}
          >
            {ref.current?.paused && <PlayIcon />}
            {!ref.current?.paused && <PauseIcon />}
          </Button>
          {duration && duration > 0 && (
            <div className="font-mono text-sm">
              {secondsToHumanReadable(currentTime)} /{" "}
              {duration && secondsToHumanReadable(duration)}
            </div>
          )}
          <audio ref={ref}>
            <source src={src} type="audio/mpeg" />
          </audio>
        </div>

        <Progress value={p} className="mt-3" />
      </div>
    );
  }
);

export default function Page({ params }: { params: { id: string } }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log(params.id);

  useEffect(() => {
    const handler = () => {
      console.log("foo");
      setIsPlaying(!ref.current?.paused);
    };

    ref.current?.addEventListener("play", handler);
    ref.current?.addEventListener("pause", handler);

    return () => {
      ref.current?.removeEventListener("play", handler);
      ref.current?.removeEventListener("pause", handler);
    };
  }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ["story", params.id],
    queryFn: () => supabase.from("story").select().eq("id", params.id),
    enabled: !!params.id,
  });

  console.log(data);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto my-8 p-4">
        Something went wrong! Try again
      </div>
    );
  }
  if (!isPending && (data as any).data.length === 0) {
    return <div className="max-w-7xl mx-auto my-8 p-4">No data found!</div>;
  }

  // console.log(ref.current?.paused);
  console.log(isPlaying);

  return (
    <section className="max-w-7xl mx-auto px-4 mb-4">
      <div className="px-6 lg:px-12 space-y-3 lg:space-y-6">
        {isPending ? (
          <Skeleton className="w-full h-[40px] rounded-md my-4" />
        ) : (
          <h1 className="text-2xl lg:text-6xl font-bold my-4 text-center">
            {(data as any).data[0].title}
          </h1>
        )}
      </div>

      <div>
        {isPending ? (
          <>
            <Skeleton className="w-full h-[300px] rounded-md my-4" />
            <Skeleton className="w-full h-[100px] rounded-md my-4" />
          </>
        ) : (
          <>
            <Card>
              <CardContent className="relative h-full p-0">
                {!imageLoaded && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <SymbolIcon className="animate-spin" />
                  </div>
                )}
                {imageLoaded && (
                  <button
                    onClick={() => {
                      handleTogglePlayback(ref.current);
                      setIsPlaying(!ref.current?.paused as boolean);
                    }}
                    className="bg-gray-900/25 cursor-pointer p-6 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </button>
                )}
                <Image
                  onLoad={() => setImageLoaded(true)}
                  onClick={() => {
                    handleTogglePlayback(ref.current);
                    setIsPlaying(!ref.current?.paused as boolean);
                  }}
                  src={(data as any).data[0].image_url}
                  className="object-contain mx-auto rounded-xl sm:rounded-none"
                  alt=""
                  width={500}
                  height={500}
                />
              </CardContent>
            </Card>
            <div>
              <Card className="mt-4 p-4">
                <AudioPlayer
                  ref={ref}
                  story={{
                    audio: (data as any).data[0].audio_url,
                  }}
                />
              </Card>
            </div>
            <Card className="mt-4">
              <CardContent>
                <CardHeader className="px-0 pb-2 pt-4">
                  <CardTitle>{(data as any).data[0].title}</CardTitle>
                </CardHeader>
                <CardDescription>
                  <p>{(data as any).data[0].story_text}</p>
                </CardDescription>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </section>
  );
}
