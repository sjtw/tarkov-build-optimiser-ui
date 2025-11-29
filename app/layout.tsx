import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/app/ui/nav/nav";
import WeaponPresetProvider from "@/app/ui/weapon-preset-context";

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
  title: {
    template: "Tarkov Build Optimiser | %s",
    default: "Tarkov Build Optimiser",
  },
  description: "blah blah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}>
        <WeaponPresetProvider>
          <div className="optimiser-v2-shell min-h-screen">
            <div className="flex h-screen flex-col">
              <Nav />
              <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
          </div>
        </WeaponPresetProvider>
      </body>
    </html>
  );
}
