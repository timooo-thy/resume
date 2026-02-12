"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { title: "Experience", href: "/#experiences" },
  { title: "Projects", href: "/#projects" },
  { title: "Blog", href: "/blog" },
  { title: "Resume", href: "/Timothy_Resume.pdf", external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <span className="font-display text-2xl font-semibold tracking-tight">
            Timothy Lee
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button asChild className="rounded-full px-6 font-medium" size="sm">
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center gap-2 md:hidden">
             <ModeToggle />
             <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
          </div>
         
          <SheetContent side="top" className="w-full h-full flex flex-col pt-24 px-6 bg-background/95 backdrop-blur-xl border-none">
            <SheetTitle className="sr-only">Menu</SheetTitle>
             {/* Close button is built-in to SheetContent but we can customize or let it be */}
            <div className="flex flex-col gap-8 items-center text-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  target={item.external ? "_blank" : undefined}
                  className="text-3xl font-display font-medium hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              ))}
              <div className="mt-8">
                <Button asChild className="rounded-full px-8 py-6 text-lg" size="lg">
                  <Link href="/#contact" onClick={() => setIsOpen(false)}>
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
