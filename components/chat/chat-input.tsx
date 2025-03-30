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
import ChannelMenu from "../navbar/channel-menu";

const RssConnectedIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M15.6563 6.87864C15.2824 6.70029 14.8348 6.85877 14.6564 7.23263C14.4781 7.60648 14.6366 8.05412 15.0104 8.23247L15.6563 6.87864ZM16.4444 8.66667L15.7983 9.04739C15.9389 9.28613 16.1998 9.42786 16.4766 9.41598C16.7534 9.4041 17.0012 9.24055 17.1209 8.99064L16.4444 8.66667ZM19.0222 6.54928C19.3869 6.35294 19.5234 5.8981 19.3271 5.53338C19.1307 5.16866 18.6759 5.03216 18.3112 5.2285L19.0222 6.54928ZM21.25 7C21.25 9.34721 19.3472 11.25 17 11.25V12.75C20.1756 12.75 22.75 10.1756 22.75 7H21.25ZM17 11.25C14.6528 11.25 12.75 9.34721 12.75 7H11.25C11.25 10.1756 13.8244 12.75 17 12.75V11.25ZM12.75 7C12.75 4.65279 14.6528 2.75 17 2.75V1.25C13.8244 1.25 11.25 3.82436 11.25 7H12.75ZM17 2.75C19.3472 2.75 21.25 4.65279 21.25 7H22.75C22.75 3.82436 20.1756 1.25 17 1.25V2.75ZM15.3333 7.55556C15.0104 8.23247 15.0102 8.23236 15.0099 8.23224C15.0098 8.2322 15.0096 8.23209 15.0094 8.23201C15.0091 8.23187 15.0088 8.23172 15.0085 8.23158C15.008 8.2313 15.0074 8.23104 15.0069 8.23079C15.0059 8.23029 15.005 8.22987 15.0043 8.2295C15.0028 8.22878 15.0019 8.22832 15.0015 8.22814C15.0008 8.22777 15.0022 8.22849 15.0056 8.23033C15.0125 8.23401 15.0271 8.24214 15.0482 8.25504C15.0904 8.28092 15.1574 8.32538 15.2383 8.39087C15.4003 8.52206 15.6137 8.73411 15.7983 9.04739L17.0906 8.28594C16.799 7.79101 16.4568 7.4475 16.1823 7.22519C16.045 7.11393 15.9235 7.03216 15.8318 6.97599C15.7859 6.94786 15.7472 6.92601 15.7174 6.90997C15.7026 6.90195 15.6899 6.89537 15.6796 6.89017C15.6745 6.88757 15.67 6.88531 15.6661 6.88339C15.6641 6.88244 15.6623 6.88156 15.6607 6.88077C15.6599 6.88037 15.6591 6.88 15.6584 6.87964C15.658 6.87946 15.6576 6.87929 15.6573 6.87912C15.6571 6.87904 15.6569 6.87892 15.6568 6.87888C15.6565 6.87876 15.6563 6.87864 15.3333 7.55556ZM16.4444 8.66667C17.1209 8.99064 17.1208 8.99074 17.1208 8.99084C17.1208 8.99086 17.1207 8.99095 17.1207 8.99099C17.1207 8.99108 17.1206 8.99113 17.1206 8.99115C17.1206 8.9912 17.1206 8.99112 17.1207 8.99091C17.1209 8.9905 17.1214 8.98959 17.1221 8.98819C17.1234 8.98539 17.1257 8.98065 17.129 8.97409C17.1354 8.96095 17.1456 8.94051 17.1593 8.91364C17.1866 8.85985 17.2278 8.78056 17.2811 8.68269C17.3883 8.4862 17.5425 8.2186 17.7307 7.93376C18.1295 7.33017 18.5986 6.77731 19.0222 6.54928L18.3112 5.2285C17.5331 5.64734 16.8911 6.48337 16.4792 7.10695C16.262 7.43569 16.086 7.74125 15.9642 7.96452C15.9032 8.07653 15.8552 8.16878 15.822 8.23405C15.8054 8.26671 15.7925 8.29268 15.7834 8.31107C15.7789 8.32027 15.7753 8.32757 15.7728 8.33288C15.7715 8.33554 15.7704 8.33769 15.7696 8.33933C15.7692 8.34015 15.7689 8.34084 15.7686 8.3414C15.7685 8.34168 15.7684 8.34193 15.7683 8.34215C15.7682 8.34225 15.7682 8.34239 15.7681 8.34245C15.7681 8.34257 15.768 8.3427 16.4444 8.66667Z"
      fill="currentColor"
    />
    <path
      d="M22.75 13.4937C22.75 13.0795 22.4142 12.7437 22 12.7437C21.5858 12.7437 21.25 13.0795 21.25 13.4937H22.75ZM20.5342 20.7543L21.0198 21.3258V21.3258L20.5342 20.7543ZM3.44705 6.23317L2.96137 5.66166H2.96137L3.44705 6.23317ZM12.9915 21.25C12.5773 21.25 12.2415 21.5858 12.2415 22C12.2415 22.4142 12.5773 22.75 12.9915 22.75V21.25ZM13.9925 21.9956L13.9871 21.2456L13.9806 21.2457L13.9925 21.9956ZM1.25025 10.9727C1.23966 11.3868 1.56675 11.731 1.98083 11.7416C2.39491 11.7522 2.73917 11.4251 2.74975 11.0111L1.25025 10.9727ZM9.26038 5.74991C9.67455 5.74352 10.0051 5.4026 9.99873 4.98844C9.99234 4.57427 9.65142 4.2437 9.23725 4.25009L9.26038 5.74991ZM21.25 13.4937C21.25 15.5235 21.2478 16.9573 21.076 18.0434C20.9098 19.0938 20.5995 19.7145 20.0485 20.1828L21.0198 21.3258C21.9347 20.5483 22.3573 19.5438 22.5576 18.2778C22.7522 17.0475 22.75 15.4739 22.75 13.4937H21.25ZM12.9915 22.75C13.3534 22.75 13.6053 22.7489 13.7674 22.7478C13.8485 22.7472 13.9071 22.7466 13.9457 22.7462C13.9651 22.746 13.9794 22.7458 13.9891 22.7457C13.9939 22.7456 13.9976 22.7456 14.0001 22.7455C14.0014 22.7455 14.0023 22.7455 14.0031 22.7455C14.0034 22.7455 14.0037 22.7455 14.0039 22.7455C14.004 22.7455 14.0041 22.7455 14.0042 22.7455C14.0042 22.7455 14.0043 22.7455 14.0043 22.7455C14.0043 22.7455 14.0043 22.7455 14.0043 22.7455C14.0043 22.7455 14.0044 22.7455 13.9925 21.9956C13.9806 21.2457 13.9806 21.2457 13.9806 21.2457C13.9806 21.2457 13.9807 21.2457 13.9807 21.2457C13.9807 21.2457 13.9807 21.2457 13.9807 21.2457C13.9807 21.2457 13.9807 21.2457 13.9806 21.2457C13.9806 21.2457 13.9805 21.2457 13.9803 21.2457C13.9799 21.2457 13.9792 21.2457 13.9782 21.2457C13.9763 21.2457 13.9732 21.2458 13.969 21.2458C13.9605 21.2459 13.9473 21.2461 13.9291 21.2463C13.8927 21.2467 13.8361 21.2473 13.757 21.2478C13.5988 21.2489 13.3503 21.25 12.9915 21.25V22.75ZM13.9979 22.7455C15.7037 22.7333 17.0832 22.6875 18.2019 22.5013C19.3334 22.313 20.2597 21.9718 21.0198 21.3258L20.0485 20.1828C19.5666 20.5923 18.9303 20.8594 17.9555 21.0217C16.9679 21.1861 15.6976 21.2333 13.9871 21.2456L13.9979 22.7455ZM2.74975 11.0111C2.81163 8.59113 3.08942 7.52134 3.93273 6.80467L2.96137 5.66166C1.55911 6.85335 1.31136 8.58282 1.25025 10.9727L2.74975 11.0111ZM9.23725 4.25009C6.33117 4.2949 4.34751 4.48368 2.96137 5.66166L3.93273 6.80467C4.84512 6.02929 6.25834 5.79621 9.26038 5.74991L9.23725 4.25009Z"
      fill="currentColor"
    />
    <path
      d="M2.98242 21H2.9914"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17.2349C4.49328 17.2349 6.77053 19.5 6.77053 21.9996M10 21.9996C10 17.5 5.99511 14 2.04522 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

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
    <div className="space-y-4 w-full h-full">
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
          "rounded-2xl shadow-2xs border bg-white dark:bg-[#171717]",
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
                      className="relative mr-24 h-24 w-full overflow-hidden"
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
            <motion.div className="flex items-center  space-x-2 z-10 absolute right-2 top-3">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-blue-700 rounded-full shadow-doger-blue/10 shadow-lg text-white"
                  aria-label="Send button"
                  disabled={!form.watch("text") || shouldDisable}
                  type="submit"
                  size="icon"
                >
                  <SendIcon className="!h-4 !w-4" />
                </Button>
              </motion.div>
            </motion.div>

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
                      className="h-8 w-8 bg-secondary dark:bg-[#333333E6]"
                      disabled={shouldDisable}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <AttachmentIcon className="!h-4 !w-4 p-0 text-icon" />
                    </Button>
                  </AttachmentPopup>
                  <div className="flex items-center gap-2 px-2.5 h-8 shrink-0 rounded-lg border dark:bg-[#1e1e1e]">
                    <div className="flex items-center gap-2 h-8 rounded-md">
                      {presenceMembers && presenceMembers > 0 ? (
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                      ) : undefined}
                      <p className="text-[0.8rem] text-secondary-foreground/80">
                        {presenceMembers}
                      </p>
                    </div>
                  </div>
                  <ChannelMenu>
                    <Button
                      className="h-8 w-8 p-0 bg-secondary dark:bg-[#333333E6]"
                      size="icon"
                      variant="ghost"
                    >
                      <RssConnectedIcon className="!w-4 !h-4 !text-icon" />
                    </Button>
                  </ChannelMenu>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
    </div>
  );
}

export default ChatInput;
