import moneyFormat from "../../../utils/moneyFormat";
import { Typography } from "../../atoms";

type CardTransaksiProps = {
  price: string;
  desc: string;
  date: string;
  transactionType: "PAYMENT" | "TOPUP" | undefined;
};

const CardTransaksi = ({
  price,
  desc,
  date,
  transactionType,
}: CardTransaksiProps) => {
  return (
    <div className="bg-white border-gray-300 rounded-lg border-1 p-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Typography
            variant="h2"
            className={
              transactionType === "PAYMENT" ? "text-red-500" : "text-green-500"
            }
          >
            {moneyFormat(price)}
          </Typography>
          <Typography variant="h6">{desc}</Typography>
        </div>
        <div>
          <Typography variant="body" className="text-left text-gray-500">
            {date}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CardTransaksi;
