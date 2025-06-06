import { useEffect } from "react";
import { Button, Link, Typography } from "../../components/atoms";
import { CardTransaksi } from "../../components/molecules";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getTransactionHistory } from "../../redux/slices/TransactionHistoryslice";
import formatDate from "../../utils/dateFormat";

const TransaksiPage = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactionHistory);

  useEffect(() => {
    dispatch(getTransactionHistory());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-5 p-5 py-5 lg:p-0">
      <Typography variant="h2">Semua Transaksi</Typography>
      {transactions.slice(0, 5).map((data, index) => (
        <CardTransaksi
          key={index}
          price={`${data.total_amount}`}
          desc={data.description}
          date={formatDate(data.created_on)}
          transactionType={data.transaction_type}
        />
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
