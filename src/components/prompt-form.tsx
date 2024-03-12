"use client";
import * as React from "react";
import Textarea from "react-textarea-autosize";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { Button } from "@/components/ui/button";
import { IconArrowElbow } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <TooltipProvider>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input?.trim()) {
            return;
          }
          setInput("");
          await onSubmit(input);
        }}
        ref={formRef}
      >
        <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow border max-w-lg mx-auto rounded-[3rem] bg-gray-900 pl-2 shadow-2xl text-white pr-10">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a prompt to generate a story..."
            spellCheck={false}
            className="min-h-[50px] w-full resize-none bg-transparent px-4 py-4 focus-within:outline-none sm:text-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Button 
            className=""
              title="Send message"
              variant="ghost"
              type="submit"
              size="icon"
              disabled={isLoading || input === ""}
            >
              <IconArrowElbow />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </form>
    </TooltipProvider>
  );
}
