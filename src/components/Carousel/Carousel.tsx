import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./carousel.module.scss";
import HomeBanner from "../HomeBanner/HomeBanner";
import { homeMock } from "@/mocks/homeMock";
import { Text } from "@chakra-ui/react";

export default class Carousel extends Component {
  render() {
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
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}
