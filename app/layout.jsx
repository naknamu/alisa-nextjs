import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/app/context/client-provider.jsx";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

// components
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alisa - AI Pictures Sharing Platform",
  description: "Browse, Share and Upload AI Images",
  metadataBase: new URL("https://alisa.pics"),
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <Navbar />
          <NextTopLoader showSpinner={false} />
          <Toaster position="bottom-center" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
