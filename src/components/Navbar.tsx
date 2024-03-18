import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button, buttonVariants } from "./ui/button";

import SignOutButton from "./SignOutButton";
import { createClient } from "@/utils/supabase/server";
import MobileNavbar from "./MobileNavbar";

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
          <MobileNavbar user={user} />
        </div>
        <div className="items-center hidden md:flex gap-6">
          <Link className="p-0 m-0" href="/">
            <Button className="p-0 m-0" variant="link">
              All Stories
            </Button>
          </Link>
          <Link className="p-0 m-0" href="/create-story">
            {" "}
            <Button className="p-0 m-0" variant="link">
              Create Story
            </Button>
          </Link>
          {user ? (
            <SignOutButton />
          ) : (
            <Link
              className={buttonVariants({ variant: "default", size: "sm" })}
              href="/signin"
            >
              Sign in
            </Link>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
