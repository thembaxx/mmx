"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon, PlusSignSquareIcon } from "../assets/icons";
import { Button } from "../ui/button";
import ChannelsForm from "./channels-form";

function Content() {
  const router = useRouter();

  return (
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
        <span className="text-muted-foreground/50 text-xs uppercase">or</span>
      </div>

      <ChannelsForm />
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
  );
}

export default Content;
