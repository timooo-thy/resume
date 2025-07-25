"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { File, Menu } from "lucide-react";

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
import { DialogTitle } from "./ui/dialog";
import Image from "next/image";
// import { CommandBlock } from "./command-block";

const resumeSections = [
  { title: "Education", href: "/#education" },
  { title: "Experience", href: "/#experiences" },
  { title: "Projects", href: "/#projects" },
  { title: "Skills", href: "/#skills" },
  { title: "Awards", href: "/#awards" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center h-20 md:px-20 px-4">
        <div className="mr-4 hidden md:flex w-full justify-between">
          <div className="flex">
            <Link href="/" className="mr-2">
              <Image
                src="/icon.png"
                alt="Timothy's Portfolio"
                width={50}
                height={50}
                className="rounded-full"
              />
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
                            href="/Timothy_Resume.pdf"
                            download
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Resume
                            </div>
                            <div className="flex space-x-2 items-center">
                              <File className="h-8 w-8" />
                              <p className="text-sm leading-tight text-muted-foreground">
                                Click here to download
                              </p>
                            </div>
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
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href="/blog">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href="https://short.timooothy.me" target="_blank">
                      URL Shortener
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex space-x-4 justify-center items-center">
            {/* <CommandBlock /> */}
            <ModeToggle />
          </div>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <DialogTitle className="hidden">Sidebar</DialogTitle>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between w-full md:hidden">
              <Button
                variant="ghost"
                className="mx-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
              <Link href="/" className="mr-2">
                <Image
                  src="/icon.png"
                  alt="Timothy's Portfolio"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
              <ModeToggle />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <Image
                src="/icon.png"
                alt="Timothy's Portfolio"
                width={50}
                height={50}
                className="rounded-full"
              />
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex flex-col space-y-3">
                <MobileLink href="/blog" onOpenChange={setIsOpen}>
                  Blog
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
                <MobileLink
                  href="https://short.timooothy.me"
                  onOpenChange={setIsOpen}
                  target="_blank"
                >
                  URL Shortener
                </MobileLink>
                <MobileLink href="/contact" onOpenChange={setIsOpen}>
                  Contact
                </MobileLink>
                {/* <CommandBlock className="w-60" hideShortCut={true} /> */}
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
  target?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  target,
  ...props
}: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      target={target}
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
