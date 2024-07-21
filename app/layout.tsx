import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/shared/SessionProvider";
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
          {/* <ErrorBoundary errorComponent={errorComp}>{children}</ErrorBoundary> */}
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
