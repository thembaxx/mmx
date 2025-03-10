import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateChannelForm } from "./form";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function CreateChannelCard() {
  return (
    <Card className="dark:bg-[#0d0d0d]">
      <VisuallyHidden>
        <CardHeader>
          <CardTitle>Channel</CardTitle>
        </CardHeader>
      </VisuallyHidden>
      <CardContent className="p-0">
        <CreateChannelForm />
      </CardContent>
      <CardFooter>
        <div className="pt-2">
          <div className="text-xs inline-block text-center text-pretty leading-5 tracking-wide">
            By continuing, you agree to {siteConfig.name}&apos;s{" "}
            <Link className="underline" href="/">
              Consumer Terms
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/">
              Usage Policy
            </Link>
            , and acknowledge their{" "}
            <Link className="underline" href="/">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CreateChannelCard;
