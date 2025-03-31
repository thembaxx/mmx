"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";
import { SolarQuestionCircleLinear } from "@/components/assets/icons";
import PasswordReset from "../password-reset";
import { useUserStore } from "@/stores/use-user-store";

const formSchema = z.object({
  full_name: z.string().min(2).default(""),
  email: z.string().email().default(""),
  password: z.string().min(6).default(""),
});

function SignUpForm() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [showForgotPassword, setShowforgotPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // disabled: loading,
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if email already exists
    // Suggest forgot password
    setShowforgotPassword(false);

    setLoading(true);

    const { full_name, email, password } = values;

    await authClient.signUp.email(
      {
        name: full_name,
        email,
        password,
        callbackURL: "/channels",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          if (ctx && ctx.data) {
            const user = ctx.data?.user;
            setUser(user);

            console.log(user);
          }
          toast("Success", { description: "Account has been created." });

          setLoading(false);

          router.replace("/channels");
        },
        onError: (ctx) => {
          toast("Error", { description: ctx.error.message });
          setLoading(false);

          if (ctx?.error?.status === 422) {
            setShowforgotPassword(true);
            setResetPasswordOpen(true);
          }
        },
      }
    );

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="grid md:grid-cols-2 md:gap-4 gap-6 w-full">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="text-base placeholder:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  className="text-base placeholder:text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium flex-1">Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="text-base placeholder:text-sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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

        <div className="space-y-2 w-full">
          <Button type="submit" className="w-full relative" disabled={loading}>
            <span>Create free account</span>
            {loading && (
              <div className="absolute left-3">
                <Spinner />
              </div>
            )}
          </Button>

          {showForgotPassword && (
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
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
