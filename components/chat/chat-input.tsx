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

import { GalleryIcon, SendIcon, SoundwaveIcon } from "@/config/icons";
import Voice from "./voice/voice";

const FormSchema = z.object({
  text: z.string(),
});

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

function ChatInput({ channel }: Props) {
  const [voiceIsOpen, setVoiceIsOpen] = useState(false);
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
                  <label htmlFor="file-upload">
                    <div className="flex items-center justify-center h-9 w-9 dark:bg-[#333333E6] rounded-full">
                      <GalleryIcon className="!h-4 !w-4 p-0 text-icon" />
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

                  <Voice isOpen={voiceIsOpen} setIsOpen={setVoiceIsOpen}>
                    <Button size="icon" type="button" variant="ghost">
                      <SoundwaveIcon className="!h-5 !w-5 p-0 text-icon" />
                    </Button>
                  </Voice>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md">
                    <UserIcon className="w-4 h-4 text-icon" />
                    <p className="text-[0.8rem] text-secondary-foreground">
                      {2}
                    </p>
                  </div>
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
              </AnimatePresence>
              <motion.div className="flex items-center h-full space-x-2">
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
