import "@/assets/styles/globals.css";
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
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
