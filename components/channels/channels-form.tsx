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
  const [channelId, setChannelId] = useState("");

  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center w-full">
        <RssIcon className="w-5 h-5 absolute left-3 text-icon-secondary" />
        <Input
          value={channelId}
          className="h-11 text-base placeholder:text-sm dark:bg-[#333333] pl-10"
          placeholder="Enter Channel id"
          type="text"
          name="username"
          onChange={(e) => {
            setChannelId(e.target.value);
          }}
        />
      </div>
      <div className="space-y-2">
        <Button
          className="w-full relative"
          type="submit"
          onClick={() => {
            setLoading(true);

            if (channelId && channelId !== "") {
              router.replace(`/chat?channelId=${channelId}`);
            }

            setLoading(false);
          }}
        >
          {loading && (
            <div className="absolute left-3">
              <Spinner />
            </div>
          )}
          <span>Join channel</span>
        </Button>
      </div>
    </div>
  );
}

export default ChannelsForm;
