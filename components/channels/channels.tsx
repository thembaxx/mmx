"use client";

interface Props {
  children: React.ReactNode;
}

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

import { capitalize, cn } from "@/lib/utils";
import { useChannelstore } from "@/stores/use-channel-store";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  RssIcon,
  SearchIcon,
  SolarCheckCircleBold,
} from "@/components/assets/icons";

import { ChannelResponse } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

const ReloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M15.1667 0.999756L15.7646 2.11753C16.1689 2.87322 16.371 3.25107 16.2374 3.41289C16.1037 3.57471 15.6635 3.44402 14.7831 3.18264C13.9029 2.92131 12.9684 2.78071 12 2.78071C6.75329 2.78071 2.5 6.90822 2.5 11.9998C2.5 13.6789 2.96262 15.2533 3.77093 16.6093M8.83333 22.9998L8.23536 21.882C7.83108 21.1263 7.62894 20.7484 7.7626 20.5866C7.89627 20.4248 8.33649 20.5555 9.21689 20.8169C10.0971 21.0782 11.0316 21.2188 12 21.2188C17.2467 21.2188 21.5 17.0913 21.5 11.9998C21.5 10.3206 21.0374 8.74623 20.2291 7.39023"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LoadingPlaceholder = () => (
  <div className="space-y-6 p-4">
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

function Channels({ children }: Props) {
  const router = useRouter();
  const { setChannels, setChannel, channel } = useChannelstore();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<ChannelResponse[]>([]);
  const [open, setOpen] = useState(false);

  const fetchChannels = useCallback(async () => {
    setLoading(true);

    const res = await axios.get("/api/channel/get");

    if (res && res.status === 200) {
      const data = (res.data as ChannelResponse[]) ?? [];
      setItems(data);
      setChannels(data);
    }

    setLoading(false);
  }, [setChannels]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[75svh] flex flex-col dark:bg-[#0A0A0A]">
        <DrawerHeader className="space-y-3">
          <DrawerTitle className="text-[0.8rem] opacity-75">
            Channels
          </DrawerTitle>

          <div className="flex items-center relative">
            <div className="absolute left-0">
              <Label className="h-full w-12 flex items-center justify-center">
                <SearchIcon className="w-5 h-5 text-icon-secondary" />
              </Label>
            </div>
            <Input
              disabled={loading || items.length === 0}
              className="w-full h-12 text-base pl-11 dark:bg-[#1E1E1E] rounded-[16px]"
              value={value}
              placeholder="Search"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {value !== "" && filtered.length === 0 && (
            <Button
              className="p-0 w-full"
              variant="ghost"
              onClick={() => {
                const channelName = value;
                setValue("");
                setOpen(false);
                router.push(`/channel/create?channelName=${channelName}`);
              }}
            >
              <div className="flex items-center p-3 rounded-xl w-full bg-secondary">
                <RssIcon className="h-5 w-5 text-icon" />
                <p className="text-sm ml-3 font-normal text-secondary-foreground/80">
                  Create channel{" "}
                  <span className="font-semibold text-foreground">{value}</span>
                </p>
              </div>
            </Button>
          )}
        </DrawerHeader>
        <div className="grow overflow-y-auto">
          {loading && <LoadingPlaceholder />}

          {!loading && (
            <>
              {items.length > 0 && filtered.length > 0 && (
                <ul className="flex flex-col h-full overflow-y-auto gap-3 p-4">
                  {filtered.map((item, index) => (
                    <li key={index}>
                      <div
                        className={cn(
                          "flex items-center py-3 dark:bg-[#121212] bg-[#fafafa] text-secondary-foreground border pr-4 pl-3 rounded-[16px]",
                          {
                            "text-foreground bg-blue-600/[0.08] dark:bg-blue-500/[0.08] ring-2 ring-blue-500/40 border-blue-600":
                              channel?.id === item.id,
                          }
                        )}
                        onClick={() => {
                          setChannel(item);
                          setOpen(false);
                        }}
                      >
                        <div className="h-6 w-6 flex items-center justify-center mr-3">
                          {!item.iconSrc && (
                            <RssIcon className="mr-3 h-5 w-5 text-icon" />
                          )}
                          {item.iconSrc && (
                            <Image
                              src={item.iconSrc}
                              alt=""
                              height={24}
                              width={24}
                            />
                          )}
                        </div>
                        <div className="grow flex items-center gap-2">
                          <p className="text-sm">
                            {capitalize(item.name.replaceAll("-", " "))}
                          </p>
                          <p className="text-[0.8rem] text-secondary-foreground/60">
                            {`(${capitalize(item.type)})`}
                          </p>
                        </div>
                        {channel?.id === item.id && (
                          <SolarCheckCircleBold className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {items.length === 0 && (
                <div className="flex flex-col h-full w-full items-center justify-center">
                  <Image
                    src="/empty_no_items.svg"
                    alt=""
                    height={108}
                    width={108}
                  />

                  <div className="pt-6 text-center">
                    <p className="font-bold">No channels found</p>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Try refreshing list
                    </p>
                    <div className="py-2 space-y-2">
                      <Button size="sm" variant="outline">
                        <ReloadIcon className="h-4 w-4 text-icon" />
                        <span>Refresh</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Channels;
