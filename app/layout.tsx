import type { Metadata } from "next";
import { geistMono, geistSans } from "./fonts";
import ProvidersWrapper from "@/components/providers/providers-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "noteddd.",
  description:
    "Web-based notebook app for creating and organizing notes with text, markdown, and code snippets in flexible cells. Clean, minimal, and designed for writing, learning, and experimentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
