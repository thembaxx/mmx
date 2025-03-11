import { create } from "zustand";

interface ChannelStore {
  channel: string;
  channels: string[];
  setChannel: (channel: string) => void;
  setChannels: (channels: string[]) => void;
  clear: () => void;
}

export const useChannelstore = create<ChannelStore>((set) => ({
  channel: "General",
  channels: [],
  setChannel: (channel) => set({ channel }),
  setChannels: (channels) => set({ channels }),
  clear: () => set({ channel: "", channels: [] }),
}));
