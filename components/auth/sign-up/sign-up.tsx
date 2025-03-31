import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { siteConfig } from "@/config/site";
import SignUpForm from "./sign-up-form";
import TermsFooter from "@/components/terms-footer";

function SignUp() {
  return (
    <div className="w-full flex justify-center p-6 pt-24">
      <div className="w-full max-w-md flex flex-col items-center">
        <Card className="shadow-[0_35px_60px_-20px_rgba(0,0,0,0.08)] border-none rounded-4xl rounded-br-xl bg-[#FCFCFC] max-w-md dark:bg-[#171717]">
          <CardHeader>
            <CardTitle className="text-[0.8rem] text-[#656565] font-normal text-center">
              Hi, Create a free {siteConfig.name} account
            </CardTitle>
          </CardHeader>

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
