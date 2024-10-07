import React from "react";
import Link from "next/link";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Category from "@/components/Category";
import { getRecommendationsMovies, getMovieByID } from "@/actions/moviesAPI";
import { ICast, ICrew } from "@/types/movies";
import Casts from "@/components/Casts";

export default async function Home({ params }: { params: { id: string } }) {
  const API_IMAGE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;
  const { id } = params;
  const recommendationsMovies = await getRecommendationsMovies(10, id);
  const movie = await getMovieByID(id);

  const hours = Math.floor(movie.runtime / 60);
  const remainingMinutes = movie.runtime % 60;

  const director = movie.credits.crew.filter(
    (c: ICrew) => c.job === "Director"
  );

  const actors = movie.credits.cast.filter(
    (c: ICast) => c.known_for_department === "Acting"
  );

  return (
    <div>
      <section
        className=" h-[70vh] flex items-end"
        style={{
          background: `linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0)), url(${API_IMAGE_URL}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className=" h-fit ml-[80px] mb-7 flex flex-col gap-4">
          <h1 className="text-5xl mb-2">{movie.title}</h1>
          <p className="w-[80%]">
            {movie.release_date.slice(0, 4)} •{" "}
            {`${hours}h ${remainingMinutes}min`}
          </p>
          <div className="flex items-center gap-1">
            <StarIcon />
            <p className="text-lg font-bold">
              {movie.vote_average.toFixed(1)}
              <span className="text-sm font-normal">
                /10 ({movie.vote_count} votes)
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {movie
              ? movie.genres.map((genre: { id: number; name: string }) => (
                  <p
                    className="bg-gray-700 px-3 py-1 rounded-2xl text-sm"
                    key={id}
                  >
                    {genre.name}
                  </p>
                ))
              : "No genres"}
          </div>
          <p className="w-[40%]">{movie.overview}</p>
          <div className="w-fit flex justify-center items-center gap-5 mt-4">
            <Link
              href={`/watch/${movie.id}`}
              className="h-fit flex justify-between items-center gap-2 px-8 py-1 bg-white hover:bg-[#d8d8d8] transition-all duration-100 text-black rounded-md"
            >
              <PlayArrowIcon fontSize="large" />
              <p className="text-xl pr-3">Play</p>
            </Link>
            <a
              href="html/detail.html"
              className="h-fit w-fit flex justify-between items-center gap-2 hover:text-[#d8d8d8] transition-all duration-100"
            >
              <BookmarkBorderIcon fontSize="medium" />
              <p className="text-lg">Save</p>
            </a>
          </div>
        </div>
      </section>
      <section className="mx-[80px]">
        <div className="mb-7">
          <p className="text-3xl mb-4">Director</p>
          <div className="flex gap-5">
            <Link
              href={`/person/${director[0]?.id}`}
              className="flex items-center gap-2"
            >
              <Image
                src={
                  director[0]?.profile_path
                    ? `${API_IMAGE_URL}${director[0].profile_path}`
                    : "/images/user-profile.jpg"
                }
                alt="poster"
                width={0}
                height={0}
                sizes="100vw"
                placeholder="blur"
                blurDataURL="/images/user-profile.jpg"
                className="rounded-[50%] hover:scale-110 transition-all duration-100 w-16 h-16 object-cover object-top"
              />
              <div>
                <p>{director[0]?.name}</p>
              </div>
            </Link>
          </div>
        </div>
        <Casts actors={actors} />
      </section>
      <section>
        <Category category="Recommendations" movies={recommendationsMovies} />
      </section>
    </div>
  );
}
