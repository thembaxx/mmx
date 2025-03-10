"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import { useUserStore } from "@/stores/use-user-store";
import { checkEmailExists } from "@/actions";
import Spinner from "../ui/spinner";
import { SolarQuestionCircleLinear } from "../assets/icons";
import PasswordReset from "./password-reset";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
});

function AuthForm() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const { email, password } = values;

    setLoading(true);

    if (emailExists && password) {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast("Authentication failed", {
          description: error?.message ?? "Failed to authenticate user ",
          richColors: true,
        });
      } else {
        toast("Authenticated", {
          description: `Logged in as ${email}`,
          richColors: true,
        });

        const user = data?.user;
        setUser(user);

        router.replace("/channels");
      }
    } else {
      const res = await checkEmailExists(email);

      if (!res) {
        setLoading(false);
        router.replace("/sign-up");
      } else {
        setEmailExists(true);
      }
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-11 text-base placeholder:text-sm"
                    placeholder="Enter your personal or work email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {emailExists && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-11 text-base pr-12 placeholder:text-sm"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-0 absolute h-full w-12 shrink-0 top-0 right-0 rounded-l-none"
                        type="button"
                        disabled={loading}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword && (
                          <Image
                            aria-hidden={!showPassword}
                            src="/icons/view-off-stroke-rounded.svg"
                            alt="Hide password"
                            width={16}
                            height={16}
                          />
                        )}
                        {!showPassword && (
                          <Image
                            aria-hidden={showPassword}
                            src="/icons/view-stroke-rounded.svg"
                            alt="Show password"
                            width={16}
                            height={16}
                          />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button className="w-full relative" type="submit">
          {loading && (
            <div className="absolute left-3">
              <Spinner />
            </div>
          )}
          <>{`${emailExists ? "Sign In" : "Continue with Email"}`}</>
        </Button>
        {emailExists && (
          <div className="flex w-full">
            <Button
              className="text-primary text-[0.85rem]"
              variant="link"
              type="button"
              size="sm"
              onClick={() => setResetPasswordOpen(!resetPasswordOpen)}
            >
              <SolarQuestionCircleLinear className="w-5 h-5 text-[#666]" />
              <>Forgot your password?</>
            </Button>
            <PasswordReset
              email={form.getValues("email")}
              open={resetPasswordOpen}
              setOpen={setResetPasswordOpen}
            />
          </div>
        )}
      </form>
    </Form>
  );
}

export default AuthForm;
