import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Astuteai Survey",
  description: "Fill the form to get started",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster /> {children}
      </body>
    </html>
  );
}
