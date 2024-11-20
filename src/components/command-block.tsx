"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DialogTitle } from "./ui/dialog";

export function CommandBlock() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Button
        className="bg-current w-36 hover:bg-gray-100 px-2 border"
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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">Chat with AI</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
