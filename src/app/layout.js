"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header
            showSearchBar={pathname !== "/login" && pathname !== "/signup"}
            showCart={pathname !== "/login" && pathname !== "/signup"}
          />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
