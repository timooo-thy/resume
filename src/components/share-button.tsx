"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ShareIcon } from "lucide-react";

type ShareButtonProps = {
  title: string;
  url: string;
};

export default function ShareButton({ title, url }: ShareButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const shareData = {
      title,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          toast.error("Share canceled by the user");
        } else {
          toast.error("Error sharing the blog post");
        }
      }
    } else {
      toast.error("Web Share API not supported");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <ShareIcon />
      <span className="sr-only">Share Post</span>
    </Button>
  );
}
