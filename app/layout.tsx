import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/shared/SessionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";

const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoiT.io",
  description: "Generated using NextJS, AuthJS, Prisma and NeonDB-postgresql",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} text-gray-300 bg-zinc-800`}>
        <SessionProvider>
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
