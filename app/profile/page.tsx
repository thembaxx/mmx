"use client";

import type React from "react";

import { upload } from "@vercel/blob/client";
import { UploadProgressEvent } from "@vercel/blob";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Loader2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useUserStore } from "@/stores/use-user-store";
import { Progress } from "@/components/ui/progress";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  urls: z.object({
    website: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
    twitter: z.string().optional().or(z.literal("")),
    linkedin: z.string().optional().or(z.literal("")),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  email: "",
  bio: "",
};

export default function ProfileForm() {
  const { user } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const [uploadProgress, setUploadProgress] =
    useState<UploadProgressEvent | null>(null);

  async function uploadImageAsync(file: File | undefined) {
    if (!file) return;

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: (progressEvent) => {
          setUploadProgress(progressEvent);
        },
      });

      return blob?.url;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await authClient.getSession();
      if (res && res.data && res.data.user) {
        const user = res.data.user;
        setAvatarSrc(user.image ?? "");
        form.setValue("name", user.name);
        form.setValue("email", user.email);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const { name } = data;

    const currentImage = user?.image ?? "";

    const payload: {
      name?: string;
      image?: string | null;
    } = {};

    if (currentImage !== avatarSrc && image) {
      const res = await uploadImageAsync(image);
      if (res) payload.image = res;
    }

    if (name !== user?.name) payload.name = name;

    await authClient.updateUser(payload);

    setIsLoading(false);
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setImage(file);
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto pt-20">
      <div className="max-w-2xl mx-auto py-10 px-6">
        <Card className="shadow-[0_35px_60px_-20px_rgba(0,0,0,0.08)] border-none rounded-4xl rounded-br-xl bg-[#FCFCFC] max-w-md dark:bg-[#171717]">
          <VisuallyHidden>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your profile information. This information will be
                displayed publicly.
              </CardDescription>
            </CardHeader>
          </VisuallyHidden>
          <CardContent>
            <div className="space-y-8">
              <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarSrc} alt="Profile picture" />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center md:items-start gap-2">
                  <Label htmlFor="avatar" className="text-sm font-medium">
                    Profile Picture
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative"
                      asChild
                    >
                      <label htmlFor="avatar">
                        <Camera className="w-4 h-4 mr-2" />
                        Change
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. 1MB max.
                  </p>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          We&lsquo;ll never share your email with anyone else.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {isLoading && uploadProgress && uploadProgress.percentage && (
              <Progress value={uploadProgress.percentage} />
            )}
            <div className="flex justify-end gap-2 w-full">
              <Button variant="outline">Cancel</Button>
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white"
                disabled={isLoading}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
