import { ChannelResponse } from "@/types/types";
import { create } from "zustand";

interface ChannelStore {
  channel: ChannelResponse | null;
  channels: ChannelResponse[];
  setChannel: (channel: ChannelResponse) => void;
  setChannels: (channels: ChannelResponse[]) => void;
  clear: () => void;
}

export const useChannelstore = create<ChannelStore>((set) => ({
  channel: null,
  channels: [],
  setChannel: (channel) => set({ channel }),
  setChannels: (channels) => set({ channels }),
  clear: () => set({ channel: null, channels: [] }),
}));
