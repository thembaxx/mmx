"use client";

interface Props {
  channelName: string;
}

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

function CreateChannelCard({ channelName }: Props) {
  return (
    <Card className="shadow-[0_35px_60px_-20px_rgba(0,0,0,0.08)] border-none rounded-4xl rounded-br-xl bg-[#FCFCFC] max-w-md dark:bg-[#171717]">
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
