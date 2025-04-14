"use client";

import { useState, useEffect } from "react";
import { ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600",
            "dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600",
            "text-white rounded-full shadow-lg p-3",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-orange-400/20 hover:shadow-xl",
            "active:scale-90"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
