import type React from "react";

import { Footer, Navbar } from "../../organisms";
import type { MainLayoutProps } from "./MainLayout.types";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow p-5 py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
