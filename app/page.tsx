"use client";

import { MaterialSymbolsVerifiedRounded } from "@/components/chat/profile";
import AuthForm from "@/components/home/auth-form";
import Header from "@/components/home/header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  PlusSignSquareIcon,
  SettingsIcon,
} from "@/config/icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-full w-full px-6 py-12 flex flex-col items-center  space-y-8 overflow-y-auto">
      <div>
        <Header />
      </div>
      <Card className="shadow-md/20 rounded-3xl bg-[#fcfcfc] dark:bg-[#0d0d0d]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-[0.7rem] uppercase">Welcome</CardTitle>
          <div className="flex items-center gap-3 border rounded-xl p-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://www.tapback.co/api/avatar/user55?color=3`}
                />
              </Avatar>
              <div className="absolute bottom-0 right-0 -mb-0.5 z-20">
                <MaterialSymbolsVerifiedRounded className="text-blue-600 w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1 text-left grow">
              <h2 className="font-bold truncate text-sm leading-none">
                Themba Mndebele
              </h2>
              <p className="text-muted-foreground text-[0.8rem] truncate">
                work@themba.dev
              </p>
            </div>
            <div className="h-8 w-8 flex items-center justify-center">
              <SettingsIcon className="w-4 h-4 text-icon-secondary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 flex flex-col items-center justify-center h-full w-full">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                router.replace(`/channels/create`);
              }}
            >
              <PlusSignSquareIcon className="h-5 w-5" />
              <span className="font-medium">Create a channel</span>
            </Button>

            <div className="w-full text-center py-1.5">
              <span className="text-muted-foreground/50 text-xs uppercase">
                or
              </span>
            </div>

            <AuthForm />
            <Button
              className="w-full relative"
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                router.replace(`/channels/public`);
              }}
            >
              <p>Public channels</p>
              <ArrowRightIcon />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="pt-2">
            <div className="text-xs inline-block text-center text-pretty leading-5 tracking-wide">
              By continuing, you agree to {siteConfig.name}&apos;s{" "}
              <Link className="underline" href="/">
                Consumer Terms
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/">
                Usage Policy
              </Link>
              , and acknowledge their{" "}
              <Link className="underline" href="/">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
