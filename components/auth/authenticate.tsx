"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AuthForm from "./auth-form";
import { authClient } from "@/lib/auth-client";
import TermsFooter from "../terms-footer";

function Authenticate() {
  return (
    <Card className="shadow-[0_35px_60px_-20px_rgba(0,0,0,0.08)] rounded-4xl rounded-br-xl border-none">
      <CardHeader className="h-0 p-0 hidden">
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 flex flex-col items-center justify-center h-full w-full">
          <Button
            className="w-full rounded-xl bg-[#f5f5f5] dark:bg-[#171717]"
            variant="secondary"
            onClick={async () => {
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/channels",
              });
            }}
          >
            <Image src="/brands/google.svg" width={16} height={16} alt="" />
            <span className="font-medium">Continue with Google</span>
          </Button>

          <div className="w-full text-center py-1.5">
            <span className="text-muted-foreground text-xs uppercase">or</span>
          </div>

          <AuthForm />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <TermsFooter />
      </CardFooter>
    </Card>
  );
}

export default Authenticate;
