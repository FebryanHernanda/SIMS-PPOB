import { Image, Typography } from "../../components/atoms";
import { PembayaranForm } from "../../components/organisms";

const PembayaranPage = () => {
  return (
    <section className="flex flex-col gap-5 py-5">
      <Typography variant="h3">Pembayaran</Typography>
      <div className="flex items-center gap-5">
        <Image
          src="/src/assets/Listrik.png"
          alt="logo layanan"
          className="w-10"
        />
        <Typography variant="h4">Listrik Prabayar</Typography>
      </div>
      <PembayaranForm />
    </section>
  );
};

export default PembayaranPage;
