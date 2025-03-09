import { ReactNode } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import AudioRecorder from "./audio-recorder";

interface VoiceProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: (value: boolean) => void;
}

function Voice({ isOpen, children, setIsOpen }: VoiceProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[85svh]">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-sm">Audio Recorder</DrawerTitle>
        </DrawerHeader>
        <div className="grow px-6 pb-12">
          <AudioRecorder />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Voice;
