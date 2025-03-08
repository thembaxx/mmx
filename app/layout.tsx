import "../styles/globals.css";

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";

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
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          `antialiased h-screen overflow-y-auto font-sans ${fontSans.className}`
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
          <main className="h-full w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
