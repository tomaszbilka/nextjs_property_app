import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property app",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

type TProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: TProps) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
