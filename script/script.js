const nav = document.querySelector("nav");
window.onscroll = function () {
    if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop > 50
    ) {
        nav.classList.add("nav-scrolled");
    } else {
        nav.classList.remove("nav-scrolled");
    }
};

const play = function () {
    const video = document.querySelector("video");
    const button = document.querySelector("button");
    video.paused ? video.play() : video.pause();
    video.controls = true;
    button.style.display = "none";
};

var scrollAmount = 0;
const slider = document.querySelector(".cast__card");
const next = function () {
    slider.scrollTo({
        top: 0,
        left: (scrollAmount += 500),
        behavior: "smooth",
    });
};
const prev = function () {
    slider.scrollTo({
        top: 0,
        left: (scrollAmount -= 500),
        behavior: "smooth",
    });
    if (scrollAmount < 0) scrollAmount = 0;
};
