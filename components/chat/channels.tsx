"use client";

interface Props {
  children: React.ReactNode;
  channel: string;
  channels: string[];
  onChange: (channel: string) => void;
  addChannel: (name: string) => void;
}

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
import { useState } from "react";
import { RssIcon, SearchIcon, SolarCheckCircleBold } from "@/config/icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

function Channels({
  children,
  channels,
  channel,
  addChannel,
  onChange,
}: Props) {
  const [value, setValue] = useState("");

  const items = channels.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[70svh]">
        <DrawerHeader className="space-y-3">
          <VisuallyHidden>
            <DrawerTitle>Channels</DrawerTitle>
          </VisuallyHidden>
          <div className="flex items-center relative">
            <div className="absolute left-0">
              <Label className="h-full w-12 flex items-center justify-center">
                <SearchIcon className="w-5 h-5 text-icon-secondary" />
              </Label>
            </div>
            <Input
              className="w-full h-12 text-base pl-11 dark:bg-[#1E1E1E] rounded-full"
              value={value}
              placeholder="Search"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {value !== "" && items.length === 0 && (
            <Button
              className="p-0 w-full"
              variant="ghost"
              onClick={() => addChannel(value)}
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
        <div className="grow">
          {channels.length > 0 && items.length > 0 && (
            <ul className="flex flex-col h-full overflow-y-auto p-4">
              {items.map((name, index) => (
                <li key={index}>
                  <div
                    className="flex items-center py-3"
                    onClick={() => onChange(name)}
                  >
                    <RssIcon className="mr-2" />
                    <p className="grow">{name}</p>
                    {channel === name && (
                      <SolarCheckCircleBold className="h-5 w-5" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {
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
                  Try adding a channel
                </p>
              </div>
            </div>
          }
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
