import { Button, Link, Typography } from "../../components/atoms";
import { CardTransaksi } from "../../components/molecules";

const TransaksiPage = () => {
  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <Typography variant="h2">Semua Transaksi</Typography>
      <CardTransaksi price={"+50.000"} desc="Top up pembelian" />
      <CardTransaksi price={"-10.000"} desc="Beli Pulsa" />
      <CardTransaksi price={"+1.000.000"} desc="Top up pembelian" />
      <div className="flex justify-center">
        <Link href="/transaksi/history">
          <Button type="button">Show More</Button>
        </Link>
      </div>
    </section>
  );
};

export default TransaksiPage;
