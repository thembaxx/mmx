"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MaterialSymbolsVerifiedRounded } from "../chat/profile";
import { SettingsIcon } from "../assets/icons";
import Link from "next/link";
import { useUserStore } from "@/stores/use-user-store";
import { getInitials } from "@/lib/utils";

function Header() {
  const { user } = useUserStore();
  if (!user) return null;

  return (
    <div className="flex items-center gap-3 border rounded-xl p-3">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 -mb-0.5 z-20">
          <MaterialSymbolsVerifiedRounded className="text-blue-600 w-4 h-4" />
        </div>
      </div>
      <div className="space-y-1 text-left grow">
        <h2 className="font-bold truncate text-sm leading-none">{user.name}</h2>
        <p className="text-muted-foreground text-[0.8rem] truncate">
          {user.email}
        </p>
      </div>
      <Link href="/profile">
        <div className="h-8 w-8 flex items-center justify-center">
          <SettingsIcon className="w-4 h-4 text-icon-secondary" />
        </div>
      </Link>
    </div>
  );
}

export default Header;
