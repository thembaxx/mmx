"use client";

import CreateChannelCard from "@/components/channels/create/card";

let channelName = "";
const params = new URLSearchParams(window.location.search);
if (params.has("channelName")) {
  channelName = params.get("channelName")!;
} else {
}

function CreateChannelPage() {
  return (
    <div className="p-6 h-full w-full space-y-6">
      <CreateChannelCard channelName={channelName} />
    </div>
  );
}

export default CreateChannelPage;
