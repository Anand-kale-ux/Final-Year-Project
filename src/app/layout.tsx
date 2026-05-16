import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/animations/PageTransition";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Project Architect | Turn Ideas into Software in Seconds",
  description: "AI-powered system that generates comprehensive architecture, clean code, and cloud-ready deployment plans instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} min-h-full bg-black text-white antialiased selection:bg-primary/30 selection:text-white`}>
        <PageTransition>
          {children}
        </PageTransition>
        <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      </body>
    </html>
  );
}
