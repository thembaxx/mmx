"use client";

interface Props {
  loading: boolean;
  items: ChannelResponse[];
  onSelect: (channel: ChannelResponse) => void;
}

import Image from "next/image";
import { Label } from "../ui/label";
import { ArrowRightIcon, SearchIcon } from "../assets/icons";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { ChannelResponse } from "@/types/types";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useState } from "react";

const LoadingPlaceholder = () => (
  <div className="space-y-6 py-4">
    {new Array(7).fill(0).map((_, index) => (
      <div key={index} className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2 grow">
          <Skeleton className="h-2 w-[80%]" />
          <Skeleton className="h-2 w-[70%]" />
        </div>
      </div>
    ))}
  </div>
);

function ChannelList({ loading, items, onSelect }: Props) {
  const [value, setValue] = useState("");

  const data = items.filter((c) =>
    c.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="space-y-8 h-full w-full flex flex-col overflow-hidden">
      <header className="flex items-center relative">
        <div className="absolute left-0">
          <Label className="h-full w-12 flex items-center justify-center">
            <SearchIcon className="w-5 h-5 text-icon-secondary" />
          </Label>
        </div>
        <Input
          disabled={loading}
          type="text"
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
        {loading && <LoadingPlaceholder />}
        {!loading && (
          <>
            {data.length > 0 && (
              <ul className="space-y-3 grow overflow-y-auto">
                {data.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`${siteConfig.baseUrl}/chat?channelName=${item.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`}
                      onClick={() => onSelect(item)}
                    >
                      <div className="flex items-center gap-3 h-12 pl-3 pr-4 dark:bg-[#191919] rounded-[16px]">
                        <Image
                          src={item.iconSrc}
                          alt=""
                          height={28}
                          width={28}
                        />
                        <p className="font-semibold grow truncate leading-none mt-1 text-foreground/90">
                          {item.name}
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
                    <span className="font-semibold text-foreground">
                      “{value}”
                    </span>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ChannelList;
