"use client";

const Chat = dynamic(() => Promise.resolve(import("@/components/chat/chat")), {
  ssr: false,
});

import { useState } from "react";
import { AblyProvider, ChannelProvider } from "ably/react";

import Channels from "./channels";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { QrCodeIcon, RssIcon } from "@/config/icons";
import { ProfileMenu } from "./profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import QrDialog from "./qr-dialog";
import { ablyClient } from "@/lib/ably-client";
import dynamic from "next/dynamic";

function Channel() {
  const [channel, setChannel] = useState("default");
  const [channels, setChannels] = useState<string[]>([]);

  return (
    <AblyProvider client={ablyClient}>
      <ChannelProvider channelName={channel}>
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-between items-center relative z-10 p-4">
            <QrDialog channel={channel}>
              <Button size="icon" variant="ghost">
                <QrCodeIcon className="!w-6 !h-6 text-icon" />
              </Button>
            </QrDialog>
            <Channels
              channel={channel}
              channels={channels}
              onChange={setChannel}
              addChannel={(name) => setChannels((prev) => [...prev, name])}
            >
              <Button
                className="shrink-0 pr-1 rounded-full"
                size="sm"
                variant="secondary"
              >
                <RssIcon className="w-4 h-4 text-icon" />
                <span>{`${
                  channel && channel !== "" ? channel : "Select a channel"
                }`}</span>
                <Badge className="rounded-full ml-3 -mr-1">
                  {channels.length}
                </Badge>
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
