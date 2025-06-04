import { Typography } from "../../atoms";

const CardSaldo = () => {
  return (
    <div className="flex flex-col w-xl h-[200px] gap-5 p-5 rounded-2xl text-left bg-[url(/src/assets/bg-saldo.png)] bg-no-repeat bg-cover bg-right bg-clip-border text-white justify-center">
      <Typography variant="h4">Saldo Anda</Typography>
      <Typography variant="h1">Rp500.000</Typography>
      <Typography variant="h6">Lihat Saldo</Typography>
    </div>
  );
};

export default CardSaldo;
