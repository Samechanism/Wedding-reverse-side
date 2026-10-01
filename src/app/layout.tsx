import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gather & Celebrate | RSVP",
  description: "大切な人たちと過ごす、特別な一日へのご案内"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
