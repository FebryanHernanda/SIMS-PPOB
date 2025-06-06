import { useEffect, useState } from "react";
import { Typography } from "../../atoms";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getBalance } from "../../../redux/slices/BalanceSlice";
import moneyFormat from "../../../utils/moneyFormat";

const CardSaldo = () => {
  const [showSaldo, setShowSaldo] = useState(false);
  const dispatch = useAppDispatch();

  const amount = useAppSelector((state) => state.balance);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch, amount.balance]);

  const handleShow = () => {
    setShowSaldo(!showSaldo);
  };
  return (
    <div className="flex flex-col w-xl h-[200px] gap-5 p-5 rounded-2xl text-left bg-[url(/assets/bg-saldo.png)] bg-no-repeat bg-cover bg-right bg-clip-border text-white justify-center">
      <Typography variant="h4">Saldo Anda</Typography>
      <Typography variant="h1">
        {showSaldo ? `${moneyFormat(amount.balance.toString())}` : "Rp •••••••"}
      </Typography>
      <button type="button" onClick={handleShow}>
        {showSaldo ? (
          <div className="flex flex-row items-center gap-2">
            <Typography variant="h6">Sembunyikan Saldo</Typography>
            <EyeOff size={18} />
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <Typography variant="h6">Lihat Saldo</Typography>
            <Eye size={18} />
          </div>
        )}
      </button>
    </div>
  );
};

export default CardSaldo;
