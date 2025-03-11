"use client";
import { useSearchParams } from "next/navigation";

import CreateChannelCard from "@/components/channels/create/card";
import { Suspense } from "react";

function CreateChannelPage() {
  let channelName = "";
  const params = useSearchParams();
  if (params.has("channelName")) {
    channelName = params.get("channelName")!;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-6 h-full w-full space-y-6">
        <CreateChannelCard channelName={channelName} />
      </div>
    </Suspense>
  );
}

export default CreateChannelPage;
