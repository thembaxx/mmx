"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateChannelForm } from "./form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import TermsFooter from "@/components/terms-footer";

let channelName = "";
const params = new URLSearchParams(window.location.search);
if (params.has("channelName")) {
  channelName = params.get("channelName")!;
} else {
}

function CreateChannelCard() {
  return (
    <Card className="dark:bg-[#0d0d0d]">
      <VisuallyHidden>
        <CardHeader>
          <CardTitle>Channel</CardTitle>
        </CardHeader>
      </VisuallyHidden>
      <CardContent className="p-0">
        <CreateChannelForm channelName={channelName} />
      </CardContent>
      <CardFooter className="pt-2">
        <TermsFooter />
      </CardFooter>
    </Card>
  );
}

export default CreateChannelCard;
