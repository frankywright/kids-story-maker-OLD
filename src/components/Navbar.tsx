import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button, buttonVariants } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SignOutButton from "./SignOutButton";
import { createClient } from "@/utils/supabase/server";

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        <Link href="/">
          <h2 className="font-bold text-lg ">KidsStoryMaker</h2>
        </Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              {" "}
              <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-1 text-left max-w-fit">
              <Link href="/">
                <Button variant="link" className="pl-0">
                  All Stories
                </Button>
              </Link>
              <Separator />
              <Link href="/create-stories">
                {" "}
                <Button variant="link" className="pl-0">
                  Create Stories
                </Button>
              </Link>
              <Separator className="mb-2" />
              <ModeToggle />
            </SheetContent>
          </Sheet>
        </div>
        <div className="items-center gap-4 hidden md:flex">
          <Link href="/">
            <Button variant="link">All Stories</Button>
          </Link>
          {user ? (
            <>
              <Link href="/create-stories">
                {" "}
                <Button variant="link">Create Stories</Button>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              className={buttonVariants({ variant: "default", size: "sm" })}
              href="/login"
            >
              Login
            </Link>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
