import {
  DashboardHeaderSection,
  LayananSection,
  PromoSection,
} from "../../components/organisms";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen gap-15 lg:text-left">
      <DashboardHeaderSection />
      <LayananSection />
      <PromoSection />
    </div>
  );
};

export default Home;
