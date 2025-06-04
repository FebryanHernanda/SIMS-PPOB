import { CardSaldo, UserGreetings } from "../../molecules";

const DashboardHeaderSection = () => {
  return (
    <section className="flex flex-wrap justify-center gap-5 lg:justify-between">
      <UserGreetings />
      <CardSaldo />
    </section>
  );
};

export default DashboardHeaderSection;
