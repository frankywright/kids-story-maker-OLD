"use client";
import StoryCard from "@/components/StoryCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => supabase.from("stories").select("*"),
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

  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="my-10 text-center flex flex-col gap-2">
        <h1 className="font-bold text-4xl lg:text-6xl">
          Kid&#39;s Story Maker
        </h1>
        <p className="text-muted-foreground max-w-[500px] mx-auto">
          Stories, images and audio generated with the OpenAI Api. Try making
          your own stories
        </p>
      </section>
      <section>
        {isPending ? (
          <Skeleton className="h-60 w-full" />
        ) : (
          <Card className="overflow-hidden">
            <CardContent className="grid sm:grid-cols-2 p-0 gap-4">
              <Image
                className="w-full object-cover max-h-[370px]"
                src={(data as any).data[0].image_url}
                alt={(data as any).data[0].title}
                width={500}
                height={500}
              />
              <div className="p-4">
                <div className="p-0 mb-2 font-bold flex items-center gap-2">
                  <h2>TODAY&#39;S STORY</h2> <Badge>Featured</Badge>
                </div>
                <CardDescription className="">
                  {(data as any).data[0].story_text.length > 500
                    ? (data as any).data[0].story_text.slice(0, 500) + " ..."
                    : (data as any).data[0].story_text}
                </CardDescription>
                <Link
                  className={buttonVariants({
                    variant: "default",
                    className: "my-4",
                  })}
                  href={`/story/${(data as any).data[0].id}`}
                >
                  Listen Now
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-10">
        {isPending
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))
          : (data as any).data.map((story: any) => (
              <StoryCard key={story.id} {...story} />
            ))}
      </section>
    </div>
  );
}
