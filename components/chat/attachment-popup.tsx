interface Props {
  children: React.ReactNode;
  handleFilesChange: (filesList: FileList | null) => void;
}

import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import Voice from "./voice/voice";

import {
  AiIcon,
  DocumentAttachmentIcon,
  ImageIcon,
  SoundwaveIcon,
  VideoIcon,
} from "@/components/assets/icons";

function AttachmentPopup({ children, handleFilesChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceIsOpen, setVoiceIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="space-y-2">
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle className="text-xs text-muted-foreground">
              Attachments
            </DrawerTitle>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="space-y-3">
          <div className="p-3">
            <Button
              className="text-white/90 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-[10px] w-full"
              size="sm"
              variant="ghost"
            >
              <AiIcon className="!h-4 !w-4 p-0 text-white" />
              <p>AI assistant</p>
            </Button>
          </div>
          <div className="w-full px-3 space-y-2">
            <Button className="relative cursor-default select-none outline-none h-auto w-full focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-start gap-2 px-2 py-2 rounded-md text-xs last:mb-0 transition-colors duration-200 !bg-opacity-90 dark:!bg-opacity-90 !bg-[#2D2D2D] dark:!bg-[#333333] !text-white hover:!text-white hover:!bg-[#1a1a1a] dark:hover:!bg-[#444444]">
              <ImageIcon className="!h-4.5 !w-4.5 p-0 text-icon" />
              <div className="grow text-left">
                <div className="font-semibold text-sm">
                  <label htmlFor="file-upload">
                    <p>Upload an image</p>
                    <div>
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
                </div>
                <div className="text-xs opacity-70">upload jpeg, png etc.</div>
              </div>
            </Button>
            <Button
              disabled
              className="relative cursor-default select-none outline-none h-auto w-full focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-start gap-2 px-2 py-2 rounded-md text-xs last:mb-0 transition-colors duration-200 !bg-opacity-90 dark:!bg-opacity-90 !bg-[#2D2D2D] dark:!bg-[#333333] !text-white hover:!text-white hover:!bg-[#1a1a1a] dark:hover:!bg-[#444444]"
            >
              <VideoIcon className="!h-4.5 !w-4.5 p-0 text-icon" />
              <div className="grow text-left">
                <div className="font-semibold text-sm">
                  <label htmlFor="video-upload">
                    <p>Upload a video</p>
                    <div>
                      <input
                        multiple
                        accept="video/*"
                        type="file"
                        id="video-upload"
                        className="hidden"
                        onChange={(e) => handleFilesChange(e.target.files)}
                      />
                    </div>
                  </label>
                </div>
                <div className="text-xs opacity-70">video max size (10mb).</div>
              </div>
            </Button>
            <Voice isOpen={voiceIsOpen} setIsOpen={setVoiceIsOpen}>
              <Button className="relative cursor-default select-none outline-none h-auto w-full focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-start gap-2 px-2 py-2 rounded-md text-xs last:mb-0 transition-colors duration-200 !bg-opacity-90 dark:!bg-opacity-90 !bg-[#2D2D2D] dark:!bg-[#333333] !text-white hover:!text-white hover:!bg-[#1a1a1a] dark:hover:!bg-[#444444]">
                <SoundwaveIcon className="!h-4.5 !w-4.5 text-icon" />
                <div className="grow text-left">
                  <div className="font-semibold text-sm">Record audio</div>
                  <div className="text-xs opacity-70">
                    Record and send a voice message
                  </div>
                </div>
              </Button>
            </Voice>
            <Button className="relative cursor-default select-none outline-none h-auto w-full focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-start gap-2 px-2 py-2 rounded-md text-xs last:mb-0 transition-colors duration-200 !bg-opacity-90 dark:!bg-opacity-90 !bg-[#2D2D2D] dark:!bg-[#333333] !text-white hover:!text-white hover:!bg-[#1a1a1a] dark:hover:!bg-[#444444]">
              <DocumentAttachmentIcon className="!h-4.5 !w-4.5 p-0 text-icon" />
              <div className="grow text-left">
                <div className="font-semibold text-sm">
                  <label htmlFor="document-upload">
                    <p>Document</p>
                    <div>
                      <input
                        multiple
                        accept="document/*"
                        type="file"
                        id="document-upload"
                        className="hidden"
                        onChange={(e) => handleFilesChange(e.target.files)}
                      />
                    </div>
                  </label>
                </div>
                <div className="text-xs opacity-70">upload a document.</div>
              </div>
            </Button>
          </div>
        </div>
        <DrawerFooter className="p-3">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AttachmentPopup;
