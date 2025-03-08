interface Props {
  children: React.ReactNode;
  channel: string;
}

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "@/config/site";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={"none"}
    {...props}
  >
    <path
      d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function QrDialog({ children, channel }: Props) {
  const link = `${siteConfig.baseUrl}?channel=${channel}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[60svh]">
        <DialogHeader>
          <DialogTitle className="text-sm">Share channel</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col grow justify-center items-center">
          <div className="space-y-2 w-[200px] overflow-hidden">
            <QRCodeSVG
              marginSize={1}
              bgColor="#ffffff"
              fgColor="#0E0E0E"
              size={200}
              value={link}
            />
            <div className="space-y-2">
              <Textarea
                className="h-10 text-sm"
                disabled
                value={link}
                readOnly={true}
              />
              <Button className="w-full" size="sm">
                <CopyIcon className="!w-4 !h-5" />
                <span>Copy link</span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QrDialog;
