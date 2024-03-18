import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const StoryCard = ({
  title,
  image_url,
  duration,
  id,
}: {
  title: string;
  image_url: string;
  duration: number;
  id: number;
}) => {
  return (
    <Card className="overflow-hidden group ">
      <CardContent className="p-0 relative max-h-[300px]">
        <Image
          className="w-full h-full object-cover"
          src={image_url}
          alt={title}
          height={300}
          width={400}
        />
        <div className="absolute bottom-0 left-0 w-full text-left p-4 bg-background/80 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform flex justify-between gap-2">
          <div className="truncate">
            <h2 className="uppercase font-semibold truncate">{title}</h2>
            <p className="text-muted-foreground">{duration}</p>
          </div>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={`/story/${id}`}
          >
            Listen Now
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
