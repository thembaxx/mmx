"use client";

import type React from "react";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

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
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "I'm a software developer based in New York City. I enjoy building web applications and learning new technologies.",
  urls: {
    website: "https://example.com",
    twitter: "@johndoe",
    linkedin: "johndoe",
  },
};

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "/placeholder.svg?height=100&width=100"
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
    }, 1000);
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto py-10 px-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your profile information. This information will be
              displayed publicly.
            </CardDescription>
          </CardHeader>
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
                  <FormField
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
                  />
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Links</div>
                    <FormField
                      control={form.control}
                      name="urls.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urls.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="@username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urls.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
