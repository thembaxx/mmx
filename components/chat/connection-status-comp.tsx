"use client";

import * as React from "react";
import { ConnectionStatus, useChatConnection } from "@ably/chat";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn, capitalize } from "@/lib/utils";

const Status = React.forwardRef<HTMLInputElement, React.ComponentProps<"div">>(
  ({ className, children }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              ref={ref}
              className={cn(
                "h-2 w-2 bg-neutral-500 rounded-full animate-pulse",
                className
              )}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{children}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

Status.displayName = "Status";

function ConnectionStatusComp() {
  const { currentStatus } = useChatConnection();

  switch (currentStatus) {
    case ConnectionStatus.Connected:
      return (
        <Status className="bg-[#30D158] shadow-md shadow-[#30D158]/40">
          {capitalize(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Connecting:
      return (
        <Status className="bg-[#0A84FF] shadow-md shadow-[#0A84FF]/40">
          {capitalize(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Disconnected:
      return (
        <Status className="bg-[#FFD60A] shadow-md shadow-[#FFD60A]/40">
          {capitalize(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Suspended:
      return (
        <Status className="bg-[#FF9F0A] shadow-md shadow-[#FF9F0A]/40">
          {capitalize(currentStatus.toString())}
        </Status>
      );

    case ConnectionStatus.Failed:
      return (
        <Status className="bg-[#FF453A] shadow-md shadow-[#FF453A]/40">
          {capitalize(currentStatus.toString())}
        </Status>
      );
    default:
      return <Status className="bg-neutral-600">Unknown</Status>;
  }
}

export default ConnectionStatusComp;
