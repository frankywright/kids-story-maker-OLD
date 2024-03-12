import WaveFormAudio from "@/components/WaveFormAudio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="my-10 text-center flex flex-col gap-2">
        <h1 className="font-bold text-4xl lg:text-6xl">
          Kid&#39;s Bedtime Story
        </h1>
        <p className="text-muted-foreground max-w-[500px] mx-auto">
          Stories, images and audio generated with the OpenAI Api. Try making
          your own stories
        </p>
      </section>
      <section>
        <Card className="overflow-hidden">
          <CardContent className="grid sm:grid-cols-2 p-0 gap-4">
            <Image
              className="w-full object-cover h-full"
              src="/cover.png"
              alt="cover image"
              width={500}
              height={500}
            />
            <div className="p-4">
              <div className="p-0 mb-2 font-bold flex items-center gap-2">
                <h2>TONIGHT&#39;S STORY</h2> <Badge>Now Playing</Badge>
              </div>
              <CardDescription className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                repudiandae minus esse fugit sed enim hic consectetur ratione,
                fugiat iusto expedita ut harum soluta! Earum error sint
                accusamus odit! Officiis facilis ab quod porro cumque, quam ipsa
                velit nulla adipisci incidunt deserunt ad natus, a illum cum
                laborum perferendis. Ab voluptatum ea cupiditate cumque dolores!
              </CardDescription>
              {/* <Button className="mt-4">Listen Now 3:42</Button> */}
              <WaveFormAudio />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="overflow-hidden group">
            <CardContent className="p-0 relative">
              <Image
                className="w-full object-cover"
                src="/cover.png"
                alt=""
                height={300}
                width={400}
              />
              <div className="absolute bottom-0 left-0 w-full text-left p-4 bg-background/80 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform flex justify-between">
                <div>
                  <h2 className="uppercase font-semibold">
                    Robinhood Bedtime Story
                  </h2>
                  <p className="text-muted-foreground">3.43</p>
                </div>
                <Button>Play</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
