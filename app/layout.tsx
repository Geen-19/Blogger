import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/general/Navbar";
import { AuthProvider } from "@/components/general/AuthProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body
      >
        <Navbar />
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
