import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCOPELENS — Protect your project scope",
  description: "Spot scope creep, price additional work, and keep client agreements clear."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
