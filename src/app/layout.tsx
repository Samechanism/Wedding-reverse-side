import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The B-Side Reception | Shota & Hikaru",
  description: "2026年11月21日、ShotaとHikaruのパーティーへのご案内"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
