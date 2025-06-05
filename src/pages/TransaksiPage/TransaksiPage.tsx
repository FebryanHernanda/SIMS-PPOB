import { Button, Link, Typography } from "../../components/atoms";
import { CardTransaksi } from "../../components/molecules";
import { dataTransaksi } from "../../data/data";

const TransaksiPage = () => {
  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <Typography variant="h2">Semua Transaksi</Typography>
      {dataTransaksi.slice(0, 5).map((data, index) => (
        <CardTransaksi key={index} price={`${data.price}`} desc={data.desc} />
      ))}
      <div className="flex justify-center">
        <Link href="/transaksi/history">
          <Button type="button">Show More</Button>
        </Link>
      </div>
    </section>
  );
};

export default TransaksiPage;
