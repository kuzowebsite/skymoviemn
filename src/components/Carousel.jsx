"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export function Carousel({ movies }) {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      watchSlidesProgress={true}
      breakpoints={{
        320: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
      }}
    >
      {movies.map((movie, i) => (
        <SwiperSlide key={i}>
          <Card movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
