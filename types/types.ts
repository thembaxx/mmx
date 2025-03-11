export interface ChannelIcon {
  label: string;
  src: string;
}

export interface ChannelResponse {
  id: string;
  createdBy: string;
  name: string;
  isPrivate: boolean;
  iconSrc: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
