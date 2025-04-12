import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppLoader } from "@/components/providers/app-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ingin Menjadi Programmer Handal, Namun Enggan Ngoding (IMPHEN)",
  description: "Platform media sosial Imphen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <AppLoader>
            {children}
          </AppLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
