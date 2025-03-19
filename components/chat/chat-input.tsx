"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import Gallery from "./gallery";

import { AttachmentIcon, SendIcon } from "@/components/assets/icons";
import AttachmentPopup from "./attachment-popup";
import {
  ConnectionStatus,
  useChatConnection,
  useMessages,
  useOccupancy,
  useTyping,
} from "@ably/chat";
import { TypingIndicatorPanel } from "./typing-indicator";

const FormSchema = z.object({
  text: z.string(),
});

function ChatInput() {
  const [files, setFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(true);

  const { send } = useMessages();
  const { start, stop } = useTyping();
  const { currentStatus } = useChatConnection();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  const { presenceMembers } = useOccupancy({
    listener: (occupancyEvent) => {
      console.log("Number of users connected is: ", occupancyEvent.connections);
      console.log(
        "Number of members present is: ",
        occupancyEvent.presenceMembers
      );
    },
  });

  useEffect(() => {
    // disable the input if the connection is not established
    setShouldDisable(currentStatus !== ConnectionStatus.Connected);
  }, [currentStatus]);

  const handleStartTyping = () => {
    start().catch((error: unknown) => {
      console.error("Failed to start typing indicator", error);
    });
  };
  const handleStopTyping = () => {
    stop().catch((error: unknown) => {
      console.error("Failed to stop typing indicator", error);
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { text } = data;
    await send({ text });
  }

  function handleFilesChange(filesList: FileList | null) {
    if (!filesList) return;

    setFiles([...files, ...filesList]);
  }

  return (
    <div className="space-y-4 w-full">
      {files && files.length > 0 && (
        <Gallery
          files={files}
          onRemoveClick={(index) => {
            const copy = [...files];
            copy.splice(index, 1);
            setFiles(copy);
          }}
        />
      )}
      <div>
        <TypingIndicatorPanel />
      </div>
      <motion.div
        className={cn(
          "rounded-2xl shadow-2xs border bg-neutral-50 dark:bg-[#171717]",
          {
            "border-ring ring-ring/50 ring-[3px]": isFocused,
          }
        )}
      >
        <Form {...form}>
          <motion.form
            layout
            className="relative"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.75, type: "spring" }}
                      className="relative mr-24 h-20 w-full overflow-hidden"
                    >
                      <Textarea
                        placeholder="Type your message here"
                        className={cn(
                          "resize-none text-base bg-transparent border-none shadow-none rounded-none pt-3.5 h-full min-h-0 ring-0 text-wrap pr-10",
                          "dark:outline-none focus-visible:ring-0 focus-visible:outline-0"
                        )}
                        {...field}
                        disabled={shouldDisable}
                        onChange={(e) => {
                          field.onChange(e);

                          if (e.target.value && e.target.value.length > 0) {
                            handleStartTyping();
                          } else {
                            // For good UX we should stop typing indicators as soon as the input field is empty.
                            handleStopTyping();
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    </motion.div>
                  </FormControl>
                </FormItem>
              )}
            />
            <motion.div
              className="w-full flex justify-end items-center px-2 py-2 overflow-hidden"
              layout="position"
            >
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.75, type: "spring" }}
                  className="flex items-center grow gap-2"
                >
                  <AttachmentPopup handleFilesChange={handleFilesChange}>
                    <Button
                      className="h-8 w-8 dark:bg-[#333333E6]"
                      disabled={shouldDisable}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <AttachmentIcon className="!h-4 !w-4 p-0 text-icon" />
                    </Button>
                  </AttachmentPopup>
                  <div className="flex items-center gap-2 px-2.5 h-8 shrink-0 rounded-lg border">
                    <div className="flex items-center gap-2 h-8 rounded-md">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      <p className="text-[0.8rem] text-secondary-foreground/80">
                        {presenceMembers ?? 0}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <motion.div className="flex items-center h-full space-x-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-blue-700 rounded-xl shadow-doger-blue/10 shadow-lg text-white"
                    aria-label="Send button"
                    disabled={!form.watch("text") || shouldDisable}
                    type="submit"
                    size="icon"
                  >
                    <SendIcon className="!h-4 !w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
      {/* <motion.div
        className="flex items-center gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} whileTap={{ scale: 0.9 }}>
          <Button
            className="rounded-lg dark:bg-[#1E1E1E]"
            size="sm"
            variant="secondary"
          >
            <StickerIcon />
            <span className="text-xs mr-1">Stickers</span>
          </Button>
        </motion.div>
        <motion.div variants={item} whileTap={{ scale: 0.9 }}>
          <Button
            className="rounded-lg dark:bg-[#1E1E1E]"
            size="sm"
            variant="secondary"
          >
            <SimileCircleIcon />
            <span className="text-xs mr-1">Emoji</span>
          </Button>
        </motion.div>
        <motion.div variants={item} whileTap={{ scale: 0.9 }}>
          <Button
            className="rounded-lg dark:bg-[#1E1E1E]"
            size="sm"
            variant="secondary"
          >
            <AttachmentIcon />
            <span className="text-xs mr-1">Other</span>
          </Button>
        </motion.div>
      </motion.div> */}
    </div>
  );
}

export default ChatInput;
