"use client";

import React, { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { ModeToggle } from "./ModeToggle";
const MobileNavbar = ({ user }: { user: any }) => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  return (
    <Sheet open={isOpenSheet} onOpenChange={(v) => setIsOpenSheet(v)}>
      <SheetTrigger
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        {" "}
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-2 text-left max-w-fit">
        <Link
          className="mt-2"
          href="/"
          onClick={() => setIsOpenSheet(!isOpenSheet)}
        >
          <Button variant="link" className="pl-0">
            All Stories
          </Button>
        </Link>
        {user ? (
          <>
            <Link
              href="/create-stories"
              onClick={() => setIsOpenSheet(!isOpenSheet)}
            >
              {" "}
              <Button variant="link" className="pl-0">
                Create Stories
              </Button>
            </Link>
            <SignOutButton
              onCloseSheet={() => setIsOpenSheet(!isOpenSheet)}
              className="mb-4 mt-2"
            />
          </>
        ) : (
          <Link
            onClick={() => setIsOpenSheet(!isOpenSheet)}
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "mb-3 mt-1",
            })}
            href="/signin"
          >
            Sign in
          </Link>
        )}

        <ModeToggle onCloseSheet={() => setIsOpenSheet(!isOpenSheet)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
