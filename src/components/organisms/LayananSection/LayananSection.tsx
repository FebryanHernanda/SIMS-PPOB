import { Image, Typography } from "../../atoms";

const LayananSection = () => {
  return (
    <section className="flex flex-col gap-5">
      <Typography variant="h4">Layanan</Typography>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Image
            key={index}
            src="/src/assets/Listrik.png"
            alt="logo"
            className="w-30"
          />
        ))}
      </div>
    </section>
  );
};

export default LayananSection;
