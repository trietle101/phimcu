import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IMovie } from "@/types/movies";
import { getPerson, getPersonMovies } from "@/actions/moviesAPI";

interface ICastMovie extends IMovie {
  character: string;
  credit_id: string;
  order: number;
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const API_IMAGE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;
  const person = await getPerson(id);
  let movies = await getPersonMovies(id);
  if (person.known_for_department == "Acting") {
    movies = movies.cast;
  } else {
    movies = movies.crew;
  }

  return (
    <div className="mx-[220px] mt-[120px] flex gap-14">
      <div>
        <Image
          src={`${API_IMAGE_URL}${person.profile_path}`}
          width={350}
          height={600}
          priority={true}
          alt="profile-pic"
        />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl mt-5">Personal information</h1>
          <div>
            <p>Occupation</p>
            <p className="text-gray-400">
              {person.known_for_department === "Acting" ? "Actor" : "Director"}
            </p>
          </div>
          <div>
            <p>Gender</p>
            <p className="text-gray-400">
              {person.gender === 1 ? "Female" : "Male"}
            </p>
          </div>
          <div>
            <p>Date of birth</p>
            <p className="text-gray-400">
              {person.birthday.slice(8, 10) +
                "-" +
                person.birthday.slice(5, 7) +
                "-" +
                person.birthday.slice(0, 4)}
            </p>
          </div>
          <div>
            <p>Place of birth</p>
            <p className="text-gray-400">{person.place_of_birth}</p>
          </div>
        </div>
      </div>
      <div className="w-[80%] flex flex-col gap-5">
        <p className="text-5xl">{person.name}</p>
        <p className="text-2xl">Biography</p>
        <p className="text-gray-400">{person.biography}</p>
        <p className="text-2xl">Movies</p>
        <div className="w-full grid grid-cols-fluid gap-5">
          {movies
            ? movies.map((movie: ICastMovie) => (
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
      </div>
    </div>
  );
}
