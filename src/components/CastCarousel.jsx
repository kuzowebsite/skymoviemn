"use client";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "swiper/css/navigation";
export function CastCarousel({ persons }) {
  return (
    <Swiper
      spaceBetween={10}
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
      {persons.map((person) => (
        <SwiperSlide key={person.id}>
          <div className=" rounded-md p-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-teal-900/20 backdrop-blur-10 backdrop-blur-md shadow-md hover:bg-teal-900/70 ">
            {person.profile_path === null ? (
              <LazyLoadImage  className="rounded-md"
                src={`https://picsum.photos/200/300/?blur=2`}
                alt={person.name}
                effect="blur"
              />
            ) : (
              <LazyLoadImage className="rounded-md"
                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                alt={person.name}
                effect="blur"
              />
            )}
            <div className="my-2">
              <h1 className="text-base sm:text-lg lg:text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                {person.name}
              </h1>
              <h2 className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {person.character}
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
