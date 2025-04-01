import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers  from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feelings Tracker",
  description: "Track your daily feelings and emotions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
