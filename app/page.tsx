"use client";

import AuthForm from "@/components/home/auth-form";
import Header from "@/components/home/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full w-full p-6 flex flex-col items-center justify-center space-y-8">
      <Header />
      <Card className="shadow-md/20 rounded-3xl bg-[#191919]">
        <CardHeader className="text-center text-[0.7rem] uppercase">
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 flex flex-col items-center justify-center h-full w-full">
            <Button className="w-full" variant="secondary" onClick={() => {}}>
              <span className="font-medium">Create a room</span>
            </Button>

            <div className="w-full text-center py-1.5">
              <span className="text-muted-foreground/50 text-xs uppercase">
                or
              </span>
            </div>

            <AuthForm />
          </div>
        </CardContent>
        <CardFooter>
          <div className="pt-2">
            <div className="text-xs inline-block text-center text-pretty leading-5 tracking-wide">
              By continuing, you agree to {siteConfig.name}&apos;s{" "}
              <Link className="underline" href="/">
                Consumer Terms
              </Link>
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
