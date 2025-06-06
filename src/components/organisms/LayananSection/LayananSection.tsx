import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Image, Link, Typography } from "../../atoms";
import { getServices } from "../../../redux/slices/InformationSlices";

const LayananSection = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.information.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-5">
      <Typography variant="h4">Layanan</Typography>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {services.map((data, index) => (
          <Link key={index} href={`/pembayaran`} state={{ layanan: data }}>
            <Image
              src={data.service_icon}
              alt={data.service_name}
              className="w-27"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LayananSection;
