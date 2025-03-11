"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Profile from "../chat/profile";
import { siteConfig } from "@/config/site";
import ThemeSwitcher from "../theme-switcher";

export function ProfileMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={16}
        alignOffset={4}
        className="w-56 rounded-[15px] dark:bg-[#262626e6] backdrop-blur-2xl"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground/80">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2">
            <Profile />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-neutral-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem>Manage profile</DropdownMenuItem>
          <DropdownMenuItem>Contact support</DropdownMenuItem>
          <DropdownMenuSeparator className="dark:bg-neutral-700" />
          <DropdownMenuItem>
            <div className="flex items-center gap-3 w-full">
              <p className="grow">Theme</p>
              <ThemeSwitcher />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-neutral-700" />
        <DropdownMenuItem>Log out</DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-neutral-700" />
        <DropdownMenuItem>
          <p className="text-[0.7rem] text-muted-foreground">
            {siteConfig.name} © <>{new Date().getFullYear()}</>{" "}
            {` v${siteConfig.version}`}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
