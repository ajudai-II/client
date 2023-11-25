import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBanner from "../HomeBanner/HomeBanner";
import { homeMock } from "@/mocks/homeMock";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slides = homeMock.map((item) => (
    <div key={item.id}>
      <HomeBanner
        key={item.id}
        picture={item.picture}
        alt=""
        title={item.title}
      />
    </div>
  ));

  return (
    <div>
      <Slider {...settings}>{slides}</Slider>
    </div>
  );
};

export default Carousel;
