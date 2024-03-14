import { supabase } from "@/lib/supabase";
import { generateAudio, generateImage, generateStory } from "./tasks";
import { nanoid } from "nanoid";
import axios from "axios";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as { prompt: string; id: string };
    console.log(body);

    const {
      story,
      title,
      summary,
      image_prompt: imagePrompt,
    } = await generateStory({ prompt: body.prompt, userId: body.id });

    console.log(story);
    console.log("--------------");
    console.log(title);
    console.log("--------------");
    console.log(summary);
    console.log("--------------");
    console.log(imagePrompt);

    const [image, audioBuffer] = await Promise.all([
      generateImage({ imagePrompt: imagePrompt }),
      generateAudio({ text: story }),
    ]);

    const imageUrl = image.data[0].url;

    if (!imageUrl) {
      throw new Error("error generating image");
    }

    const imageData = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      // timeout: 300000,
    });

    const imageBuffer = Buffer.from(imageData.data);

    const [imageRes, audioRes] = await Promise.all([
      supabase.storage.from("story").upload("image/" + nanoid(), imageBuffer, {
        contentType: "image/png",
      }),
      supabase.storage.from("story").upload("audio/" + nanoid(), audioBuffer, {
        contentType: "audio/mpeg",
      }),
    ]);

    console.log("imageRes");
    console.log(imageRes);
    console.log("audioRes");
    console.log(audioRes);

    if (imageRes.error || audioRes.error) {
      console.log(imageRes.error);
      console.log(audioRes.error);
      throw new Error("Something went wrong while uploading image and audio");
    }

    const { data, error } = await supabase
      .from("story")
      .insert([
        {
          user_id: body.id,
          prompt: body.prompt,
          image_prompt: imagePrompt,
          title,
          story_text: story,
          summary,
          duration: 3.0,
          audio_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/story/${audioRes.data.path}`,
          image_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/story/${imageRes.data.path}`,
        },
      ])
      .select();

    console.log("dataaaaa");
    console.log(data);

    if (error) {
      console.log(error);
      throw new Error("Something went wrong while storing the data to db");
    }

    // await generateAudio({ text: story });
    // await generateAudio({ text: "story" });

    // await generateImage({ imagePrompt: "imagePrompt" });
    // await generateImage({ imagePrompt: imagePrompt });

    // console.log("--------------");
    // console.log(image);
    // console.log("--------------");
    // console.log(audio);

    return Response.json({ data: data }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
};


