import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Image } from "../../atoms";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getBanners } from "../../../redux/slices/InformationSlices";
import { useEffect } from "react";

const SliderBanner = () => {
  const dispatch = useAppDispatch();
  const banner = useAppSelector((state) => state.information);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <div className="px-10">
      <Slider {...settings}>
        {banner.banners.map((banner, index) => (
          <div key={index} className="p-5 ">
            <Image src={banner.banner_image} alt={banner.banner_name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderBanner;
