"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { IMovie } from "@/types/movies";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
// import { searchMovies } from "@/actions/moviesAPI";
import debounce from "debounce";
type Props = {
  movies?: IMovie[];
  query?: string;
};

export default function Header({ query }: Props) {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isSearchInputExpanded, setIsSearchInputExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFocus = () => {
    if (inputRef.current) {
      setIsSearchInputExpanded(true);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  const handleScroll = () => {
    if (
      document.body.scrollTop >= 80 ||
      document.documentElement.scrollTop > 80
    ) {
      setIsTransparent(false);
    } else setIsTransparent(true);
  };

  async function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      router.push(`/search?q=${value}`);
    }, 500),
    []
  );

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }
  return (
    <nav
      className={`${
        isTransparent ? "bg-transparent" : "bg-gray-800"
      } w-full h-[60px] fixed z-[100] px-[80px] py-0 transition-all duration-700 ease-in-out`}
    >
      <div className="h-full w-full flex justify-between items-center">
        <ul className="h-full flex justify-between items-center gap-8">
          <Link href="/" className="mr-4">
            <Image
              src="/images/logo.png"
              alt="header logo"
              width={100}
              height={100}
            />
          </Link>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#">Categories</Link>
          </li>
          <li>
            <Link href="#">Movies</Link>
          </li>
          <li>
            <Link href="#">TV Shows</Link>
          </li>
          <li>
            <Link href="#">My list</Link>
          </li>
        </ul>
        <ul className="flex justify-between items-center gap-6">
          <li className="flex items-center overflow-hidden">
            <div className="cursor-pointer h-fit" onClick={() => handleFocus()}>
              <SearchIcon />
            </div>
            <input
              className={`ml-[5px] pl-2 h-8 bg-transparent outline outline-1 border-[1px] border-white rounded-md ${
                isSearchInputExpanded
                  ? "w-[250px]"
                  : "w-0  outline-none border-none"
              } transition-all duration-1000 ease-in-out `}
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onBlur={() => setIsSearchInputExpanded(false)}
              ref={inputRef}
              onChange={onInputChange}
              autoComplete="off"
            />
          </li>
          <li>
            <a href="../html/login.html">
              <PersonIcon />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
