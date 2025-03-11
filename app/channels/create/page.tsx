"use client";

import CreateChannelCard from "@/components/channels/create/card";

function CreateChannelPage() {
  let channelName = "";
  const params = new URLSearchParams(window.location.search);
  if (params.has("channelName")) {
    channelName = params.get("channelName")!;
  } else {
  }

  return (
    <div className="p-6 h-full w-full space-y-6">
      <CreateChannelCard channelName={channelName} />
    </div>
  );
}

export default CreateChannelPage;
