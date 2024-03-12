import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-3">
        <Link href="/">
          <h2 className="font-bold text-lg">KidsStoryMaker</h2>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="link">All Stories</Button>
          </Link>
          <Link href="/create">
            {" "}
            <Button variant="link">Create Stories</Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
