import "@/assets/styles/globals.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
