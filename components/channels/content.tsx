"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ChannelsForm from "./channels-form";

function Content() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="space-y-2 flex flex-col items-center justify-center h-full max-w-md w-full">
        <Button
          className="w-full text-[0.65rem] uppercase tracking-wider text-secondary-foreground/80 h-10 rounded-xl  font-mono "
          variant="outline"
          onClick={() => {
            router.replace(`/channels/create`);
          }}
        >
          <span className="font-medium">New channel</span>
        </Button>
        <Button
          className="w-full text-[0.65rem] uppercase tracking-wider text-secondary-foreground/80 relative h-10 rounded-2xl border-neutral-200/70  font-mono "
          type="button"
          variant="outline"
          onClick={() => {
            router.replace(`/channels/public`);
          }}
        >
          <p>Public channels</p>
        </Button>

        <div className="w-full text-center py-1.5">
          <span className="text-muted-foreground/80 text-[10px] uppercase">
            or
          </span>
        </div>

        <ChannelsForm />
      </div>
    </div>
  );
}

export default Content;
