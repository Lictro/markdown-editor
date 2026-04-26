import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Markdown Editor | Live Preview & Writing Tool",
  description:
    "A modern Markdown editor with live preview, formatting toolbar, keyboard shortcuts, and responsive design. Write and preview content seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.className}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
