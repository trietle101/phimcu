import React from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <section className="mt-[60px]">
      <iframe
        className="w-full h-[94vh]"
        width={1000}
        height={500}
        src={`https://www.2embed.cc/embed/${id}`}
        allowFullScreen
      ></iframe>
      <Link
        href={`/movie/${id}`}
        className="ml-[80px] w-fit h-fit  mt-5 flex items-center gap-3 "
      >
        <ArrowBackIcon className="text-2xl" />
        <p className="h-7 text-xl box-border hover:border-b-2">
          Back to info page
        </p>
      </Link>
    </section>
  );
}
