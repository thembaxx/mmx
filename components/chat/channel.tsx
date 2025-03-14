"use client";

import { useEffect } from "react";
import { AblyProvider } from "ably/react";
import {
  ChatClient,
  LogLevel,
  ChatClientProvider,
  RoomOptionsDefaults,
} from "@ably/chat";
import { ChatRoomProvider } from "@ably/chat";
import * as Ably from "ably";

import Channels from "../channels/channels";
import { Button } from "../ui/button";
import { PlusSignSquareIcon, RssIcon } from "@/components/assets/icons";
import dynamic from "next/dynamic";
import { capitalize } from "@/lib/utils";
import { useChannelstore } from "@/stores/use-channel-store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ConnectionStatusComp from "./connection-status-comp";
import { Separator } from "../ui/separator";

const Chat = dynamic(() => Promise.resolve(import("@/components/chat/chat")), {
  ssr: false,
});

const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const realtimeClient = new Ably.Realtime({
  authUrl: "/api/ably",
});

const chatClient = new ChatClient(realtimeClient, { logLevel: LogLevel.Info });

function Channel() {
  const { channel, setChannel } = useChannelstore();

  useEffect(() => {
    const handlePopState = async () => {
      const params = new URLSearchParams(window.location.search);
      const value = params.get("channelName");
      history.pushState(null, "", "?" + params.toString());
      try {
        const res = await axios.get("/api/channel/get", {
          data: {
            channelName: value,
          },
        });
        setChannel(res?.data?.[0]);
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setChannel]);

  if (!channel) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-full max-w-sm flex flex-col justify-center items-center">
          <Image src="/warning.svg" alt="" height={96} width={96} />
          <div className="text-center mt-8">
            <h1 className="text-xl font-bold">No channel selected</h1>
            <p className="text-sm text-secondary-foreground/85">
              Create or select a channel
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Channels>
              <Button size="sm" variant="secondary">
                <ArrowDownIcon className="w-4 h-4 text-icon" />
                <span>Select a channel</span>
              </Button>
            </Channels>

            <Button size="sm" variant="outline">
              <PlusSignSquareIcon className="w-4 h-4 text-icon" />
              <span>Create a channel</span>
            </Button>
            <Link
              className="text-sm font-medium underline text-center"
              href="/channels/public"
            >
              Public channels
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AblyProvider client={realtimeClient}>
      <ChatClientProvider client={chatClient}>
        <ChatRoomProvider
          id={channel.name}
          release={true}
          attach={true}
          options={RoomOptionsDefaults}
        >
          <div className="flex flex-col h-full w-full relative overflow-hidden">
            <Channels>
              <Button
                className="shrink-0 pl-1.5 pr-0 gap-0 rounded-[10px] bg-black/[0.03] dark:bg-[#2E2E2E] flex items-center w-fit fixed top-0 left-1/2 right-1/2 -translate-x-1/2 translate-y-1/2 z-50"
                size="sm"
                variant="secondary"
              >
                <div className="h-8 w-8 shrink-0 flex items-center justify-center">
                  {!channel.iconSrc && (
                    <RssIcon className="w-4 h-4 text-icon" />
                  )}
                  {channel.iconSrc && (
                    <Image
                      src={channel.iconSrc}
                      alt=""
                      height={20}
                      width={20}
                    />
                  )}
                </div>

                <div className="space-x-3 flex items-center justify-center ">
                  <span className="text-[0.8rem]">
                    {capitalize(channel.name.replaceAll("-", " "))}
                  </span>
                  <ConnectionStatusComp />
                </div>
                <Separator
                  className="dark:bg-[#3a3a3a] ml-4"
                  orientation="vertical"
                />
                <div className="h-8 w-8 flex items-center justify-center shrink-0">
                  <ArrowDownIcon className="w-4 h-4 text-icon" />
                </div>
              </Button>
            </Channels>

            <div className="h-full w-full relative">
              <Chat />
            </div>
          </div>
        </ChatRoomProvider>
      </ChatClientProvider>
    </AblyProvider>
  );
}

export default Channel;
