"use client";

import React, { useState } from "react";
import { PromptForm } from "./prompt-form";
import { useMutation } from "@tanstack/react-query";
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

const CreateStories = () => {
  const [prompt, setPrompt] = React.useState("");

  const mutation = useMutation({
    mutationFn: (newPrompt: { id: string; prompt: string }) => {
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
            <br/>
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
            { id: nanoid(), prompt },
            {
              onSuccess: (newData: any) => {
                console.log(newData);
                router.push(`/stories/${newData.data.data[0].id}`);
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-6 md:mt-10 mb-4">
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
  );
};

export default CreateStories;
