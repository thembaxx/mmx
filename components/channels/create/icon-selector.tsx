interface Props {
  icon: ChannelIcon | undefined;
  children: React.ReactNode;
  onSelect: (icon: ChannelIcon) => void;
}

import { useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChannelIcon } from "@/types/types";
import { cn } from "@/lib/utils";

const icons: ChannelIcon[] = [
  {
    label: "closed mailbox with raised flag",
    src: "/channel-icons/closed mailbox with raised flag.png",
  },
  { label: "spiral calendar", src: "/channel-icons/spiral calendar.png" },
  { label: "pill", src: "/channel-icons/pill.png" },
  { label: "telescope", src: "/channel-icons/telescope.png" },
  { label: "dress", src: "/channel-icons/dress.png" },
  { label: "shopping bags", src: "/channel-icons/shopping bags.png" },
  { label: "ledger", src: "/channel-icons/ledger.png" },
  { label: "dollar banknote", src: "/channel-icons/dollar banknote.png" },
  { label: "camera", src: "/channel-icons/camera.png" },
  { label: "rainbow", src: "/channel-icons/rainbow.png" },
  { label: "fire", src: "/channel-icons/fire.png" },
  { label: "rocket", src: "/channel-icons/rocket.png" },
  {
    label: "beach with umbrella",
    src: "/channel-icons/beach with umbrella.png",
  },
  { label: "joystick", src: "/channel-icons/joystick.png" },
  { label: "trophy", src: "/channel-icons/trophy.png" },
  { label: "wrapped gift", src: "/channel-icons/wrapped gift.png" },
  { label: "artist palette", src: "/channel-icons/artist palette.png" },
  { label: "diving mask", src: "/channel-icons/diving mask.png" },
  { label: "rugby football", src: "/channel-icons/rugby football.png" },
  { label: "soccer ball", src: "/channel-icons/soccer ball.png" },
];

function IconSelector({ icon, children, onSelect }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[60vh]">
        <DrawerHeader>
          <DrawerTitle>Select an icon</DrawerTitle>
        </DrawerHeader>
        <ul className="flex items-center flex-wrap gap-2 px-4">
          {icons.map(({ label, src }, index) => (
            <li key={label + index}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={cn(
                        "h-11 w-11 flex items-center justify-center rounded-lg hover:dark:bg-[#1e1e1e] hover:bg-[#f9f9f9]",
                        {
                          "bg-blue-600/5 border border-blue-600 ring-2 ring-blue-600/40":
                            src === icon?.src,
                        }
                      )}
                      onClick={() => {
                        onSelect({ label, src });
                        setOpen(false);
                      }}
                    >
                      <Image src={src} alt={label} width={32} height={32} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default IconSelector;
