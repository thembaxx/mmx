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

import Profile from "./profile";
import { siteConfig } from "@/config/site";

export function ProfileMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={16}
        alignOffset={4}
        className="w-56 rounded-[15px] dark:bg-[#262626e6]"
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
