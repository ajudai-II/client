import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeBanner from "../HomeBanner/HomeBanner";
import homeMock from "@/mocks/homeMock";
import { Box } from "@chakra-ui/react";

const Carousel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
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
    <HomeBanner key={key} picture={item.picture} alt="" title={item.title} />
  ));

  return (
    <Box w={"100%"} h={"100%"} position={"sticky"} top={0} right={0}>
      <Slider {...settings}>{slides}</Slider>
    </Box>
  );
};

export default Carousel;
