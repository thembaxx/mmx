"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { QrCodeIcon } from "../assets/icons";
import QrDialog from "./qr-dialog";
import { useChannelstore } from "@/stores/use-channel-store";

const RssLockedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M12.9915 22C13.7121 22 13.9925 21.9956 13.9925 21.9956C17.4088 21.971 19.2922 21.8099 20.5342 20.7552C22 19.5104 22 17.5069 22 13.5M11.9906 5C7.27213 5 4.91289 5 3.44705 6.2448C2.32426 7.19827 2.0615 8.59687 2 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.0803 10.8573L15.7761 11.5428L15.7761 11.5428L16.0803 10.8573ZM15.1332 9.84253L14.4337 10.113H14.4337L15.1332 9.84253ZM21.8668 9.84253L22.5663 10.113L22.5663 10.113L21.8668 9.84253ZM20.9197 10.8573L21.2239 11.5428L21.2239 11.5428L20.9197 10.8573ZM20.9197 5.51773L21.2239 4.8322L20.9197 5.51773ZM21.8668 6.53247L22.5663 6.26203L22.5663 6.26203L21.8668 6.53247ZM16.0803 5.51773L15.7761 4.8322L16.0803 5.51773ZM15.1332 6.53247L14.4337 6.26203L15.1332 6.53247ZM16 5.375C16 5.78921 16.3358 6.125 16.75 6.125C17.1642 6.125 17.5 5.78921 17.5 5.375H16ZM19.5 5.375C19.5 5.78921 19.8358 6.125 20.25 6.125C20.6642 6.125 21 5.78921 21 5.375L19.5 5.375ZM17.625 6.125L19.375 6.125V4.625H17.625V6.125ZM19.375 10.25H17.625V11.75H19.375V10.25ZM17.625 10.25C17.2063 10.25 16.9325 10.2495 16.7222 10.2342C16.5196 10.2193 16.4338 10.1936 16.3845 10.1718L15.7761 11.5428C16.0484 11.6637 16.3272 11.7093 16.6128 11.7302C16.8905 11.7505 17.2283 11.75 17.625 11.75V10.25ZM14.25 8.1875C14.25 8.61474 14.2496 8.97023 14.2682 9.26108C14.2871 9.55774 14.3278 9.83905 14.4337 10.113L15.8328 9.57209C15.8054 9.50144 15.7795 9.39206 15.7651 9.16575C15.7504 8.93364 15.75 8.6339 15.75 8.1875H14.25ZM16.3845 10.1718C16.1471 10.0664 15.9427 9.85657 15.8328 9.57209L14.4337 10.113C14.6789 10.7474 15.1559 11.2676 15.7761 11.5428L16.3845 10.1718ZM21.25 8.1875C21.25 8.6339 21.2496 8.93364 21.2349 9.16575C21.2205 9.39206 21.1946 9.50144 21.1672 9.57209L22.5663 10.113C22.6722 9.83905 22.7129 9.55774 22.7318 9.26108C22.7504 8.97023 22.75 8.61474 22.75 8.1875H21.25ZM19.375 11.75C19.7717 11.75 20.1095 11.7505 20.3872 11.7302C20.6728 11.7093 20.9516 11.6637 21.2239 11.5428L20.6155 10.1718C20.5662 10.1936 20.4804 10.2193 20.2778 10.2342C20.0675 10.2495 19.7937 10.25 19.375 10.25V11.75ZM21.1672 9.57209C21.0573 9.85657 20.8529 10.0664 20.6155 10.1718L21.2239 11.5428C21.8441 11.2676 22.3211 10.7474 22.5663 10.113L21.1672 9.57209ZM19.375 6.125C19.7937 6.125 20.0675 6.12547 20.2778 6.14084C20.4804 6.15565 20.5662 6.18138 20.6155 6.20325L21.2239 4.8322C20.9516 4.71134 20.6728 4.66571 20.3872 4.64484C20.1095 4.62453 19.7717 4.625 19.375 4.625V6.125ZM22.75 8.1875C22.75 7.76026 22.7504 7.40477 22.7318 7.11392C22.7129 6.81726 22.6722 6.53595 22.5663 6.26203L21.1672 6.80291C21.1946 6.87356 21.2205 6.98294 21.2349 7.20925C21.2496 7.44136 21.25 7.7411 21.25 8.1875H22.75ZM20.6155 6.20325C20.8529 6.30862 21.0573 6.51843 21.1672 6.80291L22.5663 6.26203C22.3211 5.62765 21.8441 5.10744 21.2239 4.8322L20.6155 6.20325ZM17.625 4.625C17.2283 4.625 16.8905 4.62453 16.6128 4.64484C16.3272 4.66571 16.0484 4.71134 15.7761 4.8322L16.3845 6.20325C16.4338 6.18138 16.5196 6.15565 16.7222 6.14084C16.9325 6.12547 17.2063 6.125 17.625 6.125V4.625ZM15.75 8.1875C15.75 7.7411 15.7504 7.44136 15.7651 7.20925C15.7795 6.98294 15.8054 6.87356 15.8328 6.80291L14.4337 6.26203C14.3278 6.53595 14.2871 6.81726 14.2682 7.11392C14.2496 7.40477 14.25 7.76026 14.25 8.1875H15.75ZM15.7761 4.8322C15.1559 5.10744 14.6789 5.62765 14.4337 6.26203L15.8328 6.80291C15.9427 6.51843 16.1471 6.30862 16.3845 6.20325L15.7761 4.8322ZM17.5 5.375V3.6875H16V5.375H17.5ZM19.5 3.6875V5.375L21 5.375V3.6875L19.5 3.6875ZM18.5 2.75C19.0782 2.75 19.5 3.19521 19.5 3.6875L21 3.6875C21 2.31583 19.8548 1.25 18.5 1.25V2.75ZM17.5 3.6875C17.5 3.19521 17.9218 2.75 18.5 2.75V1.25C17.1452 1.25 16 2.31583 16 3.6875H17.5Z"
      fill="currentColor"
    />
    <path
      d="M2.98242 21H2.9914"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17.2349C4.49328 17.2349 6.77053 19.5 6.77053 21.9996M10 21.9996C10 17.5 5.99511 14 2.04522 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const SatelliteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M12.5355 6.10913C14.0144 4.63029 16.412 4.63029 17.8909 6.10913C19.3697 7.58796 19.3697 9.98563 17.8909 11.4645L15.7487 13.6066C14.8881 14.4672 14.4578 14.8975 13.937 14.98C13.7688 15.0067 13.5974 15.0067 13.4292 14.98C12.9084 14.8975 12.4781 14.4672 11.6175 13.6066L10.3934 12.3825C9.53278 11.5219 9.10247 11.0916 9.01998 10.5708C8.99334 10.4026 8.99334 10.2312 9.01998 10.063C9.10247 9.54219 9.53278 9.11188 10.3934 8.25126L12.5355 6.10913Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.8483 14C6.96714 15.5706 8.41803 17.0084 10 17.1305M3.00586 15.2381C2.85202 18.2662 5.7538 21.1419 8.80421 20.9946"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5293 5.52954L10.9336 3.8673C10.3555 3.2891 10.0664 3 9.70711 3C9.34786 3 9.05876 3.2891 8.48057 3.8673L7.8673 4.48057C7.2891 5.05876 7 5.34786 7 5.70711C7 6.06635 7.2891 6.35545 7.8673 6.93365L9.31826 8.38462M18.4214 11.355L20.1327 13.0664C20.7109 13.6445 21 13.9336 21 14.2929C21 14.6521 20.7109 14.9412 20.1327 15.5194L19.5194 16.1327C18.9412 16.7109 18.6521 17 18.2929 17C17.9336 17 17.6445 16.7109 17.0664 16.1327L15.5111 14.5775"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const AddCircleHalfDotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M12 8V16M16 12L8 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 8.5C2.86239 7.67056 3.3189 6.89166 3.85601 6.17677M6.17681 3.85598C6.89168 3.31888 7.67058 2.86239 8.5 2.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserAiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.49994 19.5001L6.06034 18.5194C6.95055 16.9616 8.60727 16.0001 10.4016 16.0001H13.5983C15.3926 16.0001 17.0493 16.9616 17.9395 18.5194L18.4999 19.5001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.9737 2.02148C18.9795 1.99284 19.0205 1.99284 19.0263 2.02148C19.3302 3.50808 20.4919 4.66984 21.9785 4.97368C22.0072 4.97954 22.0072 5.02046 21.9785 5.02632C20.4919 5.33016 19.3302 6.49192 19.0263 7.97852C19.0205 8.00716 18.9795 8.00716 18.9737 7.97852C18.6698 6.49192 17.5081 5.33016 16.0215 5.02632C15.9928 5.02046 15.9928 4.97954 16.0215 4.97368C17.5081 4.66984 18.6698 3.50808 18.9737 2.02148Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ChannelMenu({ children }: { children: React.ReactNode }) {
  const { channel } = useChannelstore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={4}
        alignOffset={4}
        className="w-44 rounded-[15px] dark:bg-[#262626e6] backdrop-blur-2xl"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground/80">
          Channels
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2">
            <UserAiIcon className="w-4 h-4 text-icon" />
            <span>My Channels</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!channel}>
            <QrDialog channel={channel?.name ?? ""}>
              <div
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <QrCodeIcon className="w-4 h-4 text-icon" />
                <span>Share channel</span>
              </div>
            </QrDialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-neutral-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/channels/create"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <SatelliteIcon className="w-4 h-4 text-icon" />
              <span>Public channels</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RssLockedIcon className="w-4 h-4 text-icon" />
            <span>Subscriptions</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="dark:bg-neutral-700" />
          <DropdownMenuItem>
            <Link
              href="/channels/create"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <AddCircleHalfDotIcon className="w-4 h-4 text-icon" />
              <span>Create a channel</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChannelMenu;
