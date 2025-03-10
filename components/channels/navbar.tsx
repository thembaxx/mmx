"use client";

import { NotificationIcon } from "@/components/assets/icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "../ui/button";
import { SideMenu } from "./side-menu";

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
  return (
    <nav className="sticky top-0 z-20 bg-background/80 backdrop-blur-2xl h-full shrink-0 flex justify-center">
      <div className="w-full flex items-center px-4 justify-between max-w-2xl">
        <div className="flex items-center">
          <SideMenu>
            <Button className="p-0" variant="ghost">
              <MenuIcon className="!w-6 !h-6 !text-icon" />
            </Button>
          </SideMenu>
          <Link className="font-bold text-[0.90rem] mt-0.5" href="/">
            <span>{siteConfig.name}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button className="p-0" variant="ghost">
            <NotificationIcon className="!w-6 !h-6 !text-icon" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
