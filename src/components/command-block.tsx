"use client";

import { Command } from "@/components/ui/command";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Send, UserIcon } from "lucide-react";
import { RobotIcon } from "@sanity/icons";

export function CommandBlock() {
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
        className="bg-current w-36 hover:bg-gray-100 dark:hover:bg-black px-2 border"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-muted-foreground text-xs font-extralight">
            Chat with AI...
          </span>
          <kbd className="pointer-events-none inline-flex h-full select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Chat with AI...</DialogTitle>
          </DialogHeader>
          <Command className="rounded-lg border shadow-md p-1">
            <form className="relative" onSubmit={handleSubmit}>
              <Input
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
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
              <Send className="mr-2 h-4 w-4 shrink-0 opacity-50 absolute right-1.5 bottom-4 cursor-pointer" />
            </form>
            <div className="space-y-4 py-3 px-5 mr-0 min-h-[100px] max-h-[300px] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
              {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                  <div
                    className={`flex flex-col ${m.role === "user" && "items-end"} mb-2`}
                  >
                    <div
                      className={`${
                        m.role === "user" ? "text-right mr-2" : "text-left"
                      } mb-1`}
                    >
                      {m.role === "user" ? (
                        <UserIcon className="w-5 h-5" />
                      ) : (
                        <RobotIcon className="w-5 h-5" />
                      )}
                    </div>
                    <p
                      className={`${
                        m.role === "user"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-300/50 text-black"
                      } p-3 rounded-xl max-w-xs text-sm`}
                    >
                      {m.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
