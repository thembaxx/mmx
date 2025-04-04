"use client";

interface Props {
  loading: boolean;
  items: ChannelResponse[];
  onSelect: (channel: ChannelResponse) => void;
}

import Image from "next/image";
import { Label } from "../ui/label";
import { SearchIcon } from "../assets/icons";
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
    <div className="space-y-4 h-full overflow-hidden">
      <header className="space-y-6 p-4 bg-gradient-to-t from-white to-[#F3F5F6]/60 dark:from-[#171717] dark:to-[#373737]/20 border shadow-[0_35px_60px_-20px_rgba(0,0,0,0.08)] rounded-2xl rounded-br-xl">
        <div className="text-left">
          <h1 className="font-medium text-pretty ">Channels</h1>
          <p className="text-[0.75rem] text-pretty max-w-xs text-[#646564]">
            Pulse messaging channels
          </p>
        </div>

        <div className="flex items-center relative bg-[#FCFCFC] dark:bg-[#8A8A8A] dark:border-none border border-[#D9D9D9] rounded-[12px] overflow-hidden">
          <div className="absolute left-0">
            <Label className="h-full w-12 flex items-center justify-center">
              <SearchIcon className="w-4 h-4 text-[#999999]" />
            </Label>
          </div>
          <Input
            disabled={loading}
            type="text"
            className="w-full h-10 text-base pl-10 bg-transparent border-none rounded-none dark:bg-[#1E1E1E] placeholder:text-[0.8rem]"
            value={value}
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </header>
      <div className="space-y-4 grow flex flex-col">
        {loading && <LoadingPlaceholder />}
        {!loading && (
          <>
            {data.length > 0 && (
              <ul className="grid grid-cols-2 gap-3">
                {data.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`${siteConfig.baseUrl}/chat?channelName=${item.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`}
                      onClick={() => onSelect(item)}
                    >
                      <div className="flex flex-col items-start bg-[#FCFCFC] border border-[#f7f7f8] dark:border-[#525252]/60 gap-2 p-4 dark:bg-[#191919] rounded-[16px]">
                        <div className="p-2 bg-[#f7f7f8] dark:bg-white/5 rounded-tr-[12px] rounded-b-[10px]">
                          <Image
                            src={item.iconSrc}
                            alt=""
                            height={28}
                            width={28}
                          />
                        </div>
                        <div className="space-y-1.5 mt-2">
                          <p className="font-medium w-full text-sm truncate leading-none text-foreground/90">
                            {item.name}
                          </p>
                          <p className="font-normal w-full text-[0.75rem] truncate leading-none text-[#646564]">
                            {item.type}
                          </p>
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
