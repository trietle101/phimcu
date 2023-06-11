const url = "http://localhost:3000";

const headerContainer = document.querySelector("header .container");
const popMoviesContainer = document.querySelector(
    "main section:first-child .cover"
);

//get header movie
async function getMovie(id) {
    await fetch(`${url}/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            headerContainer.innerHTML += `
            <div class="nav__info">
                <h1>${data.name}</h1>
                <p>${data.description}</p>
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
            //console.log(data);
        });
}

//get poppular movies
async function getMoviePop() {
    await fetch(`${url}/products`)
        .then((res) => res.json())
        .then((data) => {
            const popMovies = data.slice(1, 7);
            popMovies.forEach((movie) => {
                popMoviesContainer.innerHTML += `<img src="./image/${movie.poster}" />`;
            });
            //console.log(data);
        });
}

//get movies details
async function getMovieDetails(id) {
    const detailsContainer = document.querySelector(".details__info");
    const cast = document.querySelector(".cast__card");
    await fetch(`${url}/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            detailsContainer.innerHTML = `
            <img
                src="../image/${data.poster}"
                alt=""
                class="poster"
            />
            <div class="details__desc">
                <div class="details__gernes">
                    <a href="">Comedy</a>
                    <a href="">Drama</a>
                    <a href="">Romance</a>
                </div>
                <div class="details__release">
                    <p>1961</p>
                    <p>&#183;</p>
                    <p>Approved</p>
                    <p>&#183;</p>
                    <p>1h 55m</p>
                </div>
                <h1>${data.name}</h1>
                <div class="details__rating">
                    <img src="../image/imdb.png" alt="" srcset="" />
                    <p>7.6</p>
                </div>
                <div class="details__add">
                    <span
                        ><i
                            class="fa-solid fa-bookmark fa-xl"
                            style="color: #000000"
                        ></i
                    ></span>
                    <p>Save to favorites</p>
                </div>
                <p>
                    ${data.description}
                </p>
                <button>
                    <i class="fa-solid fa-play fa-2xl"></i>
                    <p>Play now</p>
                </button>
            </div>
        `;
            data.cast.forEach((actor) => {
                cast.innerHTML += `
                <div class="cast__item">
                    <img src="../image/${actor.img}" />
                    <div class="overlay"></div>
                    <p class="name">${actor.name}</p>
                    <p class="role">${actor.role}</p>
                </div>
        `;
            });
        });
    var scrollAmount = 0;
    const slider = document.querySelector(".cast__card");
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    function next() {
        if (scrollAmount < maxScrollLeft - (maxScrollLeft % 400)) {
            slider.scrollTo({
                top: 0,
                left: (scrollAmount += 400),
                behavior: "smooth",
            });
        }
    }
    function prev() {
        slider.scrollTo({
            top: 0,
            left: (scrollAmount -= 400),
            behavior: "smooth",
        });
        if (scrollAmount < 0) scrollAmount = 0;
    }
    document.querySelector(".btn__next").addEventListener("click", next);
    document.querySelector(".btn__prev").addEventListener("click", prev);
}

//sign up
const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const signupName = document.querySelector("#signupName");
const signupButton = document.querySelector(".signup-button");

if (signupButton) {
    signupButton.addEventListener("click", function (e) {
        e.preventDefault();
        const inputSignup = {
            name: `${signupName.value}`,
            password: `${signupPassword.value}`,
            email: `${signupEmail.value}`,
        };

        fetch(`${url}/users`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(inputSignup),
        })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log(res);
            });
        location.href = "./login.html";
    });
}

//login
const loginEmail = document.querySelector("#inputEmail");
const loginPassword = document.querySelector("#inputPassword");
const warning = document.getElementsByClassName("warning-input");
const loginButton = document.querySelector(".signin-button");
let currentAccount;

if (loginButton) {
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        fetch(`${url}/users`)
            .then((res) => res.json())
            .then((data) => {
                currentAccount = data.find(
                    (acc) => acc.email === loginEmail.value
                );
                if (
                    currentAccount &&
                    loginEmail.value &&
                    loginPassword.value &&
                    currentAccount.password === loginPassword.value
                ) {
                    localStorage.setItem("name", `${currentAccount.name}`);
                    if (currentAccount.role == "admin")
                        location.href = "../admin/index.html";
                    else location.href = "../index.html";
                } else {
                    for (var i = 0; i < warning.length; i++) {
                        warning[i].style.display = "block";
                    }
                }
            });
    });
}
const currentUser = localStorage.getItem("name");

if (currentUser) {
    document.querySelector(".user").lastChild.remove();
    document.querySelector(".user").innerText = currentUser;
}

//crud products
async function getMovieCrud() {
    await fetch(`${url}/products`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((movie) => {
                const moviesCrudContainer = document.querySelector("tbody");
                moviesCrudContainer.innerHTML += `
                    <tr>
                        <td>${movie.id}</td>
                        <td>
                            <img
                                src="../image/${movie.poster}"
                            />
                            <p>${movie.name}</p>
                        </td>
                        <td>01-10-2021</td>

                        <td>
                            <i class="bx bx-cog bx-sm" onclick="editMovie(this)"></i>
                        </td>
                        <td>
                            <i class="bx bx-x-circle bx-sm" onclick="removeMovie(this)"></i>
                        </td>
                    </tr>
                `;
            });
        });
}

async function removeMovie(o) {
    const currentMovie = o.parentNode.parentNode;
    const currentMovieId = currentMovie.firstElementChild.innerText;
    console.log(currentMovieId);

    await fetch(`${url}/products/${currentMovieId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => console.log(res.status));
    currentMovie.parentNode.removeChild(currentMovie);
}

async function editMovie(o) {
    const moviesCrudContainer = document.querySelector("tbody");
    const currentMovie = o.parentNode.parentNode;
    const currentMovieId = currentMovie.firstElementChild.innerText;
    const currentMovieName = currentMovie.children[1].children[1].innerText;
    const form = document.createElement("tr");

    form.innerHTML = `
        <td>
        </td>
        <td>
            <input type="file" id="edit-image" name="fname"><br/>
            <input type="text" id="edit-name" name="fname" value="${currentMovieName}">
        </td>
        <td>
            <input type="date" id="edit-date" name="fname">
        </td>
        <td>
        </td>
        <td>
            <button class="edit-btn">Change</button>
        </td>
    `;
    moviesCrudContainer.insertBefore(form, currentMovie.nextSibling);
    document.querySelector(".edit-btn").addEventListener("click", function() {
        const editedName = document.querySelector("#edit-name").value;
        fetch(`${url}/products/${currentMovieId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${editedName}`
            }),
        }).then((res) => console.log(res.status));
        form.remove();
    });
}

