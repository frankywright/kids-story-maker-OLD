"use client";

import { PromptForm } from "@/components/prompt-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";

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
    title: "The Jungle Book",
    desc: "Mowgli grows up in the jungle with animal friends and challenges.",
    prompt: "",
  },
  {
    id: 10,
    title: "Matilda's Magical Library",
    desc: "Matilda discovers a magical library filled with wondrous stories.",
    prompt: "",
  },
];

const CreateStories = () => {
    // const [prompt, setPrompt] = useState("")
  const [input, setInput] = useState("");

  return (
    <section className="mt-20 max-w-7xl mx-auto flex flex-col gap-8">
      <PromptForm
        onSubmit={async (value) => {
          console.log(value);
        }}
        input={input}
        setInput={setInput}
        isLoading={false}
      />

      <div className="grid grid-cols-4 gap-2">
        {dummyPrompts.map((prompt) => (
          <button onClick={() => setInput(prompt.desc)} key={prompt.id}>
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
    </section>
  );
};

export default CreateStories;
