import { useState } from "react";
import { Button, Link, Typography } from "../../components/atoms";
import { CardTransaksi } from "../../components/molecules";
import { dataTransaksi } from "../../data/data";

const HistoryTransaksiPage = () => {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const dateNow = new Date();
    const currentMonth = dateNow.toLocaleString("id-ID", { month: "long" });
    return capitalize(currentMonth);
  });

  const filteredTransaksi = selectedMonth
    ? dataTransaksi.filter((trx) => trx.bulan === selectedMonth)
    : dataTransaksi.slice(0, 3);

  return (
    <section className="flex flex-col  gap-5 p-5 py-5 lg:p-0">
      <Typography variant="h2">Semua Transaksi</Typography>
      <ul className="flex flex-wrap justify-center lg:justify-start gap-3">
        {bulan.map((bulan) => (
          <li key={bulan}>
            <Button
              variant={
                selectedMonth === bulan
                  ? "linkSecondaryActive"
                  : "linkSecondary"
              }
              onClick={() => setSelectedMonth(bulan)}
            >
              {bulan}
            </Button>
          </li>
        ))}
      </ul>
      {filteredTransaksi.length > 0 ? (
        filteredTransaksi.map((trx, index) => (
          <CardTransaksi key={index} price={`${trx.price}`} desc={trx.desc} />
        ))
      ) : (
        <div className="mt-10">
          <Typography variant="body" className="text-center">
            Maaf tidak ada history transaksi saat ini
          </Typography>
        </div>
      )}
      <div className="flex justify-center ">
        <Link href="/transaksi">
          <Button>Kembali</Button>
        </Link>
      </div>
    </section>
  );
};
export default HistoryTransaksiPage;
