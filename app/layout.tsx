import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import {
  DEFAULT_THEME,
  getThemeScript,
  THEME_STORAGE_KEY,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eliott Scherrer | Portfolio",
  description: "Developer",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {getThemeScript({
            attribute: "class",
            defaultTheme: DEFAULT_THEME,
            enableColorScheme: true,
            enableSystem: true,
            storageKey: THEME_STORAGE_KEY,
          })}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme={DEFAULT_THEME}
          enableSystem
          disableTransitionOnChange
          storageKey={THEME_STORAGE_KEY}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