//crud user
async function getUserCrud() {
    await fetch(`${url}/users`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((user) => {
                const moviesCrudContainerUser = document.querySelector("tbody");
                moviesCrudContainerUser.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>
                            <p>${user.name}</p>
                        </td>
                        <td>${user.role}</td>

                        <td>
                            <i class="bx bx-cog bx-sm""></i>
                        </td>
                        <td>
                            <i class="bx bx-x-circle bx-sm" onclick="removeUser(this)"></i>
                        </td>
                    </tr>
                `;
            });
        });
}

async function removeUser(o) {
    const currentUser = o.parentNode.parentNode;
    const currentUserId = currentUser.firstElementChild.innerText;
    console.log(currentUserId);

    await fetch(`${url}/users/${currentUserId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => console.log(res.status));
    currentUser.parentNode.removeChild(currentUser);
}

// const key = "4a1fbd255d069fb6c571f7e1aae6f88b";

// const headerContainer = document.querySelector("header .container");
// const popMoviesContainer = document.querySelector(
//     "main section:first-child .cover"
// );

// async function getMovie(id) {
//     try {
//         await axios
//             .get(
//                 `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=credits,images,videos`
//             )
//             .then((res) => {
//                 headerContainer.innerHTML += `
//                     <div class="nav__info">
//                         <h1>${res.data.original_title}</h1>
//                         <p>${res.data.overview}</p>
//                         <div class="nav__button">
//                             <a href="#">
//                                 <i class="fa-solid fa-play"></i>
//                                 <p>Play</p>
//                             </a>
//                             <a href="html/detail.html">
//                                 <i class="fa-solid fa-circle-info"></i>
//                                 <p>More info</p>
//                             </a>
//                         </div>
//                     </div>
//                 `;
//             });
//     } catch (error) {
//         console.log(error);
//     }
// }
// getMovie(164);

// async function getMoviePop() {
//     await axios
//         .get(
//             `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1?`
//         )
//         .then((res) => {
//             const popMovies = res.data.results.slice(0, 6);
//             popMovies.forEach((movie) => {
//                 popMoviesContainer.innerHTML += `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}" />`;
//             });
//         });
// }
// getMoviePop();

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
