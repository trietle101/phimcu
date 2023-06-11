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
    const button = document.querySelector(".details__trailer button");
    video.play();

    if (!video.paused) {
        button.style.display = "none";
        video.controls = true;
    }
};

var scrollAmount = 0;
const sliderRel = document.querySelector(".relevant");
const maxScrollLeft = sliderRel.scrollWidth - sliderRel.clientWidth;

const nextRel = function () {
    if (scrollAmount < maxScrollLeft - (maxScrollLeft%400)) {
        sliderRel.scrollTo({
            top: 0,
            left: (scrollAmount += 400),
            behavior: "smooth",
        });
    }
};
const prevRel = function () {
    sliderRel.scrollTo({
        top: 0,
        left: (scrollAmount -= 400),
        behavior: "smooth",
    });
    if (scrollAmount < 0) scrollAmount = 0;
};

const form = document.querySelector(".form");
const name = document.getElementById("name");
const number = document.getElementById("number");
const date = document.getElementById("date");
const cvv = document.getElementById("cvv");

const visa = document.querySelector(".payment__card");

/*  SHOW ERROR  */
function showError(element, error) {
    if (error === true) {
        element.style.opacity = "1";
    } else {
        element.style.opacity = "0";
    }
}
/*  CHANGE THE FORMAT NAME  */
name.addEventListener("input", function () {
    document.getElementById("card-name").textContent = this.value;
});

// /*  CHANGE THE FORMAT CARD NUMBER*/
// number.addEventListener("input", function (e) {
//     this.value = numberAutoFormat();

//     //show error when is different of 16 numbers and 3 white space
//     let error = this.value.length !== 19;
//     let alert2 = document.getElementById("alert-2");
//     showError(alert2, error);

//     document.querySelector(".card__number").textContent = this.value;
// });

// function numberAutoFormat() {
//     let valueNumber = number.value;
//     // if white space change to ''. If is not a number between 0-9 change to ''
//     let v = valueNumber.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

//     // the value got min of 4 digits and max of 16
//     let matches = v.match(/\d{4,16}/g);
//     let match = (matches && matches[0]) || "";
//     let parts = [];

//     for (i = 0; i < match.length; i += 4) {
//         // after 4 digits add a new element to the Array
//         // e.g. "4510023" -> [4510, 023]
//         parts.push(match.substring(i, i + 4));
//     }

//     if (parts.length) {
//         // add a white space after 4 digits
//         return parts.join(" ");
//     } else {
//         return valueNumber;
//     }
// }

// /*  CHANGE THE FORMAT DATE  */
// date.addEventListener("input", function (e) {
//     this.value = dateAutoFormat();

//     // show error if is not a valid date
//     let alert3 = document.getElementById("alert-3");
//     showError(alert3, isNotDate(this));

//     let dateNumber = date.value.match(/\d{2,4}/g);
//     document.getElementById("month").textContent = dateNumber[0];
//     document.getElementById("year").textContent = dateNumber[1];
// });

// function isNotDate(element) {
//     let actualDate = new Date();
//     let month = actualDate.getMonth() + 1; // start january 0 we need to add + 1
//     let year = Number(actualDate.getFullYear().toString().substr(-2)); // 2022 -> 22
//     let dateNumber = element.value.match(/\d{2,4}/g);
//     let monthNumber = Number(dateNumber[0]);
//     let yearNumber = Number(dateNumber[1]);

//     if (
//         element.value === "" ||
//         monthNumber < 1 ||
//         monthNumber > 12 ||
//         yearNumber < year ||
//         (monthNumber <= month && yearNumber === year)
//     ) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function dateAutoFormat() {
//     let dateValue = date.value;
//     // if white space -> change to ''. If is not a number between 0-9 -> change to ''
//     let v = dateValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

//     // min of 2 digits and max of 4
//     let matches = v.match(/\d{2,4}/g);
//     let match = (matches && matches[0]) || "";
//     let parts = [];

//     for (i = 0; i < match.length; i += 2) {
//         // after 4 digits add a new element to the Array
//         // e.g. "4510023" -> [4510, 023]
//         parts.push(match.substring(i, i + 2));
//     }

//     if (parts.length) {
//         // add a white space after 4 digits
//         return parts.join("/");
//     } else {
//         return dateValue;
//     }
// }

// /*  CHANGE THE FORMAT CVV  */
// cvv.addEventListener("input", function (e) {
//     let alert4 = document.getElementById("alert-4");
//     let error = this.value.length < 3;
//     showError(alert4, error);
// });

// /* CHECK IF KEY PRESSED IS A NUMBER (input of card number, date and cvv) */
// function isNumeric(event) {
//     if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode > 31) {
//         return false;
//     }
// }

// /*  VALIDATION FORM WHEN PRESS THE BUTTON   */
// form.addEventListener("submit", function (e) {
//     // 1. if there is not any name
//     // 2. if the length of the number card is not valid (16 numbers and 3 white space)
//     // 3. if is not a valid date (4 number and "/" or is not a valid date)
//     // 4. if is not a valid cvv

//     if (
//         name.value === "" ||
//         number.value.length !== 19 ||
//         date.value.length !== 5 ||
//         isNotDate(date) === true ||
//         cvv.value.length < 3
//     ) {
//         e.preventDefault();
//     }

//     // 5. if any input is empty show the alert of that input
//     let input = document.querySelectorAll("input");
//     for (i = 0; i < input.length; i++) {
//         if (input[i].value === "") {
//             input[i].nextElementSibling.style.opacity = "1";
//         }
//     }
// });
