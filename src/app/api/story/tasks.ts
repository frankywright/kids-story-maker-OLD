import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const PROMPT_COMMON = [
  {
    role: "system",
    content: `You are a helpful assistant who works with parents to create unique, engaging, age appropriate bedtime stories that help a child relax and fall asleep.

When given a prompt, you will create the story, generate a title for the story, generate a short summary, and generate an image prompt that will later be used to create a unique cover image for the story. The guidelines for the story are below.

When creating the story, follow these rules:
- it should be a soothing, uplifting tale appropriate to children of all ages.
- this story should be between 500 and 750 words long, DO NOT return stories outside of shorter or longer than this.
- If at all possible, create the story in the same language that the prompt is in. For example, if the user prompts in French, write the story in French. If you are unsure or do not support that language, default to English.

Once the story is created, generating a title that is less than 100 characters. When adding the title to the response, write only the title, do not add any explaination before or after in your response. Do not wrap the title in any punctuation.

For the summary, create a 1-2 sentence overview of the story that draws the reader in without giving away the entire story.

Declining Non-Story Requests: When prompted with a request that is not related to bedtime stories, you should respond with, "Sorry, I only tell bedtime stories."

Finally, create an image prompt following these directions:
- The prompt should create an image with a modern, simple, flat cartoon style that appeals to young children.
- IMPORTANT: make sure the prompt results in an image that is appropriate for children.
- Children can often spot an AI generated image, try to prevent that by keeping the image simple and not cluttering the scene up with too many concepts at once.
- Return ONLY the prompt, do not include any text that is not part of the prompt.

Once you have all this information, return it in a JSON string with the keys: title, story, summary, image_prompt. You MUST return valid JSON. Do NOT wrap the json output in \`\`\`json ... \`\`\`!
      `,
  },
  {
    role: "assistant",
    content: "What is the topic of tonight's bedtime story?",
  },
] as const;

export async function generateStoryFromPrompt(prompt: string, userId?: string) {
  const completion = await openai.chat.completions.create({
    response_format: { type: "json_object" },
    messages: [
      ...PROMPT_COMMON,
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-4-1106-preview",
    // Send the Nokkio user ID through per OpenAI's best practices
    // for safety: https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids
    user: userId,
  });

  const r = completion.choices[0].message.content;

  if (!r) {
    throw new Error("no response from API");
  }

  try {
    return JSON.parse(r) as {
      title: string;
      story: string;
      summary: string;
      image_prompt: string;
    };
  } catch (e) {
    console.log("parsing JSON from OpenAI failed", r);
    throw e;
  }
}

export function generateStory(story: any) {
  return generateStoryFromPrompt(story.prompt, story.userId);
}

export async function generateImage(story: any) {
  console.log("imagePrompt");
  console.log(story.imagePrompt);

  if (!story.imagePrompt) {
    throw new Error("story does not yet have an image prompt");
  }

  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: `In a vibrant, colorful, cinematic illustration style: ${story.imagePrompt}`,
    // prompt: `In a vibrant, colorful, cinematic illustration style: Illustrate a friendly robin wearing a tiny emerald cape, with a group of woodland animals working together to build a birdhouse, in a vibrant forest setting, using a modern, simple, flat cartoon style appropriate for young children.`,
    // size: "1792x1024",
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  console.log("image");
  console.log(image);
  const url = image.data[0].url;
  console.log("url");
  console.log(url);

  return image;
}

export async function generateAudio(story: any) {
  if (!story.text) {
    throw new Error("story does not yet have generated text");
  }

  const audio = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: story.text,
    // input: "Today is a wonderful day to build something people love!",
  });

  const buffer = Buffer.from(await audio.arrayBuffer());

  return buffer;
}
