import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/shared/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

const openSans = Noto_Sans_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoiT.io",
  description: "Generated using NextJS, AuthJS, Prisma and NeonDB-postgresql",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  // const errorComp: ErrorComponent = <ErrorCard error={"error"} />;
  return (
    <html lang="en">
      <body className={`${openSans.className} text-gray-300 bg-zinc-800`}>
        <SessionProvider>
          {/* <ErrorBoundary errorComponent={errorComp}>{children}</ErrorBoundary> */}
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
