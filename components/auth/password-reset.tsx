"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
};

const formSchema = z.object({
  email: z.string().email(),
});

function PasswordReset({ children, open, setOpen, email }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: loading,
    defaultValues: {
      email: email ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const { email } = values;
    await authClient.forgetPassword(
      {
        email,
        redirectTo: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);

          if (ctx && ctx.data && ctx.data.status) {
            setSuccess(true);
          }
        },
        onError: (ctx) => {
          setSuccess(false);

          if (ctx.error.status === 403) {
            alert("Please verify your email address");
          }
          //you can also show the original error message
          alert(ctx.error.message);
        },
      }
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
        <DrawerHeader>
          <DrawerTitle>Did you forget your password?</DrawerTitle>
          <DrawerDescription>
            We will send an email to help you reset your password.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6">
          {success && (
            <div className="space-y-6">
              <div className="py-2 px-3 bg-violet-600 rounded-xl border border-violet-600">
                <p className="text-sm text-pretty font-medium">
                  An email has been sent to{" "}
                  {form.getValues("email") ?? "the provided email"} , Please
                  follow the istructions to reset your password.
                </p>
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          )}
          {!success && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
              </form>
            </Form>
          )}
        </div>
        <DrawerFooter>
          <Button
            className="w-full relative"
            onClick={form.handleSubmit(onSubmit)}
          >
            <>Reset your password</>
            {loading && (
              <div className="absolute left-3">
                <Spinner variant="dark" />
              </div>
            )}
          </Button>
          <DrawerClose className="w-full" asChild>
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PasswordReset;
