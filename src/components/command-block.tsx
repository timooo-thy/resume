"use client";

import { Command } from "@/components/ui/command";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { RobotIcon } from "@sanity/icons";
import { cn } from "@/lib/utils";

type CommandBlockProps = {
  className?: string;
  hideShortCut?: boolean;
};

export function CommandBlock({ className, hideShortCut }: CommandBlockProps) {
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <>
      <Button
        className={cn(
          "bg-current w-36 hover:bg-gray-100 dark:hover:bg-black px-2 border",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-muted-foreground text-xs font-extralight">
            Chat with AI...
          </span>
          <kbd
            className={`${hideShortCut && "hidden"} inline-flex pointer-events-none h-full select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100`}
          >
            <span className="text-xs">⌘</span> K
          </kbd>
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] h-full sm:max-h-[40dvh]">
          <DialogHeader>
            <DialogTitle>Chat with AI...</DialogTitle>
          </DialogHeader>
          <Command className="rounded-lg border shadow-md min-h-[90dvh] sm:min-h-[34dvh]">
            <div className="relative h-full">
              <div className="space-y-4 py-3 px-3 max-h-[calc(100%-3rem)] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                {messages.map((m) => (
                  <div key={m.id} className="whitespace-pre-wrap">
                    <div
                      className={`flex flex-col ${m.role === "user" && "items-end"} mb-2`}
                    >
                      <div className="mb-1 flex space-x-2">
                        {m.role === "assistant" && (
                          <RobotIcon className="w-5 h-5 mt-1" />
                        )}
                        <p
                          className={`${
                            m.role === "user"
                              ? "bg-primary text-white"
                              : "bg-gray-300/50 text-black"
                          } p-2.5 rounded-lg max-w-xs md:text-base`}
                        >
                          {m.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                className="w-full absolute bottom-0 z-20 bg-white p-2"
                onSubmit={handleSubmit}
              >
                <div className="flex items-center relative">
                  <Input
                    className="flex-grow h-12 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                  <Send
                    className="absolute right-3 ml-2 h-5 w-5 shrink-0 cursor-pointer text-primary/70 hover:text-primary"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
