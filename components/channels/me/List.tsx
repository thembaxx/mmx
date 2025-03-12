"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { ChannelResponse } from "@/types/types";
import { useChannelstore } from "@/stores/use-channel-store";

import ChannelList from "../channel-list";

function List() {
  const { setChannel } = useChannelstore();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ChannelResponse[]>([]);

  const fetchChannels = useCallback(async () => {
    setLoading(true);

    const res = await axios.get("/api/channel/me");

    if (res && res.status === 200) {
      const data = (res.data as ChannelResponse[]) ?? [];
      setItems(data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <ChannelList loading={loading} items={items} onSelect={setChannel} />
    </div>
  );
}

export default List;
