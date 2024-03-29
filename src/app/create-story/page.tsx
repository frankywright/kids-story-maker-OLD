import CreateStory from "@/components/CreateStory";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Story - Kids Story Maker",
  description:
    "Kids Bedtime Story. Stories, images, and audio generated with the OpenAI API. Try creating your own. Luna's Whispers in the Night.",
};

const Page = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  

  if (!user) {
    return redirect("/signin");
  }

  console.log(user.email)

  return (
    <section className="mt-8 lg:mt-20 max-w-7xl mx-auto flex flex-col gap-8 px-4">
      <CreateStory email={user.email as string} />
    </section>
  );
};

export default Page;
