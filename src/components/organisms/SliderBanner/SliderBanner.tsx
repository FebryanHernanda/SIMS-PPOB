import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Image } from "../../atoms";

const SliderBanner = () => {
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
        <div className="p-5">
          <Image
            src="/src/assets/Banner-1.png"
            alt="banner"
            className="w-100"
          ></Image>
        </div>
        <div className="p-5">
          <Image
            src="/src/assets/Banner-2.png"
            alt="banner"
            className="w-100"
          ></Image>
        </div>
        <div className="p-5">
          <Image
            src="/src/assets/Banner-3.png"
            alt="banner"
            className="w-100"
          ></Image>
        </div>
        <div className="p-5">
          <Image
            src="/src/assets/Banner-4.png"
            alt="banner"
            className="w-100"
          ></Image>
        </div>
        <div className="p-5">
          <Image
            src="/src/assets/Banner-5.png"
            alt="banner"
            className="w-100"
          ></Image>
        </div>
      </Slider>
    </div>
  );
};

export default SliderBanner;
