"use client";

import Channel from "@/components/chat/channel";
import { ablyClient } from "@/lib/ably-client";
import { AblyProvider } from "ably/react";

export default function Home() {
  return (
    <AblyProvider client={ablyClient}>
      <div className="h-full w-full">
        <Channel />
      </div>
    </AblyProvider>
  );
}
