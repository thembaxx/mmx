"use client";

import { useState } from "react";
import { ChannelProvider } from "ably/react";
import Chat from "./chat";
import Channels from "./channels";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { RssIcon } from "@/config/icons";
import { ProfileMenu } from "./profile-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Channel() {
  const [channel, setChannel] = useState("first");
  const [channels, setChannels] = useState<string[]>([]);
  // #262626e6
  return (
    <ChannelProvider channelName={channel}>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-center items-center relative z-10 p-4">
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
          <div className="absolute right-4 z-10">
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
        </div>
        <div className="grow w-full relative">
          <Chat channelName={channel} />
        </div>
      </div>
    </ChannelProvider>
  );
}

export default Channel;
