import { Typography } from "../../atoms";

import SliderBanner from "../SliderBanner/SliderBanner";

const PromoSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <Typography variant="h4">Temukan Promo Menarik</Typography>
      {/* slider */}
      <SliderBanner />
    </div>
  );
};

export default PromoSection;
