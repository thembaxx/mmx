"use client";

import { useEffect, useState } from "react";
import { AblyProvider, ChannelProvider } from "ably/react";

import Channels from "./channels";
import { Button } from "../ui/button";
import { QrCodeIcon, RssIcon } from "@/config/icons";
import { ProfileMenu } from "./profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import QrDialog from "./qr-dialog";
import * as Ably from "ably";
import dynamic from "next/dynamic";

const Chat = dynamic(() => Promise.resolve(import("@/components/chat/chat")), {
  ssr: false,
});

let channelId: string;
(function () {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("channelId")) {
    channelId = "default";
    params.set("channelId", channelId);
    history.replaceState(null, "", "?" + params.toString());
  } else {
    channelId = params.get("channelId")!;
  }
})();

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

function Channel() {
  const ablyClient = new Ably.Realtime({
    authUrl: "/api/ably",
    autoConnect: false,
  });

  const [channel, setChannel] = useState(channelId);
  const [channels, setChannels] = useState<string[]>([channelId]);

  const updateChannelId = (channel: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("channelId", channel);
    history.pushState(null, "", "?" + params.toString());
    setChannel(channel);
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const channel = params.get("channelId") || "default";
      setChannel(channel);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <AblyProvider client={ablyClient}>
      <ChannelProvider channelName={channel}>
        <div className="flex flex-col h-full w-full relative overflow-y-auto">
          <div className="flex justify-between items-center sticky top-0 w-full z-20 p-4 bg-neutral-100/70 dark:bg-[#191919]">
            <QrDialog channel={channel}>
              <Button size="icon" variant="ghost">
                <QrCodeIcon className="!w-6 !h-6 !dark:text-icon" />
              </Button>
            </QrDialog>
            <Channels
              channel={channel}
              channels={channels}
              onChange={updateChannelId}
              addChannel={(name) => setChannels((prev) => [...prev, name])}
            >
              <Button
                className="shrink-0 pr-1 rounded-full bg-black/[0.03] dark:bg-[#2E2E2E]"
                size="sm"
                variant="secondary"
              >
                <RssIcon className="w-4 h-4 mr-1 text-icon" />
                <span>{`${
                  channel && channel !== "" ? channel : "Select a channel"
                }`}</span>
                <ArrowDownIcon className="ml-2" />
              </Button>
            </Channels>

            <ProfileMenu>
              <div className="h-9 w-9 relative">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`https://www.tapback.co/api/avatar/user55?color=3`}
                    alt={"Themba Mndebele"}
                  />
                  <AvatarFallback className="text-xs uppercase">
                    TP
                  </AvatarFallback>
                </Avatar>
              </div>
            </ProfileMenu>
          </div>
          <div className="grow w-full relative">
            <Chat channelName={channel} />
          </div>
        </div>
      </ChannelProvider>
    </AblyProvider>
  );
}

export default Channel;
