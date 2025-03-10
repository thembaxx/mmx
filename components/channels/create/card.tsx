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
      <CardFooter className="pt-2">
        <TermsFooter />
      </CardFooter>
    </Card>
  );
}

export default CreateChannelCard;
