import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VORO Agent Portal",
  description: "The entrepreneur-first brokerage agent workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%235E42BC'/><path d='M8 11l8-6 8 6v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/><polyline points='13,23 13,16 19,16 19,23' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
