"use client";

interface NavItem {
  Icon: React.JSX.ElementType;
  href: string;
  label: string;
  requireVerification?: boolean;
}

import React, { useState } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

import { cn } from "@/lib/utils";
import {
  HelpCircleIcon,
  HotPriceIcon,
  NewsIcon,
  PaintBucketIcon,
  RssIcon,
  SettingDoneIcon,
  SettingsIcon,
  UserIcon,
} from "@/components/assets/icons";
import Profile from "../profile";
import ThemeSwitcher from "../theme-switcher";

const NavItems: NavItem[] = [
  {
    Icon: UserIcon,
    href: "/profile",
    label: "Profile",
    requireVerification: true,
  },
  {
    Icon: RssIcon,
    href: "/channels",
    label: "Channels",
    requireVerification: true,
  },
  {
    Icon: NewsIcon,
    href: "/blog",
    label: "Blog",
  },
  {
    Icon: HotPriceIcon,
    href: "/pricing",
    label: "Pricing",
  },
];

const footerNavItems: NavItem[] = [
  {
    Icon: SettingsIcon,
    href: "/settings",
    label: "Settings & privacy",
  },
  {
    Icon: HelpCircleIcon,
    href: "/help",
    label: "Help Center",
  },
  {
    Icon: SettingDoneIcon,
    href: "/account",
    label: "Account settings",
    requireVerification: true,
  },
];

export function SideMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link className="font-bold text-[0.90rem] mt-0.5" href="/">
              <span>{siteConfig.name}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="grow space-y-0 overflow-y-auto">
          <div className="p-4 pt-0">
            <Profile />
          </div>

          <Separator />
          <ul className="p-4">
            {NavItems.map(({ Icon, href, label }, index) => (
              <Link
                key={index}
                href={href}
                className={cn("flex items-center gap-3 py-2.5")}
                onClick={() => setIsOpen(false)}
              >
                <Icon />
                <p className="font-medium">{label}</p>
              </Link>
            ))}
          </ul>
          <Separator />
          <div className="p-4 flex items-center gap-3">
            <PaintBucketIcon className="w-6 h-6 text-icon" />
            <p className="font-medium grow">Theme</p>
            <ThemeSwitcher />
          </div>
          <Separator />
        </div>

        <SheetFooter className="space-y-4 pt-0">
          <ul>
            {footerNavItems.map(({ Icon, href, label }, index) => (
              <Link
                key={index}
                href={href}
                className={cn("flex items-center gap-2 py-2")}
                onClick={() => setIsOpen(false)}
              >
                <Icon />
                <p className="text-[0.85rem]">{label}</p>
              </Link>
            ))}
          </ul>
          <p className="text-[0.7rem] text-muted-foreground">
            {siteConfig.name} © <>{new Date().getFullYear()}</>{" "}
            {` v${siteConfig.version}`}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
