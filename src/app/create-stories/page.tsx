import CreateStories from "@/components/CreateStories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Story - Kids Story Maker",
  description:
    "Kids Bedtime Story. Stories, images, and audio generated with the OpenAI API. Try creating your own. Luna's Whispers in the Night.",
};

const Page = () => {
  return (
    <section className="mt-8 lg:mt-20 max-w-7xl mx-auto flex flex-col gap-8 px-4">
      <CreateStories />
    </section>
  );
};

export default Page;
