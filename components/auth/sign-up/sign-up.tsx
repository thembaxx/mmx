import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import SignUpForm from "./sign-up-form";
import { Separator } from "../../ui/separator";
import TermsFooter from "@/components/terms-footer";

function SignUp() {
  return (
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <header className="pb-8 flex items-center gap-1">
          <div className="w-9 h-9 flex items-center justify-center">
            <Image src="yunite.svg" height={24} width={24} alt="" />
          </div>
          <p className="font-medium">{siteConfig.name}</p>
        </header>
        <Card className="shadow-md/20 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-[0.85rem]">
              Hi, Create a free {siteConfig.name} account
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="pt-4 flex flex-col items-center justify-center h-full w-full">
              <SignUpForm />
            </div>
          </CardContent>
          <CardFooter>
            <TermsFooter />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
