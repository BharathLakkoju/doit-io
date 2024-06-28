import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/shared/SessionProvider";

const openSans = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

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
  return (
    <html lang="en">
      <body className={`${openSans.className} text-gray-300 bg-zinc-800`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
