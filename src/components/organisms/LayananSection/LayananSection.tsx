import { Image, Link, Typography } from "../../atoms";

type LayananSection = {
  name: string;
  image: string;
};

const data: LayananSection[] = [
  {
    name: "Listrik",
    image: "/src/assets/Listrik.png",
  },
  { name: "Pulsa", image: "/src/assets/Pulsa.png" },
  { name: "PDAM", image: "/src/assets/PDAM.png" },
];

const LayananSection = () => {
  return (
    <section className="flex flex-col gap-5">
      <Typography variant="h4">Layanan</Typography>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {data.map((data, index) => (
          <Link key={index} href={`/pembayaran`} state={{ layanan: data }}>
            <Image src={data.image} alt={data.name} className="w-27" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LayananSection;
