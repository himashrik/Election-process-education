import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "@/components/theme-provider";
import { FloatingBeads } from "@/components/FloatingBeads";
import dynamic from 'next/dynamic';

const ElectionAssistant = dynamic(() => import("@/components/ElectionAssistant").then(mod => mod.ElectionAssistant), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ElectionEd - Learn How Elections Work",
  description: "An interactive, step-by-step guide to understanding elections around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <TooltipProvider>
              <FloatingBeads />
              {children}
              <ElectionAssistant />
            </TooltipProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
