"use client";

interface Props {
  channel: RealtimeChannel;
}

import { useState } from "react";
import { RealtimeChannel } from "ably";
import { AnimatePresence, motion } from "motion/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import Gallery from "./gallery";

import {
  CompactIcon,
  ExpandIcon,
  GalleryIcon,
  SendIcon,
  SoundwaveIcon,
} from "@/config/icons";

const FormSchema = z.object({
  text: z.string(),
});

// const container = {
//   hidden: { opacity: 0, x: 48 },
//   show: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const item = {
//   hidden: { opacity: 0, x: 16, scale: 0.8 },
//   show: { opacity: 1, x: 0, scale: 1 },
// };

function ChatInput({ channel }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { text } = data;
    await channel.publish("first", text);
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
      <motion.div
        className={cn(
          "rounded-2xl shadow-2xs border bg-neutral-50 dark:bg-neutral-900",
          {
            "ring-4 outline-1 ring-blue-600/20 outline-blue-600/40": isFocused,
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
                      className={cn("h-13 relative z-20 mr-24", {
                        "resize-y h-32 mr-0 mb-16": isOpen,
                      })}
                    >
                      <Textarea
                        placeholder="Type your message here"
                        className={cn(
                          "resize-none text-base bg-transparent border-none shadow-none rounded-none pt-3.5 h-full min-h-0 ring-0 dark:outline-none focus-visible:ring-0 focus-visible:outline-0 pb-0 pr-10",
                          {
                            "resize-y pr-0": isOpen,
                          }
                        )}
                        {...field}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    </motion.div>
                  </FormControl>
                </FormItem>
              )}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-full flex justify-end items-center px-2 py-2 overflow-hidden"
              layout="position"
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.75, type: "spring" }}
                    className="flex items-center grow gap-2"
                  >
                    <label htmlFor="file-upload">
                      <div className="flex items-center justify-center h-9 w-9">
                        <GalleryIcon className="!h-5 !w-5 p-0 text-icon" />
                        <input
                          multiple
                          accept="image/*"
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={(e) => handleFilesChange(e.target.files)}
                        />
                      </div>
                    </label>

                    <Button size="icon" type="button" variant="ghost">
                      <SoundwaveIcon className="!h-5 !w-5 p-0 text-icon" />
                    </Button>
                    {/* <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500 h-8 w-8 ml-2 rounded-full"
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <AiIcon className="!h-4 !w-4 p-0 text-white" />
                      </Button>
                    </motion.div> */}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div className="flex items-center h-full space-x-2">
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {!isOpen && (
                    <ExpandIcon className="!h-5 !w-5 p-0 text-icon" />
                  )}
                  {isOpen && <CompactIcon className="!h-5 !w-5 p-0" />}
                </Button>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-blue-700 rounded-xl shadow-doger-blue/10 shadow-lg text-white"
                    aria-label="Send button"
                    disabled={!form.watch("text")}
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
