import { Typography } from "../../atoms";

type CardTransaksiProps = {
  price: string;
  desc: string;
};

const CardTransaksi = ({ price, desc }: CardTransaksiProps) => {
  return (
    <div className="bg-white border-gray-300 rounded-lg border-1 p-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Typography
            variant="h2"
            className={price.includes("-") ? "text-red-500" : "text-green-500"}
          >
            {price}
          </Typography>
          <Typography variant="h6">{desc}</Typography>
        </div>
        <div>
          <Typography variant="body" className="text-left text-gray-500">
            Senin, 13 Maret 2023 12:30
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CardTransaksi;
