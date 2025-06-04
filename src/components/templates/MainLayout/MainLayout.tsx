import { DashboardHeaderSection, Footer, Navbar } from "../../organisms";
import type { MainLayoutProps } from "./MainLayout.types";

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  dashboardSection,
}) => {
  return (
    <div className="flex flex-col min-h-screen gap-10 lg:text-left">
      <Navbar />
      {dashboardSection && <DashboardHeaderSection />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
