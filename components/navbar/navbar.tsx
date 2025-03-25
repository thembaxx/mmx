"use client";

import { Button } from "../ui/button";
import { SideMenu } from "./side-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileMenu } from "./profile-menu";
import { useUserStore } from "@/stores/use-user-store";

export function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      color="currentColor"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6.001h18m-18 6h18m-18 6h18"
        strokeWidth={1}
      ></path>
    </svg>
  );
}

function Navbar() {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-50 bg-white/60  backdrop-blur-sm shrink-0 flex justify-center drop-shadow-xs">
      <div className="w-full flex items-center px-4 justify-between max-w-2xl">
        <div className="flex items-center">
          <SideMenu user={user}>
            <Button className="p-0" variant="ghost">
              <MenuIcon className="!w-6 !h-6" />
            </Button>
          </SideMenu>
        </div>

        <div className="flex items-center gap-4">
          <ProfileMenu user={user}>
            <div className="h-8 w-8 relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback className="text-xs uppercase">
                  {user.name}
                </AvatarFallback>
              </Avatar>
            </div>
          </ProfileMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
