import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/channels/header";
import Content from "@/components/channels/content";
import TermsFooter from "@/components/terms-footer";

function ChannelsPage() {
  return (
    <div className="p-6 flex justify-center">
      <Card className="shadow-md/20 rounded-3xl bg-[#fcfcfc] max-w-md dark:bg-[#0d0d0d]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-[0.7rem] uppercase">Welcome</CardTitle>
          <Header />
        </CardHeader>
        <CardContent>
          <Content />
        </CardContent>
        <CardFooter className="pt-2">
          <TermsFooter />
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChannelsPage;
