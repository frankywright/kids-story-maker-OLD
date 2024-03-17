"use client";
import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const SignOutButton = ({
  className,
  onCloseSheet,
}: {
  className?: string;
  onCloseSheet?: Function;
}) => {
  const router = useRouter();
  return (
    <Button
      className={className || ""}
      size="sm"
      onClick={async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        console.log(error);
        router.refresh();
        onCloseSheet && onCloseSheet();
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
