"use client";

interface Props {
  channelName: string;
}

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
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
import Spinner from "../../ui/spinner";
import { Switch } from "../../ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image02Icon } from "@/components/assets/icons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import IconSelector from "./icon-selector";
import { ChannelIcon } from "@/types/types";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  isPrivate: z.boolean(),
});

export function CreateChannelForm({ channelName }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [channelIcon, setChannelIcon] = useState<ChannelIcon | undefined>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: channelName,
      isPrivate: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
      const res = await axios.post("/api/channel/create", {
        data: {
          iconSrc: channelIcon?.src ?? "",
          name: data.name,
          isPrivate: data.isPrivate,
        },
      });

      setLoading(false);

      if (res && res.status === 200) {
        const link = `${
          siteConfig.baseUrl
        }/chat?channelName=${data.name.replaceAll(" ", "-")}`;
        router.push(link);
      } else {
        toast("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
    }

    setLoading(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4">
          <Avatar className="w-24 h-24">
            {avatarSrc && <AvatarImage src={avatarSrc} alt="picture" />}
            {channelIcon && (
              <div className="h-full w-full border flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-full">
                <div className="h-12 w-12">
                  <AvatarImage src={channelIcon.src} alt="picture" />
                </div>
              </div>
            )}
            {!avatarSrc && !channelIcon && (
              <AvatarFallback>
                <Image02Icon className="w-10 h-10 text-icon-secondary" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col items-center md:items-start gap-2">
            <Label htmlFor="avatar" className="text-sm font-medium">
              Channel Picture
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="relative pl-2"
                type="button"
                asChild
              >
                <label htmlFor="avatar">
                  {/* <Camera className="w-4 h-4 mr-2" /> */}
                  <Image
                    className="mr-2"
                    src="/channel-icons/camera-icon-color.svg"
                    alt=""
                    height={16}
                    width={16}
                  />
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
              <IconSelector icon={channelIcon} onSelect={setChannelIcon}>
                <Button
                  size="icon"
                  className="h-8 w-8 p-0 rounded-full"
                  variant="ghost"
                >
                  <Image
                    src="/channel-icons/plus-color-icon.svg"
                    alt=""
                    height={24}
                    width={24}
                  />
                </Button>
              </IconSelector>
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF. 1MB max.
            </p>
          </div>
        </div>
        <Separator />
        <div className="space-y-6 p-4 pt-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your channel&apos;s display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Private Channel</FormLabel>
                  <FormDescription>
                    Make channel public or private.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="relative w-full disabled:opacity-80 bg-blue-600 hover:bg-blue-500 text-white"
            type="submit"
          >
            <span>Create Channel</span>
            {loading && (
              <div className="absolute left-3">
                <Spinner variant="dark" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
