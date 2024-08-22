/*import "./globals.css"; // Asegúrate de importar tus estilos globales
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GiftJoy",
  description: "La mejor tienda de regalos en línea",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
*/ // src/app/layout.js
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import { GetUserInfo } from "../services/users";
import { EvaluateResponse } from "@/utils/requestEvaluator";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user info if not on login or signup pages
    if (pathname !== "/login" && pathname !== "/signup") {
      GetUserInfo()
        .then((response) => {
          setUsername(response.firstname);
        })
        .catch((error) => {
          const e = EvaluateResponse(error);
          if (e !== "") {
            router.push(e);
          }
        });
    }
  }, [pathname]);

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header
            showSearchBar={pathname !== "/login" && pathname !== "/signup"}
            showCart={pathname !== "/login" && pathname !== "/signup"}
            username={pathname === "/" ? username : ""}
          />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
