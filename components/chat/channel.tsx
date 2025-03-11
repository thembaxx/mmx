"use client";

import { useEffect } from "react";
import { AblyProvider, ChannelProvider } from "ably/react";

import Channels from "../channels/channels";
import { Button } from "../ui/button";
import { RssIcon } from "@/components/assets/icons";
import * as Ably from "ably";
import dynamic from "next/dynamic";
import { capitalize } from "@/lib/utils";
import { useChannelstore } from "@/stores/use-channel-store";

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
    autoConnect: true,
  });

  const { channel, channels, setChannel, setChannels } = useChannelstore();

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
  }, [setChannel]);

  return (
    <AblyProvider client={ablyClient}>
      <ChannelProvider channelName={channel}>
        <div className="flex flex-col h-full w-full relative overflow-hidden">
          <Channels
            channel={channel}
            channels={channels}
            onChange={updateChannelId}
            addChannel={(name) => setChannels([...channels, name])}
          >
            <Button
              className="shrink-0 pr-1 rounded-[8px] bg-black/[0.03] dark:bg-[#2E2E2E] flex w-[125px] fixed top-0 left-1/2 right-1/2 -translate-x-1/2 translate-y-1/2 z-50"
              size="sm"
              variant="secondary"
            >
              <RssIcon className="w-4 h-4 mr-1 text-icon" />
              <span>{`${
                channel && channel !== ""
                  ? capitalize(channel.replaceAll("-", " "))
                  : "Select a channel"
              }`}</span>
              <ArrowDownIcon className="ml-2" />
            </Button>
          </Channels>

          <div className="h-full w-full relative">
            <Chat channelName={channel} />
          </div>
        </div>
      </ChannelProvider>
    </AblyProvider>
  );
}

export default Channel;
