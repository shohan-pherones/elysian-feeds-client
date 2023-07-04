"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper";
import { data } from "@/data/heroImages";
import Image from "next/image";
import Link from "next/link";
import Overlay from "./Overlay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <section className="w-full h-[calc(100vh-4rem)]">
      <Swiper
        parallax={true}
        pagination={{
          clickable: true,
        }}
        speed={750}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
        navigation={true}
        modules={[Navigation, Autoplay, Pagination, Parallax]}
        className="mySwiper w-full h-full"
      >
        {data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full relative">
              <Image
                src={item.src}
                alt={item.alt}
                width={1920}
                height={1080}
                priority
                className="w-full h-full object-cover"
              />
              <Overlay />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[2] space-y-5 text-white">
                <h1
                  data-swiper-parallax="-100%"
                  className="text-8xl font-bold uppercase"
                >
                  {item.heading}
                </h1>
                <p data-swiper-parallax="-200%" className="text-xl">
                  {item.paragraph}
                </p>
                <div data-swiper-parallax="-300%">
                  <Link href="/login" className="btn btn-accent">
                    {item.cta}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
