"use client";

import { ArrowRightIcon, SearchIcon } from "@/components/assets/icons";
import Image from "next/image";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface Item {
  title: string;
  image: string;
}

const items: Item[] = [
  {
    title: "General",
    image: "/icons/megaphone.png",
  },
  {
    title: "Gaming",
    image: "/icons/joystick.png",
  },
  {
    title: "Movies",
    image: "/icons/film projector.png",
  },
  {
    title: "Art's & Culture",
    image: "/icons/backpack.png",
  },
  {
    title: "Fashion",
    image: "/icons/woman hat.png",
  },
  {
    title: "School",
    image: "/icons/backpack.png",
  },
  {
    title: "Astrology",
    image: "/icons/crystal ball.png",
  },
  {
    title: "Travel",
    image: "/icons/beach with umbrella.png",
  },
];

function List() {
  const [value, setValue] = useState("");

  const data = items.filter((c) =>
    c.title.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="space-y-8 h-full w-full flex flex-col">
      <header className="flex items-center relative">
        <div className="absolute left-0">
          <Label className="h-full w-12 flex items-center justify-center">
            <SearchIcon className="w-5 h-5 text-icon-secondary" />
          </Label>
        </div>
        <Input
          className="w-full h-10 text-base pl-11 dark:bg-[#1E1E1E] rounded-[12px]"
          value={value}
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
        />
      </header>
      <div className="space-y-4 grow flex flex-col">
        <h1 className="text-[0.8rem] font-semibold text-secondary-foreground/80">
          Channels
        </h1>
        {data.length > 0 && (
          <ul className="space-y-3 grow">
            {data.map(({ image, title }, index) => (
              <li key={index}>
                <Link
                  href={`${siteConfig.baseUrl}/chat?channelName=${title
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                >
                  <div className="flex items-center gap-3 h-12 pl-3 pr-4 dark:bg-[#121212] rounded-[16px]">
                    <Image src={image} alt="" height={28} width={28} />
                    <p className="font-semibold grow truncate leading-none mt-1 text-foreground/90">
                      {title}
                    </p>
                    <div>
                      <ArrowRightIcon className="h-5 w-5 text-icon" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {data.length === 0 && (
          <div className="flex flex-col gap-2 h-full items-center justify-center grow">
            <div className="p-4 opacity-60 flex flex-col items-center justify-center">
              <Image
                src="/empty_search.svg"
                alt="No messages"
                height={150}
                width={150}
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xl font-bold">No results found</p>
              <p className="text-xs text-secondary-foreground/70">
                No results for{" "}
                <span className="font-semibold text-foreground">“{value}”</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
