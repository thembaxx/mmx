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
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          `antialiased h-screen font-sans ${fontSans.className} overflow-y-auto`
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
            <div className="w-full h-16 fixed top-0 left-0 z-50">
              <Navbar />
            </div>
            <main className="h-full w-full overflow-hidden pt-20">
              {children}
            </main>
            <Toaster />
          </>
        </Providers>
      </body>
    </html>
  );
}
