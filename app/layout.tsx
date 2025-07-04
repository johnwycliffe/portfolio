// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorModeProvider } from "./providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "John's Portfolio",
  description: "Portfolio website",
  icons: { icon: "/favicon.webp" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} relative`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ColorModeProvider>
            <main className="relative z-10">{children}</main>
          </ColorModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

