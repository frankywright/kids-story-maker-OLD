"use client";
import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      onClick={async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        console.log(error);
        router.refresh();
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
