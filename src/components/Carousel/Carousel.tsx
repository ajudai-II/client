import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBanner from "../HomeBanner/HomeBanner";
import homeMock from "@/mocks/homeMock";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    appendDots: (dots: any) => (
      <div
        style={{
          padding: "0.2rem",
        }}
      >
        <ul
          style={{
            margin: "0px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
  };

  const slides = homeMock.map((item, key) => (
    <div key={key}>
      <HomeBanner picture={item.picture} alt="" title={item.title} />
    </div>
  ));

  return <Slider {...settings}>{slides}</Slider>;
};

export default Carousel;
