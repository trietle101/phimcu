const key = "4a1fbd255d069fb6c571f7e1aae6f88b";

const headerContainer = document.querySelector("header .container");
const popMoviesContainer = document.querySelector(
    "main section:first-child .cover"
);

async function getMovie(id) {
    try {
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=credits,images,videos`
            )
            .then((res) => {
                headerContainer.innerHTML += `
                    <div class="nav__info">
                        <h1>${res.data.original_title}</h1>
                        <p>${res.data.overview}</p>
                        <div class="nav__button">
                            <a href="#">
                                <i class="fa-solid fa-play"></i>
                                <p>Play</p>
                            </a>
                            <a href="html/detail.html">
                                <i class="fa-solid fa-circle-info"></i>
                                <p>More info</p>
                            </a>
                        </div>
                    </div>
                `;
            });
    } catch (error) {
        console.log(error);
    }
}
getMovie(164);

async function getMoviePop() {
    await axios
        .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1?`
        )
        .then((res) => {
            const popMovies = res.data.results.slice(0, 6);
            popMovies.forEach((movie) => {
                popMoviesContainer.innerHTML += `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}" />`;
            });
        });
}
getMoviePop();

// async function getMovieAct() {
//     await axios
//         .get(
//             `https://api.themoviedb.org/3/person/popular?language=en-US&page=1?api_key=${key}`
//         )
//         .then((res) => {
//             console.log(res.data.cast);
//         });
// }
// getMovieAct();
