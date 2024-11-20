"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { CommandBlock } from "./command-block";
import { DialogTitle } from "./ui/dialog";

const resumeSections = [
  { title: "Experience", href: "/resume/experience" },
  { title: "Education", href: "/resume/education" },
  { title: "Skills", href: "/resume/skills" },
  { title: "Projects", href: "/resume/projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex items-center h-16">
        <div className="mr-4 hidden md:flex w-full justify-between">
          <div className="flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Timothy's Portfolio
              </span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Resume
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className=" grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/resume"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Resume
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              View my professional experience, skills, and
                              achievements.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {resumeSections.map((section) => (
                        <ListItem
                          key={section.title}
                          title={section.title}
                          href={section.href}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex space-x-4">
            <CommandBlock />
            <ModeToggle />
          </div>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <DialogTitle className="hidden">Sidebar</DialogTitle>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <span className="font-bold">MyResumeBlog</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex flex-col space-y-3">
                <MobileLink href="/resume" onOpenChange={setIsOpen}>
                  Resume
                </MobileLink>
                {resumeSections.map((section) => (
                  <MobileLink
                    key={section.href}
                    href={section.href}
                    onOpenChange={setIsOpen}
                  >
                    {section.title}
                  </MobileLink>
                ))}
                <MobileLink href="/blog" onOpenChange={setIsOpen}>
                  Blog
                </MobileLink>
                <MobileLink href="/contact" onOpenChange={setIsOpen}>
                  Contact
                </MobileLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}