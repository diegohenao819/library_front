import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LibraryApp",
  description: "Reserva los libros que quieres leer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SearchProvider>
        <AuthProvider>
          <body className={inter.className}>
            {children}
            <ToastContainer />
          </body>
        </AuthProvider>
      </SearchProvider>
    </html>
  );
}
