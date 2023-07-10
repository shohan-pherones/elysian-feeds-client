"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { IoIosQuote } from "react-icons/io";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import SectionTitle from "./SectionTitle";
import Loading from "./Loading";
import Error from "./Error";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@smastrom/react-rating/style.css";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#1fb2a6",
  inactiveFillColor: "rgba(31, 178, 166, 0.3)",
};

const Testimonials = () => {
  const { data: reviews, error, isLoading } = useFetch("/api/reviews");

  return (
    <section id="testimonials" className="wrapper section-padding">
      <SectionTitle title="Voices of Satisfaction" />

      {isLoading && <Loading isLoading={isLoading} />}

      {error && <Error error={error.message} />}

      {reviews && (
        <Swiper
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
          parallax={true}
          modules={[Navigation, Autoplay, Pagination, Parallax]}
          className="mySwiper"
        >
          {reviews.map((review: any) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col gap-5 justify-center items-center p-10">
                <div data-swiper-parallax="-800%" className="text-6xl">
                  <IoIosQuote />
                </div>
                <p
                  data-swiper-parallax="-200%"
                  className="md:text-xl max-w-2xl text-center"
                >
                  {review.body}
                </p>
                <div data-swiper-parallax="-800%">
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={review.rating}
                    readOnly
                    itemStyles={myStyles}
                  />
                </div>
                <div
                  className="flex items-center gap-5"
                  data-swiper-parallax="-800%"
                >
                  <Image
                    src={review.user.image}
                    alt={review.user.name}
                    width={200}
                    height={200}
                    priority
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-medium">{review.user.name}</h4>
                    <p className="opacity-50">{review.user.occupation}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Testimonials;
