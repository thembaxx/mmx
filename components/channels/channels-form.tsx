"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Spinner from "../ui/spinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RssIcon } from "@/components/assets/icons";

function ChannelsForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [channelName, setChannelId] = useState("");

  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center w-full">
        <RssIcon className="w-4 h-4 absolute left-3 text-icon" />
        <Input
          value={channelName}
          className="h-11 text-base placeholder:text-sm dark:bg-[#333333] pl-9"
          disabled={loading}
          placeholder="Find channel"
          type="text"
          name="username"
          onChange={(e) => {
            setChannelId(e.target.value);
          }}
        />
      </div>
      <div className="space-y-2">
        <Button
          className="w-full relative text-white/90 bg-[#FF4121]"
          disabled={!channelName}
          type="submit"
          onClick={() => {
            setLoading(true);

            if (channelName && channelName !== "") {
              router.replace(`/chat?channelName=${channelName}`);
            }

            setLoading(false);
          }}
        >
          {loading && (
            <div className="absolute left-3">
              <Spinner variant="dark" />
            </div>
          )}
          <span>Join channel</span>
        </Button>
      </div>
    </div>
  );
}

export default ChannelsForm;
