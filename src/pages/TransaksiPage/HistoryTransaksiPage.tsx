import { useEffect, useState } from "react";
import { Button, Link, Typography } from "../../components/atoms";
import { CardTransaksi } from "../../components/molecules";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getTransactionHistory } from "../../redux/slices/TransactionHistoryslice";
import formatDate from "../../utils/dateFormat";

const HistoryTransaksiPage = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactionHistory);

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

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, [dispatch]);

  const filteredTransaksi = selectedMonth
    ? transactions.filter((trx) => {
        const bulanTransaksi = new Date(trx.created_on).toLocaleString(
          "id-ID",
          {
            month: "long",
          }
        );
        return capitalize(bulanTransaksi) === selectedMonth;
      })
    : transactions.slice(0, 3);

  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <Typography variant="h2">Semua Transaksi</Typography>
      <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
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
        filteredTransaksi.map((data, index) => (
          <CardTransaksi
            key={index}
            price={`${data.total_amount}`}
            desc={data.description}
            date={formatDate(data.created_on)}
            transactionType={data.transaction_type}
          />
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
