"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { ICast } from "@/types/movies";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface PropsType {
  actors: ICast[];
}

export default function Casts({ actors }: PropsType) {
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
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true
  };
  return (
    <div>
      <div className="mb-16">
        <div className="flex items-center justify-between">
          <p className="text-3xl mb-4">Casts</p>
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
          {actors
            ? actors.slice(0, 8).map((actor: ICast) => (
                <Link
                  href={`/person/${actor.id}`}
                  className="!flex items-center gap-2"
                  key={actor.id}
                >
                  <Image
                    src={
                      actor.profile_path
                        ? `${API_IMAGE_URL}${actor.profile_path}`
                        : "/images/user-profile.jpg"
                    }
                    alt="poster"
                    width={0}
                    height={0}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="/images/user-profile.jpg"
                    className="rounded-[50%] hover:scale-110 transition-all duration-100 w-20 h-20 object-cover object-top"
                  />
                  <div>
                    <p>{actor.name}</p>
                    <p className="text-gray-400">{actor.character}</p>
                  </div>
                </Link>
              ))
            : "Actors not found"}
        </Slider>
      </div>
    </div>
  );
}
