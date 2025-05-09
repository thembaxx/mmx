import "../styles/globals.css";

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="h-full" lang="en">
      <body
        className={cn(
          `antialiased h-full font-sans ${fontSans.className} overflow-y-auto flex flex-col bg-[#F4F5F5] dark:bg-[#111111]`
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: false,
          }}
        >
          <>
            <Navbar />
            <main className="grow w-full">{children}</main>
            <Toaster />
          </>
        </Providers>
      </body>
    </html>
  );
}
