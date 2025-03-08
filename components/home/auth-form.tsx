"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Spinner from "../ui/spinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function AuthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState("");

  return (
    <div className="w-full space-y-3">
      <Input
        value={channelId}
        className="h-11 text-base placeholder:text-sm dark:bg-[#333333]"
        placeholder="Enter Channel id"
        type="text"
        name="username"
        onChange={(e) => {
          setChannelId(e.target.value);
        }}
      />
      <div className="space-y-2">
        <Button
          className="w-full relative"
          type="submit"
          size="sm"
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
        <Button
          className="w-full relative"
          type="button"
          size="sm"
          variant="secondary"
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
          <span>Public channels</span>
        </Button>
      </div>
    </div>
  );
}

export default AuthForm;
