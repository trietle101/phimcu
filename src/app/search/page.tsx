import React from "react";
import Link from "next/link";
import Image from "next/image";
import { searchMovies } from "@/actions/moviesAPI";
import { IMovie } from "@/types/movies";

interface IRequest {
  params: Record<string, never>; // Empty object or an object with dynamic route parameters
  searchParams: {
    q: string; // Search query parameter (in this case, 'deadpool')
  };
}

export default async function page(req: IRequest) {
  const { q } = req.searchParams;
  const API_IMAGE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;
  let movies = [];
  if (q !== undefined) {
    movies = await searchMovies(q);
    movies = movies.results.sort(
      (a: IMovie, b: IMovie) => b.popularity - a.popularity
    );
  } else if (q === "") {
    movies = [];
  }

  return (
    <section className="mx-[80px] mt-[80px]">
      <div className="w-full grid grid-cols-fluid gap-5">
        {movies
          ? movies.map((movie: IMovie) => (
              <Link
                key={movie.id}
                className="w-fit"
                href={`/movie/${movie.id}`}
              >
                <Image
                  className="rounded-md hover:scale-110 transition-all duration-100"
                  src={`${API_IMAGE_URL}${movie.poster_path}`}
                  alt="a"
                  width={230}
                  height={345}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                />
              </Link>
            ))
          : "No movies found"}
      </div>
    </section>
  );
}
