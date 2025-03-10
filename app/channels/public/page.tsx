import Header from "@/components/channels/public/header";
import List from "@/components/channels/public/List";
import React from "react";

function PublicChannelsPage() {
  return (
    <div className="p-6 space-y-8 flex flex-col h-full overflow-y-auto">
      <Header />
      <div className="grow">
        <List />
      </div>
    </div>
  );
}

export default PublicChannelsPage;
