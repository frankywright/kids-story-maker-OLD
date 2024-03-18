"use client";

import React, { useState } from "react";
import { PromptForm } from "./prompt-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { nanoid } from "nanoid";
import { ExclamationTriangleIcon, SymbolIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "./ui/skeleton";
import StoryCard from "./StoryCard";

const dummyPrompts = [
  {
    id: 1,
    title: "The Velveteen Rabbit",
    desc: "Velveteen Rabbit longs to become real through the power of love.",
    prompt: "",
  },
  {
    id: 2,
    title: "Charlie and the Chocolate Factory",
    desc: "Charlie discovers a world of wonder inside Willy Wonka's Chocolate Factory.",
    prompt: "",
  },
  {
    id: 3,
    title: "Alice in Wonderland",
    desc: "Alice falls into a whimsical realm of talking creatures and madness.",
    prompt: "",
  },
  {
    id: 4,
    title: "The Very Hungry Caterpillar",
    desc: "Hungry caterpillar eats its way to a surprising transformation.",
    prompt: "",
  },
  {
    id: 5,
    title: "Where the Wild Things Are",
    desc: "Max sails to where wild things are, learning about friendship.",
    prompt: "",
  },
  {
    id: 6,
    title: "Charlotte's Web",
    desc: "Wilbur the pig forms a deep friendship with a spider, Charlotte.",
    prompt: "",
  },
  {
    id: 7,
    title: "Winnie the Pooh and the Honey Hunt",
    desc: "Winnie the Pooh and friends seek honey in the Hundred Acre Wood.",
    prompt: "",
  },
  {
    id: 8,
    title: "Cinderella's Enchanted Ball",
    desc: "Cinderella dreams of the enchanted ball with glass slipper magic.",
    prompt: "",
  },

  {
    id: 9,
    title: "Matilda's Magical Library",
    desc: "Matilda discovers a magical library filled with wondrous stories.",
    prompt: "",
  },
];

const CreateStory = ({ email }: { email: string }) => {
  const [prompt, setPrompt] = React.useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["createdStory", email],
    queryFn: () => supabase.from("stories").select().eq("created_by", email),
    enabled: !!email,
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn: (newPrompt: { id: string; prompt: string; email: string }) => {
      return axios.post("/api/story", newPrompt);
    },
  });
  const router = useRouter();

  return (
    <div>
      {mutation.isPending ? (
        <Alert className="max-w-lg mx-auto mb-4">
          <SymbolIcon className="size-4 animate-spin" />
          <AlertTitle>Generating...</AlertTitle>
          <AlertDescription>
            Our AI agent is busy generating a story, image and audio for you.
            <br />
            It might take a while
          </AlertDescription>
        </Alert>
      ) : mutation.isError ? (
        <Alert variant="destructive" className="max-w-lg mx-auto mb-4">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong! Please try again
          </AlertDescription>
        </Alert>
      ) : null}

      <PromptForm
        onSubmit={(prompt) => {
          mutation.reset();
          mutation.mutate(
            { id: nanoid(), prompt, email },
            {
              onSuccess: (newData: any) => {
                console.log(newData);
                router.push(`/story/${newData.data.data[0].id}`);
              },
              onError: (error) => {
                console.log(error);
              },
            }
          );
        }}
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={mutation.isPending}
      />
      <div className="mt-6 md:mt-10 mb-4">
        <h2 className="mb-2 font-bold text-xl">Example prompts:</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
          {dummyPrompts.map((prompt) => (
            <button
              disabled={mutation.isPending}
              onClick={() => setPrompt(prompt.desc)}
              key={prompt.id}
            >
              <Card className="group">
                <CardContent className="p-4">
                  <CardHeader className="p-0 text-left group-hover:translate-x-1 transition-transform">
                    {prompt.title}
                  </CardHeader>
                  <CardDescription className="text-left group-hover:translate-x-1 transition-transform">
                    {prompt.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6">
        <h2 className=" font-bold text-xl mb-2">Your created stories</h2>
        {error ? (
          <p>Something went wrong! Please try again</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-40" />
              ))
            ) : (data as any).data.length === 0 ? (
              <p className="text-muted-foreground">You haven&#39;t created any stories yet!</p>
            ) : (
              (data as any).data.map((story: any) => (
                <StoryCard key={story.id} {...story} />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CreateStory;
