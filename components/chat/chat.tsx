"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Ably from "ably";
import { Message, MessageEventPayload, MessageEvents } from "@ably/chat";
import { useChatClient, useMessages } from "@ably/chat";

import ChatInput from "./chat-input";
import Image from "next/image";

import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { TypingIndicatorPanel } from "./typing-indicator";
import { Button } from "../ui/button";

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M13 4L20 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M14 22L22 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.5 16.5L9.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14.5 16.5L14.5 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

function Chat() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatClient = useChatClient();
  const clientId = chatClient.clientId;

  const { getPreviousMessages, deleteMessage, update } = useMessages({
    listener: (message: MessageEventPayload) => {
      switch (message.type) {
        case MessageEvents.Created: {
          setMessages((prevMessages) => {
            // if already exists do nothing
            const index = prevMessages.findIndex(
              (m) => m.serial === message.message.serial
            );
            if (index !== -1) {
              return prevMessages;
            }

            // if the message is not in the list, add it
            const newArray = [...prevMessages, message.message];

            // and put it at the right place
            newArray.sort((a, b) => (a.before(b) ? -1 : 1));

            return newArray;
          });
          break;
        }
        case MessageEvents.Deleted: {
          setMessages((prevMessage) => {
            const updatedArray = prevMessage.filter((m) => {
              return m.serial !== message.message.serial;
            });

            if (prevMessage.length === updatedArray.length) {
              return prevMessage;
            }

            return updatedArray;
          });
          break;
        }
        case MessageEvents.Updated: {
          handleUpdatedMessage(message.message);
          break;
        }
        default: {
          console.error("Unknown message", message);
        }
      }
    },
    onDiscontinuity: (discontinuity) => {
      console.log("Discontinuity", discontinuity);
      // reset the messages when a discontinuity is detected,
      // this will trigger a re-fetch of the messages
      setMessages([]);

      // set our state to loading, because we'll need to fetch previous messages again
      setLoading(true);

      // Do a message backfill
      backfillPreviousMessages(getPreviousMessages);
    },
  });

  const handleUpdatedMessage = (message: Message) => {
    setMessages((prevMessages) => {
      const index = prevMessages.findIndex((m) => m.serial === message.serial);
      if (index === -1) {
        return prevMessages;
      }

      // skip update if the received version is not newer
      if (!prevMessages[index].versionBefore(message)) {
        return prevMessages;
      }

      const updatedArray = [...prevMessages];
      updatedArray[index] = message;
      return updatedArray;
    });
  };

  const backfillPreviousMessages = (
    getPreviousMessages: ReturnType<typeof useMessages>["getPreviousMessages"]
  ) => {
    if (getPreviousMessages) {
      getPreviousMessages({ limit: 50 })
        .then((result: Ably.PaginatedResult<Message>) => {
          setMessages(result.items.filter((m) => !m.isDeleted).reverse());
          setLoading(false);
        })
        .catch((error: Ably.ErrorInfo) => {
          console.error(
            `Failed to backfill previous messages: ${error.toString()}`,
            error
          );
        });
    }
  };

  // useConnectionStateListener((stateChange) => {
  //   console.log(stateChange.current); // the new connection state
  //   console.log(stateChange.previous); // the previous connection state
  //   console.log(stateChange.reason); // if applicable, an error indicating the reason for the connection state change
  // });

  useEffect(() => {
    console.debug("updating getPreviousMessages useEffect", {
      getPreviousMessages,
    });
    backfillPreviousMessages(getPreviousMessages);
  }, [getPreviousMessages]);

  const handleRESTMessageUpdate = (updatedMessage: Message) => {
    setMessages((prevMessages) => {
      const index = prevMessages.findIndex(
        (m) => m.serial === updatedMessage.serial
      );
      if (index === -1) {
        return prevMessages;
      }
      if (updatedMessage.version <= prevMessages[index].version) {
        return prevMessages;
      }
      const updatedArray = prevMessages.slice();
      updatedArray[index] = updatedMessage;
      return updatedArray;
    });
  };

  const onUpdateMessage = useCallback(
    (message: Message) => {
      const newText = prompt("Enter new text");
      if (!newText) {
        return;
      }
      update(message, {
        text: newText,
        metadata: message.metadata,
        headers: message.headers,
      })
        .then((updatedMessage: Message) => {
          handleRESTMessageUpdate(updatedMessage);
        })
        .catch((error: unknown) => {
          console.warn("Failed to update message", error);
        });
    },
    [update]
  );

  const onDeleteMessage = useCallback(
    (message: Message) => {
      deleteMessage(message, { description: "deleted by user" }).then(
        (deletedMessage: Message) => {
          handleRESTMessageUpdate(deletedMessage);
        }
      );
    },
    [deleteMessage]
  );

  // Used to anchor the scroll to the bottom of the chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [messages, loading]);

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <div className="w-full grow">
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

        {messages.length > 0 && (
          <ul className="p-4">
            {messages.map((message) => {
              console.log(message.clientId === clientId);
              if (message.isDeleted) {
                return (
                  <li key={message.serial}>
                    <div>
                      This message was deleted.
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onUpdateMessage(message);
                        }}
                      >
                        Edit
                      </a>
                      .
                    </div>
                  </li>
                );
              }

              return (
                <li key={message.serial}>
                  <div className="space-y-2 w-full max-w-[75%]">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium grow pl-2">
                        {message.clientId}
                      </p>
                      <div className="flex items-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            onUpdateMessage(message);
                          }}
                        >
                          <EditIcon className="h-4 w-4 text-icon" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteMessage(message);
                          }}
                        >
                          <DeleteIcon className="h-4 w-4 text-icon" />
                        </Button>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "py-2 px-4 space-y-1 rounded-[10px] text-sm w-full dark:bg-[#1E1E1E]/75 text-foreground/90",
                        {
                          "bg-violet-500 dark:bg-violet-500 text-white":
                            message.clientId === clientId,
                        }
                      )}
                    >
                      <p>{message.text}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground text-left pl-2">
                        {message.timestamp && (
                          <span>
                            {formatDistanceToNow(new Date(message.timestamp), {
                              includeSeconds: true,
                            })}
                          </span>
                        )}{" "}
                        {message.isUpdated && message.updatedAt && (
                          <span>
                            • Edited {formatDistanceToNow(message.updatedAt)}
                          </span>
                        )}
                        {message.updatedBy && (
                          <span> by {message.updatedBy}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
            <div ref={messagesEndRef} />
          </ul>
        )}
      </div>
      <footer className="p-4 sticky bottom-0 left-0 w-full">
        <TypingIndicatorPanel />
        <ChatInput />
      </footer>
    </div>
  );
}

export default Chat;
