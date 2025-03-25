import "../styles/globals.css";

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/navbar";
import { DotPattern } from "@/components/dot-pattern";

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
          `antialiased h-screen font-sans ${fontSans.className} overflow-y-auto bg-black/90`
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
            <DotPattern
              className={cn(
                "absolute inset-0 h-full w-full opacity-50 left-0 top-0",
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
              )}
            />
            <Navbar />
            <main className="h-full w-full overflow-hidden">{children}</main>
            <Toaster />
          </>
        </Providers>
      </body>
    </html>
  );
}
