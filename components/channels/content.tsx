"use client";

import { useRouter } from "next/navigation";
import { ArrowRightIcon, PlusSignSquareIcon } from "../assets/icons";
import { Button } from "../ui/button";
import ChannelsForm from "./channels-form";

function Content() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="space-y-2 flex flex-col items-center justify-center h-full max-w-md w-full">
        <Button
          className="w-full h-11 rounded-full text-black/90 bg-amber-500"
          variant="ghost"
          onClick={() => {
            router.replace(`/channels/create`);
          }}
        >
          <PlusSignSquareIcon className="h-5 w-5" />
          <span className="font-medium">Create a channel</span>
        </Button>
        <Button
          className="w-full relative h-11 rounded-full bg-violet-700 text-white"
          type="button"
          variant="ghost"
          onClick={() => {
            router.replace(`/channels/public`);
          }}
        >
          <p>Public channels</p>
          <ArrowRightIcon />
        </Button>

        <div className="w-full text-center py-1.5">
          <span className="text-muted-foreground/50 text-xs uppercase">or</span>
        </div>

        <ChannelsForm />
      </div>
    </div>
  );
}

export default Content;
