"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Ably from "ably";
import { Message, MessageEventPayload, MessageEvents } from "@ably/chat";
import { useChatClient, useMessages } from "@ably/chat";

import ChatInput from "./chat-input";
import Image from "next/image";

import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { PencilIcon, Trash } from "lucide-react";
import { TypingIndicatorPanel } from "./typing-indicator";

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
                  <div
                    className={cn(
                      "py-2 px-4 space-y-1 rounded-2xl max-w-[75%] dark:bg-[#1E1E1E]/75 text-foreground/90",
                      {
                        "bg-violet-700 text-white":
                          message.clientId === clientId,
                      }
                    )}
                  >
                    <p className="text-sm font-medium ">{message.clientId}</p>
                    <p>{message.text}</p>
                    {message.timestamp && (
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(message.timestamp), {
                          includeSeconds: true,
                        })}
                        —{" "}
                        {message.isUpdated && message.updatedAt ? (
                          <>
                            {" "}
                            &middot; Edited{" "}
                            <span className="sent-at-time">
                              <span className="short">
                                {formatDistanceToNow(message.updatedAt)}
                              </span>
                              <span className="long">
                                {message.updatedAt.toLocaleString()}
                              </span>
                            </span>
                            {message.updatedBy ? (
                              <span> by {message.updatedBy}</span>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    )}
                    <div
                      className="buttons"
                      role="group"
                      aria-label="Message actions"
                    >
                      <PencilIcon
                        className="cursor-pointer text-gray-100 m-1 hover:text-gray-500 inline-block"
                        onClick={(e) => {
                          e.preventDefault();
                          onUpdateMessage(message);
                        }}
                        aria-label="Edit message"
                      />
                      <Trash
                        className="cursor-pointer text-red-500 m-1 hover:text-red-700 inline-block"
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteMessage(message);
                        }}
                        aria-label="Delete message"
                      />
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
