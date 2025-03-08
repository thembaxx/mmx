"use client";

interface Props {
  channelName: string;
}

import { useState } from "react";
import ChatInput from "./chat-input";
import Image from "next/image";
import {
  useChannel,
  useConnectionStateListener,
  usePresenceListener,
} from "ably/react";
import { Message } from "ably";
import { formatDistanceToNow } from "date-fns";

function Chat({ channelName }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { presenceData } = usePresenceListener(channelName);

  // Convert presence data to list items to render
  const peers = presenceData.map((msg, index) => (
    <li key={index}>
      {msg.clientId}: {msg.data}
    </li>
  ));

  console.log(peers);

  useConnectionStateListener((stateChange) => {
    console.log(stateChange.current); // the new connection state
    console.log(stateChange.previous); // the previous connection state
    console.log(stateChange.reason); // if applicable, an error indicating the reason for the connection state change
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel(channelName, "default", (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  });

  return (
    <div className="w-full h-full bg-background">
      <div className="h-full w-full">
        {messages.length === 0 && (
          <div className="flex flex-col gap-4 h-full items-center justify-center">
            <div className="p-4 opacity-60 flex flex-col items-center justify-center">
              <Image
                src="/empty_no_items.svg"
                alt="No messages"
                height={192}
                width={192}
              />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xl font-bold">No messages yet</p>
              <p className="text-xs text-secondary-foreground/70">
                Text, attachments and audio
              </p>
            </div>
          </div>
        )}

        <ul className="p-4">
          {messages.map((message) => (
            <li key={message.id}>
              <div className="py-2 px-4 space-y-1 rounded-2xl max-w-[75%] dark:bg-[#1E1E1E]/75 text-foreground/90">
                <p>{message.data}</p>
                {message.timestamp && (
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.timestamp), {
                      includeSeconds: true,
                    })}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className="p-4 fixed bottom-0 left-0 w-full">
        <ChatInput channel={channel} />
      </footer>
    </div>
  );
}

export default Chat;
