import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VelocityDeck - Software Delivery Dashboard",
  description: "TPM portfolio showcasing software delivery metrics and team performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">VelocityDeck</h1>
              <p className="text-sm text-muted-foreground">Software Delivery Dashboard</p>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}