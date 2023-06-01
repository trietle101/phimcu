import axios from "../node_modules/axios/dist/node/axios.cjs";
// const headerContainer = document.querySelector("header .container");
// export default async function getMovie(id) {
//     try {
//         await axios
//             .get(
//                 `https://api.themoviedb.org/3/movie/${id}?api_key=4a1fbd255d069fb6c571f7e1aae6f88b`
//             )
//             .then((res) => {
//                 headerContainer.innerHTML += `
//                 <div class="nav__info">
//                     <h1>${res.data.original_title}</h1>
//                     <p>res.data.overview</p>
//                     <div class="nav__button">
//                         <a href="#">
//                             <i class="fa-solid fa-play"></i>
//                             <p>Play</p>
//                         </a>
//                         <a href="html/index.html">
//                             <i class="fa-solid fa-circle-info"></i>
//                             <p>More info</p>
//                         </a>
//                     </div>
//                 </div>
//             `;
//                 console.log(res.data);
//             });
//     } catch (error) {
//         console.log(error);
//     }
// }
// getMovie(164);

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
// async function getMoviePop() {
//     await axios
//         .get(
//             `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1?api_key=4a1fbd255d069fb6c571f7e1aae6f88b`
//         )
//         .then((res) => {
//             console.log(res.data);
//         });
// }
// getMoviePop();

async function getMovieAct() {
    await axios
        .get(
            `https://api.themoviedb.org/3/movie/164/credits?api_key=4a1fbd255d069fb6c571f7e1aae6f88b`
        )
        .then((res) => {
            console.log(res.data.cast);
        });
}
getMovieAct();
