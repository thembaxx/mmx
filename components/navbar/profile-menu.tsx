"use client";

import { useState } from "react";

interface Props {
  children?: React.ReactNode;
  user: UserData;
}

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
import ThemeSwitcher from "../theme-switcher";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserData } from "@/stores/use-user-store";

export function ProfileMenu({ children, user }: Props) {
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
            <Profile user={user} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-neutral-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile">Manage profile</Link>
          </DropdownMenuItem>
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
        <DropdownMenuItem
          className="font-medium text-red-500"
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
