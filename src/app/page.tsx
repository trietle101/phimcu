import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Category from "@/components/Category";
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies
} from "@/actions/moviesAPI";
export default async function Home() {
  const popularMovies = await getPopularMovies(10);
  const topRatedMovies = await getTopRatedMovies(10);
  const nowPlayingMovies = await getNowPlayingMovies(10);

  return (
    <div className="h-fit">
      <section
        className=" h-[90vh] flex items-center"
        style={{
          background:
            'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url("/images/breakfast/background.jpg")'
        }}
      >
        <div className=" h-fit ml-[80px] flex flex-col gap-8">
          <h1 className="text-5xl mb-6">Breakfast at Tiffany&apos;s</h1>
          <p className="w-[40%]">
            Holly Golightly is an eccentric New York City playgirl determined to
            marry a Brazilian millionaire. But when young writer Paul Varjak
            moves into her apartment building, her past threatens to get in
            their way.
          </p>
          <div className="w-fit flex justify-center items-center gap-5">
            <a
              href="#"
              className="h-fit flex justify-between items-center gap-2 px-6 py-2 bg-white hover:bg-[#d8d8d8] transition-all duration-100 text-black rounded-md"
            >
              <PlayArrowIcon fontSize="large" />
              <p className="text-xl pr-3">Play</p>
            </a>
            <a
              href="html/detail.html"
              className="h-fit w-fit flex justify-between items-center gap-2 hover:text-[#d8d8d8] transition-all duration-100"
            >
              <InfoOutlinedIcon fontSize="medium" />
              <p className="text-lg">More info</p>
            </a>
          </div>
        </div>
      </section>
      <Category category="Now playing" movies={nowPlayingMovies} />
      <Category category="Popular" movies={popularMovies} />
      <Category category="Top rated" movies={topRatedMovies} />
    </div>
  );
}
