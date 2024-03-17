"use client";
import * as React from "react";
import Textarea from "react-textarea-autosize";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { Button } from "@/components/ui/button";
import { IconArrowElbow } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { SymbolIcon } from "@radix-ui/react-icons";

interface Props {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  prompt: string;
  setPrompt: Function;
}

export function PromptForm({ onSubmit, prompt, setPrompt, isLoading }: Props) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  // const [prompt, setPrompt] = React.useState("");

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!prompt?.trim()) {
          return;
        }
        setPrompt("");
        onSubmit(prompt);
      }}
      ref={formRef}
    >
      <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow border max-w-lg mx-auto rounded-[3rem] bg-gray-900 pl-2 shadow-2xl text-white pr-10">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a prompt to generate a story..."
          spellCheck={false}
          className="min-h-[50px] w-full resize-none bg-transparent px-4 py-4 focus-within:outline-none text-sm"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {}
          <Button
            className=""
            title="Send message"
            variant="ghost"
            type="submit"
            size="icon"
            disabled={isLoading || prompt === ""}
          >
            {isLoading ? (
              <>
                <SymbolIcon className="animate-spin" />
                <span className="sr-only">Loading</span>
              </>
            ) : (
              <>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
