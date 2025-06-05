import { useState } from "react";
import { Typography } from "../../atoms";
import { Eye, EyeOff } from "lucide-react";

const CardSaldo = () => {
  const [showSaldo, setShowSaldo] = useState(false);

  const handleShow = () => {
    setShowSaldo(!showSaldo);
  };
  return (
    <div className="flex flex-col w-xl h-[200px] gap-5 p-5 rounded-2xl text-left bg-[url(/src/assets/bg-saldo.png)] bg-no-repeat bg-cover bg-right bg-clip-border text-white justify-center">
      <Typography variant="h4">Saldo Anda</Typography>
      <Typography variant="h1">
        Rp{showSaldo ? "500.000" : "•••••••"}
      </Typography>
      <button type="button" onClick={handleShow}>
        {showSaldo ? (
          <div className="flex flex-row gap-2 items-center">
            <Typography variant="h6">Sembunyikan Saldo</Typography>
            <EyeOff size={18} />
          </div>
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <Typography variant="h6">Lihat Saldo</Typography>
            <Eye size={18} />
          </div>
        )}
      </button>
    </div>
  );
};

export default CardSaldo;
