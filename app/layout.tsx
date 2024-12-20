import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getCurrentSession } from "@/lib/session";
import { SessionProvider } from "@/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jsonify",
  description: "Transform Any Data or Website into Structured JSON",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await getCurrentSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider value={sessionData}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
