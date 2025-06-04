import { Typography } from "../../components/atoms";
import { CardTransaksi } from "../../components/molecules";

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
  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <Typography variant="h2">Semua Transaksi</Typography>
      <ul className="flex flex-wrap justify-center gap-3">
        {bulan.map((bulan) => (
          <li
            key={bulan}
            className={`rounded ${
              bulan === "Juni" ? " text-black font-bold" : "text-gray-500"
            }`}
          >
            {bulan}
          </li>
        ))}
      </ul>
      <CardTransaksi price={"-50.000"} desc="Top up pembelian" />
      <CardTransaksi price={"+50.000"} desc="Top up pembelian" />
      <CardTransaksi price={"+50.000"} desc="Top up pembelian" />
      <CardTransaksi price={"+50.000"} desc="Top up pembelian" />
    </section>
  );
};

export default HistoryTransaksiPage;
