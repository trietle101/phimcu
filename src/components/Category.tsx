"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { IMovie } from "@/types/movies";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface PropsType {
  category: string;
  movies: IMovie[];
}
export default function Category({ movies, category }: PropsType) {
  let sliderRef: any = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const API_IMAGE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true
  };

  return (
    <section className="mt-8">
      <div className="mx-[80px]">
        <div className="flex justify-between items-center">
          <p className="text-3xl mb-4">{category}</p>
          <div>
            <KeyboardArrowLeftIcon
              className="text-3xl cursor-pointer"
              onClick={previous}
            />
            <KeyboardArrowRightIcon
              className="text-3xl cursor-pointer"
              onClick={next}
            />
          </div>
        </div>
        <Slider
          ref={(slider: any) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {movies ? (
            movies.map((movie: IMovie, index: number) => (
              <Link href={`/movie/${movie.id}`} key={index}>
                <Image
                  src={`${API_IMAGE_URL}${movie.poster_path}`}
                  alt="poster"
                  width={190}
                  height={285}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  className="rounded-md hover:scale-110 transition-all duration-100"
                />
              </Link>
            ))
          ) : (
            <div className="">No movies</div>
          )}
        </Slider>
      </div>
    </section>
  );
}
